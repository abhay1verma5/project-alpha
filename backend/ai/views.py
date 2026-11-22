"""AI endpoints: career chat, study tools, job search, quiz and eligibility.

Each view takes the same JSON body and returns the same success JSON as the
Next.js route it replaces. When Gemini is unavailable:

- career, tool: 503 with a bilingual error body.
- quiz: the static question bank for the exam/topic, else 503.
- eligibility: the static eligibility table (source "static"), never 503.
- search: the normal database text search (ai_powered false), never 503.
"""

import hashlib
import json
import logging
import re
from datetime import date, datetime
from functools import lru_cache
from pathlib import Path

from django.core.cache import cache
from django.test import RequestFactory
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from config.gemini import DEFAULT_DEADLINE, gemini_text
from jobs import views as jobs_views

from . import prompts
from .throttles import allow_request

logger = logging.getLogger(__name__)

DATA_DIR = Path(__file__).resolve().parent / "data"

UNAVAILABLE_BODY = {
    "error": "AI is unavailable right now",
    "error_hi": "AI अभी उपलब्ध नहीं है",
}
TOO_MANY_REQUESTS_BODY = {"error": "Too many requests. Please try again later."}

MAX_CONTEXT_MESSAGES = 6
MAX_CHAT_MESSAGES = 10
MAX_TOOL_PROMPT_CHARS = 2000
MAX_SEARCH_QUERY_CHARS = 200
QUIZ_COUNTS = (5, 10, 20, 30)
QUIZ_DEFAULT_COUNT = 10
QUIZ_CACHE_TTL = 30 * 60
QUIZ_FALLBACK_EXAMS = ("ssc_cgl", "railway", "banking", "upsc")
QUIZ_SUBJECT_MAP = {
    "physics": "science", "chemistry": "science", "biology": "science",
    "algebra": "math", "geometry": "math", "trigonometry": "math", "calculus": "math",
    "statistics": "math", "mensuration": "math", "coordinate": "math", "vectors": "math",
    "probability": "math", "matrices": "math",
    "history": "gk", "geography": "gk", "civics": "gk", "economics": "gk", "polity": "gk",
}

# search: content_type -> (list view, the URL path it is served under)
SEARCH_CONTENT_VIEWS = {
    "admission": (jobs_views.AdmissionListView, "/api/admissions/"),
    "result": (jobs_views.ResultListView, "/api/results/"),
    "admit_card": (jobs_views.AdmitCardListView, "/api/admit-cards/"),
    "answer_key": (jobs_views.AnswerKeyListView, "/api/answer-keys/"),
    "syllabus": (jobs_views.SyllabusListView, "/api/syllabus/"),
}
SEARCH_DEFAULT_VIEW = (jobs_views.JobListView, "/api/jobs/")
SEARCH_TEXT_PATH = "/api/search/"

_JSON_FENCE_RE = re.compile(r"```json\n?|```\n?")


# ---------------------------------------------------------------------------
# Shared helpers
# ---------------------------------------------------------------------------


def _unavailable():
    return Response(dict(UNAVAILABLE_BODY), status=503)


def _body(request):
    data = request.data
    return data if isinstance(data, dict) else {}


def _text(value):
    return "" if value is None else str(value)


def _is_number(value):
    return isinstance(value, (int, float)) and not isinstance(value, bool)


def _ai_json(prompt, system, max_tokens, timeout):
    """Gemini reply parsed as JSON, or None if the call failed or the reply was not JSON."""
    text = gemini_text(prompt, system=system, max_tokens=max_tokens, timeout=timeout, deadline=DEFAULT_DEADLINE)
    if not text:
        return None
    cleaned = _JSON_FENCE_RE.sub("", text).strip()
    try:
        return json.loads(cleaned)
    except ValueError:
        return None


def _call_view(view, path, params, host):
    """Run an existing list/search view in-process and return its decoded JSON body.

    Uses the same view code the public endpoints use, so filters and pagination
    match exactly. No network hop is made.
    """
    request = RequestFactory().get(path, params, HTTP_HOST=host)
    response = view.as_view()(request) if isinstance(view, type) else view(request)
    if hasattr(response, "render"):
        response.render()
    return json.loads(response.content)


def _view_results(view, path, params, host):
    data = _call_view(view, path, params, host)
    results = data.get("results") if isinstance(data, dict) else None
    return results if isinstance(results, list) else []


# ---------------------------------------------------------------------------
# Base view
# ---------------------------------------------------------------------------


class AIView(APIView):
    """Anonymous POST endpoint with a per-IP hourly limit.

    Subclasses set `scope`, `hourly_limit`, `failure_error` and implement handle().
    """

    authentication_classes = []
    permission_classes = [AllowAny]
    throttle_classes = []

    scope = ""
    hourly_limit = 60
    failure_error = "Request failed"

    def post(self, request, *args, **kwargs):
        if not allow_request(request, self.scope, self.hourly_limit):
            return Response(dict(TOO_MANY_REQUESTS_BODY), status=429)
        # Malformed JSON raises DRF ParseError here, which DRF turns into a 400.
        body = _body(request)
        try:
            return self.handle(body, request)
        except Exception:
            logger.exception("AI endpoint %s failed", self.scope)
            return Response({"error": self.failure_error}, status=500)

    def handle(self, body, request):
        raise NotImplementedError


# ---------------------------------------------------------------------------
# Career counselor chat
# ---------------------------------------------------------------------------


class CareerView(AIView):
    scope = "career"
    hourly_limit = 30
    failure_error = "Career advice failed"

    def handle(self, body, request):
        messages = body.get("messages")
        if not isinstance(messages, list) or not messages:
            return Response({"error": "Messages required"}, status=400)
        if len(messages) > MAX_CHAT_MESSAGES:
            return Response({"error": "Message limit reached"}, status=429)

        turns = [m if isinstance(m, dict) else {} for m in messages[-MAX_CONTEXT_MESSAGES:]]
        transcript = "\n\n".join(
            f"{'User' if turn.get('role') == 'user' else 'Assistant'}: {_text(turn.get('text'))}"
            for turn in turns
        )
        system = f"{prompts.CAREER_SYSTEM_PROMPT}\n\n{prompts.CAREER_TRANSCRIPT_INSTRUCTION}"
        reply = gemini_text(transcript, system=system, max_tokens=1024, timeout=30, deadline=DEFAULT_DEADLINE)
        if reply:
            return Response({"reply": reply})
        return _unavailable()


# ---------------------------------------------------------------------------
# Single-shot study tools
# ---------------------------------------------------------------------------


class ToolView(AIView):
    scope = "tool"
    hourly_limit = 30
    failure_error = "Request failed"

    def handle(self, body, request):
        tool = body.get("tool")
        tool_prompt = prompts.TOOL_PROMPTS.get(tool) if isinstance(tool, str) else None
        if not tool_prompt:
            return Response({"error": "Unknown tool"}, status=400)
        prompt = body.get("prompt")
        if not isinstance(prompt, str) or not prompt.strip():
            return Response({"error": "Prompt required"}, status=400)

        lang_line = "Reply in Hindi (Devanagari)." if body.get("lang") == "hi" else "Reply in English."
        reply = gemini_text(
            prompt[:MAX_TOOL_PROMPT_CHARS],
            system=f"{tool_prompt}\n{lang_line}",
            max_tokens=1500,
            timeout=45,
            deadline=DEFAULT_DEADLINE,
        )
        if reply:
            return Response({"reply": reply})
        return _unavailable()


# ---------------------------------------------------------------------------
# Natural-language job search
# ---------------------------------------------------------------------------


class SearchView(AIView):
    scope = "search"
    hourly_limit = 60
    failure_error = "Search failed"

    def handle(self, body, request):
        query = body.get("query")
        if not isinstance(query, str) or len(query) < 2:
            return Response({"error": "Query too short"}, status=400)
        if len(query) > MAX_SEARCH_QUERY_CHARS:
            return Response({"error": "Query too long"}, status=400)

        host = request.get_host()
        filters = _ai_json(
            f'User query: "{query}"',
            prompts.SEARCH_SYSTEM_PROMPT,
            max_tokens=256,
            timeout=30,
        )
        if not isinstance(filters, dict):
            return self._text_search(query, host)

        params = {}
        if filters.get("category"):
            params["category"] = _text(filters["category"])
        if filters.get("state"):
            params["state"] = _text(filters["state"])
        if filters.get("qualification"):
            params["qualification"] = _text(filters["qualification"])
        if filters.get("search_text"):
            params["search"] = _text(filters["search_text"])

        content_type = filters.get("content_type") or ""
        if not params and not content_type:
            results = _view_results(jobs_views.search_view, SEARCH_TEXT_PATH, {"q": query}, host)
        else:
            view, path = SEARCH_DEFAULT_VIEW
            if isinstance(content_type, str):
                view, path = SEARCH_CONTENT_VIEWS.get(content_type, SEARCH_DEFAULT_VIEW)
            results = _view_results(view, path, {**params, "page_size": "20"}, host)

        return Response({
            "results": results,
            "summary": filters.get("summary") or f'Results for "{query}"',
            "filters": {
                "category": filters.get("category") or None,
                "state": filters.get("state") or None,
                "qualification": filters.get("qualification") or None,
                "content_type": filters.get("content_type") or None,
            },
            "ai_powered": True,
        })

    def _text_search(self, query, host):
        results = _view_results(jobs_views.search_view, SEARCH_TEXT_PATH, {"q": query}, host)
        return Response({
            "results": results,
            "summary": f'Showing results for "{query}"',
            "filters": {},
            "ai_powered": False,
        })


# ---------------------------------------------------------------------------
# Quiz generation
# ---------------------------------------------------------------------------


@lru_cache(maxsize=1)
def _quiz_banks():
    with (DATA_DIR / "quiz_bank.json").open(encoding="utf-8") as fh:
        main = json.load(fh)
    with (DATA_DIR / "quiz_bank_extra.json").open(encoding="utf-8") as fh:
        extra = json.load(fh)
    return main, extra


def get_static_quiz(exam, topic):
    """Static question bank lookup, same order as the former getStaticQuiz()."""
    main, extra = _quiz_banks()
    for key in (f"{exam}__{topic}", f"general__{topic}"):
        if key in main:
            return main[key]
        if key in extra:
            return extra[key]
    return None


def _static_quiz_for(exam, topic):
    questions = get_static_quiz(exam, topic)
    if questions:
        return questions

    base_topic = re.sub(r"\s+", "_", topic.split(" - ")[0].lower())
    for fallback_exam in QUIZ_FALLBACK_EXAMS:
        questions = get_static_quiz(fallback_exam, base_topic)
        if questions:
            return questions

    mapped = QUIZ_SUBJECT_MAP.get(base_topic)
    if mapped:
        for fallback_exam in QUIZ_FALLBACK_EXAMS:
            questions = get_static_quiz(fallback_exam, mapped)
            if questions:
                return questions
    return None


class QuizView(AIView):
    scope = "quiz"
    hourly_limit = 60
    failure_error = "Quiz generation failed"

    def handle(self, body, request):
        exam = body.get("exam")
        topic = body.get("topic")
        if not (isinstance(exam, str) and exam and isinstance(topic, str) and topic):
            return Response({"error": "Exam and topic required"}, status=400)

        raw_count = body.get("count")
        count = int(raw_count) if raw_count in QUIZ_COUNTS else QUIZ_DEFAULT_COUNT
        language = "hi" if body.get("lang") == "hi" else "en"
        cache_key = "ai-quiz:" + hashlib.sha256(
            f"{exam}__{topic}__{language}__{count}".encode("utf-8")
        ).hexdigest()

        cached = cache.get(cache_key)
        if cached is not None:
            return Response({"questions": cached, "source": "cache"})

        lang_instruction = (
            "Generate ALL questions, options, and explanations in Hindi (Devanagari script)."
            if language == "hi"
            else "Generate ALL questions, options, and explanations in English."
        )
        max_tokens = 4096 if count <= 10 else 8192 if count <= 20 else 12000
        user_message = (
            f"Exam: {exam.replace('_', ' ').upper()}\n"
            f"Topic: {topic.replace('_', ' ')}\n"
            f"{lang_instruction}"
        )
        raw = _ai_json(
            user_message,
            prompts.quiz_system_prompt(count),
            max_tokens=max_tokens,
            timeout=60,
        )
        if isinstance(raw, list) and len(raw) >= 3:
            questions = raw[:count]
            cache.set(cache_key, questions, QUIZ_CACHE_TTL)
            return Response({"questions": questions, "source": "ai"})

        static_questions = _static_quiz_for(exam, topic)
        if static_questions:
            return Response({"questions": static_questions, "source": "static"})
        return _unavailable()


# ---------------------------------------------------------------------------
# Exam eligibility check
# ---------------------------------------------------------------------------


@lru_cache(maxsize=1)
def _eligibility_exams():
    with (DATA_DIR / "eligibility_exams.json").open(encoding="utf-8") as fh:
        return json.load(fh)


def _parse_dob(value):
    if not isinstance(value, str):
        return None
    try:
        return date.fromisoformat(value.strip()[:10])
    except ValueError:
        try:
            return datetime.fromisoformat(value.strip()).date()
        except ValueError:
            return None


def _age_on(birth, today):
    return today.year - birth.year - ((today.month, today.day) < (birth.month, birth.day))


def check_static_eligibility(age, qualification, category, gender):
    """Per-exam eligibility from the static table. Returns (exam, eligible, reason) tuples."""
    results = []
    for exam in _eligibility_exams():
        max_age = exam["max_age"]
        if category == "OBC":
            max_age += exam["obc_relaxation"]
        if category in ("SC", "ST"):
            max_age += exam["sc_st_relaxation"]
        if gender == "Female":
            max_age += exam["female_relaxation"]

        age_ok = exam["min_age"] <= age <= max_age
        qualification_ok = qualification in exam["qualifications"]
        if not age_ok and not qualification_ok:
            reason = "Age and qualification do not match"
        elif not age_ok:
            reason = f"Age limit: {exam['min_age']}-{max_age} years"
        elif not qualification_ok:
            reason = f"Minimum: {exam['min_qualification']}"
        else:
            reason = None
        results.append((exam, reason is None, reason))
    return results


def _static_eligibility_response(age, qualification, category, gender, hi):
    results = check_static_eligibility(age, qualification, category, gender)
    eligible = [(exam, reason) for exam, ok, reason in results if ok]
    top = eligible[0][0] if eligible else None

    if top is not None:
        top_pick_reason = (
            f"आपकी प्रोफ़ाइल के अनुसार {top['name_hi']} सबसे उपयुक्त है।"
            if hi
            else f"Based on your profile, {top['name']} is the best match."
        )
    else:
        top_pick_reason = (
            "आपकी प्रोफ़ाइल से कोई परीक्षा मेल नहीं खाती।"
            if hi
            else "No matching exams found for your profile."
        )

    exams = []
    for exam, ok, reason in results:
        if ok:
            exam_reason = "आप पात्र हैं" if hi else "You are eligible"
        else:
            exam_reason = reason or "Not eligible"
        exams.append({
            "name": exam["name_hi"] if hi else exam["name"],
            "eligible": ok,
            "salary_range": f"₹{exam['salary_range']}",
            "age_range": f"{exam['min_age']}-{exam['max_age']} years",
            "tips": exam["tips_hi"] if hi else exam["tips"],
            "reason": exam_reason,
        })

    return {
        "total_eligible": len(eligible),
        "top_pick": top["name"] if top is not None else "None found",
        "top_pick_reason": top_pick_reason,
        "exams": exams,
        "source": "static",
    }


class EligibilityView(AIView):
    scope = "eligibility"
    hourly_limit = 60
    failure_error = "Eligibility check failed"

    def handle(self, body, request):
        dob = body.get("dob")
        qualification = body.get("qualification")
        category = body.get("category")
        gender = body.get("gender")
        if not (dob and qualification and category and gender):
            return Response({"error": "All fields are required"}, status=400)

        birth = _parse_dob(dob)
        if birth is None:
            return Response({"error": "Invalid date of birth"}, status=400)
        age = _age_on(birth, date.today())

        state = body.get("state")
        hi = body.get("lang") == "hi"
        lang_instruction = (
            "Respond in Hindi (tips, reasons, top_pick_reason in Hindi/Devanagari)."
            if hi
            else "Respond in English."
        )
        profile = (
            "Candidate Profile:\n"
            f"- Age: {age} years (DOB: {dob})\n"
            f"- Qualification: {qualification}\n"
            f"- Category: {category}\n"
            f"- Gender: {gender}\n"
            f"- State: {state or 'Not specified'}\n\n"
            f"{lang_instruction}"
        )
        raw = _ai_json(profile, prompts.ELIGIBILITY_SYSTEM_PROMPT, max_tokens=4096, timeout=60)
        if isinstance(raw, dict) and _is_number(raw.get("total_eligible")):
            return Response({**raw, "source": "ai"})

        return Response(_static_eligibility_response(age, qualification, category, gender, hi))
