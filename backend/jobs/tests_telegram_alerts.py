from unittest import mock

from django.core.management import call_command
from django.test import TestCase

from jobs.models import Job, TelegramAlertLog
from jobs.telegram import notify_new_job

CMD = "jobs.management.commands.send_telegram_alerts.notify_new_job"


def _job(slug, title, content_type="job", **kw):
    return Job.objects.create(slug=slug, title=title, organization="Org", content_type=content_type, **kw)


class TelegramAlertTests(TestCase):
    def test_capped_big_exams_first_notice_skipped_and_sent_once(self):
        _job("small", "Some Municipal Clerk Typist Form 2026")  # 'Clerk' is a big-exam word
        _job("tiny", "Village Library Attendant Form 2026", vacancies=3)
        _job("ssc", "SSC GD Constable Online Form 2026", vacancies=50000)
        _job("res", "SSC CGL Result 2026", "result")
        _job("ext", "SSC GD Constable Online Form 2026 – Extended", "notice")
        with mock.patch(CMD, return_value={"ok": True}) as send:
            call_command("send_telegram_alerts", max=2)
        sent = [c.args[0].slug for c in send.call_args_list]
        self.assertEqual(sent, ["ssc", "small"])  # big exams, jobs before results, capped at 2
        with mock.patch(CMD, return_value={"ok": True}) as send:
            call_command("send_telegram_alerts", max=10)
        self.assertEqual(sorted(c.args[0].slug for c in send.call_args_list), ["res", "tiny"])
        self.assertFalse(TelegramAlertLog.objects.filter(job__slug="ext").exists())

    def test_failed_send_is_retried_next_run(self):
        _job("ssc", "SSC GD Constable Online Form 2026")
        with mock.patch(CMD, return_value=None):
            call_command("send_telegram_alerts")
        self.assertEqual(TelegramAlertLog.objects.count(), 0)

    def test_message_links_to_our_page_and_trims_qualification(self):
        job = _job("ssc-gd", "SSC GD 2026", qualification="10th pass " * 40)
        with mock.patch("jobs.telegram.send_telegram_message", return_value={"ok": True}) as send:
            notify_new_job(job)
        text = send.call_args.args[0]
        self.assertIn('href="https://sarkarialert.online/jobs/ssc-gd"', text)
        qual = next(line for line in text.splitlines() if "Qualification" in line)
        self.assertLess(len(qual), 200)
