"""Import questions from a local JSON file into the PYQ database.

Usage:
    python manage.py import_bulk_json /path/to/questions.json
    python manage.py import_bulk_json /path/to/questions.json --dry-run

JSON format: array of objects with these fields:
    exam_type, year, subject, question_text, options (array of 4),
    correct_answer (0-3), explanation, difficulty, language (default "en")
"""

import json

from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError

from pyq.models import ExamQuestion, ExamType


class Command(BaseCommand):
    help = "Import PYQ questions from a local JSON file"

    def add_arguments(self, parser):
        parser.add_argument("file", type=str, help="Path to JSON file")
        parser.add_argument("--dry-run", action="store_true")

    def handle(self, *args, **options):
        path = options["file"]
        dry_run = options["dry_run"]
        valid_exams = {c[0] for c in ExamType.choices}

        with open(path) as f:
            questions = json.load(f)

        if not isinstance(questions, list):
            self.stderr.write(self.style.ERROR("JSON must be an array"))
            return

        saved = 0
        skipped = 0
        errors = 0

        for q in questions:
            exam = q.get("exam_type", "")
            if exam not in valid_exams:
                errors += 1
                continue

            opts = q.get("options", [])
            if len(opts) != 4:
                errors += 1
                continue

            q_text = q.get("question_text", "").strip()
            if not q_text:
                errors += 1
                continue

            correct = q.get("correct_answer", 0)
            if not isinstance(correct, int) or correct < 0 or correct > 3:
                correct = 0

            if dry_run:
                saved += 1
                continue

            try:
                ExamQuestion.objects.create(
                    exam_type=exam,
                    year=q.get("year", 2024),
                    subject=q.get("subject", "General"),
                    question_text=q_text,
                    options=opts,
                    correct_answer=correct,
                    explanation=q.get("explanation", ""),
                    difficulty=q.get("difficulty", "medium"),
                    source="ai_generated",
                    language=q.get("language", "en"),
                )
                saved += 1
            except IntegrityError:
                skipped += 1

        self.stdout.write(self.style.SUCCESS(
            f"Done: {saved} saved, {skipped} duplicates, {errors} invalid"
        ))
