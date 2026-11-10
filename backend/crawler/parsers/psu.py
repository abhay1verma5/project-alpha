import logging
from .base import BaseParser

logger = logging.getLogger(__name__)

PSU_SOURCES = [
    {
        "name": "SBI",
        "url": "https://bank.sbi/web/careers/current-openings",
        "org": "State Bank of India (SBI)",
        "category": "banking",
    },
    {
        "name": "RBI",
        "url": "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx",
        "org": "Reserve Bank of India (RBI)",
        "category": "banking",
    },
    {
        "name": "LIC",
        "url": "https://licindia.in/web/guest/careers",
        "org": "Life Insurance Corporation of India (LIC)",
        "category": "banking",
    },
    {
        "name": "FCI",
        "url": "https://fci.gov.in/recruitment.php",
        "org": "Food Corporation of India (FCI)",
        "category": "other",
    },
    {
        "name": "SAIL",
        "url": "https://sailcareers.com/",
        "org": "Steel Authority of India Limited (SAIL)",
        "category": "engineering",
    },
    {
        "name": "GAIL",
        "url": "https://gailonline.com/career",
        "org": "GAIL (India) Limited",
        "category": "engineering",
    },
    {
        "name": "Coal India",
        "url": "https://www.coalindia.in/career-cil/jobs-coal-india/",
        "org": "Coal India Limited (CIL)",
        "category": "engineering",
    },
    {
        "name": "BSNL",
        "url": "https://www.bsnl.co.in/opencms/bsnl/BSNL/services/careers/",
        "org": "Bharat Sanchar Nigam Limited (BSNL)",
        "category": "engineering",
    },
    {
        "name": "India Post",
        "url": "https://www.indiapost.gov.in/vacancies",
        "org": "India Post",
        "category": "other",
    },
    {
        "name": "EPFO",
        "url": "https://www.epfindia.gov.in/site_en/index.php",
        "org": "Employees' Provident Fund Organisation (EPFO)",
        "category": "other",
    },
]

PSU_KEYWORDS = [
    "recruitment", "vacancy", "notification", "apply", "online",
    "officer", "assistant", "clerk", "manager", "trainee", "apprentice",
    "engineer", "specialist", "consultant", "walk-in", "exam",
]


class PSUParser(BaseParser):
    name = "PSU"
    base_url = "https://www.sbi.co.in"
    category = "other"
    state = "all_india"

    def parse(self):
        jobs = []
        seen_titles = set()

        for source in PSU_SOURCES:
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
                    if not any(kw in text_lower for kw in PSU_KEYWORDS):
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
                        "category": source.get("category", "other"),
                        "state": "all_india",
                        "apply_link": href,
                        "source_url": source["url"],
                        "notification_pdf": href if href.endswith(".pdf") else None,
                    })
            except Exception as e:
                logger.warning(f"[PSU/{source['name']}] Error: {e}")
                continue

        logger.info(f"[PSU] Found {len(jobs)} jobs")
        return jobs
