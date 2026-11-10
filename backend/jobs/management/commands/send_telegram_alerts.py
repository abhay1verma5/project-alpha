"""
Management command to send Telegram alerts for jobs posted today.

Idempotent: uses TelegramAlertLog to skip jobs that have already been sent.
Can be safely run multiple times per day (e.g. via cron) without duplicates.

Usage:
    python manage.py send_telegram_alerts
    python manage.py send_telegram_alerts --dry-run
    python manage.py send_telegram_alerts --days 3   # include last 3 days
"""

import time
from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from jobs.models import Job, TelegramAlertLog
from jobs.telegram import notify_new_job


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

    def handle(self, *args, **options):
        dry_run = options["dry_run"]
        days = options["days"]

        cutoff = timezone.now().date() - timedelta(days=days - 1)

        # Jobs posted on or after the cutoff that have NOT been alerted yet
        jobs = (
            Job.objects.filter(
                posted_date__gte=cutoff,
                is_active=True,
            )
            .exclude(telegram_alert__isnull=False)
            .order_by("created_at")
        )

        total = jobs.count()
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
