import logging
from .base import BaseParser

logger = logging.getLogger(__name__)

STATE_PSC_SITES = [
    {"name": "UPPSC", "url": "https://uppsc.up.nic.in", "state": "uttar_pradesh"},
    {"name": "BPSC", "url": "https://www.bpsc.bih.nic.in", "state": "bihar"},
    {"name": "MPPSC", "url": "https://www.mppsc.mp.gov.in", "state": "madhya_pradesh"},
    {"name": "RPSC", "url": "https://rpsc.rajasthan.gov.in", "state": "rajasthan"},
    {"name": "UKPSC", "url": "https://www.ukpsc.gov.in", "state": "uttarakhand"},
    {"name": "HPPSC", "url": "https://www.hppsc.hp.gov.in", "state": "himachal_pradesh"},
    {"name": "JPSC", "url": "https://www.jpsc.gov.in", "state": "jharkhand"},
    {"name": "CGPSC", "url": "https://www.psc.cg.gov.in", "state": "chhattisgarh"},
    {"name": "WBPSC", "url": "https://www.pscwbonline.gov.in", "state": "west_bengal"},
    {"name": "KPSC", "url": "https://www.keralapsc.gov.in", "state": "kerala"},
    {"name": "TNPSC", "url": "https://www.tnpsc.gov.in", "state": "tamil_nadu"},
    {"name": "TSPSC", "url": "https://www.tspsc.gov.in", "state": "telangana"},
    {"name": "APPSC", "url": "https://psc.ap.gov.in", "state": "andhra_pradesh"},
    {"name": "GPSC", "url": "https://gpsc.gujarat.gov.in", "state": "gujarat"},
    {"name": "MPSC", "url": "https://www.mpsc.gov.in", "state": "maharashtra"},
    {"name": "PPSC", "url": "https://www.ppsc.gov.in", "state": "punjab"},
    {"name": "HPSC", "url": "https://www.hpsc.gov.in", "state": "haryana"},
    {"name": "OPSC", "url": "https://www.opsc.gov.in", "state": "odisha"},
]


class StatePSCParser(BaseParser):
    name = "State PSC"
    category = "state_psc"

    def parse(self):
        jobs = []
        for psc in STATE_PSC_SITES:
            try:
                html = self.fetch(psc["url"])
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
                        "recruitment", "vacancy", "notification", "advertisement",
                        "exam", "apply", "bharti",
                    ]
                    if not any(k in title.lower() for k in keywords):
                        continue

                    seen.add(title)
                    href = link.get("href", "")
                    if href and not href.startswith("http"):
                        href = f"{psc['url']}/{href.lstrip('/')}"

                    jobs.append({
                        "title": f"{psc['name']} - {title}",
                        "organization": f"{psc['name']} ({psc['state'].replace('_', ' ').title()})",
                        "category": self.category,
                        "state": psc["state"],
                        "apply_link": href,
                        "source_url": psc["url"],
                    })
            except Exception as e:
                logger.warning(f"[{psc['name']}] Error: {e}")
                continue

        logger.info(f"[State PSC] Found {len(jobs)} notifications across {len(STATE_PSC_SITES)} states")
        return jobs
