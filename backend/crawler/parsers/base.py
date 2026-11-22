import logging
import re
from abc import ABC, abstractmethod
from datetime import datetime

import requests
from bs4 import BeautifulSoup
from fake_useragent import UserAgent

logger = logging.getLogger(__name__)


class BaseParser(ABC):
    name = "base"
    base_url = ""
    category = "other"
    state = "all_india"

    def __init__(self):
        try:
            self.ua = UserAgent()
        except Exception:
            self.ua = None

    def get_headers(self):
        agent = self.ua.random if self.ua else (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        )
        return {
            "User-Agent": agent,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5,hi;q=0.3",
        }

    def fetch(self, url, timeout=30):
        try:
            # (connect, read): many .gov.in hosts never answer from CI runners; an
            # 8s connect timeout fails them fast instead of burning 30s+ each.
            resp = requests.get(url, headers=self.get_headers(), timeout=(8, timeout), verify=False)
            resp.raise_for_status()
            # Many NIC sites omit charset; requests then assumes ISO-8859-1 and
            # Hindi text turns into mojibake. Trust the sniffed encoding instead.
            if not resp.encoding or resp.encoding.lower() in ("iso-8859-1", "latin-1"):
                resp.encoding = resp.apparent_encoding or "utf-8"
            return resp.text
        except requests.RequestException as e:
            logger.error(f"[{self.name}] Failed to fetch {url}: {e}")
            return None

    def soup(self, html):
        return BeautifulSoup(html, "lxml")

    @abstractmethod
    def parse(self):
        """Return list of dicts with job data."""

    # Link texts that look like real notices, not site navigation.
    _NOTICE_RE = re.compile(
        r"recruit|vacanc|advt|advertisement|notification no|apply online|online application|"
        r"engagement|walk-?in|admit card|answer key|result|examination|\bexam\b|post of|posts of|"
        r"applications? (are|is) invited|inviting applications|selection list|merit list|"
        r"interview|shortlist|call letter|corrigendum",
        re.I,
    )
    _NAV_RE = re.compile(
        r"^(recruitment|notification|result|results|careers?|vacancies|job openings|notice|"
        r"gazette notification|recruitment results?|archive recruitment)$|"
        r"judges|roster|library|former |committee|policy|revival|scholarship|tender|\brti\b|"
        r"login|about us|contact us|sitemap|privacy|disclaimer|^click here$",
        re.I,
    )

    @classmethod
    def is_notice_title(cls, text):
        """True when a link text reads like a recruitment notice rather than a menu item."""
        if not text or len(text) < 20:
            return False
        if cls._NAV_RE.search(text):
            return False
        return bool(cls._NOTICE_RE.search(text))

    # Patterns that indicate scraped garbage, not a real title.
    _GARBAGE_RE = re.compile(
        r"\{\{|translate\s*\}|angular\.|ng-|<%|<script|javascript:|"
        r"^(home|menu|close|back|next|prev|loading|error|undefined|null|NaN)$",
        re.I,
    )

    @classmethod
    def clean_text(cls, text):
        if not text:
            return ""
        text = re.sub(r"\s+", " ", text.strip())
        # Link captions often end with a call-to-action that is not part of the title.
        text = re.sub(r"\s*(read more|click here|view details|know more)\s*\.?$", "", text, flags=re.I).strip()
        # Reject garbage (Angular templates, JS artifacts, etc.)
        if cls._GARBAGE_RE.search(text):
            return ""
        return text

    @staticmethod
    def parse_date(date_str):
        if not date_str:
            return None
        date_str = date_str.strip()
        formats = [
            "%d/%m/%Y", "%d-%m-%Y", "%d.%m.%Y",
            "%d %B %Y", "%d %b %Y", "%B %d, %Y",
            "%Y-%m-%d", "%d %B, %Y",
        ]
        for fmt in formats:
            try:
                return datetime.strptime(date_str, fmt).date()
            except ValueError:
                continue
        return None


# Recruiting bodies named in notice titles, mapped to the short name we store.
# Matched as whole words; when several match, the one earliest in the title wins.
_ORG_ALIASES = [
    (r"Railway Recruitment Boards?|RRB", "RRB"),
    (r"Staff Selection Commission|SSC", "SSC"),
    (r"Union Public Service Commission|UPSC", "UPSC"),
    (r"Institute of Banking Personnel Selection|IBPS", "IBPS"),
    (r"UPSSSC|Uttar Pradesh Subordinate Service Selection Commission", "UPSSSC"),
    (r"UPPSC|UP PSC", "UPPSC"),
    (r"BPSC|Bihar Public Service Commission", "BPSC"),
    (r"BSSC|Bihar Staff Selection Commission", "BSSC"),
    (r"RPSC|Rajasthan Public Service Commission", "RPSC"),
    (r"RSMSSB|RSSB|Rajasthan Staff Selection Board", "RSMSSB"),
    (r"MPPSC|MP PSC", "MPPSC"),
    (r"MPESB|Madhya Pradesh Employees Selection Board", "MPESB"),
    (r"HSSC|Haryana Staff Selection Commission", "HSSC"),
    (r"HPSC|Haryana Public Service Commission", "HPSC"),
    (r"DSSSB|Delhi Subordinate Services Selection Board", "DSSSB"),
    (r"NTA|National Testing Agency", "NTA"),
    (r"TNPSC|Tamil Nadu Public Service Commission", "TNPSC"),
    (r"KPSC|Karnataka Public Service Commission", "KPSC"),
    (r"APPSC|Andhra Pradesh Public Service Commission", "APPSC"),
    (r"TSPSC|Telangana State Public Service Commission", "TSPSC"),
    (r"WBPSC|West Bengal PSC", "WBPSC"),
    (r"JSSC|Jharkhand Staff Selection Commission", "JSSC"),
    (r"JPSC|Jharkhand Public Service Commission", "JPSC"),
    (r"OSSSC|Odisha Sub Ordinate Staff Selection Commission", "OSSSC"),
    (r"OPSC|Odisha Public Service Commission", "OPSC"),
    (r"CSBC|Central Selection Board of Constable", "CSBC"),
    (r"SBI|State Bank of India", "SBI"),
    (r"RBI|Reserve Bank of India", "RBI"),
    (r"Punjab National Bank|PNB", "PNB"),
    (r"Bank of Baroda", "Bank of Baroda"),
    (r"Canara Bank", "Canara Bank"),
    (r"UCO Bank", "UCO Bank"),
    (r"Coal India Limited", "Coal India Limited"),
    (r"Bharat Electronics Limited|BEL", "BEL"),
    (r"BHEL|Bharat Heavy Electricals", "BHEL"),
    (r"NTPC", "NTPC"),
    (r"ONGC|Oil and Natural Gas Corporation", "ONGC"),
    (r"IOCL|Indian Oil Corporation", "IOCL"),
    (r"GAIL", "GAIL"),
    (r"SAIL|Steel Authority of India", "SAIL"),
    (r"NHPC", "NHPC"),
    (r"NLC|Neyveli Lignite", "NLC"),
    (r"ISRO", "ISRO"),
    (r"DRDO", "DRDO"),
    (r"AIIMS", "AIIMS"),
    (r"ESIC|Employees State Insurance Corporation", "ESIC"),
    (r"FCI|Food Corporation of India", "FCI"),
    (r"AAI|Airports Authority of India", "AAI"),
    (r"India Post|Indian Postal", "India Post"),
    (r"KVS|Kendriya Vidyalaya Sangathan", "KVS"),
    (r"NVS|Navodaya Vidyalaya Samiti", "NVS"),
    (r"CBSE|Central Board of Secondary Education", "CBSE"),
    (r"CISF|Central Industrial Security Force", "CISF"),
    (r"CRPF|Central Reserve Police Force", "CRPF"),
    (r"BSF|Border Security Force", "BSF"),
    (r"ITBP|Indo Tibetan Border Police", "ITBP"),
    (r"Sashastra Seema Bal|SSB", "SSB"),
    (r"Assam Rifles", "Assam Rifles"),
    (r"Indian Army", "Indian Army"),
    (r"Indian Navy", "Indian Navy"),
    (r"Indian Air Force|IAF", "Indian Air Force"),
    (r"Indian Coast Guard", "Indian Coast Guard"),
    (r"Delhi Police", "Delhi Police"),
    (r"UP Police|Uttar Pradesh Police", "UP Police"),
    (r"Bihar Police", "Bihar Police"),
    (r"Rajasthan Police", "Rajasthan Police"),
    (r"MP Police|Madhya Pradesh Police", "MP Police"),
    (r"Haryana Police", "Haryana Police"),
    (r"Punjab Police", "Punjab Police"),
    (r"Maharashtra Police", "Maharashtra Police"),
]
_ORG_ALIAS_RES = [(re.compile(rf"\b(?:{pattern})\b", re.I), name) for pattern, name in _ORG_ALIASES]

# Text before " - " counts as the organization only when it is not a job title or notice wording.
_ORG_PREFIX_NOISE_RE = re.compile(
    r"recruit|notification|notice|vacanc|\bposts?\b|admit|result|answer key|exam|apply|online|"
    r"form|syllabus|advt|advertis|engineer|officer|constable|clerk|teacher|lecturer|manager|"
    r"assistant|technician|trainee|analyst|inspector|graduate|supervisor|operator|driver|nurse|"
    r"junior|senior|deputy|\d",
    re.I,
)


def extract_organization(title):
    """Return the recruiting body named in a notice title, or "" when none is clear.

    Known bodies win (short form, e.g. "RRB", "UPSSSC", "Coal India Limited"). Otherwise the
    text before " - " is used when it reads like an organization name rather than a job title.
    """
    title = re.sub(r"\s+", " ", title or "").strip()
    if not title:
        return ""

    best_pos, best_name = None, ""
    for regex, name in _ORG_ALIAS_RES:
        match = regex.search(title)
        if match and (best_pos is None or match.start() < best_pos):
            best_pos, best_name = match.start(), name
    if best_name:
        return best_name

    for separator in (" - ", " – ", " | "):
        if separator in title:
            prefix = title.split(separator, 1)[0].strip(" -:,|")
            if 3 <= len(prefix) <= 60 and not _ORG_PREFIX_NOISE_RE.search(prefix):
                return prefix
            return ""
    return ""
