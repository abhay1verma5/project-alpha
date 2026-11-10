"""Crawl current affairs from real websites — multiple sources with RSS fallback."""

import json
import os
import re
import time
from datetime import date, timedelta
from xml.etree import ElementTree

import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand


HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-IN,en;q=0.9,hi;q=0.8",
    "Accept-Encoding": "gzip, deflate",
    "Connection": "keep-alive",
}

from config.gemini import gemini_json

# Titles containing any of these (case-insensitive) are junk
JUNK_PATTERNS = [
    "click here", "subscribe", "follow us", "share this", "read also",
    "download", "dear aspirants", "important notice", "we are hiring",
    "crack current", "careerscloud", "affairscloud app", "telegram channel",
    "in-depth content", "toppers ca pdf", "daily pdf", "join our",
    "sign up", "login", "register", "free mock", "buy now", "discount",
    "exclusively in our", "advertisement", "sponsored", "copyright",
    "privacy policy", "terms of", "about us", "contact us", "sitemap",
    "previous year", "pdf download", "free pdf", "whatsapp group",
    "youtube channel", "instagram", "facebook", "twitter", "social media",
]


def _is_junk(title: str) -> bool:
    """Check if a title is junk/navigation text."""
    t = title.lower().strip()
    if len(t) < 20:
        return True
    if len(t) > 250:
        return True
    # Junk patterns
    if any(p in t for p in JUNK_PATTERNS):
        return True
    # Just a date
    if re.match(r'^\d{1,2}\s+\w+\s+\d{4}$', t):
        return True
    # Too few words (likely a label)
    if len(t.split()) < 4:
        return True
    return False


class Command(BaseCommand):
    help = "Crawl current affairs from real news/education websites"

    def add_arguments(self, parser):
        parser.add_argument("--date", help="Date YYYY-MM-DD (default: today)")
        parser.add_argument("--days", type=int, default=1, help="Crawl N days back")
        parser.add_argument("--force", action="store_true", help="Overwrite existing")
        parser.add_argument("--source", default="all")

    def handle(self, *args, **options):
        from currentaffairs.models import DailyCurrentAffairs

        target = date.today()
        if options["date"]:
            target = date.fromisoformat(options["date"])

        for i in range(options["days"]):
            d = target - timedelta(days=i)

            if not options["force"] and DailyCurrentAffairs.objects.filter(date=d).exists():
                self.stdout.write(f"  [SKIP] {d} already exists")
                continue

            self.stdout.write(f"  Crawling current affairs for {d}...")
            items = []
            is_today = (d == date.today())

            # RSS feeds work reliably from any IP
            rss_crawlers = [
                ("rss_ndtv", self._crawl_ndtv_rss),
                ("rss_toi", self._crawl_toi_rss),
                ("rss_pib", self._crawl_pib_rss),
                ("rss_indian_express", self._crawl_indianexpress_rss),
                ("rss_hindu", self._crawl_hindu_rss),
            ]

            # Web crawlers only for today (listing pages show today's news)
            web_crawlers = [
                ("gktoday", self._crawl_gktoday),
                ("affairscloud", self._crawl_affairscloud),
            ] if is_today else []

            all_crawlers = rss_crawlers + web_crawlers

            for name, crawler in all_crawlers:
                try:
                    found = crawler(d)
                    if found:
                        items.extend(found)
                        self.stdout.write(f"    {name}: {len(found)} items")
                    else:
                        self.stdout.write(f"    {name}: 0 items")
                except Exception as e:
                    self.stderr.write(f"    {name} error: {e}")
                time.sleep(0.5)

            if not items:
                self.stderr.write(f"  [WARN] No items crawled for {d}")
                items = self._generate_items_ai(d)
                if not items:
                    continue

            # Filter junk + deduplicate
            seen = set()
            unique = []
            for item in items:
                title = item["title"].strip()
                if _is_junk(title):
                    continue
                key = re.sub(r'\W+', '', title.lower())[:50]
                if key not in seen:
                    seen.add(key)
                    unique.append(item)

            if not unique:
                self.stderr.write(f"  [WARN] All items filtered as junk for {d}")
                unique = self._generate_items_ai(d)
                if not unique:
                    continue

            # Try quiz generation (optional)
            quiz = []
            try:
                quiz = self._generate_quiz(unique, d)
            except Exception as e:
                self.stderr.write(f"    Quiz generation failed: {e}")

            DailyCurrentAffairs.objects.update_or_create(
                date=d,
                defaults={
                    "items": unique[:20],
                    "quiz": quiz[:10] if quiz else [],
                    "source": "crawled",
                },
            )
            self.stdout.write(
                self.style.SUCCESS(f"  [OK] {d}: {len(unique)} items, {len(quiz)} quiz Qs")
            )

    # ── Fetch helpers ──

    def _fetch(self, url: str, timeout: int = 30) -> BeautifulSoup | None:
        try:
            resp = requests.get(url, headers=HEADERS, timeout=timeout, allow_redirects=True)
            if resp.status_code == 200 and len(resp.text) > 500:
                return BeautifulSoup(resp.text, "html.parser")
            self.stderr.write(f"    HTTP {resp.status_code} for {url}")
        except Exception as e:
            self.stderr.write(f"    Fetch error {url}: {e}")
        return None

    def _fetch_rss(self, url: str) -> ElementTree.Element | None:
        try:
            resp = requests.get(url, headers=HEADERS, timeout=30)
            if resp.status_code == 200 and len(resp.content) > 100:
                return ElementTree.fromstring(resp.content)
            self.stderr.write(f"    RSS HTTP {resp.status_code} for {url}")
        except Exception as e:
            self.stderr.write(f"    RSS error {url}: {e}")
        return None

    def _parse_rss_items(self, root: ElementTree.Element, max_items: int = 10) -> list[dict]:
        """Parse RSS feed into items list."""
        items = []
        for item in root.iter("item"):
            title_el = item.find("title")
            desc_el = item.find("description")

            if title_el is None:
                continue

            title = (title_el.text or "").strip()
            # Some feeds use CDATA, handle that
            if not title:
                continue

            detail = ""
            if desc_el is not None and desc_el.text:
                raw = desc_el.text.strip()
                if "<" in raw:
                    detail = BeautifulSoup(raw, "html.parser").get_text(strip=True)[:300]
                else:
                    detail = raw[:300]

            if _is_junk(title):
                continue

            items.append({
                "title": title,
                "detail": detail or title,
                "category": self._categorize(title + " " + (detail or "")),
            })
            if len(items) >= max_items:
                break

        return items

    # ── RSS Source crawlers (reliable from any IP) ──

    def _crawl_ndtv_rss(self, d: date) -> list[dict]:
        """NDTV India news RSS."""
        feeds = [
            "https://feeds.feedburner.com/ndtvnews-india-news",
            "https://feeds.feedburner.com/ndtvnews-top-stories",
        ]
        items = []
        for url in feeds:
            root = self._fetch_rss(url)
            if root:
                items.extend(self._parse_rss_items(root, 8))
            if len(items) >= 10:
                break
        return items[:12]

    def _crawl_toi_rss(self, d: date) -> list[dict]:
        """Times of India RSS."""
        feeds = [
            "https://timesofindia.indiatimes.com/rssfeedstopstories.cms",
            "https://timesofindia.indiatimes.com/rssfeeds/296589292.cms",  # India
        ]
        items = []
        for url in feeds:
            root = self._fetch_rss(url)
            if root:
                items.extend(self._parse_rss_items(root, 8))
            if len(items) >= 10:
                break
        return items[:12]

    def _crawl_pib_rss(self, d: date) -> list[dict]:
        """PIB (Press Information Bureau) RSS — official govt news."""
        root = self._fetch_rss("https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=3")
        if root is None:
            return []
        return self._parse_rss_items(root, 10)

    def _crawl_indianexpress_rss(self, d: date) -> list[dict]:
        """Indian Express RSS."""
        feeds = [
            "https://indianexpress.com/section/india/feed/",
            "https://indianexpress.com/section/business/feed/",
        ]
        items = []
        for url in feeds:
            root = self._fetch_rss(url)
            if root:
                items.extend(self._parse_rss_items(root, 8))
            if len(items) >= 10:
                break
        return items[:12]

    def _crawl_hindu_rss(self, d: date) -> list[dict]:
        """The Hindu RSS."""
        feeds = [
            "https://www.thehindu.com/news/national/feeder/default.rss",
            "https://www.thehindu.com/business/feeder/default.rss",
        ]
        items = []
        for url in feeds:
            root = self._fetch_rss(url)
            if root:
                items.extend(self._parse_rss_items(root, 8))
            if len(items) >= 10:
                break
        return items[:12]

    # ── Web crawlers (only for today — listing pages show latest) ──

    def _crawl_gktoday(self, d: date) -> list[dict]:
        """GKToday — main listing page."""
        soup = self._fetch("https://www.gktoday.in/current-affairs/")
        if not soup:
            return []

        items = []
        for sel in ["article h2 a", ".entry-title a", "h3 a"]:
            for el in soup.select(sel)[:15]:
                title = el.get_text(strip=True)
                if _is_junk(title):
                    continue
                detail = ""
                parent = el.find_parent("article") or el.find_parent("div")
                if parent:
                    p = parent.find("p")
                    if p:
                        detail = p.get_text(strip=True)[:300]
                items.append({
                    "title": title,
                    "detail": detail or title,
                    "category": self._categorize(title),
                })
            if items:
                break
        return items[:12]

    def _crawl_affairscloud(self, d: date) -> list[dict]:
        """AffairsCloud — main listing page with strict junk filtering."""
        soup = self._fetch("https://affairscloud.com/current-affairs/")
        if not soup:
            return []

        items = []
        content = soup.select_one(".entry-content, .post-content, article")
        if not content:
            return []

        for el in content.find_all(["h2", "h3", "h4", "strong"]):
            title = el.get_text(strip=True)
            if _is_junk(title):
                continue

            detail = ""
            nxt = el.find_next("p")
            if nxt and nxt != el.parent:
                detail = nxt.get_text(strip=True)[:300]
                if _is_junk(detail):
                    detail = ""

            items.append({
                "title": title,
                "detail": detail or title,
                "category": self._categorize(title + " " + (detail or "")),
            })
            if len(items) >= 15:
                break

        return items

    # ── AI fallback ──

    def _generate_items_ai(self, d: date) -> list[dict]:
        """Last resort: generate current affairs via Gemini AI."""
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            return []

        prompt = f"""Generate 15 important current affairs items for India for {d.strftime('%B %d, %Y')}.
Return ONLY valid JSON array (no markdown, no explanation):
[{{"title":"headline (max 15 words)","detail":"2-3 sentence explanation with key facts","category":"national|international|economy|science|sports|awards|defence|appointments|schemes"}}]

Focus on: government announcements, economy, RBI, appointments, sports, international relations, science/tech, defence, schemes.
Make items factual and relevant for UPSC/SSC/Banking exam preparation."""

        items = gemini_json(prompt)
        if isinstance(items, list) and items:
            self.stdout.write(f"    AI generated: {len(items)} items")
            return items
        self.stderr.write("    AI items: no response from Gemini")
        return []

    # ── Quiz generation ──

    def _generate_quiz(self, items: list[dict], d: date) -> list[dict]:
        """Generate quiz questions from crawled items using Gemini."""
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key or not items:
            return []

        headlines = "\n".join([f"- {it['title']}: {it.get('detail', '')[:80]}" for it in items[:15]])
        prompt = f"""Based on these current affairs for {d.strftime('%B %d, %Y')}:

{headlines}

Generate exactly 10 MCQ quiz questions. Return ONLY valid JSON array:
[{{"question":"...","options":["A","B","C","D"],"correct":0,"explanation":"..."}}]

Make questions factual and suitable for UPSC/SSC/Banking exams."""

        quiz = gemini_json(prompt)
        if isinstance(quiz, list) and quiz:
            return quiz
        self.stderr.write("    Quiz gen: no response from Gemini")
        return []

    # ── Categorizer ──

    def _categorize(self, text: str) -> str:
        text = text.lower()
        if any(w in text for w in ["india", "modi", "parliament", "lok sabha", "bjp", "congress", "chief minister", "governor", "cabinet"]):
            return "national"
        if any(w in text for w in ["us ", "china", "russia", "un ", "nato", "summit", "g20", "g7", "world", "global", "ukraine", "israel"]):
            return "international"
        if any(w in text for w in ["gdp", "rbi", "inflation", "stock", "sensex", "nifty", "bank", "rupee", "budget", "tax", "gst", "economy", "fiscal"]):
            return "economy"
        if any(w in text for w in ["isro", "nasa", "satellite", "technology", "ai ", "robot", "research", "science", "space"]):
            return "science"
        if any(w in text for w in ["cricket", "hockey", "olympics", "medal", "champion", "tournament", "match", "icc", "fifa", "sports"]):
            return "sports"
        if any(w in text for w in ["award", "prize", "honour", "padma", "nobel", "bharat ratna"]):
            return "awards"
        if any(w in text for w in ["army", "navy", "air force", "defence", "missile", "drdo", "military", "exercise"]):
            return "defence"
        if any(w in text for w in ["appoint", "named", "new chairman", "new ceo", "new head", "new director", "resign", "elect"]):
            return "appointments"
        if any(w in text for w in ["scheme", "yojana", "mission", "initiative", "program", "launch", "portal"]):
            return "schemes"
        return "national"
