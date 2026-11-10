"""Re-categorize existing jobs using the improved keyword mapping."""

from django.core.management.base import BaseCommand
from jobs.models import Job
from crawler.parsers.aggregator import guess_category, guess_state


class Command(BaseCommand):
    help = "Re-categorize jobs using improved keyword mapping"

    def add_arguments(self, parser):
        parser.add_argument("--dry-run", action="store_true")
        parser.add_argument("--all", action="store_true", help="Re-categorize ALL jobs, not just 'other'")

    def handle(self, *args, **options):
        if options["all"]:
            jobs = Job.objects.all()
        else:
            jobs = Job.objects.filter(category="other")

        updated_cat = 0
        updated_state = 0
        changes = {}

        for job in jobs:
            new_cat = guess_category(job.title)
            new_state = guess_state(job.title)
            changed = False

            if new_cat != job.category and new_cat != "other":
                old = job.category
                job.category = new_cat
                changed = True
                key = f"{old} -> {new_cat}"
                changes[key] = changes.get(key, 0) + 1
                updated_cat += 1

            if new_state != job.state and new_state != "all_india" and job.state == "all_india":
                job.state = new_state
                updated_state += 1
                changed = True

            if changed and not options["dry_run"]:
                job.save(update_fields=["category", "state"])

        self.stdout.write(f"\nCategory changes: {updated_cat}")
        self.stdout.write(f"State changes: {updated_state}")
        for change, count in sorted(changes.items(), key=lambda x: -x[1]):
            self.stdout.write(f"  {change}: {count}")

        if options["dry_run"]:
            self.stdout.write("\n[DRY RUN] No changes saved.")
        else:
            self.stdout.write(self.style.SUCCESS(f"\n[OK] Updated {updated_cat + updated_state} jobs"))
