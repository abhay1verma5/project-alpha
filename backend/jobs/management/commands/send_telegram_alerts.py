"""
Management command to send Telegram alerts for jobs posted today.

Idempotent: uses TelegramAlertLog to skip jobs that have already been sent.
Can be safely run multiple times per day (e.g. via cron) without duplicates.

Usage:
    python manage.py send_telegram_alerts
    python manage.py send_telegram_alerts --dry-run
    python manage.py send_telegram_alerts --days 3   # include last 3 days
"""

import re
import time
from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from jobs.models import Job, TelegramAlertLog
from jobs.telegram import notify_new_job


# Exams most aspirants follow go first.
BIG_EXAMS = re.compile(
    r"\b(SSC|UPSC|RRB|Railway|IBPS|SBI|RBI|Police|Constable|CTET|TET|NEET|JEE|CUET|NDA|CDS|"
    r"Agniveer|Army|Navy|Air ?Force|BPSC|UPPSC|RPSC|MPPSC|UPSSSC|UPESSC|DSSSB|HTET|KVS|NVS|LIC|"
    r"Post Office|GDS|Anganwadi|Teacher|Clerk)\b",
    re.I,
)
TYPE_ORDER = {"job": 0, "result": 1, "admit_card": 2, "answer_key": 3, "exam_date": 4, "admission": 5, "syllabus": 6}


def alert_priority(job):
    return (
        not BIG_EXAMS.search(job.title),
        TYPE_ORDER.get(job.content_type, 9),
        -(job.vacancies or 0),
        job.created_at,
    )


class Command(BaseCommand):
    help = "Send Telegram alerts for newly posted jobs (idempotent)"

    def add_arguments(self, parser):
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Preview which alerts would be sent without actually sending them.",
        )
        parser.add_argument(
            "--days",
            type=int,
            default=1,
            help="Look back this many days for new jobs (default: 1 = today only).",
        )
        parser.add_argument(
            "--max",
            type=int,
            default=6,
            help="Send at most this many per run, biggest exams first (default 6, so a channel "
            "on the 3-hourly schedule gets <= ~48/day instead of every crawled item).",
        )

    def handle(self, *args, **options):
        dry_run = options["dry_run"]
        days = options["days"]

        cutoff = timezone.now().date() - timedelta(days=days - 1)

        # Jobs posted on or after the cutoff that have NOT been alerted yet
        jobs = list(
            Job.objects.filter(
                posted_date__gte=cutoff,
                is_active=True,
            )
            .exclude(telegram_alert__isnull=False)
            .exclude(content_type="notice")  # mostly "date extended" copies of a job
            .order_by("created_at")
        )
        jobs.sort(key=alert_priority)
        jobs = jobs[: options["max"]]

        total = len(jobs)
        if total == 0:
            self.stdout.write("No new jobs to alert.")
            return

        self.stdout.write(f"Found {total} job(s) to alert (since {cutoff}).")

        sent = 0
        failed = 0

        for job in jobs:
            if dry_run:
                self.stdout.write(f"  [DRY-RUN] Would send: {job.title}")
                sent += 1
                continue

            result = notify_new_job(job)
            if result:
                TelegramAlertLog.objects.create(job=job)
                sent += 1
                self.stdout.write(f"  Sent: {job.title}")
            else:
                failed += 1
                self.stderr.write(f"  FAILED: {job.title}")

            # Rate-limit: Telegram allows ~30 msgs/sec, but be conservative
            time.sleep(0.5)

        action = "Would send" if dry_run else "Sent"
        msg = f"{action} {sent}/{total} alerts"
        if failed:
            msg += f" ({failed} failed)"
        self.stdout.write(self.style.SUCCESS(msg))
