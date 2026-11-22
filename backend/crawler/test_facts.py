from django.test import SimpleTestCase

from crawler.parsers.facts import extract_job_facts, parse_date

SR_PAGE = """<html><body><h2>Important Dates</h2><ul>
<li>Application Begin : 08/09/2026</li><li>Last Date for Apply Online : 29/09/2026</li>
<li>Pay Exam Fee Last Date : 30/09/2026</li></ul>
<h2>Application Fee</h2><ul><li>General (UR) / OBC / EWS : 25/-</li><li>SC / ST : 25/-</li></ul>
<h2>Age Limit as on 01/07/2026</h2><ul><li>Minimum Age : 21 Years</li><li>Maximum Age : 40 Years</li></ul>
<p>Vacancy Details Total : 1251 Post</p>
<h2>Eligibility</h2><p>Candidates must have passed 10+2 Intermediate with Biology from a recognized board.</p>
<table><tr><td>Apply Online</td><td><a href="https://upsssc.gov.in/apply">Click Here</a></td></tr>
<tr><td>Download Notification</td><td><a href="https://upsssc.gov.in/notice.pdf">Click Here</a></td></tr>
<tr><td>Join Telegram</td><td><a href="https://t.me/x">Join</a></td></tr>
<tr><td>Official Website</td><td><a href="https://www.sarkariresult.com/">Click Here</a></td></tr></table>
</body></html>"""


class FactsTests(SimpleTestCase):
    def test_sarkariresult_style_page(self):
        f = extract_job_facts(SR_PAGE, "https://www.sarkariresult.com/2026/upsssc-leo/")
        self.assertEqual(str(f["last_date"]), "2026-09-29")  # not the fee-payment date
        self.assertEqual(f["fee"], {"General (UR) / OBC / EWS": "₹25", "SC / ST": "₹25"})
        self.assertEqual(f["age_limit"], "21–40 years (as on 01/07/2026)")
        self.assertEqual(f["vacancies"], 1251)
        self.assertIn("10+2 Intermediate", f["qualification"])
        self.assertEqual(f["apply_link"], "https://upsssc.gov.in/apply")
        self.assertEqual(f["notification_pdf"], "https://upsssc.gov.in/notice.pdf")

    def test_dates(self):
        self.assertEqual(str(parse_date("Last Date for Registration : 27 September 2026")), "2026-09-27")
        self.assertEqual(str(parse_date("Last Date – 02-December-2021")), "2021-12-02")
        self.assertIsNone(parse_date("no date here"))

    def test_unknown_page_gives_nothing(self):
        self.assertEqual(extract_job_facts("<html><body>Hello</body></html>", "https://x.com/a"), {})
