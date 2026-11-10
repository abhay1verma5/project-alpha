"""Relabel generic practice sets that were stored as real exam PYQs.

Nothing is deleted. Rows move to exam_type=general_gk (with a subject that
says what they are) so they stop appearing as "SSC CGL 2024" or "NEET 2024"
previous-year questions, but stay available as practice.

Patterns (matched on source_url):
    opentdb         -> General Knowledge   (Open Trivia DB)
    Chemistry101    -> Chemistry           (generic college chemistry set)
    IELTS           -> English             (IELTS grammar / vocabulary)
    NIMCET          -> Computer Science    (NIMCET entrance, not GATE CSE)

Usage:
    python manage.py remove_mislabelled_trivia            # preview
    python manage.py remove_mislabelled_trivia --apply    # relabel
"""

from django.core.management.base import BaseCommand
from django.db.models import Count

from pyq.models import ExamQuestion, ExamType

PATTERNS = [
    ("opentdb", "General Knowledge"),
    ("Chemistry101", "Chemistry"),
    ("IELTS", "English"),
    ("NIMCET", "Computer Science"),
]


class Command(BaseCommand):
    help = "Relabel generic practice questions from exam PYQs to general_gk (no deletion)"

    def add_arguments(self, parser):
        parser.add_argument("--apply", action="store_true", help="Actually relabel (default is preview)")

    def handle(self, *args, **options):
        total_changed = 0
        for pattern, subject in PATTERNS:
            qs = ExamQuestion.objects.filter(source_url__icontains=pattern).exclude(exam_type=ExamType.GENERAL_GK)
            count = qs.count()
            if not count:
                continue
            by_exam = qs.values("exam_type", "year").annotate(n=Count("id")).order_by("-n")
            self.stdout.write(f"{pattern}: {count} rows still labelled as exam PYQs")
            for row in by_exam:
                self.stdout.write(f"  {row['exam_type']} {row['year']}: {row['n']}")
            if options["apply"]:
                total_changed += qs.update(exam_type=ExamType.GENERAL_GK, subject=subject)

        if not options["apply"]:
            self.stdout.write(self.style.WARNING("Preview only. Re-run with --apply to relabel."))
            return
        self.stdout.write(self.style.SUCCESS(
            f"Relabelled {total_changed} rows to general_gk. Total questions unchanged: {ExamQuestion.objects.count()}"
        ))
