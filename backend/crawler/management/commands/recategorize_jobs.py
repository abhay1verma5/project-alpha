"""Re-categorize existing jobs using the improved keyword mapping.

Also fixes content_type based on title keywords (result, admit card, etc.)
and backfills missing qualification from title keywords."""

import re
from django.core.management.base import BaseCommand
from jobs.models import Job
from crawler.parsers.aggregator import guess_category, guess_state, guess_qualification


# Patterns to detect content_type from title
CONTENT_TYPE_PATTERNS = [
    (re.compile(r'\b(result|merit\s*list|cut\s*off|score\s*card|final\s*result|marks)\b', re.I), 'result'),
    (re.compile(r'\b(admit\s*card|hall\s*ticket|call\s*letter|e[\-\s]?admit)\b', re.I), 'admit_card'),
    (re.compile(r'\b(answer\s*key|response\s*sheet|objection|key\s*paper)\b', re.I), 'answer_key'),
    (re.compile(r'\b(admission|counselling|counseling|seat\s*allotment)\b', re.I), 'admission'),
    (re.compile(r'\b(syllabus|exam\s*pattern|exam\s*scheme)\b', re.I), 'syllabus'),
]


def guess_content_type(title):
    """Guess content_type from title keywords."""
    for pattern, ct in CONTENT_TYPE_PATTERNS:
        if pattern.search(title):
            return ct
    return 'job'


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
        updated_ct = 0
        updated_qual = 0
        changes = {}

        for job in jobs:
            new_cat = guess_category(job.title)
            new_state = guess_state(job.title)
            new_ct = guess_content_type(job.title)
            new_qual = guess_qualification(job.title)
            changed = False
            fields = []

            if new_cat != job.category and new_cat != "other":
                old = job.category
                job.category = new_cat
                changed = True
                fields.append("category")
                key = f"{old} -> {new_cat}"
                changes[key] = changes.get(key, 0) + 1
                updated_cat += 1

            if new_state != job.state and new_state != "all_india" and job.state == "all_india":
                job.state = new_state
                updated_state += 1
                changed = True
                fields.append("state")

            # Fix content_type if title clearly indicates non-job type
            if new_ct != "job" and job.content_type == "job":
                job.content_type = new_ct
                updated_ct += 1
                changed = True
                fields.append("content_type")

            # Backfill missing qualification from title
            if new_qual and not job.qualification:
                job.qualification = new_qual
                updated_qual += 1
                changed = True
                fields.append("qualification")

            if changed and not options["dry_run"]:
                job.save(update_fields=fields)

        self.stdout.write(f"\nCategory changes: {updated_cat}")
        self.stdout.write(f"State changes: {updated_state}")
        self.stdout.write(f"Content type fixes: {updated_ct}")
        self.stdout.write(f"Qualification fills: {updated_qual}")
        for change, count in sorted(changes.items(), key=lambda x: -x[1]):
            self.stdout.write(f"  {change}: {count}")

        if options["dry_run"]:
            self.stdout.write("\n[DRY RUN] No changes saved.")
        else:
            self.stdout.write(self.style.SUCCESS(f"\n[OK] Updated {updated_cat + updated_state + updated_ct + updated_qual} fields across jobs"))
