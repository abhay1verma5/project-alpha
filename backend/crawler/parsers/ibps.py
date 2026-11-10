import logging
from .base import BaseParser

logger = logging.getLogger(__name__)


class IBPSParser(BaseParser):
    name = "IBPS"
    base_url = "https://www.ibps.in"
    category = "banking"
    state = "all_india"

    def parse(self):
        jobs = []
        html = self.fetch(self.base_url)
        if not html:
            return jobs

        soup = self.soup(html)
        links = soup.select("a")

        seen = set()
        for link in links:
            try:
                title = self.clean_text(link.get_text())
                if not title or len(title) < 10 or title in seen:
                    continue

                keywords = [
                    "clerk", "po", "so", "rrb", "recruitment",
                    "notification", "vacancies", "apply", "online",
                ]
                if not any(k in title.lower() for k in keywords):
                    continue

                seen.add(title)
                href = link.get("href", "")
                if href and not href.startswith("http"):
                    href = f"{self.base_url}/{href.lstrip('/')}"

                jobs.append({
                    "title": title,
                    "organization": "Institute of Banking Personnel Selection (IBPS)",
                    "category": self.category,
                    "state": self.state,
                    "apply_link": href,
                    "source_url": self.base_url,
                })
            except Exception as e:
                logger.warning(f"[IBPS] Error: {e}")
                continue

        logger.info(f"[IBPS] Found {len(jobs)} notifications")
        return jobs