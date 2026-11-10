"""Fill last_date from the official notification PDF.

Only jobs with a notification_pdf and no last_date are touched, and a date is
written only when the PDF text names it next to "last date" / "closing date".
Nothing is guessed.

Usage:
    python manage.py extract_pdf_dates             # preview
    python manage.py extract_pdf_dates --apply
    python manage.py extract_pdf_dates --limit 50
"""

import io
import re
from datetime import date, datetime

import requests
import urllib3
from django.core.management.base import BaseCommand

from jobs.models import ContentType, Job

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128 Safari/537.36"}

# "Last date for receipt of application: 27/02/2026", "Closing date ... 15.11.2026",
# "last date ... 30 November 2026", "last date ... 30th Nov, 2026"
LABEL = r"(?:last\s+date|closing\s+date|last\s+day)[^0-9]{0,120}?"
DATE_PATTERNS = [
    (re.compile(LABEL + r"(\d{1,2}[./-]\d{1,2}[./-]\d{4})", re.I | re.S), ("%d/%m/%Y", "%d.%m.%Y", "%d-%m-%Y")),
    (
        re.compile(
            LABEL + r"(\d{1,2})(?:st|nd|rd|th)?\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)[a-z]*\.?,?\s+(\d{4})",
            re.I | re.S,
        ),
        None,
    ),
]
MONTHS = {m: i for i, m in enumerate(["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], 1)}


def find_last_date(text):
    text = re.sub(r"\s+", " ", text)
    for pattern, formats in DATE_PATTERNS:
        m = pattern.search(text)
        if not m:
            continue
        if formats:
            raw = m.group(1).replace(".", "/").replace("-", "/")
            try:
                return datetime.strptime(raw, "%d/%m/%Y").date()
            except ValueError:
                continue
        day, mon, year = m.group(1), m.group(2)[:3].lower(), m.group(3)
        try:
            return date(int(year), MONTHS[mon], int(day))
        except (KeyError, ValueError):
            continue
    return None


def pdf_text(url, max_pages=8):
    from pypdf import PdfReader

    resp = requests.get(url, headers=HEADERS, timeout=40, verify=False)
    resp.raise_for_status()
    if "pdf" not in resp.headers.get("Content-Type", "").lower() and not resp.content[:5].startswith(b"%PDF"):
        return ""
    reader = PdfReader(io.BytesIO(resp.content))
    return "\n".join((page.extract_text() or "") for page in reader.pages[:max_pages])


class Command(BaseCommand):
    help = "Extract last_date from notification PDFs for jobs that have none"

    def add_arguments(self, parser):
        parser.add_argument("--apply", action="store_true", help="Write dates (default is preview)")
        parser.add_argument("--limit", type=int, default=100)

    def handle(self, *args, **options):
        qs = (
            Job.objects.filter(is_active=True, content_type=ContentType.JOB, last_date__isnull=True)
            .exclude(notification_pdf__isnull=True)
            .exclude(notification_pdf="")
            .order_by("-posted_date")[: options["limit"]]
        )
        found = failed = 0
        today = date.today()
        for job in qs:
            try:
                text = pdf_text(job.notification_pdf)
            except Exception as e:
                failed += 1
                self.stderr.write(f"  [skip] {job.slug[:60]}: {str(e)[:80]}")
                continue
            found_date = find_last_date(text) if text else None
            if not found_date:
                continue
            # A date more than 2 years off is a mis-parse (e.g. a date of birth rule).
            if abs((found_date - today).days) > 730:
                continue
            found += 1
            self.stdout.write(f"  {found_date}  {job.title[:70]}")
            if options["apply"]:
                job.last_date = found_date
                job.save(update_fields=["last_date", "updated_at"])

        mode = "Set" if options["apply"] else "Would set"
        self.stdout.write(self.style.SUCCESS(f"{mode} last_date on {found} jobs ({failed} PDFs unreadable)"))
