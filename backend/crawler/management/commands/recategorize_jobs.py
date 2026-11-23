"""Re-categorize existing jobs using the improved keyword mapping.

Also fixes content_type based on title keywords (result, admit card, etc.)
and backfills missing qualification from title keywords."""

import re
from django.core.management.base import BaseCommand
from jobs.models import Job
from crawler.parsers.aggregator import guess_category, guess_state, guess_qualification


# Patterns to detect content_type from title
CONTENT_TYPE_PATTERNS = [
    (re.compile(r'\b(results?|merit\s*lists?|cut\s*offs?|score\s*cards?|final\s*results?|marks)\b', re.I), 'result'),
    (re.compile(r'\b(admit\s*cards?|hall\s*tickets?|call\s*letters?|e[\-\s]?admit)\b', re.I), 'admit_card'),
    (re.compile(r'\b(answer\s*keys?|response\s*sheets?|objections?|key\s*papers?|key\s*challenge|omr\s*(sheets?|images?))\b', re.I), 'answer_key'),
    (re.compile(r'\b(admission|counselling|counseling|seat\s*allotment)\b', re.I), 'admission'),
    (re.compile(r'\b(syllabus|exam\s*pattern|exam\s*scheme|scheme\s*(and|&)?\s*pattern|pattern\s+of\s+(the\s+)?exam(ination)?|scheme\s+of\s+(the\s+)?exam(ination)?)\b', re.I), 'syllabus'),
]


# A real vacancy. If the title says this, never downgrade it to notice/exam_date.
RECRUITMENT_RE = re.compile(
    r'\b(recruitment|vacanc(y|ies)|apply\s*online|applications?\s+(are\s+)?invited|'
    r'applications?\s+for\s+the\s+posts?|engagement\s+of|walk[\-\s]?in|posts?\s+of|'
    r'bharti|bharati|hiring|advt\.?\s*no)\b',
    re.I,
)

ONLINE_FORM_RE = re.compile(
    r'\b((on|off)line\s*(application\s*)?form|application\s*form|apply\s*(online|offline)|vacancy|vacancies)\b', re.I
)

# Checked only when the title has no recruitment signal.
UPDATE_PATTERNS = [
    (re.compile(r'\b(exam(ination)?\s*(date|schedule|calendar|time\s*-?\s*table|city)|'
                r'date\s+of\s+(exam|interview|test)|time\s*-?\s*table|date\s*sheet|'
                r'postpone(d|ment)?|re-?schedul(ed|e)|programme\s+of\s+(exam|interview))\b', re.I), 'exam_date'),
    (re.compile(r'\b(notice|corrigendum|addendum|regarding|exemption|interview|document\s*verification|'
                r'extension|extended|instructions?|press\s*(note|release)|circular|clarification|'
                r'cancel(l)?ed|cancellation|withdrawn|important\s+information)\b', re.I), 'notice'),
]


def guess_content_type(title):
    """Guess content_type from title keywords.

    Returns one of: result, admit_card, answer_key, admission, syllabus,
    exam_date, notice, job. Recruitment wording always wins over the
    notice/exam_date patterns, so "Walk-in interview for ..." stays a job.
    """
    for pattern, ct in CONTENT_TYPE_PATTERNS:
        if pattern.search(title):
            return ct
    if not RECRUITMENT_RE.search(title):
        for pattern, ct in UPDATE_PATTERNS:
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
            # Aggregator section pages mix types (an "admission" page lists online
            # forms and answer keys), so the page's type is often wrong. When the
            # title states the type explicitly, the title wins.
            elif job.content_type != "job" and new_ct != job.content_type:
                title_type = new_ct
                if new_ct == "job" and not (
                    RECRUITMENT_RE.search(job.title) or ONLINE_FORM_RE.search(job.title)
                ):
                    title_type = None  # title has no type signal; keep the page's type
                if title_type and job.content_type not in ("notice", "exam_date"):
                    job.content_type = title_type
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
