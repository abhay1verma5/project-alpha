from django.core.management import call_command
from django.test import TestCase

from jobs.models import Job


class RecategorizeTitleWinsTests(TestCase):
    def _job(self, slug, title, ct):
        return Job.objects.create(slug=slug, title=title, organization="Org", content_type=ct)

    def test_offline_form_on_admit_card_section_becomes_job(self):
        j = self._job("army", "Indian Army Havildar and Naib Subedar (Sports Quota) Offline Form 2026", "admit_card")
        call_command("recategorize_jobs", "--all", stdout=open("/dev/null", "w"))
        j.refresh_from_db()
        self.assertEqual(j.content_type, "job")

    def test_real_admit_card_and_untyped_title_keep_section_type(self):
        a = self._job("ssc", "SSC CPO SI CAPF Admit Card 2026", "admit_card")
        b = self._job("x", "Haryana Police Constable 2026", "admit_card")  # no type word: keep page type
        call_command("recategorize_jobs", "--all", stdout=open("/dev/null", "w"))
        a.refresh_from_db(); b.refresh_from_db()
        self.assertEqual(a.content_type, "admit_card")
        self.assertEqual(b.content_type, "admit_card")
