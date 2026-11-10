import logging
import json
from .base import BaseParser

logger = logging.getLogger(__name__)


class NCSParser(BaseParser):
    name = "NCS"
    base_url = "https://www.ncs.gov.in"
    category = "other"
    state = "all_india"

    def parse(self):
        jobs = []
        api_url = f"{self.base_url}/api/govt-jobs"
        html = self.fetch(api_url)
        if not html:
            html = self.fetch(f"{self.base_url}/content/government-jobs")

        if not html:
            return jobs

        try:
            data = json.loads(html)
            for item in data.get("data", data) if isinstance(data, dict) else data:
                jobs.append({
                    "title": item.get("title", ""),
                    "organization": item.get("organization", "National Career Service"),
                    "category": "other",
                    "state": item.get("state", "all_india"),
                    "vacancies": item.get("vacancies"),
                    "last_date": self.parse_date(item.get("last_date")),
                    "apply_link": item.get("apply_url", self.base_url),
                    "source_url": self.base_url,
                })
        except (json.JSONDecodeError, TypeError):
            soup = self.soup(html)
            for card in soup.select(".job-card, .views-row, table tr"):
                link = card.find("a")
                if not link:
                    continue
                title = self.clean_text(link.get_text())
                if title and len(title) > 5:
                    href = link.get("href", "")
                    if href and not href.startswith("http"):
                        href = f"{self.base_url}{href}"
                    jobs.append({
                        "title": title,
                        "organization": "National Career Service (NCS)",
                        "category": "other",
                        "state": "all_india",
                        "apply_link": href,
                        "source_url": self.base_url,
                    })

        logger.info(f"[NCS] Found {len(jobs)} jobs")
        return jobs
