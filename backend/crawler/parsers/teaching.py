import logging
from .base import BaseParser

logger = logging.getLogger(__name__)


class TeachingParser(BaseParser):
    name = "Teaching"
    base_url = "https://ctet.nic.in"
    category = "teaching"
    state = "all_india"

    def parse(self):
        jobs = []
        urls = [
            ("https://ctet.nic.in", "CTET", "all_india"),
            ("https://upbasiceduboard.gov.in", "UP TET", "uttar_pradesh"),
            ("https://bsebstet.com", "Bihar STET", "bihar"),
            ("http://www.kvs.gov.in", "Kendriya Vidyalaya Sangathan", "all_india"),
            ("https://navodaya.gov.in", "Navodaya Vidyalaya Samiti", "all_india"),
            ("https://dsssb.delhi.gov.in", "DSSSB Teaching", "delhi"),
        ]

        for url, org, state in urls:
            try:
                html = self.fetch(url)
                if not html:
                    continue

                soup = self.soup(html)
                links = soup.select("a")

                seen = set()
                for link in links:
                    title = self.clean_text(link.get_text())
                    if not title or len(title) < 10 or title in seen:
                        continue

                    keywords = [
                        "recruitment", "vacancy", "notification", "teacher",
                        "tet", "ctet", "prt", "tgt", "pgt", "apply",
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
                        "state": state,
                        "apply_link": href,
                        "source_url": url,
                    })
            except Exception as e:
                logger.warning(f"[{org}] Error: {e}")
                continue

        logger.info(f"[Teaching] Found {len(jobs)} notifications")
        return jobs
