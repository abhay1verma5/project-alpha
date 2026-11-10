import logging
from .base import BaseParser

logger = logging.getLogger(__name__)

HEALTH_SOURCES = [
    {
        "name": "AIIMS",
        "url": "https://www.aiims.edu/index.php/en/notices/recruitment/aiims-recruitment",
        "org": "All India Institute of Medical Sciences (AIIMS)",
        "state": "all_india",
    },
    {
        "name": "NTA NEET",
        "url": "https://neet.nta.nic.in/",
        "org": "National Testing Agency (NTA) — NEET",
        "state": "all_india",
    },
    {
        "name": "ESIC",
        "url": "https://www.esic.gov.in",
        "org": "Employees' State Insurance Corporation (ESIC)",
        "state": "all_india",
    },
    {
        "name": "NHM",
        "url": "https://nhm.gov.in/index4.php?lang=1&level=0&linkid=153&lid=172",
        "org": "National Health Mission (NHM)",
        "state": "all_india",
    },
    {
        "name": "BECIL",
        "url": "https://www.becil.com/vacancies.aspx",
        "org": "Broadcast Engineering Consultants India Limited (BECIL)",
        "state": "all_india",
    },
    {
        "name": "JIPMER",
        "url": "https://jipmer.edu.in/careers",
        "org": "JIPMER Puducherry",
        "state": "all_india",
    },
]

HEALTH_KEYWORDS = [
    "recruitment", "vacancy", "notification", "walk-in", "interview",
    "doctor", "nurse", "pharmacist", "staff", "neet", "medical",
    "paramedical", "lab technician", "health", "hospital", "apply",
]


class HealthParser(BaseParser):
    name = "Health"
    base_url = "https://www.aiims.edu"
    category = "health"
    state = "all_india"

    def parse(self):
        jobs = []
        seen_titles = set()

        for source in HEALTH_SOURCES:
            try:
                html = self.fetch(source["url"])
                if not html:
                    continue

                soup = self.soup(html)
                for link in soup.find_all("a", href=True):
                    text = self.clean_text(link.get_text())
                    if not text or len(text) < 10:
                        continue

                    text_lower = text.lower()
                    if not any(kw in text_lower for kw in HEALTH_KEYWORDS):
                        continue
                    if not self.is_notice_title(text):
                        continue  # menu items like 'Recruitment', 'Judges Roster'

                    if text in seen_titles:
                        continue
                    seen_titles.add(text)

                    href = link["href"]
                    if href and not href.startswith("http"):
                        href = f"{source['url'].rsplit('/', 1)[0]}/{href}"

                    jobs.append({
                        "title": text,
                        "organization": source["org"],
                        "category": self.category,
                        "state": source["state"],
                        "apply_link": href,
                        "source_url": source["url"],
                        "notification_pdf": href if href.endswith(".pdf") else None,
                    })
            except Exception as e:
                logger.warning(f"[Health/{source['name']}] Error: {e}")
                continue

        logger.info(f"[Health] Found {len(jobs)} jobs")
        return jobs
