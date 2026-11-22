"""Delete placeholder 'questions' that have no actual question in them.

An old seeding run stored rows like
  "GATE ECE - Analog Practice Q#52: Solve the following Analog problem from 2023 exam."
with random options from other subjects (e.g. genetics ratios on a DBMS question).
1,104 such AI-generated rows existed on 2026-11-22. Idempotent.
"""
import re

from django.core.management.base import BaseCommand

from pyq.models import ExamQuestion

PLACEHOLDER = re.compile(r"Practice Q#\d+:\s*Solve the following .+ problem from \d{4} exam\.?\s*$", re.I)


class Command(BaseCommand):
    help = "Delete AI-generated placeholder questions with no real question text"

    def add_arguments(self, parser):
        parser.add_argument("--dry-run", action="store_true")

    def handle(self, *args, **opts):
        qs = ExamQuestion.objects.filter(source="ai_generated", question_text__contains="Practice Q#")
        ids = [pk for pk, text in qs.values_list("id", "question_text") if PLACEHOLDER.search(text)]
        self.stdout.write(f"Placeholder questions found: {len(ids)}")
        if opts["dry_run"] or not ids:
            return
        deleted = 0
        for i in range(0, len(ids), 500):
            deleted += ExamQuestion.objects.filter(id__in=ids[i : i + 500]).delete()[0]
        self.stdout.write(self.style.SUCCESS(f"Deleted {deleted} placeholder questions"))
