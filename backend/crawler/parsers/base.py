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
            resp = requests.get(url, headers=self.get_headers(), timeout=timeout, verify=False)
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

    @staticmethod
    def clean_text(text):
        if not text:
            return ""
        text = re.sub(r"\s+", " ", text.strip())
        # Link captions often end with a call-to-action that is not part of the title.
        return re.sub(r"\s*(read more|click here|view details|know more)\s*\.?$", "", text, flags=re.I).strip()

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
