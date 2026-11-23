"""Post a real previous-year question to the Telegram channel as a quiz poll.

Only real past-paper questions (source=crawled) — AI practice questions are never sent as
PYQs. Exams sarkari-job aspirants take; questions whose options point at numbered
statements missing from the text are skipped. The question for each slot is picked by
date (no repeats for years, no state to store).

    python manage.py send_pyq_quiz --dry-run
    python manage.py send_pyq_quiz --only-hours 1,7,13    # UTC hours of the 3-hourly alerts run
"""
import json
import re

import requests
from django.conf import settings
from django.core.management.base import BaseCommand
from django.utils import timezone

from pyq.models import ExamQuestion

EXAMS = {
    "ssc_cgl": "SSC CGL",
    "rrb_ntpc": "RRB NTPC",
    "rrb_group_d": "RRB Group D",
    "upsc_prelims": "UPSC Prelims",
    "ctet": "CTET",
    "general_gk": "General GK",
}
POLL_URL = "https://api.telegram.org/bot{token}/sendPoll"
MORE = "More PYQs: sarkarialert.online/pyq"
_STATEMENT_OPTION = re.compile(r"\b(only|both|neither|nor)\b.*\b[1-4]\b|\b[1-4]\b\s*(only|and|,)", re.I)
_HAS_STATEMENTS = re.compile(r"(^|\n|\s)(\(?[1-4][.)])\s", re.M)


def _options(raw):
    try:
        opts = json.loads(raw) if isinstance(raw, str) else raw
    except (TypeError, ValueError):
        return None
    if isinstance(opts, dict):
        opts = list(opts.values())
    if not isinstance(opts, list):
        return None
    return [str(o).strip() for o in opts]


def quiz_payload(q):
    """Telegram quiz poll for a question, or None if it does not fit / is not self-contained."""
    opts = _options(q.options)
    if not opts or not (2 <= len(opts) <= 10) or not (0 <= q.correct_answer < len(opts)):
        return None
    if any(not o or len(o) > 100 for o in opts):
        return None
    if any(_STATEMENT_OPTION.search(o) for o in opts) and not _HAS_STATEMENTS.search(q.question_text):
        return None  # "1 only / Both 1 and 2" without the statements = unanswerable
    label = f"[{EXAMS.get(q.exam_type, q.exam_type)} {q.year} PYQ] "
    question = label + q.question_text.strip()
    if len(question) > 300:
        return None
    expl = (q.explanation or "").strip()
    room = 200 - len(MORE) - 3
    expl = (expl[:room].rsplit(" ", 1)[0] + "… | " if len(expl) > room else (expl + " | " if expl else "")) + MORE
    return {
        "question": question,
        "options": [{"text": o} for o in opts],
        "type": "quiz",
        "correct_option_id": q.correct_answer,
        "is_anonymous": True,
        "explanation": expl,
    }


def eligible_ids():
    return list(
        ExamQuestion.objects.filter(source="crawled", exam_type__in=EXAMS)
        .order_by("id")
        .values_list("id", flat=True)
    )


def pick_for(now, ids, slots_per_day=8):
    """Deterministic: each (day, 3-hour slot) walks forward through the id list."""
    if not ids:
        return []
    start = ((now.date().toordinal() * slots_per_day + now.hour // 3) * 7919) % len(ids)
    return ids[start:] + ids[:start]


class Command(BaseCommand):
    help = "Post one real previous-year question to the Telegram channel as a quiz poll."

    def add_arguments(self, parser):
        parser.add_argument("--dry-run", action="store_true")
        parser.add_argument("--only-hours", default="", help="comma list of UTC hours to run in; others exit")

    def handle(self, *args, **o):
        now = timezone.now()
        hours = {int(h) for h in o["only_hours"].split(",") if h.strip()}
        if hours and now.hour not in hours:
            self.stdout.write(f"Not a quiz hour (UTC {now.hour}); skipping.")
            return
        token, chat = settings.TELEGRAM_BOT_TOKEN, settings.TELEGRAM_CHANNEL_ID
        if not o["dry_run"] and not (token and chat):
            self.stdout.write("Telegram not configured; skipping.")
            return
        ids = pick_for(now, eligible_ids())
        for qid in ids[:200]:
            payload = quiz_payload(ExamQuestion.objects.get(id=qid))
            if payload:
                break
        else:
            self.stdout.write("No suitable question found.")
            return
        if o["dry_run"]:
            self.stdout.write(json.dumps(payload, ensure_ascii=False, indent=1))
            return
        try:
            r = requests.post(POLL_URL.format(token=token), json={"chat_id": chat, **payload}, timeout=15)
            data = r.json()
        except (requests.RequestException, ValueError) as e:
            self.stderr.write(f"Telegram request failed: {e}")
            return
        if data.get("ok"):
            self.stdout.write(self.style.SUCCESS(f"Quiz posted (question {qid})."))
        else:
            self.stderr.write(f"Telegram rejected the quiz: {data.get('description')}")
