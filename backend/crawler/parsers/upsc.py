import logging
import re
from urllib.parse import unquote

from .base import BaseParser

logger = logging.getLogger(__name__)


class UPSCParser(BaseParser):
    """upsc.gov.in lists active exams as links under /examinations/<Exam Name>.

    Each exam page has a small key/value table (Date of Notification, Last Date
    for Receipt of Applications, ...) and the official notification PDF, so we
    fetch every active exam page to get real dates.
    """

    name = "UPSC"
    base_url = "https://www.upsc.gov.in"
    category = "upsc"
    state = "all_india"

    # upsc.gov.in was rebuilt (Nov 2026): the old /examinations/active-exams and
    # /examinations/forthcoming-exams pages now return 404.
    LIST_PAGES = [
        "/active-examinations/",
    ]
    EXAM_PREFIX = "/active-examinations/"
    # Section links on every page; not exams.
    SKIP_PATHS = {
        "/examinations/active-exams", "/examinations/forthcoming-exams",
        "/examinations/previous-question-papers", "/examinations/cutoff-marks--",
        "/examinations/answer-key", "/examinations/marks-recommended-candidates",
        "/examinations/marks-recommended-candidates-reserve-list",
        "/examinations/revised-syllabus-scheme", "/examinations/representation-question-papers",
    }

    def _exam_links(self):
        links = {}
        for page in self.LIST_PAGES:
            html = self.fetch(f"{self.base_url}{page}", timeout=20)
            if not html:
                continue
            for a in self.soup(html).select(f"a[href^='{self.EXAM_PREFIX}']"):
                href = a.get("href", "")
                if href.rstrip("/") == self.EXAM_PREFIX.rstrip("/") or href in self.SKIP_PATHS:
                    continue
                title = self.clean_text(a.get_text())
                # New cards prefix the exam name with the button text.
                title = re.sub(r"^\s*View Exam Details\s*", "", title, flags=re.I)
                # ...and append notice no. / dates; keep only the exam name.
                title = re.split(r"Examination Notice No|Date of Commencement|Last date", title, flags=re.I)[0].strip()
                if len(title) < 10:
                    continue
                links.setdefault(href, title)
        return links

    def _exam_details(self, href):
        """Return (last_date, notification_pdf, posted_date) from an exam page."""
        html = self.fetch(f"{self.base_url}{href}", timeout=20)
        if not html:
            return None, None, None
        soup = self.soup(html)

        fields = {}
        for row in soup.select("table tr"):
            cells = [self.clean_text(c.get_text(" ")) for c in row.find_all(["th", "td"])]
            if len(cells) >= 2:
                fields[cells[0].lower()] = cells[1]

        # New site: dates are plain text, e.g.
        # "Last date for submission of Application 6 Oct 2026, 06:00 PM ... Date of Upload 16 Sep 2026"
        text = self.clean_text(soup.get_text(" "))
        date_re = r"(\d{1,2}\s+[A-Za-z]{3,9}\s+\d{4}|\d{1,2}/\d{1,2}/\d{4})"
        m = re.search(r"last\s+date[^0-9]{0,60}" + date_re, text, re.I)
        if m:
            fields.setdefault("last date", m.group(1))
        m = re.search(r"date\s+of\s+upload[^0-9]{0,20}" + date_re, text, re.I)
        if m:
            fields.setdefault("date of upload", m.group(1))

        last_date = None
        for key, value in fields.items():
            if "last date" in key:
                # "27/02/2026 - 6:00pm" -> keep the date part only
                m = re.search(r"\d{1,2}/\d{1,2}/\d{4}|\d{1,2}\s+[A-Za-z]{3,9}\s+\d{4}", value)
                last_date = self.parse_date(m.group(0)) if m else None
                break

        posted = None
        for key in ("date of notification", "date of upload"):
            if key in fields:
                posted = self.parse_date(fields[key])
                if posted:
                    break

        pdf = None
        for a in soup.select("a[href$='.pdf']"):
            h = a.get("href", "")
            if "/sites/default/files/" in h and re.search(r"notif", h, re.I):
                pdf = h if h.startswith("http") else f"{self.base_url}{h}"
                break

        return last_date, pdf, posted

    def parse(self):
        jobs = []
        for href, title in self._exam_links().items():
            try:
                last_date, pdf, posted = self._exam_details(href)
                jobs.append({
                    "title": f"UPSC {unquote(title)}",
                    "organization": "Union Public Service Commission (UPSC)",
                    "category": self.category,
                    "state": self.state,
                    "apply_link": "https://upsconline.nic.in/",
                    "source_url": f"{self.base_url}{href}",
                    "last_date": last_date,
                    "posted_date": posted,
                    "notification_pdf": pdf,
                })
            except Exception as e:
                logger.warning(f"[UPSC] Failed {href}: {e}")
                continue

        logger.info(f"[UPSC] Found {len(jobs)} notifications")
        return jobs
