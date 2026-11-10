import logging
import re
import time
from .base import BaseParser

logger = logging.getLogger(__name__)

# Ordered: more specific keywords FIRST to avoid wrong matches
# IMPORTANT: Police/Defence MUST come before Banking because:
#   - "public" contains "lic " (false LIC match)
#   - police job titles often contain "clerk" (false banking match)
CATEGORY_MAP_ORDERED = [
    # University / Admission (must come before generic matches)
    ("admission", "university"),
    ("university", "university"),
    ("college", "university"),
    ("nta ", "university"),
    ("cuet", "university"),
    ("cat 20", "university"),
    ("iim ", "university"),
    ("iit ", "university"),
    ("nit ", "university"),
    ("jee main", "university"),
    ("jee advanced", "university"),
    ("neet ug", "university"),
    ("ugc net", "teaching"),
    ("ph.d", "university"),
    ("b.tech", "university"),
    ("m.tech", "university"),
    ("mba ", "university"),
    ("mca ", "university"),
    ("b.sc", "university"),
    ("m.sc", "university"),
    ("b.ed", "teaching"),
    ("d.el.ed", "teaching"),
    ("entrance exam", "university"),
    ("entrance test", "university"),
    ("scholarship", "university"),

    # State PSC (before generic "psc")
    ("uppsc", "state_psc"),
    ("bpsc", "state_psc"),
    ("rpsc", "state_psc"),
    ("mppsc", "state_psc"),
    ("hpsc", "state_psc"),
    ("wbpsc", "state_psc"),
    ("jpsc", "state_psc"),
    ("ukpsc", "state_psc"),
    ("cgpsc", "state_psc"),
    ("appsc", "state_psc"),
    ("tspsc", "state_psc"),
    ("opsc", "state_psc"),
    ("kpsc", "state_psc"),
    ("tnpsc", "state_psc"),
    ("gpsc", "state_psc"),
    ("mpsc", "state_psc"),
    ("ppsc", "state_psc"),
    ("hppsc", "state_psc"),

    # SSC — before UPSC so "ssc " matches before "upsc" substring issues
    ("upsssc", "ssc"),
    ("ssc ", "ssc"),
    ("ssc-", "ssc"),
    ("staff selection", "ssc"),

    # UPSC — MUST come before generic "psc" (since "upsc" contains "psc")
    ("upsc", "upsc"),
    ("union public service", "upsc"),
    ("ias ", "upsc"),
    ("ips ", "upsc"),
    ("ifs ", "upsc"),
    ("ese ", "upsc"),
    ("epfo", "upsc"),
    ("capf", "upsc"),

    # Generic PSC (after all specific PSC/UPSC keywords)
    ("psc", "state_psc"),

    # Police & Paramilitary — BEFORE banking (police titles contain "clerk", "public" has "lic ")
    ("police", "police"),
    ("constable", "police"),
    ("sub inspector", "police"),
    ("si recruitment", "police"),
    ("head constable", "police"),
    ("asi ", "police"),
    ("bsf ", "police"),
    ("crpf", "police"),
    ("cisf", "police"),
    ("itbp", "police"),
    ("ssb ", "police"),

    # Defence — BEFORE banking
    ("coast guard", "defence"),
    ("assam rifles", "defence"),
    ("indian army", "defence"),
    ("indian navy", "defence"),
    ("indian air force", "defence"),
    ("agniveer", "defence"),
    ("nda ", "defence"),
    ("cds ", "defence"),
    ("afcat", "defence"),
    ("defence", "defence"),
    ("army ", "defence"),
    ("navy ", "defence"),
    ("air force", "defence"),
    ("military", "defence"),

    # Railway
    ("railway", "railway"),
    ("rrb ", "railway"),
    ("rrb-", "railway"),
    ("rrc ", "railway"),
    ("ntpc", "railway"),
    ("group d", "railway"),
    ("alp ", "railway"),
    ("rpf ", "railway"),

    # ECCE Educator is a gramin/rural position — must match before generic "educator"
    ("ecce", "gramin"),

    # Teaching — BEFORE banking (some teaching titles have "clerk")
    ("teaching post", "teaching"),
    ("teaching", "teaching"),
    ("teacher", "teaching"),
    ("educator", "teaching"),
    ("ctet", "teaching"),
    ("kvs ", "teaching"),
    ("tet ", "teaching"),
    ("stet", "teaching"),
    ("super tet", "teaching"),
    ("nvs ", "teaching"),
    ("navodaya", "teaching"),
    ("kendriya vidyalaya", "teaching"),
    ("lecturer", "teaching"),
    ("professor", "teaching"),
    ("tgt ", "teaching"),
    ("pgt ", "teaching"),
    ("prt ", "teaching"),

    # Banking & Insurance — "lic " fixed to avoid "public" false match
    ("ibps", "banking"),
    ("sbi ", "banking"),
    ("sbi-", "banking"),
    ("rbi ", "banking"),
    ("nabard", "banking"),
    ("lic aao", "banking"),
    ("lic ado", "banking"),
    ("lic hfl", "banking"),
    ("lic assistant", "banking"),
    ("lic recruitment", "banking"),
    ("niacl", "banking"),
    ("nicl", "banking"),
    ("uiic", "banking"),
    ("oicl", "banking"),
    ("gic ", "banking"),
    ("bank ", "banking"),
    ("banking", "banking"),
    ("bank clerk", "banking"),
    ("bank po", "banking"),
    ("probationary officer", "banking"),

    # Health & Medical
    ("aiims", "health"),
    ("nurse", "health"),
    ("nursing", "health"),
    ("gnm ", "health"),
    ("anm ", "health"),
    ("pharmacist", "health"),
    ("paramedical", "health"),
    ("neet pg", "health"),
    ("medical officer", "health"),
    ("staff nurse", "health"),
    ("health ", "health"),
    ("hospital", "health"),

    # Engineering & PSU
    ("isro", "engineering"),
    ("drdo", "engineering"),
    ("bhel", "engineering"),
    ("ongc", "engineering"),
    ("iocl", "engineering"),
    ("hal ", "engineering"),
    ("bel ", "engineering"),
    ("sail ", "engineering"),
    ("gail", "engineering"),
    ("ntpc ", "engineering"),
    ("gate ", "engineering"),
    ("junior engineer", "engineering"),
    ("engineer", "engineering"),

    # Rural / Gram
    ("anganwadi", "gramin"),
    ("gram ", "gramin"),
    ("panchayat", "gramin"),
    ("gramin", "gramin"),
    ("nrhm", "gramin"),
    ("asha ", "gramin"),
    ("safai", "gramin"),
]


def guess_category(title):
    title_lower = title.lower()
    for keyword, cat in CATEGORY_MAP_ORDERED:
        if keyword in title_lower:
            return cat
    return "other"


STATE_MAP = {
    "uttar pradesh": "uttar_pradesh",
    "up ": "uttar_pradesh",
    "bihar": "bihar",
    "madhya pradesh": "madhya_pradesh",
    "mp ": "madhya_pradesh",
    "rajasthan": "rajasthan",
    "maharashtra": "maharashtra",
    "tamil nadu": "tamil_nadu",
    "karnataka": "karnataka",
    "kerala": "kerala",
    "west bengal": "west_bengal",
    "gujarat": "gujarat",
    "andhra pradesh": "andhra_pradesh",
    "telangana": "telangana",
    "odisha": "odisha",
    "punjab": "punjab",
    "haryana": "haryana",
    "jharkhand": "jharkhand",
    "uttarakhand": "uttarakhand",
    "himachal pradesh": "himachal_pradesh",
    "himachal": "himachal_pradesh",
    "chhattisgarh": "chhattisgarh",
    "delhi": "delhi",
    "assam": "assam",
    "goa": "goa",
    "manipur": "manipur",
    "meghalaya": "meghalaya",
    "mizoram": "mizoram",
    "nagaland": "nagaland",
    "sikkim": "sikkim",
    "tripura": "tripura",
    "arunachal": "arunachal_pradesh",
    "jammu": "jammu_kashmir",
    "kashmir": "jammu_kashmir",
    "ladakh": "ladakh",
    "chandigarh": "chandigarh",
    "puducherry": "puducherry",
    "pondicherry": "puducherry",
}


def guess_state(title):
    title_lower = title.lower()
    for name, code in STATE_MAP.items():
        if name in title_lower:
            return code
    return "all_india"


QUALIFICATION_MAP = [
    # Post-graduation
    ("ph.d", "PhD"),
    ("m.tech", "M.Tech"),
    ("m.e.", "M.E."),
    ("m.sc", "M.Sc"),
    ("mba", "MBA"),
    ("mca", "MCA"),
    ("m.a.", "M.A."),
    ("m.com", "M.Com"),
    ("post graduate", "Post Graduate"),
    ("pg ", "Post Graduate"),
    # Graduation
    ("b.tech", "B.Tech"),
    ("b.e.", "B.E."),
    ("b.sc", "B.Sc"),
    ("b.com", "B.Com"),
    ("b.a.", "B.A."),
    ("bba", "BBA"),
    ("bca", "BCA"),
    ("b.ed", "B.Ed"),
    ("llb", "LLB"),
    ("mbbs", "MBBS"),
    ("bds", "BDS"),
    ("b.pharma", "B.Pharma"),
    ("b.pharm", "B.Pharma"),
    ("graduate", "Graduation"),
    ("degree", "Graduation"),
    ("gnm", "GNM Nursing"),
    ("anm", "ANM Nursing"),
    # Diploma/ITI
    ("diploma", "Diploma"),
    ("iti", "ITI"),
    ("polytechnic", "Diploma"),
    # School level
    ("12th", "12th Pass"),
    ("10+2", "12th Pass"),
    ("inter ", "12th Pass"),
    ("intermediate", "12th Pass"),
    ("higher secondary", "12th Pass"),
    ("10th", "10th Pass"),
    ("matric", "10th Pass"),
    ("high school", "10th Pass"),
    ("8th", "8th Pass"),
    ("5th", "5th Pass"),
]


def guess_qualification(title):
    """Guess minimum qualification from title keywords."""
    title_lower = title.lower()
    for keyword, qual in QUALIFICATION_MAP:
        if keyword in title_lower:
            return qual
    return None


def extract_number(text):
    """Extract a number from text like '17,727' or '1500'."""
    if not text:
        return None
    nums = re.findall(r"[\d,]+", text.replace(" ", ""))
    for n in nums:
        clean = n.replace(",", "")
        if clean.isdigit() and int(clean) > 0:
            return int(clean)
    return None


class SarkariResultParser(BaseParser):
    """
    Deep scraper for sarkariresult.com — fetches listing pages AND individual
    job detail pages to extract full info: description, fee, vacancy details,
    qualification, salary, age limit, important dates.
    """
    name = "SarkariResult.com"
    base_url = "https://www.sarkariresult.com"
    category = "other"
    state = "all_india"

    PAGES = [
        ("/LatestJob.php", "job"),
        ("/Result.php", "result"),
        ("/AdmitCard.php", "admit_card"),
        ("/AnswerKey.php", "answer_key"),
        ("/Syllabus.php", "syllabus"),
        ("/Admission.php", "admission"),
    ]

    def get_headers(self):
        """Override headers to bypass SarkariResult.com 403 block."""
        import random
        agents = [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0",
        ]
        return {
            "User-Agent": random.choice(agents),
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "en-IN,en;q=0.9,hi;q=0.8",
            "Accept-Encoding": "gzip, deflate, br",
            "Referer": "https://www.google.com/",
            "DNT": "1",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "cross-site",
            "Cache-Control": "max-age=0",
        }

    def fetch(self, url, timeout=30):
        """Override fetch with session-based cookies to bypass blocks."""
        import requests
        session = requests.Session()
        try:
            # First visit homepage to get cookies
            session.get(self.base_url, headers=self.get_headers(), timeout=10, verify=False)
            time.sleep(1)
            # Then fetch the actual page
            resp = session.get(url, headers=self.get_headers(), timeout=timeout, verify=False)
            resp.raise_for_status()
            return resp.text
        except requests.RequestException as e:
            logger.error(f"[{self.name}] Failed to fetch {url}: {e}")
            return None

    def _parse_detail_page(self, url):
        """Fetch a Sarkari Result detail page and extract structured data."""
        detail = {}
        try:
            html = self.fetch(url, timeout=15)
            if not html:
                return detail

            soup = self.soup(html)

            # Extract tables — SR puts everything in tables
            tables = soup.find_all("table")

            fee = {}
            vacancy_details = {}
            description_parts = []
            apply_link = None
            notification_pdf = None
            qualification = None
            salary = None
            age_limit = None
            last_date = None
            organization = None

            for table in tables:
                rows = table.find_all("tr")
                for row in rows:
                    cells = row.find_all(["td", "th"])
                    if len(cells) < 2:
                        # Single cell — might be a header or description
                        text = self.clean_text(row.get_text())
                        if text and len(text) > 20:
                            description_parts.append(text)
                        continue

                    label = self.clean_text(cells[0].get_text()).lower()
                    value = self.clean_text(cells[1].get_text())

                    # Fee extraction
                    if any(k in label for k in ["general", "ur", "obc", "sc/st", "sc", "st", "ews", "female"]):
                        if any(k in label for k in ["fee", "charge", "amount"]) or "₹" in value or "rs" in value.lower():
                            fee_key = cells[0].get_text().strip()
                            fee[fee_key] = value

                    # Vacancy details
                    if any(k in label for k in ["general", "ur", "obc", "sc", "st", "ews", "pwd", "total"]):
                        num = extract_number(value)
                        if num and num < 500000:  # sanity check
                            vac_key = cells[0].get_text().strip()
                            vacancy_details[vac_key] = num

                    # Important fields
                    if "qualification" in label or "education" in label or "eligibility" in label:
                        qualification = value
                    elif "salary" in label or "pay" in label or "pay scale" in label:
                        salary = value
                    elif "age" in label and "limit" in label:
                        age_limit = value
                    elif "last date" in label or "closing date" in label:
                        last_date = self.parse_date(value)
                    elif "organization" in label or "department" in label or "board" in label:
                        organization = value

            # Extract apply/notification links
            for a in soup.find_all("a", href=True):
                a_text = self.clean_text(a.get_text()).lower()
                href = a["href"]
                if any(k in a_text for k in ["apply online", "apply now", "registration"]):
                    if href.startswith("http") and "sarkariresult" not in href:
                        apply_link = href
                elif any(k in a_text for k in ["notification", "official pdf", "download pdf"]):
                    if href.startswith("http"):
                        notification_pdf = href

            # Build description from non-table content
            for p in soup.find_all(["p", "div"]):
                text = self.clean_text(p.get_text())
                if text and len(text) > 50 and "sarkari result" not in text.lower():
                    if text not in description_parts:
                        description_parts.append(text)

            if description_parts:
                detail["description"] = "\n\n".join(description_parts[:5])
            if fee:
                detail["fee"] = fee
            if vacancy_details:
                detail["vacancy_details"] = vacancy_details
            if apply_link:
                detail["apply_link"] = apply_link
            if notification_pdf:
                detail["notification_pdf"] = notification_pdf
            if qualification:
                detail["qualification"] = qualification
            if salary:
                detail["salary"] = salary
            if age_limit:
                detail["age_limit"] = age_limit
            if last_date:
                detail["last_date"] = last_date
            if organization:
                detail["organization"] = organization

        except Exception as e:
            logger.debug(f"[SarkariResult] Detail page error {url}: {e}")

        return detail

    def parse(self):
        jobs = []
        seen = set()

        for path, content_type in self.PAGES:
            try:
                html = self.fetch(f"{self.base_url}{path}")
                if not html:
                    continue

                soup = self.soup(html)
                skip_texts = {
                    "latest job", "admit card", "answer key", "result",
                    "home", "contact us", "about us", "privacy policy",
                    "terms and conditions", "disclaimer", "up scholarship",
                    "syllabus", "previous year paper", "admission",
                }

                detail_links = []
                for link in soup.select("li a, td a, .post_box a"):
                    text = self.clean_text(link.get_text())
                    if not text or len(text) < 15:
                        continue

                    if text.lower().strip() in skip_texts:
                        continue

                    if not re.search(r"20[12]\d", text):
                        continue

                    if text in seen:
                        continue
                    seen.add(text)

                    href = link.get("href", "")
                    if href and not href.startswith("http"):
                        href = f"{self.base_url}/{href.lstrip('/')}"

                    # Extract vacancy count from title
                    vacancies = None
                    vac_match = re.search(r"(\d[\d,]*)\s*(?:post|vacancy|vacancies|seat)", text.lower())
                    if vac_match:
                        vacancies = int(vac_match.group(1).replace(",", ""))

                    # Extract last date from title
                    last_date = None
                    date_match = re.search(r"last date[:\s]*(\d{1,2}[/.-]\d{1,2}[/.-]\d{2,4})", text.lower())
                    if date_match:
                        last_date = self.parse_date(date_match.group(1))

                    job_data = {
                        "title": text,
                        "organization": "",
                        "category": guess_category(text),
                        "state": guess_state(text),
                        "content_type": content_type,
                        "vacancies": vacancies,
                        "last_date": last_date,
                        "apply_link": href,
                        "source_url": f"{self.base_url}{path}",
                    }
                    detail_links.append((href, job_data))

                # Deep fetch top 30 detail pages per section for full data
                for i, (detail_url, job_data) in enumerate(detail_links[:30]):
                    if detail_url and detail_url.startswith("http"):
                        detail = self._parse_detail_page(detail_url)
                        if detail:
                            # Merge detail data (detail overrides only if non-empty)
                            for key in ["description", "fee", "vacancy_details", "qualification",
                                        "salary", "age_limit", "notification_pdf", "organization"]:
                                if detail.get(key):
                                    job_data[key] = detail[key]
                            if detail.get("apply_link"):
                                job_data["apply_link"] = detail["apply_link"]
                            if detail.get("last_date") and not job_data.get("last_date"):
                                job_data["last_date"] = detail["last_date"]
                        # Respectful delay
                        if i < len(detail_links) - 1:
                            time.sleep(0.5)

                    jobs.append(job_data)

            except Exception as e:
                logger.warning(f"[SarkariResult/{path}] Error: {e}")
                continue

        logger.info(f"[SarkariResult.com] Found {len(jobs)} entries (with deep details)")
        return jobs


class FreeJobAlertParser(BaseParser):
    """
    Deep scraper for freejobalert.com — fetches listing + detail pages.
    """
    name = "FreeJobAlert.com"
    base_url = "https://www.freejobalert.com"
    category = "other"
    state = "all_india"

    PAGES = [
        ("/latest-notifications/", "job"),
        ("/results/", "result"),
        ("/admit-card/", "admit_card"),
        ("/answer-key/", "answer_key"),
        ("/syllabus/", "syllabus"),
        ("/admission/", "admission"),
    ]

    def _parse_detail_page(self, url):
        """Fetch a FreeJobAlert detail page and extract structured data."""
        detail = {}
        try:
            html = self.fetch(url, timeout=15)
            if not html:
                return detail

            soup = self.soup(html)

            # FJA uses tables for structured data
            tables = soup.find_all("table")
            fee = {}
            vacancy_details = {}
            qualification = None
            salary = None
            age_limit = None
            last_date = None
            organization = None
            apply_link = None
            notification_pdf = None

            for table in tables:
                rows = table.find_all("tr")
                for row in rows:
                    cells = row.find_all(["td", "th"])
                    if len(cells) < 2:
                        continue
                    label = self.clean_text(cells[0].get_text()).lower()
                    value = self.clean_text(cells[1].get_text())

                    if "qualification" in label or "education" in label:
                        qualification = value
                    elif "salary" in label or "pay" in label:
                        salary = value
                    elif "age" in label:
                        age_limit = value
                    elif "last date" in label:
                        last_date = self.parse_date(value)
                    elif "organization" in label or "board" in label or "department" in label:
                        organization = value

                    # Fee rows
                    if any(k in label for k in ["general", "obc", "sc", "st", "ews", "female"]):
                        if "₹" in value or "rs" in value.lower() or re.search(r"\d+/-", value):
                            fee[cells[0].get_text().strip()] = value

                    # Vacancy rows
                    if any(k in label for k in ["general", "ur", "obc", "sc", "st", "ews", "total"]):
                        num = extract_number(value)
                        if num and num < 500000:
                            vacancy_details[cells[0].get_text().strip()] = num

            # Extract links
            for a in soup.find_all("a", href=True):
                a_text = self.clean_text(a.get_text()).lower()
                href = a["href"]
                if any(k in a_text for k in ["apply online", "apply now"]):
                    if href.startswith("http") and "freejobalert" not in href:
                        apply_link = href
                elif "notification" in a_text and href.endswith(".pdf"):
                    notification_pdf = href

            # Description from article content
            article = soup.find("article") or soup.find(class_="entry-content")
            if article:
                desc = self.clean_text(article.get_text())
                if desc and len(desc) > 100:
                    detail["description"] = desc[:2000]

            if fee:
                detail["fee"] = fee
            if vacancy_details:
                detail["vacancy_details"] = vacancy_details
            if qualification:
                detail["qualification"] = qualification
            if salary:
                detail["salary"] = salary
            if age_limit:
                detail["age_limit"] = age_limit
            if last_date:
                detail["last_date"] = last_date
            if organization:
                detail["organization"] = organization
            if apply_link:
                detail["apply_link"] = apply_link
            if notification_pdf:
                detail["notification_pdf"] = notification_pdf

        except Exception as e:
            logger.debug(f"[FreeJobAlert] Detail page error {url}: {e}")

        return detail

    def parse(self):
        jobs = []
        seen = set()

        for path, content_type in self.PAGES:
            try:
                html = self.fetch(f"{self.base_url}{path}")
                if not html:
                    continue

                soup = self.soup(html)
                detail_links = []

                for link in soup.select("td a, .entry-title a, .post-title a, li a"):
                    text = self.clean_text(link.get_text())
                    if not text or len(text) < 15:
                        continue

                    if not re.search(r"20[12]\d", text):
                        continue

                    if text in seen:
                        continue
                    seen.add(text)

                    href = link.get("href", "")
                    if href and not href.startswith("http"):
                        href = f"{self.base_url}{href}"

                    vacancies = None
                    vac_match = re.search(r"(\d[\d,]*)\s*(?:post|vacancy|vacancies)", text.lower())
                    if vac_match:
                        vacancies = int(vac_match.group(1).replace(",", ""))

                    job_data = {
                        "title": text,
                        "organization": "",
                        "category": guess_category(text),
                        "state": guess_state(text),
                        "content_type": content_type,
                        "vacancies": vacancies,
                        "apply_link": href,
                        "source_url": f"{self.base_url}{path}",
                    }
                    detail_links.append((href, job_data))

                # Deep fetch top 20 detail pages
                for i, (detail_url, job_data) in enumerate(detail_links[:20]):
                    if detail_url and detail_url.startswith("http"):
                        detail = self._parse_detail_page(detail_url)
                        if detail:
                            for key in ["description", "fee", "vacancy_details", "qualification",
                                        "salary", "age_limit", "notification_pdf", "organization",
                                        "apply_link"]:
                                if detail.get(key):
                                    job_data[key] = detail[key]
                            if detail.get("last_date") and not job_data.get("last_date"):
                                job_data["last_date"] = detail["last_date"]
                        if i < len(detail_links) - 1:
                            time.sleep(0.5)

                    jobs.append(job_data)

            except Exception as e:
                logger.warning(f"[FreeJobAlert/{path}] Error: {e}")
                continue

        logger.info(f"[FreeJobAlert.com] Found {len(jobs)} entries (with deep details)")
        return jobs


class EmploymentNewsParser(BaseParser):
    """
    Scrapes employmentnews.gov.in — official government employment portal.
    """
    name = "EmploymentNews"
    # The www. host returns 404; the ASP.NET site lives on the bare domain.
    base_url = "https://employmentnews.gov.in"
    category = "other"
    state = "all_india"

    LIST_PATH = "/NewEmp/AllJobs.aspx?k=All"

    def parse(self):
        """AllJobs.aspx is a plain table:
        ISSUED DATE (MM/DD/YYYY) | ORGANISATION | POST | METHOD OF APPOINTMENT | LAST DATE (DD/MM/YYYY)
        """
        jobs = []
        seen = set()
        url = f"{self.base_url}{self.LIST_PATH}"

        html = self.fetch(url)
        if not html:
            return jobs

        soup = self.soup(html)
        for row in soup.select("table tr"):
            cells = [self.clean_text(td.get_text(" ")) for td in row.find_all("td")]
            if len(cells) < 5:
                continue
            issued, org, post, method, last = cells[:5]
            if not org or not post or org.upper() == "ORGANISATION":
                continue

            title = f"{org.title()} — {post.title()}"
            if title in seen:
                continue
            seen.add(title)

            link = row.find("a", href=True)
            href = link["href"] if link else ""
            if href and not href.startswith("http"):
                href = f"{self.base_url}/NewEmp/{href.lstrip('/')}"

            jobs.append({
                "title": title,
                "organization": org.title(),
                "category": guess_category(f"{org} {post}"),
                "state": guess_state(f"{org} {post}"),
                "apply_link": href or url,
                "source_url": url,
                "last_date": self.parse_date(last),
                "description": f"Method of appointment: {method}. Published in Employment News on {issued}." if method else None,
            })

        logger.info(f"[EmploymentNews] Found {len(jobs)} jobs")
        return jobs


class SarkariExamParser(BaseParser):
    """
    Scrapes sarkariexam.com — another popular aggregator with
    admissions, syllabus, and exam-specific pages.
    Deep-scrapes detail pages to extract real government apply links.
    """
    name = "SarkariExam.com"
    base_url = "https://www.sarkariexam.com"
    category = "other"
    state = "all_india"

    PAGES = [
        ("/latest-jobs/", "job"),
        ("/result/", "result"),
        ("/admit-card/", "admit_card"),
        ("/answer-key/", "answer_key"),
        ("/syllabus/", "syllabus"),
        ("/admission/", "admission"),
    ]

    def _extract_gov_link(self, url):
        """Fetch detail page and find the real government apply link."""
        try:
            html = self.fetch(url, timeout=15)
            if not html:
                return {}
            soup = self.soup(html)
            detail = {}
            for a in soup.find_all("a", href=True):
                a_text = self.clean_text(a.get_text()).lower()
                href = a["href"]
                if any(k in a_text for k in ["apply online", "apply now", "registration", "official website"]):
                    if href.startswith("http") and "sarkariexam" not in href:
                        detail["apply_link"] = href
                        break
                elif any(k in a_text for k in ["notification", "official pdf", "download pdf"]):
                    if href.startswith("http") and href.endswith(".pdf"):
                        detail["notification_pdf"] = href
            return detail
        except Exception as e:
            logger.debug(f"[SarkariExam] Detail page error {url}: {e}")
            return {}

    def parse(self):
        jobs = []
        seen = set()

        for path, content_type in self.PAGES:
            try:
                html = self.fetch(f"{self.base_url}{path}")
                if not html:
                    continue

                soup = self.soup(html)
                detail_links = []
                for link in soup.select("li a, td a, .entry-title a, h2 a, h3 a"):
                    text = self.clean_text(link.get_text())
                    if not text or len(text) < 15:
                        continue

                    if not re.search(r"20[12]\d", text):
                        continue

                    if text in seen:
                        continue
                    seen.add(text)

                    href = link.get("href", "")
                    if href and not href.startswith("http"):
                        href = f"{self.base_url}{href}"

                    vacancies = None
                    vac_match = re.search(r"(\d[\d,]*)\s*(?:post|vacancy|vacancies|seat)", text.lower())
                    if vac_match:
                        vacancies = int(vac_match.group(1).replace(",", ""))

                    job_data = {
                        "title": text,
                        "organization": "",
                        "category": guess_category(text),
                        "state": guess_state(text),
                        "content_type": content_type,
                        "vacancies": vacancies,
                        "apply_link": href,
                        "source_url": f"{self.base_url}{path}",
                    }
                    detail_links.append((href, job_data))

                # Deep fetch top 20 detail pages to find real gov links
                for i, (detail_url, job_data) in enumerate(detail_links[:20]):
                    if detail_url and detail_url.startswith("http"):
                        detail = self._extract_gov_link(detail_url)
                        if detail.get("apply_link"):
                            job_data["apply_link"] = detail["apply_link"]
                        if detail.get("notification_pdf"):
                            job_data["notification_pdf"] = detail["notification_pdf"]
                        if i < len(detail_links) - 1:
                            time.sleep(0.5)
                    jobs.append(job_data)

            except Exception as e:
                logger.warning(f"[SarkariExam/{path}] Error: {e}")
                continue

        logger.info(f"[SarkariExam.com] Found {len(jobs)} entries (with deep details)")
        return jobs


class RojgarResultParser(BaseParser):
    """
    Scrapes rojgarresult.com — popular aggregator covering all categories.
    Deep-scrapes detail pages to extract real government apply links.
    """
    name = "RojgarResult.com"
    base_url = "https://www.rojgarresult.com"
    category = "other"
    state = "all_india"

    PAGES = [
        ("/sarkari-naukri/", "job"),
        ("/sarkari-result/", "result"),
        ("/admit-card/", "admit_card"),
        ("/answer-key/", "answer_key"),
        ("/admission/", "admission"),
    ]

    def _extract_gov_link(self, url):
        """Fetch detail page and find the real government apply link."""
        try:
            html = self.fetch(url, timeout=15)
            if not html:
                return {}
            soup = self.soup(html)
            detail = {}
            for a in soup.find_all("a", href=True):
                a_text = self.clean_text(a.get_text()).lower()
                href = a["href"]
                if any(k in a_text for k in ["apply online", "apply now", "registration", "official website", "click here"]):
                    if href.startswith("http") and "rojgarresult" not in href:
                        detail["apply_link"] = href
                        break
                elif any(k in a_text for k in ["notification", "official pdf", "download pdf"]):
                    if href.startswith("http") and href.endswith(".pdf"):
                        detail["notification_pdf"] = href
            return detail
        except Exception as e:
            logger.debug(f"[RojgarResult] Detail page error {url}: {e}")
            return {}

    def parse(self):
        jobs = []
        seen = set()

        for path, content_type in self.PAGES:
            try:
                html = self.fetch(f"{self.base_url}{path}")
                if not html:
                    continue

                soup = self.soup(html)
                detail_links = []
                for link in soup.select("td a, .entry-title a, li a, h2 a, h3 a"):
                    text = self.clean_text(link.get_text())
                    if not text or len(text) < 15:
                        continue

                    if not re.search(r"20[12]\d", text):
                        continue

                    if text in seen:
                        continue
                    seen.add(text)

                    href = link.get("href", "")
                    if href and not href.startswith("http"):
                        href = f"{self.base_url}{href}"

                    vacancies = None
                    vac_match = re.search(r"(\d[\d,]*)\s*(?:post|vacancy|vacancies)", text.lower())
                    if vac_match:
                        vacancies = int(vac_match.group(1).replace(",", ""))

                    job_data = {
                        "title": text,
                        "organization": "",
                        "category": guess_category(text),
                        "state": guess_state(text),
                        "content_type": content_type,
                        "vacancies": vacancies,
                        "apply_link": href,
                        "source_url": f"{self.base_url}{path}",
                    }
                    detail_links.append((href, job_data))

                # Deep fetch top 20 detail pages to find real gov links
                for i, (detail_url, job_data) in enumerate(detail_links[:20]):
                    if detail_url and detail_url.startswith("http"):
                        detail = self._extract_gov_link(detail_url)
                        if detail.get("apply_link"):
                            job_data["apply_link"] = detail["apply_link"]
                        if detail.get("notification_pdf"):
                            job_data["notification_pdf"] = detail["notification_pdf"]
                        if i < len(detail_links) - 1:
                            time.sleep(0.5)
                    jobs.append(job_data)

            except Exception as e:
                logger.warning(f"[RojgarResult/{path}] Error: {e}")
                continue

        logger.info(f"[RojgarResult.com] Found {len(jobs)} entries (with deep details)")
        return jobs
