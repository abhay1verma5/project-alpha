import logging
from .base import BaseParser

logger = logging.getLogger(__name__)

ENGINEERING_SOURCES = [
    {
        "name": "NTA JEE",
        "url": "https://jeemain.nta.nic.in/",
        "org": "National Testing Agency (NTA) — JEE Main",
        "state": "all_india",
    },
    {
        "name": "GATE",
        "url": "https://gate2026.iisc.ac.in/",
        "org": "GATE — Graduate Aptitude Test in Engineering",
        "state": "all_india",
    },
    {
        "name": "DRDO",
        "url": "https://www.drdo.gov.in/drdo/en/offerings/vacancies",
        "org": "Defence Research and Development Organisation (DRDO)",
        "state": "all_india",
    },
    {
        "name": "ISRO",
        "url": "https://www.isro.gov.in/Careers.html",
        "org": "Indian Space Research Organisation (ISRO)",
        "state": "all_india",
    },
    {
        "name": "BEL",
        "url": "https://bel-india.in/job-notifications/",
        "org": "Bharat Electronics Limited (BEL)",
        "state": "all_india",
    },
    {
        "name": "HAL",
        "url": "https://hal-india.co.in/careers",
        "org": "Hindustan Aeronautics Limited (HAL)",
        "state": "all_india",
    },
    {
        "name": "BHEL",
        "url": "https://careers.bhel.in/index.jsp",
        "org": "Bharat Heavy Electricals Limited (BHEL)",
        "state": "all_india",
    },
    {
        "name": "ONGC",
        "url": "https://www.ongcindia.com/web/guest/careers",
        "org": "Oil and Natural Gas Corporation (ONGC)",
        "state": "all_india",
    },
    {
        "name": "NTPC",
        "url": "https://www.ntpc.co.in/en/careers",
        "org": "NTPC Limited",
        "state": "all_india",
    },
    {
        "name": "IOCL",
        "url": "https://iocl.com/pages/career-with-iocl",
        "org": "Indian Oil Corporation Limited (IOCL)",
        "state": "all_india",
    },
    {
        "name": "NPCIL",
        "url": "https://npcilcareers.co.in/",
        "org": "Nuclear Power Corporation of India (NPCIL)",
        "state": "all_india",
    },
]

ENGINEERING_KEYWORDS = [
    "recruitment", "vacancy", "notification", "engineer", "technician",
    "scientist", "trainee", "apprentice", "gate", "jee", "apply",
    "executive", "officer", "graduate", "diploma", "walk-in",
]


class EngineeringParser(BaseParser):
    name = "Engineering"
    base_url = "https://www.drdo.gov.in"
    category = "engineering"
    state = "all_india"

    def parse(self):
        jobs = []
        seen_titles = set()

        for source in ENGINEERING_SOURCES:
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
                    if not any(kw in text_lower for kw in ENGINEERING_KEYWORDS):
                        continue
                    if not self.is_notice_title(text):
                        continue  # menu items like 'Recruitment', 'Judges Roster'

                    if text in seen_titles:
                        continue
                    seen_titles.add(text)

                    href = link["href"]
                    if href and not href.startswith("http"):
                        base = source["url"].rsplit("/", 1)[0]
                        href = f"{base}/{href}"

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
                logger.warning(f"[Engineering/{source['name']}] Error: {e}")
                continue

        logger.info(f"[Engineering] Found {len(jobs)} jobs")
        return jobs
