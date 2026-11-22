import json
import os
from unittest import mock

from django.core.cache import cache
from django.test import TestCase, override_settings

from . import views
from .throttles import allow_request

UNAVAILABLE = {"error": "AI is unavailable right now", "error_hi": "AI अभी उपलब्ध नहीं है"}
AI_OFF_ENV = {k: v for k, v in os.environ.items() if k != "GEMINI_API_KEY"}


def _post(client, path, body, **headers):
    return client.post(f"/api/ai/{path}/", data=body, content_type="application/json", **headers)


# Production settings redirect plain HTTP to HTTPS; the test client is plain HTTP.
@override_settings(SECURE_SSL_REDIRECT=False)
class AITestBase(TestCase):
    def setUp(self):
        cache.clear()
        # No Gemini key: the helper returns None without any network call.
        patcher = mock.patch.dict(os.environ, AI_OFF_ENV, clear=True)
        patcher.start()
        self.addCleanup(patcher.stop)


class GeminiUnavailableTests(AITestBase):
    def test_career_returns_503(self):
        response = _post(self.client, "career", {"messages": [{"role": "user", "text": "Hi"}]})
        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.json(), UNAVAILABLE)

    def test_tool_returns_503(self):
        response = _post(self.client, "tool", {"tool": "math", "prompt": "2+2"})
        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.json(), UNAVAILABLE)

    def test_quiz_uses_static_bank_when_ai_is_off(self):
        response = _post(self.client, "quiz", {"exam": "ssc_cgl", "topic": "math", "count": 10})
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(body["source"], "static")
        self.assertEqual(body["questions"], views.get_static_quiz("ssc_cgl", "math"))

    def test_quiz_without_static_bank_returns_503(self):
        response = _post(self.client, "quiz", {"exam": "no_such_exam", "topic": "no_such_topic"})
        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.json(), UNAVAILABLE)

    def test_quiz_maps_school_subject_to_general_bank(self):
        response = _post(self.client, "quiz", {"exam": "class_10", "topic": "physics"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["source"], "static")

    def test_eligibility_uses_static_table(self):
        payload = {
            "dob": "2000-01-15",
            "qualification": "Graduate",
            "category": "OBC",
            "gender": "Male",
            "state": "Bihar",
            "lang": "en",
        }
        response = _post(self.client, "eligibility", payload)
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(body["source"], "static")
        self.assertEqual(len(body["exams"]), len(views._eligibility_exams()))
        eligible = [e for e in body["exams"] if e["eligible"]]
        self.assertEqual(body["total_eligible"], len(eligible))
        self.assertEqual(set(body["exams"][0].keys()),
                         {"name", "eligible", "salary_range", "age_range", "tips", "reason"})
        self.assertTrue(body["exams"][0]["salary_range"].startswith("₹"))

    def test_eligibility_hindi_static_response(self):
        payload = {"dob": "1990-01-01", "qualification": "12th", "category": "General",
                   "gender": "Male", "lang": "hi"}
        body = _post(self.client, "eligibility", payload).json()
        self.assertEqual(body["source"], "static")
        names = [e["name"] for e in body["exams"]]
        self.assertIn("UPSC सिविल सेवा", names)
        self.assertNotIn("UPSC CSE", names)
        eligible_reasons = [e["reason"] for e in body["exams"] if e["eligible"]]
        self.assertTrue(all(reason == "आप पात्र हैं" for reason in eligible_reasons))
        self.assertTrue(body["top_pick_reason"].startswith("आपकी प्रोफ़ाइल के अनुसार"))

    def test_search_falls_back_to_text_search(self):
        response = _post(self.client, "search", {"query": "railway jobs"})
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertFalse(body["ai_powered"])
        self.assertEqual(body["filters"], {})
        self.assertEqual(body["summary"], 'Showing results for "railway jobs"')
        self.assertIsInstance(body["results"], list)


class ValidationTests(AITestBase):
    def test_career_requires_messages(self):
        self.assertEqual(_post(self.client, "career", {}).json(), {"error": "Messages required"})
        self.assertEqual(_post(self.client, "career", {"messages": []}).status_code, 400)

    def test_career_rejects_more_than_ten_messages(self):
        messages = [{"role": "user", "text": "x"}] * 11
        response = _post(self.client, "career", {"messages": messages})
        self.assertEqual(response.status_code, 429)
        self.assertEqual(response.json(), {"error": "Message limit reached"})

    def test_tool_unknown_tool(self):
        response = _post(self.client, "tool", {"tool": "nope", "prompt": "x"})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"error": "Unknown tool"})

    def test_tool_prompt_required(self):
        response = _post(self.client, "tool", {"tool": "doubt", "prompt": "   "})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"error": "Prompt required"})

    def test_search_query_length(self):
        short = _post(self.client, "search", {"query": "a"})
        self.assertEqual(short.status_code, 400)
        self.assertEqual(short.json(), {"error": "Query too short"})
        long = _post(self.client, "search", {"query": "x" * 201})
        self.assertEqual(long.status_code, 400)
        self.assertEqual(long.json(), {"error": "Query too long"})

    def test_quiz_requires_exam_and_topic(self):
        response = _post(self.client, "quiz", {"exam": "ssc_cgl"})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"error": "Exam and topic required"})

    def test_eligibility_requires_all_fields(self):
        response = _post(self.client, "eligibility", {"dob": "2000-01-01", "gender": "Male"})
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json(), {"error": "All fields are required"})

    def test_eligibility_rejects_bad_dob(self):
        response = _post(self.client, "eligibility", {
            "dob": "not-a-date", "qualification": "Graduate", "category": "General", "gender": "Male",
        })
        self.assertEqual(response.status_code, 400)

    def test_malformed_json_is_400(self):
        response = self.client.post("/api/ai/tool/", data="{bad", content_type="application/json")
        self.assertEqual(response.status_code, 400)


class RateLimitTests(AITestBase):
    def test_career_limit_is_30_per_hour(self):
        for _ in range(30):
            self.assertEqual(_post(self.client, "career", {"messages": []}).status_code, 400)
        response = _post(self.client, "career", {"messages": []})
        self.assertEqual(response.status_code, 429)
        self.assertEqual(response.json(), {"error": "Too many requests. Please try again later."})

    def test_limit_is_per_ip(self):
        for _ in range(30):
            _post(self.client, "career", {"messages": []}, HTTP_X_FORWARDED_FOR="203.0.113.9")
        other = _post(self.client, "career", {"messages": []}, HTTP_X_FORWARDED_FOR="203.0.113.10")
        self.assertEqual(other.status_code, 400)

    def test_allow_request_counts_per_scope(self):
        request = mock.Mock(META={"REMOTE_ADDR": "198.51.100.7"})
        self.assertTrue(allow_request(request, "scope-a", 1))
        self.assertFalse(allow_request(request, "scope-a", 1))
        self.assertTrue(allow_request(request, "scope-b", 1))


class GeminiAvailableTests(AITestBase):
    def _patch_gemini(self, reply):
        patcher = mock.patch("ai.views.gemini_text", return_value=reply)
        mocked = patcher.start()
        self.addCleanup(patcher.stop)
        return mocked

    def test_career_reply(self):
        mocked = self._patch_gemini("Try SSC CGL.")
        messages = [{"role": "user", "text": "What next?"}, {"role": "model", "text": "Study."}]
        response = _post(self.client, "career", {"messages": messages})
        self.assertEqual(response.json(), {"reply": "Try SSC CGL."})
        prompt = mocked.call_args.args[0]
        self.assertEqual(prompt, "User: What next?\n\nAssistant: Study.")

    def test_tool_reply(self):
        self._patch_gemini("Answer 4")
        response = _post(self.client, "tool", {"tool": "math", "prompt": "2+2", "lang": "hi"})
        self.assertEqual(response.json(), {"reply": "Answer 4"})

    def test_quiz_ai_questions_are_trimmed_and_cached(self):
        questions = [{"question": f"Q{i}", "options": ["a", "b", "c", "d"], "correct": 0,
                      "explanation": "e"} for i in range(7)]
        mocked = self._patch_gemini(json.dumps(questions))
        first = _post(self.client, "quiz", {"exam": "ssc_cgl", "topic": "math", "count": 5})
        self.assertEqual(first.json()["source"], "ai")
        self.assertEqual(len(first.json()["questions"]), 5)
        second = _post(self.client, "quiz", {"exam": "ssc_cgl", "topic": "math", "count": 5})
        self.assertEqual(second.json()["source"], "cache")
        self.assertEqual(mocked.call_count, 1)

    def test_quiz_bad_ai_reply_falls_back_to_static(self):
        self._patch_gemini("not json at all")
        response = _post(self.client, "quiz", {"exam": "ssc_cgl", "topic": "math"})
        self.assertEqual(response.json()["source"], "static")

    def test_eligibility_ai_reply(self):
        ai_reply = json.dumps({"total_eligible": 1, "top_pick": "SSC CGL",
                               "top_pick_reason": "Fits", "exams": []})
        self._patch_gemini(ai_reply)
        body = _post(self.client, "eligibility", {
            "dob": "2000-01-01", "qualification": "Graduate", "category": "General", "gender": "Male",
        }).json()
        self.assertEqual(body["source"], "ai")
        self.assertEqual(body["top_pick"], "SSC CGL")

    def test_search_ai_filters_drive_the_list_view(self):
        filters = {"category": "railway", "state": "uttar_pradesh", "qualification": "10th",
                   "content_type": "", "search_text": "", "summary": "UP Railway"}
        self._patch_gemini(json.dumps(filters))
        body = _post(self.client, "search", {"query": "10th pass railway job UP"}).json()
        self.assertTrue(body["ai_powered"])
        self.assertEqual(body["summary"], "UP Railway")
        self.assertEqual(body["filters"]["category"], "railway")
        self.assertEqual(body["filters"]["content_type"], None)
        self.assertIsInstance(body["results"], list)

    def test_search_content_type_uses_result_view(self):
        filters = {"category": "", "state": "", "qualification": "", "content_type": "result",
                   "search_text": "", "summary": ""}
        self._patch_gemini(json.dumps(filters))
        body = _post(self.client, "search", {"query": "ssc result"}).json()
        self.assertTrue(body["ai_powered"])
        self.assertEqual(body["summary"], 'Results for "ssc result"')
        self.assertEqual(body["filters"]["content_type"], "result")
