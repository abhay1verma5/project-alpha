import json
from datetime import datetime, timezone as tz
from unittest import mock

from django.core.management import call_command
from django.test import TestCase, override_settings

from pyq.management.commands.send_pyq_quiz import eligible_ids, quiz_payload
from pyq.models import ExamQuestion

_n = iter(range(10**6))


def _q(text, options, correct=0, source="crawled", exam="ssc_cgl", **kw):
    return ExamQuestion.objects.create(
        exam_type=exam, year=2019, subject="GK", chapter="x", question_text=text,
        question_text_hash=f"h{next(_n)}", options=json.dumps(options),
        correct_answer=correct, explanation=kw.get("explanation", ""), source=source,
        source_url="https://example.com", language="en", is_verified=False,
    )


class QuizPayloadTests(TestCase):
    def test_real_question_becomes_labelled_quiz(self):
        q = _q("Capital of India?", ["Delhi", "Mumbai", "Pune", "Agra"], 0, explanation="Delhi is the capital.")
        p = quiz_payload(q)
        self.assertTrue(p["question"].startswith("[SSC CGL 2019 PYQ] "))
        self.assertEqual(p["correct_option_id"], 0)
        self.assertEqual(p["type"], "quiz")
        self.assertTrue(p["is_anonymous"])
        self.assertIn("sarkarialert.online/pyq", p["explanation"])
        self.assertLessEqual(len(p["explanation"]), 200)

    def test_statement_options_without_statements_are_skipped(self):
        q = _q("Pradhan Mantri Jan-Dhan Yojana has been launched for", ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"])
        self.assertIsNone(quiz_payload(q))
        q2 = _q("Consider: 1. A is true 2. B is true. Which is correct?", ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"])
        self.assertIsNotNone(quiz_payload(q2))

    def test_too_long_or_bad_options_skipped(self):
        self.assertIsNone(quiz_payload(_q("x" * 300, ["a", "b"])))
        self.assertIsNone(quiz_payload(_q("Q?", ["a" * 101, "b"])))
        self.assertIsNone(quiz_payload(_q("Q?", ["a", "b"], correct=5)))

    def test_ai_questions_and_other_exams_never_used(self):
        real = _q("Real?", ["a", "b"])
        _q("AI?", ["a", "b"], source="ai_generated")
        _q("JEE?", ["a", "b"], exam="jee_main")
        self.assertEqual(eligible_ids(), [real.id])


@override_settings(TELEGRAM_BOT_TOKEN="t", TELEGRAM_CHANNEL_ID="@c")
class QuizCommandTests(TestCase):
    def test_posts_poll_in_quiz_hour_and_skips_other_hours(self):
        _q("Capital of India?", ["Delhi", "Mumbai"])
        resp = mock.Mock(json=lambda: {"ok": True})
        at = datetime(2026, 11, 24, 7, 52, tzinfo=tz.utc)
        with mock.patch("django.utils.timezone.now", return_value=at), \
             mock.patch("requests.post", return_value=resp) as post:
            call_command("send_pyq_quiz", only_hours="1,7,13")
            call_command("send_pyq_quiz", only_hours="2,8")
        self.assertEqual(post.call_count, 1)
        body = post.call_args.kwargs["json"]
        self.assertEqual(body["chat_id"], "@c")
        self.assertEqual(body["type"], "quiz")
