import logging
from .base import BaseParser

logger = logging.getLogger(__name__)


class RailwayParser(BaseParser):
    name = "Railway"
    base_url = "https://www.rrbcdg.gov.in"
    category = "railway"
    state = "all_india"

    def parse(self):
        jobs = []
        urls = [
            ("https://rrb.indianrailways.gov.in", "Railway Recruitment Board"),
            ("https://rrb.indianrailways.gov.in/chandigarh", "RRB Chandigarh"),
            ("https://rrb.indianrailways.gov.in/mumbai", "RRB Mumbai"),
            ("https://rrb.indianrailways.gov.in/kolkata", "RRB Kolkata"),
            ("https://rrb.indianrailways.gov.in/chennai", "RRB Chennai"),
            ("https://rrb.indianrailways.gov.in/allahabad", "RRB Allahabad"),
            ("https://rrcprygj.org", "RRC Prayagraj"),
        ]

        for url, org in urls:
            try:
                html = self.fetch(url, timeout=15)
                if not html:
                    continue

                soup = self.soup(html)
                links = (
                    soup.select("a[href*='.pdf']")
                    + soup.select("table a")
                    + soup.select(".content a, .notification a, .notice a")
                    + soup.select("marquee a")
                )

                seen = set()
                for link in links:
                    try:
                        title = self.clean_text(link.get_text())
                        if not title or len(title) < 10 or title in seen:
                            continue
                        seen.add(title)

                        href = link.get("href", "")
                        if href and not href.startswith("http"):
                            href = f"{url.rstrip('/')}/{href.lstrip('/')}"

                        keywords = [
                            "recruitment", "vacancy", "notification", "ntpc",
                            "group d", "alp", "technician", "je", "sse",
                            "result", "admit", "answer", "exam", "cen",
                            "rrb", "rrc", "rpf", "ministerial", "paramedical",
                        ]
                        if not any(k in title.lower() for k in keywords):
                            continue

                        jobs.append({
                            "title": title,
                            "organization": org,
                            "category": self.category,
                            "state": self.state,
                            "apply_link": href,
                            "source_url": url,
                        })
                    except Exception as e:
                        logger.warning(f"[Railway] Error: {e}")
                        continue
            except Exception as e:
                logger.warning(f"[Railway] Failed {url}: {e}")
                continue

        logger.info(f"[Railway] Found {len(jobs)} notifications")
        return jobs
