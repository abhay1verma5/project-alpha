"""Import normalised question files (JSONL) produced by conversion scripts.

Each line:
{"exam_type","year","subject","chapter","question_text","options":[...],
 "correct_answer":0-based int,"explanation","language":"en"|"hi",
 "source_url","is_verified":bool}

Validation is strict: unknown exam_type, missing answer, <2 options, an empty
option or an image-only option/question drops the row. Dedupe uses the same
text hash as the model, so re-runs are safe.

Usage:
    python manage.py import_pyq_jsonl path/a.jsonl path/b.jsonl --dry-run
    python manage.py import_pyq_jsonl /dir/*.jsonl
"""

import json
import re
import time

from django.core.management.base import BaseCommand

from pyq.models import ExamQuestion, ExamType, PYQCrawlLog, QuestionSource

IMAGE_RE = re.compile(r"(\.png|\.jpe?g|\.gif|\.svg|<img|!\[|image_\d+|cdn\.[a-z]+\.[a-z]+/)", re.I)
VALID_EXAMS = {c[0] for c in ExamType.choices}


def clean(s):
    return re.sub(r"\s+", " ", str(s or "")).strip()


def validate(row):
    """Return ExamQuestion kwargs or a reason string."""
    exam = row.get("exam_type")
    if exam not in VALID_EXAMS:
        return f"unknown exam_type {exam}"
    q = clean(row.get("question_text"))
    if len(q) < 8:
        return "short question"
    if IMAGE_RE.search(q) and len(q) < 60:
        return "image question"
    options = [clean(o) for o in (row.get("options") or [])]
    if len(options) < 2 or any(not o for o in options) or len(options) > 8:
        return "bad options"
    if any(IMAGE_RE.search(o) for o in options):
        return "image option"
    if len(set(o.lower() for o in options)) < len(options):
        return "duplicate options"
    try:
        correct = int(row.get("correct_answer"))
    except (TypeError, ValueError):
        return "no answer"
    if not (0 <= correct < len(options)):
        return "answer out of range"
    try:
        year = int(str(row.get("year"))[:4])
    except (TypeError, ValueError):
        return "bad year"
    if not (1980 <= year <= 2030):
        return "bad year"
    lang = str(row.get("language") or "en").lower()[:5]
    difficulty = str(row.get("difficulty") or "medium").lower()
    if difficulty not in ("easy", "medium", "hard"):
        difficulty = "medium"
    return {
        "exam_type": exam,
        "year": year,
        "subject": clean(row.get("subject") or "General")[:100],
        "chapter": clean(row.get("chapter"))[:200],
        "question_text": q,
        "options": options,
        "correct_answer": correct,
        "explanation": clean(row.get("explanation"))[:4000],
        "difficulty": difficulty,
        "language": lang,
        "source_url": str(row.get("source_url") or "")[:1000],
        "is_verified": bool(row.get("is_verified", False)),
    }


class Command(BaseCommand):
    help = "Import normalised JSONL question files"

    def add_arguments(self, parser):
        parser.add_argument("files", nargs="+")
        parser.add_argument("--dry-run", action="store_true")

    def handle(self, *args, **options):
        total_new = 0
        for path in options["files"]:
            start = time.time()
            found = saved = dup = 0
            reasons = {}
            batch = []
            with open(path, encoding="utf-8") as fh:
                for line in fh:
                    line = line.strip()
                    if not line:
                        continue
                    found += 1
                    try:
                        row = json.loads(line)
                    except json.JSONDecodeError:
                        reasons["bad json"] = reasons.get("bad json", 0) + 1
                        continue
                    item = validate(row)
                    if isinstance(item, str):
                        reasons[item] = reasons.get(item, 0) + 1
                        continue
                    h = ExamQuestion.compute_hash(item["question_text"])
                    if ExamQuestion.objects.filter(question_text_hash=h).exists() or any(b.question_text_hash == h for b in batch):
                        dup += 1
                        continue
                    batch.append(ExamQuestion(question_text_hash=h, source=QuestionSource.CRAWLED, **item))
                    if len(batch) >= 500 and not options["dry_run"]:
                        ExamQuestion.objects.bulk_create(batch, ignore_conflicts=True)
                        saved += len(batch)
                        batch = []
            if batch:
                if not options["dry_run"]:
                    ExamQuestion.objects.bulk_create(batch, ignore_conflicts=True)
                saved += len(batch)
            total_new += saved
            top = ", ".join(f"{k} {v}" for k, v in sorted(reasons.items(), key=lambda kv: -kv[1])[:4])
            self.stdout.write(f"  {path.split('/')[-1]}: {found} rows, {saved} new, {dup} dup, dropped: {top or 'none'} ({time.time() - start:.0f}s)")
            if not options["dry_run"]:
                PYQCrawlLog.objects.create(source=f"jsonl:{path.split('/')[-1]}", status="success", questions_found=found, questions_new=saved, duration_seconds=round(time.time() - start, 2))
        self.stdout.write(self.style.SUCCESS(
            f"{'Would add' if options['dry_run'] else 'Added'} {total_new}. Total now: {ExamQuestion.objects.count()}"
        ))
