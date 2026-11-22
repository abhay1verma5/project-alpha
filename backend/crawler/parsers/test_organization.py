from django.test import SimpleTestCase

from crawler.parsers.base import extract_organization


class ExtractOrganizationTests(SimpleTestCase):
    def test_known_bodies_use_short_name(self):
        self.assertEqual(extract_organization("RRB NTPC Recruitment 2026 - 11558 Posts"), "RRB")
        self.assertEqual(extract_organization("UPSSSC PET 2026 Notification"), "UPSSSC")
        self.assertEqual(extract_organization("IBPS Clerk XV Notification 2026"), "IBPS")

    def test_long_names_map_to_short_form(self):
        self.assertEqual(extract_organization("Staff Selection Commission CGL 2026"), "SSC")
        self.assertEqual(
            extract_organization("Railway Recruitment Board Group D 2026"), "RRB"
        )

    def test_multiword_organization_kept_whole(self):
        self.assertEqual(
            extract_organization("Coal India Limited Management Trainee Recruitment 2026"),
            "Coal India Limited",
        )
        self.assertEqual(extract_organization("Indian Army Agniveer 2026 Rally"), "Indian Army")

    def test_uppsc_does_not_match_upsc(self):
        self.assertEqual(extract_organization("UPPSC Assistant Professor 2026"), "UPPSC")

    def test_earliest_known_body_wins(self):
        self.assertEqual(
            extract_organization("Recruitment for SSC posts at Indian Army 2026"), "SSC"
        )

    def test_text_before_dash_used_when_no_known_body(self):
        self.assertEqual(extract_organization("Kerala PSC - Lecturer 2026"), "Kerala PSC")

    def test_job_title_before_dash_is_not_organization(self):
        self.assertEqual(extract_organization("Junior Engineer - Ghaziabad Nagar Nigam 2026"), "")
        self.assertEqual(
            extract_organization("Recruitment for 500 posts - Last date 12/03/2026"), ""
        )
        self.assertEqual(extract_organization("SSC CGL 2026 - Notification"), "SSC")

    def test_empty_and_unknown_titles(self):
        self.assertEqual(extract_organization(""), "")
        self.assertEqual(extract_organization(None), "")
        self.assertEqual(extract_organization("Nursing Officer 2026"), "")
