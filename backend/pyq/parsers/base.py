"""Base parser for PYQ crawlers."""

import hashlib
import logging
import re
import time

import requests
from bs4 import BeautifulSoup
from fake_useragent import UserAgent

logger = logging.getLogger(__name__)

ua = UserAgent(fallback="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36")


class BasePYQParser:
    """Base class for PYQ site parsers."""

    name = "base"
    base_url = ""
    use_proxy = False
    request_delay = 2
    timeout = 30

    def fetch(self, url, retries=3):
        """Fetch URL with retries and User-Agent rotation."""
        headers = {
            "User-Agent": ua.random,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
        }

        for attempt in range(retries):
            try:
                resp = requests.get(url, headers=headers, timeout=self.timeout)
                resp.raise_for_status()
                time.sleep(self.request_delay)
                return resp.text
            except Exception as e:
                logger.warning(
                    "%s: attempt %d failed for %s: %s",
                    self.name, attempt + 1, url, e,
                )
                if attempt < retries - 1:
                    time.sleep(3 ** attempt)
        return None

    def fetch_json(self, url, retries=3):
        """Fetch JSON from URL."""
        headers = {
            "User-Agent": ua.random,
            "Accept": "application/json",
        }
        for attempt in range(retries):
            try:
                resp = requests.get(url, headers=headers, timeout=self.timeout)
                resp.raise_for_status()
                time.sleep(self.request_delay)
                return resp.json()
            except Exception as e:
                logger.warning("%s: JSON fetch attempt %d failed: %s", self.name, attempt + 1, e)
                if attempt < retries - 1:
                    time.sleep(3 ** attempt)
        return None

    def soup(self, html):
        """Parse HTML into BeautifulSoup."""
        return BeautifulSoup(html, "lxml")

    @staticmethod
    def clean_text(text):
        """Normalize whitespace in text."""
        if not text:
            return ""
        return re.sub(r"\s+", " ", text.strip())

    @staticmethod
    def compute_hash(text):
        """Compute SHA-256 hash of normalized text for deduplication."""
        normalized = re.sub(r"\s+", " ", text.strip().lower())
        return hashlib.sha256(normalized.encode("utf-8")).hexdigest()

    def parse(self):
        raise NotImplementedError
