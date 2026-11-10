import logging
from .base import BaseParser

logger = logging.getLogger(__name__)

JUDICIARY_SOURCES = [
    {
        "name": "Supreme Court",
        "url": "https://www.sci.gov.in/recruitments/",
        "org": "Supreme Court of India",
        "state": "all_india",
    },
    {
        "name": "Allahabad HC",
        "url": "https://www.allahabadhighcourt.in/calendar/itemWiseList.jsp?group=7",
        "org": "Allahabad High Court",
        "state": "uttar_pradesh",
    },
    {
        "name": "Delhi HC",
        "url": "https://delhihighcourt.nic.in/web/job-openings",
        "org": "Delhi High Court",
        "state": "delhi",
    },
    {
        "name": "Calcutta HC",
        "url": "https://www.calcuttahighcourt.gov.in/Notices/recruiment-notice",
        "org": "Calcutta High Court",
        "state": "west_bengal",
    },
    {
        "name": "Karnataka HC",
        "url": "https://karnatakajudiciary.kar.nic.in/recruitmentNotifications.php",
        "org": "Karnataka High Court",
        "state": "karnataka",
    },
    {
        "name": "Patna HC",
        "url": "https://patnahighcourt.gov.in/recruitments",
        "org": "Patna High Court",
        "state": "bihar",
    },
]

JUDICIARY_KEYWORDS = [
    "recruitment", "vacancy", "notification", "clerk", "stenographer",
    "judge", "judicial", "peon", "process server", "court", "apply",
    "examination", "appointment", "post",
]


class JudiciaryParser(BaseParser):
    name = "Judiciary"
    base_url = "https://main.sci.gov.in"
    category = "other"
    state = "all_india"

    def parse(self):
        jobs = []
        seen_titles = set()

        for source in JUDICIARY_SOURCES:
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
                    if not any(kw in text_lower for kw in JUDICIARY_KEYWORDS):
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
                        "category": "other",
                        "state": source["state"],
                        "apply_link": href,
                        "source_url": source["url"],
                        "notification_pdf": href if href.endswith(".pdf") else None,
                    })
            except Exception as e:
                logger.warning(f"[Judiciary/{source['name']}] Error: {e}")
                continue

        logger.info(f"[Judiciary] Found {len(jobs)} jobs")
        return jobs
