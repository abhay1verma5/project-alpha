from datetime import date

from django.test import SimpleTestCase, TestCase

from crawler.management.commands.merge_duplicate_jobs import group_duplicates, merge_group
from jobs.dedupe import dedupe_key, same_listing
from jobs.models import Job
from jobs.serializers import JobDetailSerializer


class SameListingTests(SimpleTestCase):
    def test_aggregator_wordings_match(self):
        a = "UPESSC UP TGT Online Form 2026 (17,735 Posts)"
        self.assertTrue(same_listing(a, "job", "UPESSC UP TGT Online Form 2026 for 17735 Post", "job"))
        self.assertTrue(same_listing(a, "job", "UPESSC UP TGT Online Form 2026 (17,735 Posts) – Extended", "notice"))
        self.assertTrue(same_listing("BSF LDCE SI Online Form 2026 (1167 Vacancy)", "job",
                                     "BSF SI Sub Inspector LDCE Online Form 2026 for 1167 Post", "job"))

    def test_different_events_stay_separate(self):
        self.assertFalse(same_listing("SSC GD Constable Online Form 2026", "job", "SSC GD Constable Result 2026", "result"))
        self.assertFalse(same_listing("SSC GD Result 2026", "result", "SSC GD Revised Result 2026", "result"))
        self.assertFalse(same_listing("UPESSC PRT Assistant Teacher Online Form 2026 (12405 Posts)", "job",
                                      "UPESSC UP Primary Teacher PRT Correction Form 2026 for 12405 Post", "job"))
        self.assertFalse(same_listing("UPSSSC Lower PCS 10+2 Online Form 2026 for 1784 Post", "job",
                                      "UPSSSC Inter Level Online Form 2026 (1784 Posts)", "job"))

    def test_different_years_and_generic_titles_never_match(self):
        self.assertFalse(same_listing("SSC CGL Online Form 2025", "job", "SSC CGL Online Form 2026", "job"))
        self.assertIsNone(dedupe_key("Online Form 2026"))
        self.assertIsNone(dedupe_key("SSC GD Constable Online Form"))


def _job(title, slug, content_type="job", **kw):
    return Job.objects.create(title=title, slug=slug, organization=kw.pop("organization", ""),
                              content_type=content_type, **kw)


class MergeTests(TestCase):
    def test_merge_keeps_complete_page_takes_later_date_and_redirects(self):
        keep = _job("UPESSC UP TGT Online Form 2026 (17,735 Posts)", "tgt-a", organization="UPESSC",
                    qualification="Graduate + B.Ed", last_date=date(2026, 11, 20))
        ext = _job("UPESSC UP TGT Online Form 2026 (17,735 Posts) – Extended", "tgt-b", "notice",
                   last_date=date(2026, 11, 23), salary="Level 7")
        other = _job("SSC GD Constable Result 2026", "gd-res", "result")
        groups = group_duplicates(list(Job.objects.filter(is_active=True).order_by("id")))
        self.assertEqual(len(groups), 1)
        merge_group(groups[0])
        keep.refresh_from_db(); ext.refresh_from_db(); other.refresh_from_db()
        self.assertTrue(keep.is_active)
        self.assertFalse(ext.is_active)
        self.assertTrue(other.is_active)
        self.assertEqual(keep.last_date, date(2026, 11, 23))
        self.assertEqual(keep.salary, "Level 7")
        self.assertEqual(JobDetailSerializer(ext).data["replacement_slug"], "tgt-a")
        self.assertIsNone(JobDetailSerializer(keep).data["replacement_slug"])
