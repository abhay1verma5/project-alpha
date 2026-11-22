from datetime import date

from django.core.cache import cache
from django.test import TestCase, override_settings
from rest_framework.test import APIClient

from .filters import tokenize_search_query
from .models import Job


def make_job(title, organization="Test Org", category="other", state="all_india",
             qualification=None, is_active=True, posted=None):
    job = Job.objects.create(
        title=title,
        organization=organization,
        category=category,
        state=state,
        qualification=qualification,
        is_active=is_active,
    )
    if posted:
        Job.objects.filter(pk=job.pk).update(posted_date=posted)
    return job


class SearchTokenizeTests(TestCase):
    def test_lowercases_and_drops_stop_words(self):
        self.assertEqual(
            tokenize_search_query("10th Pass Railway JOB UP"),
            ["10th", "pass", "railway", "up"],
        )

    def test_keeps_pass_word(self):
        self.assertIn("pass", tokenize_search_query("10th pass"))

    def test_folds_high_school_phrase_to_10th(self):
        self.assertEqual(tokenize_search_query("high school railway"), ["10th", "railway"])

    def test_all_stop_words_fall_back_to_first_two_words(self):
        self.assertEqual(tokenize_search_query("job for the"), ["job", "for"])


@override_settings(SECURE_SSL_REDIRECT=False)
class SearchViewTests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = APIClient()
        self.railway_up_10th = make_job(
            "Railway Group D", organization="RRC Lucknow", category="railway",
            state="uttar_pradesh", qualification="10th Pass", posted=date(2026, 11, 10),
        )
        self.railway_up_matric = make_job(
            "Railway Helper", organization="RRC Prayagraj", category="railway",
            state="uttar_pradesh", qualification="Matric", posted=date(2026, 11, 9),
        )
        self.railway_mp_12th = make_job(
            "Railway Ticket Clerk", organization="RRB Bhopal", category="railway",
            state="madhya_pradesh", qualification="12th Pass", posted=date(2026, 11, 8),
        )
        self.up_police = make_job(
            "UP Police Constable", organization="UPPRPB", category="police",
            state="uttar_pradesh", qualification="12th", posted=date(2026, 11, 7),
        )
        self.inactive = make_job(
            "Railway Group D Closed", category="railway", state="uttar_pradesh",
            qualification="10th Pass", is_active=False,
        )

    def get_search(self, query_string):
        return self.client.get(f"/api/search/?{query_string}").json()

    def test_response_keys_and_compat_results(self):
        data = self.get_search("q=railway")
        self.assertEqual(set(data), {"count", "next", "previous", "results"})
        self.assertEqual(data["count"], 3)
        self.assertIsNone(data["next"])
        self.assertIsNone(data["previous"])

    def test_multi_word_query_ranks_full_match_first_and_excludes_inactive(self):
        data = self.get_search("q=10th+pass+railway+job+UP")
        ids = [row["id"] for row in data["results"]]
        self.assertEqual(ids[0], self.railway_up_10th.id)
        self.assertNotIn(self.inactive.id, ids)
        self.assertIn(self.railway_up_matric.id, ids)
        # fallback ranking by matched words: 10th-pass UP railway > matric UP railway > MP railway
        self.assertLess(ids.index(self.railway_up_matric.id), ids.index(self.railway_mp_12th.id))
        self.assertEqual(data["count"], len(ids))

    def test_and_results_only_when_enough_matches(self):
        for index in range(5):
            make_job(f"Railway Track Maintainer {index}", category="railway",
                     state="uttar_pradesh", qualification="10th Pass")
        data = self.get_search("q=10th+pass+railway+up")
        # 5 new jobs + railway_up_10th from setUp; no OR fallback jobs (matric, MP, police)
        self.assertEqual(data["count"], 6)
        ids = {row["id"] for row in data["results"]}
        self.assertIn(self.railway_up_10th.id, ids)
        self.assertNotIn(self.railway_up_matric.id, ids)
        self.assertNotIn(self.railway_mp_12th.id, ids)
        self.assertNotIn(self.up_police.id, ids)

    def test_synonyms_map_state_and_category(self):
        data = self.get_search("q=uttar+pradesh+police")
        ids = [row["id"] for row in data["results"]]
        self.assertEqual(ids[0], self.up_police.id)

    def test_case_insensitive_and_high_school_phrase(self):
        data = self.get_search("q=HIGH+SCHOOL+RAILWAY+UP")
        ids = [row["id"] for row in data["results"]]
        self.assertEqual(ids[0], self.railway_up_10th.id)

    def test_short_query_returns_empty_with_all_keys(self):
        data = self.get_search("q=a")
        self.assertEqual(data, {"count": 0, "next": None, "previous": None, "results": []})

    def test_pagination_links_and_page_size_cap(self):
        for index in range(25):
            make_job(f"Railway Pager {index}", category="railway")
        first = self.get_search("q=railway&page_size=20")
        self.assertEqual(first["count"], 28)
        self.assertEqual(len(first["results"]), 20)
        self.assertIn("page=2", first["next"])
        self.assertIsNone(first["previous"])
        second = self.get_search("q=railway&page=2&page_size=20")
        self.assertEqual(len(second["results"]), 8)
        self.assertIsNone(second["next"])
        self.assertIn("page=1", second["previous"])

    def test_page_size_capped_at_50(self):
        for index in range(55):
            make_job(f"Railway Bulk {index}", category="railway")
        data = self.get_search("q=railway&page_size=500")
        self.assertEqual(data["count"], 58)
        self.assertEqual(len(data["results"]), 50)

    def test_invalid_page_params_use_defaults(self):
        data = self.get_search("q=railway&page=abc&page_size=-4")
        self.assertEqual(len(data["results"]), 3)
        self.assertEqual(data["count"], 3)


@override_settings(SECURE_SSL_REDIRECT=False)
class JobListSearchTests(TestCase):
    def setUp(self):
        cache.clear()
        self.client = APIClient()
        self.railway_up = make_job(
            "Railway Group D", category="railway", state="uttar_pradesh",
            qualification="10th Pass",
        )
        self.railway_mp = make_job(
            "Railway Ticket Clerk", category="railway", state="madhya_pradesh",
            qualification="12th Pass",
        )

    def test_search_param_uses_word_logic(self):
        response = self.client.get("/api/jobs/?search=10th+pass+railway+up")
        self.assertEqual(response.status_code, 200)
        ids = [row["id"] for row in response.json()["results"]]
        self.assertIn(self.railway_up.id, ids)
        self.assertIn(self.railway_mp.id, ids)
        self.assertEqual(ids[0], self.railway_up.id)

    def test_search_param_with_fewer_words_is_not_a_plain_substring_match(self):
        response = self.client.get("/api/jobs/?search=up")
        ids = [row["id"] for row in response.json()["results"]]
        self.assertIn(self.railway_up.id, ids)
        self.assertNotIn(self.railway_mp.id, ids)
