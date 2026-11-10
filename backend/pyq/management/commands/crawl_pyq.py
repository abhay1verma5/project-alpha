import logging
import time

from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError

from pyq.models import ExamQuestion, PYQCrawlLog
from pyq.parsers.embibe import EmbibePYQParser
from pyq.parsers.learncbse import LearnCBSEParser
from pyq.parsers.careers360 import Careers360Parser
from pyq.parsers.testbook import TestbookPYQParser
from pyq.parsers.examside import ExamsidePYQParser
from pyq.parsers.indiabix import IndiaBixParser
from pyq.parsers.sanfoundry import SanfoundryParser
from pyq.parsers.geeksforgeeks import GeeksForGeeksParser
from pyq.parsers.ai_scraper import AIPYQScraper
from pyq.parsers.pdf_extractor import PDFExtractorParser
from pyq.parsers.mega_sources import MegaSourceParser
from pyq.parsers.github_importer import GitHubQuestionImporter

logger = logging.getLogger(__name__)

ALL_PARSERS = [
    ExamsidePYQParser,
    IndiaBixParser,
    SanfoundryParser,
    GeeksForGeeksParser,
    EmbibePYQParser,
    LearnCBSEParser,
    Careers360Parser,
    TestbookPYQParser,
    AIPYQScraper,
    PDFExtractorParser,
    MegaSourceParser,
    GitHubQuestionImporter,
]

PARSER_MAP = {p.name if hasattr(p, 'name') else p.__name__: p for p in ALL_PARSERS}
# Also register by class attribute name
for p in ALL_PARSERS:
    if hasattr(p, 'name'):
        PARSER_MAP[p.name] = p


class Command(BaseCommand):
    help = "Crawl educational sites for PYQ questions (examside, indiabix, sanfoundry, gfg, embibe, byjus, etc.)"

    def add_arguments(self, parser):
        parser.add_argument(
            "--source", type=str,
            help="Crawl specific source only (examside/indiabix/sanfoundry/geeksforgeeks/embibe/learncbse/careers360/testbook/ai_scraper)",
        )
        parser.add_argument("--exam", type=str, help="Filter by exam type")
        parser.add_argument("--dry-run", action="store_true", help="Print without saving")

    def handle(self, *args, **options):
        source_filter = options.get("source")
        exam_filter = options.get("exam")
        dry_run = options.get("dry_run", False)

        parsers = ALL_PARSERS
        if source_filter:
            matched = PARSER_MAP.get(source_filter)
            if matched:
                parsers = [matched]
            else:
                self.stderr.write(
                    f"Unknown source: {source_filter}. Available: {', '.join(PARSER_MAP.keys())}"
                )
                return

        total_new = 0
        for parser_cls in parsers:
            parser = parser_cls() if not isinstance(parser_cls, type) or parser_cls != AIPYQScraper else parser_cls()
            name = getattr(parser, 'name', parser_cls.__name__)
            self.stdout.write(f"\n{'='*50}")
            self.stdout.write(f"  Crawling: {name}")
            self.stdout.write(f"{'='*50}")

            start = time.time()
            log = PYQCrawlLog(source=name)

            try:
                raw_questions = parser.parse()
                duration = time.time() - start

                # Filter by exam if specified
                if exam_filter:
                    raw_questions = [q for q in raw_questions if q.get("exam_type") == exam_filter]

                log.questions_found = len(raw_questions)
                log.duration_seconds = round(duration, 2)

                new_count = 0
                for q_data in raw_questions:
                    q_text = q_data.get("question_text", "").strip()
                    if not q_text or len(q_text) < 10:
                        continue

                    opts = q_data.get("options", [])
                    if len(opts) != 4:
                        continue

                    q_hash = ExamQuestion.compute_hash(q_text)
                    if ExamQuestion.objects.filter(question_text_hash=q_hash).exists():
                        continue

                    if dry_run:
                        self.stdout.write(f"  [NEW] {q_text[:80]}...")
                        new_count += 1
                        continue

                    try:
                        ExamQuestion.objects.create(
                            exam_type=q_data.get("exam_type", ""),
                            year=q_data.get("year", 2024),
                            subject=q_data.get("subject", ""),
                            question_text=q_text,
                            question_text_hash=q_hash,
                            options=opts,
                            correct_answer=q_data.get("correct_answer", 0),
                            explanation=q_data.get("explanation", ""),
                            difficulty=q_data.get("difficulty", "medium"),
                            source="crawled",
                            source_url=q_data.get("source_url", ""),
                        )
                        new_count += 1
                    except IntegrityError:
                        continue

                total_new += new_count
                log.questions_new = new_count
                log.status = "success"
                self.stdout.write(self.style.SUCCESS(
                    f"  {name}: {len(raw_questions)} found, {new_count} new ({duration:.1f}s)"
                ))

            except Exception as e:
                log.status = "error"
                log.error_message = str(e)[:500]
                log.duration_seconds = round(time.time() - start, 2)
                self.stderr.write(self.style.ERROR(f"  {name} ERROR: {e}"))

            if not dry_run:
                log.save()

            time.sleep(2)

        self.stdout.write(self.style.SUCCESS(f"\nDone. Total new questions from crawling: {total_new}"))
