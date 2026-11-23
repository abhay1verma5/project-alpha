from datetime import date, timedelta
from unittest import mock

from django.core.management import call_command
from django.test import SimpleTestCase, TestCase
from django.utils import timezone

TODAY = timezone.localdate()

from jobs.management.commands.post_to_x import _x_len, compose, oauth1_header, pick_jobs
from jobs.models import Job, XPostLog


class OAuthTests(SimpleTestCase):
    def test_signature_matches_x_documented_example(self):
        # developer.x.com "Creating a signature" worked example.
        header = oauth1_header(
            "POST", "https://api.twitter.com/1.1/statuses/update.json",
            "xvz1evFS4wEEPTGEFPHBog", "kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw",
            "370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb", "LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE",
            nonce="kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg", timestamp=1318622958,
            extra={"status": "Hello Ladies + Gentlemen, a signed OAuth request!", "include_entities": "true"},
        )
        self.assertIn('oauth_signature="hCtSmYh%2BiHYCEqBWrE7C7hYmtUk%3D"', header)


def _job(slug, **kw):
    defaults = dict(title=f"SSC Test Online Form {TODAY.year} ({slug})", organization="SSC",
                    content_type="job", vacancies=1000, last_date=TODAY + timedelta(days=10))
    defaults.update(kw)
    return Job.objects.create(slug=slug, **defaults)


class PickAndComposeTests(TestCase):
    def test_post_fits_and_strips_suffix(self):
        job = _job("a", title="DSSSB MTS & JE Online Form 2026 – Start", qualification="x " * 80)
        text = compose(job)
        self.assertLessEqual(_x_len(text.replace("\n", " ")), 280)
        self.assertNotIn("Start", text.splitlines()[0])
        self.assertIn("https://sarkarialert.online/jobs/a", text)

    def test_skips_closed_old_and_already_posted_and_same_vacancy(self):
        fresh = _job("fresh", vacancies=5000)
        _job("same-vacancy-other-wording", vacancies=5000, last_date=fresh.last_date)
        _job("closed", last_date=TODAY - timedelta(days=1))
        _job("last-year", title="UP Police Online Form 2020", last_date=None)
        posted = _job("posted", vacancies=9000)
        XPostLog.objects.create(job=posted, tweet_id="1")
        picked = [j.slug for j in pick_jobs(5)]
        self.assertEqual(len(picked), 1)  # one of the two same-vacancy pages, nothing else
        self.assertIn(picked[0], {"fresh", "same-vacancy-other-wording"})

    def test_without_credentials_posts_nothing(self):
        _job("fresh")
        with mock.patch.dict("os.environ", {}, clear=False), mock.patch("requests.post") as post:
            call_command("post_to_x")
        post.assert_not_called()
        self.assertEqual(XPostLog.objects.count(), 0)

    def test_posts_and_logs_with_credentials(self):
        _job("fresh")
        env = {k: "x" for k in ("X_API_KEY", "X_API_SECRET", "X_ACCESS_TOKEN", "X_ACCESS_SECRET")}
        resp = mock.Mock(status_code=201, json=lambda: {"data": {"id": "123"}})
        with mock.patch.dict("os.environ", env), mock.patch("requests.post", return_value=resp) as post:
            call_command("post_to_x")
            call_command("post_to_x")  # second run: already posted, nothing new
        self.assertEqual(post.call_count, 1)
        self.assertEqual(XPostLog.objects.get().tweet_id, "123")
