import logging
import time
from datetime import date

import requests
from django.conf import settings
from django.core.management.base import BaseCommand
from django.utils import timezone
from django.utils.text import slugify

from crawler.parsers.ssc import SSCParser
from crawler.parsers.upsc import UPSCParser
from crawler.parsers.railway import RailwayParser
from crawler.parsers.ncs import NCSParser
from crawler.parsers.ibps import IBPSParser
from crawler.parsers.state_psc import StatePSCParser
from crawler.parsers.army import ArmyParser
from crawler.parsers.police import PoliceParser
from crawler.parsers.teaching import TeachingParser
from crawler.parsers.health import HealthParser
from crawler.parsers.engineering import EngineeringParser
from crawler.parsers.psu import PSUParser
from crawler.parsers.judiciary import JudiciaryParser
from crawler.parsers.aggregator import (
    SarkariResultParser, FreeJobAlertParser, EmploymentNewsParser,
    SarkariExamParser, RojgarResultParser,
)
from jobs.models import CrawlLog, Job

logger = logging.getLogger(__name__)

# Aggregator domains — never use these as apply_link
AGGREGATOR_DOMAINS = [
    "sarkariresult.com",
    "freejobalert.com",
    "sarkariexam.com",
    "rojgarresult.com",
    "employmentnews.gov.in",
]


def clean_apply_link(apply_link):
    """Return None if apply_link points to an aggregator site instead of a real gov link."""
    if not apply_link:
        return None
    for domain in AGGREGATOR_DOMAINS:
        if domain in apply_link:
            return None
    return apply_link

ALL_PARSERS = [
    SSCParser,
    UPSCParser,
    RailwayParser,
    NCSParser,
    IBPSParser,
    StatePSCParser,
    ArmyParser,
    PoliceParser,
    TeachingParser,
    HealthParser,
    EngineeringParser,
    PSUParser,
    JudiciaryParser,
    SarkariResultParser,
    FreeJobAlertParser,
    EmploymentNewsParser,
    SarkariExamParser,
    RojgarResultParser,
]


class Command(BaseCommand):
    help = "Crawl government job sites and save to database"

    def add_arguments(self, parser):
        parser.add_argument(
            "--source",
            type=str,
            help="Crawl specific source only (ssc/upsc/railway/ncs/ibps/state_psc/army/police/teaching)",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Print results without saving to DB",
        )

    def handle(self, *args, **options):
        source_filter = options.get("source")
        dry_run = options.get("dry_run", False)

        parsers = ALL_PARSERS
        if source_filter:
            parsers = [p for p in parsers if p.name.lower().replace(" ", "_") == source_filter.lower()]
            if not parsers:
                self.stderr.write(f"Unknown source: {source_filter}")
                return

        total_new = 0
        for parser_cls in parsers:
            parser = parser_cls()
            self.stdout.write(f"\n--- Crawling {parser.name} ---")

            start = time.time()
            log = CrawlLog(source=parser.name)

            try:
                raw_jobs = parser.parse()
                duration = time.time() - start
                log.jobs_found = len(raw_jobs)
                log.duration_seconds = round(duration, 2)

                new_count = 0
                for job_data in raw_jobs:
                    title = job_data.get("title", "").strip()
                    if not title:
                        continue

                    slug = slugify(title)[:550]
                    if not slug:
                        continue

                    if Job.objects.filter(slug=slug).exists():
                        continue

                    if dry_run:
                        self.stdout.write(f"  [NEW] {title}")
                        new_count += 1
                        continue

                    Job.objects.create(
                        title=title,
                        slug=slug,
                        organization=job_data.get("organization", ""),
                        content_type=job_data.get("content_type", "job"),
                        category=job_data.get("category", "other"),
                        state=job_data.get("state", "all_india"),
                        vacancies=job_data.get("vacancies"),
                        last_date=job_data.get("last_date"),
                        age_limit=job_data.get("age_limit"),
                        qualification=job_data.get("qualification"),
                        salary=job_data.get("salary"),
                        apply_link=clean_apply_link(job_data.get("apply_link")),
                        notification_pdf=job_data.get("notification_pdf"),
                        source_url=job_data.get("source_url"),
                        description=job_data.get("description"),
                        fee=job_data.get("fee"),
                        vacancy_details=job_data.get("vacancy_details"),
                    )
                    new_count += 1

                total_new += new_count
                log.jobs_new = new_count
                log.status = "success"
                self.stdout.write(
                    self.style.SUCCESS(
                        f"  {parser.name}: {len(raw_jobs)} found, {new_count} new ({duration:.1f}s)"
                    )
                )

            except Exception as e:
                log.status = "error"
                log.error_message = str(e)
                log.duration_seconds = round(time.time() - start, 2)
                self.stderr.write(self.style.ERROR(f"  {parser.name} ERROR: {e}"))

            if not dry_run:
                log.save()

            time.sleep(2)

        # Deactivate expired listings (all content types with past last_date)
        if not dry_run:
            expired = Job.objects.filter(
                is_active=True, last_date__lt=date.today()
            ).update(is_active=False)
            if expired:
                self.stdout.write(f"Deactivated {expired} expired listings")

            # Also deactivate very old listings with no last_date (>90 days old)
            from datetime import timedelta
            cutoff = date.today() - timedelta(days=90)
            stale = Job.objects.filter(
                is_active=True, last_date__isnull=True, posted_date__lt=cutoff
            ).update(is_active=False)
            if stale:
                self.stdout.write(f"Deactivated {stale} stale listings (>90 days, no deadline)")

        # Ping IndexNow with new job URLs for instant Bing/Yandex indexing
        if total_new > 0 and not dry_run:
            self._ping_indexnow(total_new)

        self.stdout.write(
            self.style.SUCCESS(f"\nDone. Total new jobs: {total_new}")
        )

    def _ping_indexnow(self, count):
        """Submit new job URLs to IndexNow for instant indexing in Bing & Yandex."""
        site_url = getattr(settings, "SITE_URL", "https://sarkarialert.online")
        indexnow_key = getattr(settings, "INDEXNOW_KEY", "d4b9766fae9545049bb8a1278c201405")

        # Get the most recent job slugs (the ones just crawled)
        recent_slugs = list(
            Job.objects.filter(is_active=True)
            .order_by("-created_at")
            .values_list("slug", flat=True)[:count]
        )

        if not recent_slugs:
            return

        urls = [f"{site_url}/jobs/{slug}" for slug in recent_slugs]

        # IndexNow batch API (max 10,000 URLs per request)
        payload = {
            "host": site_url.replace("https://", "").replace("http://", ""),
            "key": indexnow_key,
            "keyLocation": f"{site_url}/{indexnow_key}.txt",
            "urlList": urls[:10000],
        }

        try:
            resp = requests.post(
                "https://api.indexnow.org/indexnow",
                json=payload,
                headers={"Content-Type": "application/json"},
                timeout=30,
            )
            if resp.status_code in (200, 202):
                self.stdout.write(
                    self.style.SUCCESS(f"  IndexNow: submitted {len(urls)} URLs")
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f"  IndexNow: {resp.status_code} — {resp.text[:200]}")
                )
        except Exception as e:
            self.stdout.write(self.style.WARNING(f"  IndexNow ping failed: {e}"))