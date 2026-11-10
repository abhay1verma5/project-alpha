"""Send "closing soon" reminders to Telegram subscribers.

Runs once a day. Each subscriber gets one message listing jobs whose last
date is exactly 3 days or 1 day away, filtered by their /cat and /state
settings (empty = everything).

Usage:
    python manage.py send_deadline_reminders
    python manage.py send_deadline_reminders --dry-run
"""

import time
from datetime import timedelta

from django.core.management.base import BaseCommand
from django.db.models import Q
from django.utils import timezone

from jobs.models import ContentType, Job, TelegramSubscriber
from jobs.telegram import send_telegram_message, _escape_html

REMIND_DAYS = (3, 1)
SITE_URL = "https://sarkarialert.online"


class Command(BaseCommand):
    help = "Telegram reminders for jobs closing in 3 days and 1 day"

    def add_arguments(self, parser):
        parser.add_argument("--dry-run", action="store_true")

    def handle(self, *args, **options):
        today = timezone.now().date()
        targets = {today + timedelta(days=d): d for d in REMIND_DAYS}
        closing = list(
            Job.objects.filter(
                is_active=True, content_type=ContentType.JOB, last_date__in=list(targets)
            ).order_by("last_date", "-vacancies")
        )
        if not closing:
            self.stdout.write("Nothing closing in 3 or 1 days.")
            return

        subscribers = TelegramSubscriber.objects.filter(is_active=True)
        sent = 0
        for sub in subscribers:
            jobs = [
                j for j in closing
                if (not sub.categories or j.category in sub.categories)
                and (not sub.states or j.state in sub.states or j.state == "all_india")
            ][:15]
            if not jobs:
                continue

            lines = ["⏰ <b>Closing soon</b>", ""]
            for j in jobs:
                days = targets[j.last_date]
                when = "tomorrow" if days == 1 else f"in {days} days"
                lines.append(
                    f"• <a href=\"{SITE_URL}/jobs/{j.slug}\">{_escape_html(j.title[:90])}</a>"
                    f" — last date {j.last_date.strftime('%d %b')} ({when})"
                )
            lines += ["", "Never pay anyone to apply. Use only the official link on each page."]
            text = "\n".join(lines)

            if options["dry_run"]:
                self.stdout.write(f"[DRY-RUN] {sub.chat_id}: {len(jobs)} jobs")
                sent += 1
                continue
            if send_telegram_message(text, chat_id=str(sub.chat_id)):
                sent += 1
            time.sleep(0.1)

        self.stdout.write(self.style.SUCCESS(f"Reminders sent to {sent} subscribers ({len(closing)} jobs closing)"))
