"""Backfill Hindi titles for all jobs that have title_hi as None or empty."""
from django.core.management.base import BaseCommand
from django.db.models import Q
from jobs.models import Job


class Command(BaseCommand):
    help = "Backfill Hindi translations for existing job titles"

    def handle(self, *args, **options):
        jobs = Job.objects.filter(
            Q(title_hi__isnull=True) | Q(title_hi='') | Q(title_hi='None')
        )
        total = jobs.count()
        self.stdout.write(f"Found {total} jobs needing Hindi titles...")

        updated = 0
        for job in jobs.iterator(chunk_size=500):
            job.title_hi = Job._translate_to_hindi(job.title)
            job.save(update_fields=['title_hi'])
            updated += 1
            if updated % 100 == 0:
                self.stdout.write(f"  Updated {updated}/{total}...")

        self.stdout.write(self.style.SUCCESS(f"Done! Updated {updated} jobs with Hindi titles."))
