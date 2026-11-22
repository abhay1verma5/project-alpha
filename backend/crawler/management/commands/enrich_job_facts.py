"""Fill missing facts (last date, fee, age, posts, qualification, official links)
for listings that came from aggregator sites, by reading each notice's own page.

Runs after every crawl with a time budget, newest listings first, so the whole
backlog is covered over a day without any single run hitting the step timeout.
Never overwrites a value we already have.
"""
import time

import requests
from django.core.management.base import BaseCommand
from django.db.models import Case, IntegerField, Q, Value, When

from crawler.management.commands.crawl_jobs import fill_missing_facts
from crawler.parsers.facts import extract_job_facts
from jobs.models import Job

AGGREGATORS = ("sarkariresult.com", "sarkariexam.com", "rojgarresult.com", "freejobalert.com")
LISTING_ENDINGS = ("latest-jobs/", "latestjob.php", "recruitments/", "result/", "admit-card/",
                   "answer-key/", "syllabus/", "admission/", "latest-notifications/")
HEADERS = {"User-Agent": "Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36"}


class Command(BaseCommand):
    help = "Read aggregator detail pages and fill missing job facts (time-boxed)"

    def add_arguments(self, parser):
        parser.add_argument("--limit", type=int, default=150)
        parser.add_argument("--seconds", type=int, default=360)

    def handle(self, *args, **opts):
        started = time.time()
        host_q = Q()
        for h in AGGREGATORS:
            host_q |= Q(source_url__icontains=h)
        qs = (
            Job.objects.filter(is_active=True)
            .filter(host_q)
            .filter(Q(last_date__isnull=True) | Q(fee__isnull=True))
            # Vacancies first (last date + fee matter most there), newest first.
            .annotate(prio=Case(When(content_type="job", then=Value(0)), default=Value(1), output_field=IntegerField()))
            .order_by("prio", "-created_at")
        )
        checked = filled = expired_found = 0
        for job in qs[: opts["limit"] * 2]:
            if checked >= opts["limit"] or time.time() - started > opts["seconds"]:
                break
            url = job.source_url or ""
            if not url.startswith("http") or url.lower().rstrip("/").endswith(tuple(e.rstrip("/") for e in LISTING_ENDINGS)):
                continue
            checked += 1
            try:
                resp = requests.get(url, headers=HEADERS, timeout=(8, 15))
                resp.raise_for_status()
                html = resp.text
            except requests.RequestException:
                continue
            facts = extract_job_facts(html, url)
            if fill_missing_facts(job, facts):
                filled += 1
                if job.last_date and job.last_date < job.updated_at.date():
                    expired_found += 1
            time.sleep(0.3)
        self.stdout.write(
            f"Checked {checked} listings, filled facts for {filled} "
            f"({expired_found} turned out to be past their last date) in {time.time() - started:.0f}s"
        )
