from django.test import TestCase

from pyq.models import ExamQuestion


def q(n, year, subject, source="crawled"):
    return ExamQuestion.objects.create(
        exam_type="jee_main", year=year, subject=subject, question_text=f"Q{n} {source} {year} {subject}",
        options=["a", "b", "c", "d"], correct_answer=1, source=source,
    )


class PaperEndpointsTests(TestCase):
    def setUp(self):
        for i in range(3):
            q(i, 2024, "Physics")
        q(10, 2024, "Chemistry")
        q(11, 2023, "Maths")
        q(12, 2024, "Physics", source="ai_generated")  # never part of a past paper

    def test_years_list_real_only(self):
        d = self.client.get("/api/pyq/papers/?exam=jee_main", secure=True).json()
        self.assertEqual([y["year"] for y in d["years"]], [2024, 2023])
        self.assertEqual(d["years"][0]["questions"], 4)

    def test_paper_with_subject_and_pages(self):
        d = self.client.get("/api/pyq/paper/?exam=jee_main&year=2024&page_size=2", secure=True).json()
        self.assertEqual(d["count"], 4)
        self.assertEqual(d["pages"], 2)
        self.assertEqual({s["subject"] for s in d["subjects"]}, {"Physics", "Chemistry"})
        self.assertIn("correct_answer", d["results"][0])
        d = self.client.get("/api/pyq/paper/?exam=jee_main&year=2024&subject=physics", secure=True).json()
        self.assertEqual(d["count"], 3)

    def test_bad_params(self):
        self.assertEqual(self.client.get("/api/pyq/papers/", secure=True).status_code, 400)
        self.assertEqual(self.client.get("/api/pyq/paper/?exam=jee_main&year=x", secure=True).status_code, 400)
