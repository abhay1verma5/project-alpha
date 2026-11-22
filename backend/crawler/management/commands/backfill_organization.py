"""Fill empty Job.organization from the title.

Uses the same extract_organization() the aggregator parsers use. Only rows with an empty
organization are touched, so re-running is safe (idempotent)."""

from django.core.management.base import BaseCommand
from django.db import models, transaction

from crawler.parsers.base import extract_organization
from jobs.models import Job


BATCH_SIZE = 500


class Command(BaseCommand):
    help = "Fill empty organization on existing jobs from their title."

    def add_arguments(self, parser):
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Count and show what would be filled without saving.",
        )

    def handle(self, *args, **options):
        dry_run = options["dry_run"]
        empty_jobs = list(
            Job.objects.filter(
                models.Q(organization="") | models.Q(organization__isnull=True)
            )
            .order_by("id")
            .only("id", "title", "organization")
        )
        max_length = Job._meta.get_field("organization").max_length

        filled = 0
        unmatched = 0
        pending = []
        for job in empty_jobs:
            organization = extract_organization(job.title)
            if not organization:
                unmatched += 1
                continue
            job.organization = organization[:max_length]
            pending.append(job)
            filled += 1
            if dry_run and filled <= 20:
                self.stdout.write(f"  [{job.id}] {job.title[:80]} -> {job.organization}")
            if not dry_run and len(pending) >= BATCH_SIZE:
                self._save(pending)
                pending = []

        if not dry_run and pending:
            self._save(pending)

        verb = "Would fill" if dry_run else "Filled"
        self.stdout.write(
            self.style.SUCCESS(
                f"{verb} organization for {filled} jobs; {unmatched} had no clear organization."
            )
        )

    @staticmethod
    def _save(jobs):
        with transaction.atomic():
            Job.objects.bulk_update(jobs, ["organization"], batch_size=BATCH_SIZE)
