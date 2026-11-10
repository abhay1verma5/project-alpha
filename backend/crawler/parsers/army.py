import logging
from .base import BaseParser

logger = logging.getLogger(__name__)


class ArmyParser(BaseParser):
    name = "Indian Army"
    base_url = "https://joinindianarmy.nic.in"
    category = "defence"
    state = "all_india"

    def parse(self):
        jobs = []
        urls = [
            f"{self.base_url}/Default.aspx",
            "https://www.joinindiannavy.gov.in",
            "https://indianairforce.nic.in",
        ]

        orgs = [
            "Indian Army", "Indian Navy", "Indian Air Force",
        ]

        for url, org in zip(urls, orgs):
            html = self.fetch(url)
            if not html:
                continue

            soup = self.soup(html)
            links = soup.select("a")

            seen = set()
            for link in links:
                try:
                    title = self.clean_text(link.get_text())
                    if not title or len(title) < 10 or title in seen:
                        continue

                    keywords = [
                        "recruitment", "rally", "entry", "vacancy",
                        "notification", "agniveer", "officer", "airmen",
                        "sailor", "apply",
                    ]
                    if not any(k in title.lower() for k in keywords):
                        continue

                    seen.add(title)
                    href = link.get("href", "")
                    if href and not href.startswith("http"):
                        href = f"{url}/{href.lstrip('/')}"

                    jobs.append({
                        "title": title,
                        "organization": org,
                        "category": self.category,
                        "state": self.state,
                        "apply_link": href,
                        "source_url": url,
                    })
                except Exception as e:
                    logger.warning(f"[{org}] Error: {e}")
                    continue

        logger.info(f"[Defence] Found {len(jobs)} notifications")
        return jobs
