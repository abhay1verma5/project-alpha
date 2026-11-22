from django.core.cache import cache
from django.test import SimpleTestCase


class TopicWeightageApiTests(SimpleTestCase):
    base = "/api/topic-weightage/"

    # Production settings redirect plain HTTP to HTTPS (SECURE_SSL_REDIRECT), so tests use https.
    # The anon throttle (30/min) would trip across the many requests here, so the cache is reset.
    def get(self, url, data=None):
        cache.clear()
        return self.client.get(url, data, secure=True)

    def _all_slugs(self):
        response = self.get(self.base)
        self.assertEqual(response.status_code, 200)
        return [exam["slug"] for exam in response.json()["results"]]

    def test_list_returns_all_exams_with_contract_shape(self):
        response = self.get(self.base)
        self.assertEqual(response.status_code, 200)
        body = response.json()
        self.assertEqual(body["count"], 56)
        self.assertEqual(len(body["results"]), 56)
        self.assertEqual(
            set(body["filters"].keys()), {"categories", "levels", "states"}
        )
        first = body["results"][0]
        for key in (
            "slug", "exam", "paper", "category", "level", "state", "total_questions",
            "total_marks", "duration", "negative_marking", "subjects", "top_topics",
            "color", "approx", "as_of",
        ):
            self.assertIn(key, first)
        self.assertLessEqual(len(first["top_topics"]), 3)

    def test_each_subject_normalized_weightage_sums_to_100(self):
        for slug in self._all_slugs():
            with self.subTest(slug=slug):
                body = self.get(f"{self.base}{slug}/").json()
                self.assertTrue(body["subjects"])
                for subject in body["subjects"]:
                    total = sum(topic["weightage"] for topic in subject["topics"])
                    self.assertEqual(total, 100, subject["subject"])

    def test_weightage_raw_is_preserved(self):
        body = self.get(f"{self.base}gate-cse/").json()
        raw_total = sum(
            topic["weightage_raw"] for topic in body["subjects"][0]["topics"]
        )
        self.assertEqual(raw_total, 75)

    def test_query_data_interpretation_finds_ssc_cgl(self):
        body = self.get(self.base, {"q": "data interpretation"}).json()
        slugs = [exam["slug"] for exam in body["results"]]
        self.assertIn("ssc-cgl", slugs)

    def test_query_requires_every_word_to_match(self):
        body = self.get(self.base, {"q": "data zzzqqq"}).json()
        self.assertEqual(body["count"], 0)

    def test_category_railway_returns_only_railway(self):
        body = self.get(self.base, {"category": "railway"}).json()
        self.assertGreater(body["count"], 0)
        self.assertTrue(all(exam["category"] == "railway" for exam in body["results"]))

    def test_trend_filter_keeps_exams_with_matching_topic(self):
        body = self.get(self.base, {"trend": "high"}).json()
        self.assertGreater(body["count"], 0)
        for exam in body["results"]:
            detail = self.get(f"{self.base}{exam['slug']}/").json()
            trends = [
                topic["trend"] for subject in detail["subjects"] for topic in subject["topics"]
            ]
            self.assertIn("high", trends, exam["slug"])

    def test_sort_questions_orders_by_total_questions_desc(self):
        body = self.get(self.base, {"sort": "questions"}).json()
        counts = [exam["total_questions"] for exam in body["results"]]
        self.assertEqual(counts, sorted(counts, reverse=True))

    def test_facet_counts_cover_all_exams(self):
        body = self.get(self.base).json()
        self.assertEqual(sum(item["count"] for item in body["filters"]["categories"]), 56)
        self.assertEqual(sum(item["count"] for item in body["filters"]["levels"]), 56)
        self.assertEqual(sum(item["count"] for item in body["filters"]["states"]), 56)

    def test_duplicate_up_police_names_are_distinct(self):
        names = [exam["exam"] for exam in self.get(self.base).json()["results"]]
        up_police = [name for name in names if name.startswith("UP Police Constable")]
        self.assertEqual(len(up_police), 2)
        self.assertEqual(len(set(up_police)), 2)

    def test_invalid_filter_value_returns_400(self):
        response = self.get(self.base, {"category": "nonsense"})
        self.assertEqual(response.status_code, 400)

    def test_unknown_slug_returns_404(self):
        response = self.get(f"{self.base}no-such-exam/")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.json(), {"error": "not found"})

    def test_normalization_uses_largest_remainder(self):
        from weightage.views import _normalize_weightages

        self.assertEqual(_normalize_weightages([1, 1, 1]), [34, 33, 33])
        self.assertEqual(_normalize_weightages([0, 0]), [0, 0])
        self.assertEqual(sum(_normalize_weightages([7, 3, 11, 5])), 100)
