import logging
from .base import BaseParser

logger = logging.getLogger(__name__)

POLICE_SITES = [
    {"name": "UP Police", "url": "https://uppbpb.gov.in", "state": "uttar_pradesh"},
    {"name": "Bihar Police", "url": "https://csbc.bih.nic.in", "state": "bihar"},
    {"name": "MP Police", "url": "https://peb.mp.gov.in", "state": "madhya_pradesh"},
    {"name": "Rajasthan Police", "url": "https://police.rajasthan.gov.in", "state": "rajasthan"},
    {"name": "Delhi Police", "url": "https://delhipolice.gov.in", "state": "delhi"},
    {"name": "SSC CPO", "url": "https://ssc.gov.in", "state": "all_india"},
]


class PoliceParser(BaseParser):
    name = "Police"
    category = "police"

    def parse(self):
        jobs = []
        for site in POLICE_SITES:
            try:
                html = self.fetch(site["url"])
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
                        "constable", "si", "sub inspector", "recruitment",
                        "vacancy", "bharti", "police", "head constable",
                    ]
                    if not any(k in title.lower() for k in keywords):
                        continue

                    seen.add(title)
                    href = link.get("href", "")
                    if href and not href.startswith("http"):
                        href = f"{site['url']}/{href.lstrip('/')}"

                    jobs.append({
                        "title": f"{site['name']} - {title}",
                        "organization": site["name"],
                        "category": self.category,
                        "state": site["state"],
                        "apply_link": href,
                        "source_url": site["url"],
                    })
            except Exception as e:
                logger.warning(f"[{site['name']}] Error: {e}")
                continue

        logger.info(f"[Police] Found {len(jobs)} notifications")
        return jobs
