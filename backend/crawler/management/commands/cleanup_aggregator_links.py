"""One-time cleanup: remove aggregator URLs from apply_link in existing jobs."""
from django.core.management.base import BaseCommand
from django.db.models import Q
from jobs.models import Job


AGGREGATOR_DOMAINS = [
    "sarkariresult.com",
    "freejobalert.com",
    "sarkariexam.com",
    "rojgarresult.com",
]


class Command(BaseCommand):
    help = "Clear apply_link fields that point to aggregator sites instead of real gov links"

    def handle(self, *args, **options):
        q = Q()
        for domain in AGGREGATOR_DOMAINS:
            q |= Q(apply_link__icontains=domain)

        count = Job.objects.filter(q).update(apply_link=None)
        self.stdout.write(self.style.SUCCESS(f"Cleaned {count} jobs with aggregator apply_links"))
