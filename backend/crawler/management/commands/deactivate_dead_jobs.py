"""Deactivate listings that are over.

Runs as its own workflow step after crawl_jobs: the crawl step is killed by its
15-minute timeout before crawl_jobs reaches its own expiry code, so that code
alone never ran. Only job / admission / admit card / answer key / notice /
exam date listings are touched (see crawler/staleness.py); results and syllabus
are never deactivated by title.
"""
from collections import Counter
from datetime import date

from django.core.management.base import BaseCommand

from crawler.staleness import is_dead
from jobs.models import Job


class Command(BaseCommand):
    help = "Deactivate expired and dead (past year/date in title) listings"

    def add_arguments(self, parser):
        parser.add_argument("--dry-run", action="store_true")

    def handle(self, *args, **options):
        today = date.today()
        expired = Job.objects.filter(
            is_active=True,
            last_date__lt=today,
            content_type__in=["job", "admission", "admit_card", "answer_key", "notice", "exam_date"],
        )
        dead = [
            (pk, ct)
            for pk, title, ct in Job.objects.filter(is_active=True).values_list("id", "title", "content_type")
            if is_dead(title, ct, today)
        ]
        by_type = Counter(ct for _, ct in dead)
        self.stdout.write(f"Expired by last_date: {expired.count()}")
        self.stdout.write(f"Dead by title: {len(dead)} {dict(by_type)}")
        if options["dry_run"]:
            self.stdout.write("[DRY RUN] nothing changed")
            return
        n1 = expired.update(is_active=False)
        n2 = Job.objects.filter(id__in=[pk for pk, _ in dead]).update(is_active=False)
        active = Job.objects.filter(is_active=True).count()
        self.stdout.write(self.style.SUCCESS(f"Deactivated {n1 + n2} listings. Active now: {active}"))
