import logging

import requests
from django.conf import settings
from django.core.management.base import BaseCommand
from django.utils import timezone

from jobs.models import Job

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Send new job alerts to Telegram channel"

    def handle(self, *args, **options):
        token = settings.TELEGRAM_BOT_TOKEN
        channel_id = settings.TELEGRAM_CHANNEL_ID

        if not token or not channel_id:
            self.stderr.write(
                "Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHANNEL_ID env vars"
            )
            return

        today = timezone.now().date()
        new_jobs = Job.objects.filter(
            content_type="job", is_active=True, posted_date=today
        ).order_by("-vacancies")[:10]

        if not new_jobs:
            self.stdout.write("No new jobs today.")
            return

        for job in new_jobs:
            vacancies = f"{job.vacancies:,}" if job.vacancies else "N/A"
            last_date = job.last_date.strftime("%d %b %Y") if job.last_date else "N/A"

            text = (
                f"🏛 *{job.title}*\n\n"
                f"🏢 {job.organization}\n"
                f"📊 Vacancies: {vacancies}\n"
                f"📅 Last Date: {last_date}\n"
                f"🎓 Qualification: {job.qualification or 'See notification'}\n"
                f"💰 Salary: {job.salary or 'As per govt norms'}\n\n"
                f"🔗 [Apply Now]({job.apply_link})\n"
                f"📱 More jobs: sarkarialert.com"
            )

            try:
                url = f"https://api.telegram.org/bot{token}/sendMessage"
                resp = requests.post(
                    url,
                    json={
                        "chat_id": channel_id,
                        "text": text,
                        "parse_mode": "Markdown",
                        "disable_web_page_preview": True,
                    },
                    timeout=10,
                )
                if resp.status_code == 200:
                    self.stdout.write(self.style.SUCCESS(f"Sent: {job.title}"))
                else:
                    self.stderr.write(f"Failed ({resp.status_code}): {job.title}")
            except Exception as e:
                self.stderr.write(f"Error sending {job.title}: {e}")

        self.stdout.write(self.style.SUCCESS(f"Sent {len(new_jobs)} alerts"))
