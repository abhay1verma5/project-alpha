"""
Scrapy spider for large-scale PYQ crawling.

Usage:
    scrapy runspider pyq/spiders/pyq_spider.py -a exam=jee_main -a subject=Physics

Or via the crawl_pyq management command.
"""

import logging
import os
import re
import sys

# Add backend dir to path for Django imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

try:
    import scrapy
    from scrapy.crawler import CrawlerProcess
    HAS_SCRAPY = True
except ImportError:
    HAS_SCRAPY = False

logger = logging.getLogger(__name__)

# Target start URLs by exam type
START_URLS = {
    "jee_main": [
        "https://www.embibe.com/exams/jee-main-previous-year-papers/",
        "https://www.learncbse.in/jee-main-previous-year-question-papers/",
    ],
    "neet": [
        "https://www.embibe.com/exams/neet-previous-year-question-papers/",
        "https://www.learncbse.in/neet-previous-year-question-papers/",
    ],
    "ssc_cgl": [
        "https://testbook.com/ssc-cgl/previous-year-papers",
    ],
    "gate_cse": [
        "https://www.geeksforgeeks.org/gate-cs-previous-years-question-papers/",
    ],
}


if HAS_SCRAPY:
    class PYQSpider(scrapy.Spider):
        name = "pyq_spider"
        custom_settings = {
            "ROBOTSTXT_OBEY": True,
            "DOWNLOAD_DELAY": 2,
            "CONCURRENT_REQUESTS": 4,
            "RETRY_TIMES": 3,
            "USER_AGENT": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "LOG_LEVEL": "INFO",
        }

        def __init__(self, exam=None, subject=None, *args, **kwargs):
            super().__init__(*args, **kwargs)
            self.exam_filter = exam
            self.subject_filter = subject
            self.questions = []

            if exam and exam in START_URLS:
                self.start_urls = START_URLS[exam]
            else:
                self.start_urls = []
                for urls in START_URLS.values():
                    self.start_urls.extend(urls)

        def parse(self, response):
            """Parse listing pages and follow year/subject links."""
            # Follow links containing year patterns or subject names
            for link in response.css("a[href]"):
                href = link.attrib.get("href", "")
                text = link.css("::text").get("").lower()

                if re.search(r"20[12]\d|previous.year|question.paper|pyq", text + href, re.I):
                    yield response.follow(link, callback=self.parse_questions)

        def parse_questions(self, response):
            """Extract MCQ questions from detail pages."""
            content = response.css(
                ".entry-content, .article-content, .post-content, article, .content"
            ).get("")

            if not content:
                return

            text = scrapy.Selector(text=content).css("::text").getall()
            full_text = " ".join(text)

            # Look for MCQ patterns
            q_pattern = re.compile(
                r"(?:Q\.?\s*(\d+)|(\d+)[\.\)]\s)(.+?)(?=(?:Q\.?\s*\d+|\d+[\.\)]\s)|$)",
                re.DOTALL,
            )
            option_pattern = re.compile(
                r"\(([a-d])\)\s*(.+?)(?=\([a-d]\)|Answer|$)",
                re.DOTALL | re.IGNORECASE,
            )

            year_match = re.search(r"20[12]\d", response.url)
            year = int(year_match.group()) if year_match else 2024

            for match in q_pattern.finditer(full_text):
                q_block = match.group(3)
                opts = option_pattern.findall(q_block)
                if len(opts) < 4:
                    continue

                first_pos = q_block.find(f"({opts[0][0]})")
                q_text = q_block[:first_pos].strip() if first_pos > 0 else ""
                q_text = re.sub(r"\s+", " ", q_text)
                if len(q_text) < 10:
                    continue

                options = [re.sub(r"\s+", " ", o[1]).strip() for o in opts[:4]]

                yield {
                    "exam_type": self.exam_filter or "",
                    "year": year,
                    "subject": self.subject_filter or "",
                    "question_text": q_text,
                    "options": options,
                    "correct_answer": 0,
                    "explanation": "",
                    "difficulty": "medium",
                    "source_url": response.url,
                }


def run_spider(exam=None, subject=None):
    """Run the PYQ spider and return extracted questions."""
    if not HAS_SCRAPY:
        logger.error("Scrapy not installed. Run: pip install scrapy")
        return []

    process = CrawlerProcess(settings={
        "FEEDS": {},
        "LOG_ENABLED": True,
    })

    collected = []

    class CollectorPipeline:
        def process_item(self, item, spider):
            collected.append(dict(item))
            return item

    process.crawl(PYQSpider, exam=exam, subject=subject)
    process.start()
    return collected
