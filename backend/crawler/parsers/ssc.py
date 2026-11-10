import json
import logging
import re
from datetime import date, timedelta

from .base import BaseParser

logger = logging.getLogger(__name__)


class SSCParser(BaseParser):
    """ssc.gov.in is an Angular app; the HTML pages are an empty shell.

    The data lives behind the JSON API the app itself calls:
      /api/admin/5.1/allExams                     -> every exam with its apply-form URL
      /api/admin/5.1/getAllCandiateAdvertisements -> selection-post phases with start/end dates
    """

    name = "SSC"
    base_url = "https://ssc.gov.in"
    category = "ssc"
    state = "all_india"

    # Only advertisements that closed within this window (or are open) are worth listing.
    MAX_AGE_DAYS = 120

    def get_headers(self):
        headers = super().get_headers()
        headers["Accept"] = "application/json"
        return headers

    def _get_json(self, path):
        text = self.fetch(f"{self.base_url}/api/{path}")
        if not text:
            return []
        try:
            payload = json.loads(text)
        except json.JSONDecodeError:
            logger.warning(f"[SSC] Non-JSON response from {path}")
            return []
        return payload.get("data") or []

    def parse(self):
        jobs = []
        seen = set()

        # 1. Exams: one row per exam name (the API repeats codes across years).
        #    Names carry a year ("..., 2024"); skip cycles older than last year.
        this_year = date.today().year
        for exam in self._get_json("admin/5.1/allExams"):
            title = self.clean_text(exam.get("examName", ""))
            if not title or len(title) < 10 or title in seen:
                continue
            years = [int(y) for y in re.findall(r"(20\d{2})", title)]
            if years and max(years) < this_year - 1:
                continue
            seen.add(title)
            nav = exam.get("navigationUrl") or ""
            jobs.append({
                "title": f"SSC {title}",
                "organization": "Staff Selection Commission (SSC)",
                "category": self.category,
                "state": self.state,
                "apply_link": f"{self.base_url}{nav}" if nav.startswith("/") else f"{self.base_url}/",
                "source_url": f"{self.base_url}/",
                "description": self.clean_text(exam.get("description", "")) or None,
            })

        # 2. Selection-post advertisements carry real start/end dates.
        cutoff = date.today() - timedelta(days=self.MAX_AGE_DAYS)
        for adv in self._get_json("admin/5.1/getAllCandiateAdvertisements"):
            title = self.clean_text(adv.get("advertisementName", ""))
            end_date = self.parse_date(adv.get("endDate", ""))
            if not title or title in seen:
                continue
            if end_date and end_date < cutoff:
                continue
            seen.add(title)
            jobs.append({
                "title": f"SSC {title}",
                "organization": "Staff Selection Commission (SSC)",
                "category": self.category,
                "state": self.state,
                "apply_link": f"{self.base_url}/",
                "source_url": f"{self.base_url}/",
                "last_date": end_date,
                "posted_date": self.parse_date(adv.get("startDate", "")),
            })

        logger.info(f"[SSC] Found {len(jobs)} notifications")
        return jobs
