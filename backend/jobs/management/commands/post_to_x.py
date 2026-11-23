"""Post the biggest new vacancies to X (Twitter) through the official API v2.

Needs X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET (OAuth 1.0a user context,
app permission "Read and write"). Without them it does nothing. Each job is posted once
(XPostLog), at most --max per run and --daily-cap per UTC day.

    python manage.py post_to_x --dry-run       # print the posts, send nothing
"""
import base64
import hashlib
import hmac
import os
import re
import secrets
import time
import urllib.parse
from datetime import timedelta

import requests
from django.core.management.base import BaseCommand
from django.db.models import BooleanField, ExpressionWrapper, F, Q
from django.utils import timezone

from jobs.models import Job, XPostLog

SITE = "https://sarkarialert.online"
TWEET_URL = "https://api.x.com/2/tweets"
URL_LEN = 23  # X counts every link as 23 characters
LIMIT = 280


def _pct(s):
    return urllib.parse.quote(str(s), safe="~")


def oauth1_header(method, url, key, secret, token, token_secret, nonce=None, timestamp=None, extra=None):
    """OAuth 1.0a HMAC-SHA1 header. JSON bodies are not signed; `extra` = query/form params."""
    params = {
        "oauth_consumer_key": key,
        "oauth_nonce": nonce or secrets.token_hex(16),
        "oauth_signature_method": "HMAC-SHA1",
        "oauth_timestamp": str(timestamp or int(time.time())),
        "oauth_token": token,
        "oauth_version": "1.0",
    }
    signed = {**params, **(extra or {})}
    base = "&".join([method.upper(), _pct(url),
                     _pct("&".join(f"{_pct(k)}={_pct(v)}" for k, v in sorted(signed.items())))])
    signing_key = f"{_pct(secret)}&{_pct(token_secret)}".encode()
    params["oauth_signature"] = base64.b64encode(
        hmac.new(signing_key, base.encode(), hashlib.sha1).digest()).decode()
    return "OAuth " + ", ".join(f'{_pct(k)}="{_pct(v)}"' for k, v in sorted(params.items()))


def _x_len(text):
    """X's weighted length: links = 23, chars above U+10FF (emoji, CJK) = 2, others = 1."""
    words = text.split(" ")
    return sum(URL_LEN if w.startswith("http") else sum(2 if ord(c) > 0x10FF else 1 for c in w)
               for w in words) + len(words) - 1


def compose(job):
    """Hindi + English post: who can apply, posts, last date, link. Always <= 280 (X count)."""
    link = f"{SITE}/jobs/{job.slug}"
    title = re.sub(r"\s*[–-]\s*(Start|Last Date|Out|Extended|Date Extended)\s*$", "", job.title, flags=re.I)
    lines = [f"🔔 {title}"]
    if job.vacancies:
        lines.append(f"📊 पद / Posts: {job.vacancies:,}")
    if job.last_date:
        lines.append(f"📅 अंतिम तिथि / Last date: {job.last_date.strftime('%d %b %Y')}")
    if job.qualification:  # last, so it is the first line dropped when the post is too long
        q = job.qualification if len(job.qualification) <= 60 else job.qualification[:60].rsplit(" ", 1)[0] + "…"
        lines.append(f"🎓 योग्यता: {q}")
    tail = f"👉 {link}\n#SarkariNaukri #GovtJobs"
    text = "\n".join(lines + [tail])
    while _x_len(text.replace("\n", " ")) > LIMIT and len(lines) > 1:
        lines.pop()
        text = "\n".join(lines + [tail])
    if _x_len(text.replace("\n", " ")) > LIMIT:
        room = LIMIT - _x_len(tail.replace("\n", " ")) - 4
        text = f"{lines[0][:room]}…\n{tail}"
    return text


def pick_jobs(limit):
    """New, still-open vacancies: last date ahead, or no date but this year's notification.
    Jobs with a known last date first (better post), then the most posts."""
    today = timezone.localdate()
    qs = (Job.objects.filter(is_active=True, content_type="job", x_post__isnull=True,
                             posted_date__gte=today - timedelta(days=2))
          .exclude(organization="")
          .filter(Q(last_date__gte=today) | Q(last_date__isnull=True, title__contains=str(today.year)))
          .annotate(no_date=ExpressionWrapper(Q(last_date__isnull=True), output_field=BooleanField()))
          .order_by("no_date", F("vacancies").desc(nulls_last=True), "-id"))
    # Same vacancy under another aggregator's title (same post count + last date) -> post once.
    posted = XPostLog.objects.filter(posted_at__gte=timezone.now() - timedelta(days=30)).select_related("job")
    seen = {(p.job.vacancies, p.job.last_date) for p in posted if p.job.vacancies}
    picked = []
    for job in qs[: limit * 10]:
        sig = (job.vacancies, job.last_date)
        if job.vacancies and sig in seen:
            continue
        seen.add(sig)
        picked.append(job)
        if len(picked) == limit:
            break
    return picked


class Command(BaseCommand):
    help = "Post the biggest new vacancies to X (official API)."

    def add_arguments(self, parser):
        parser.add_argument("--max", type=int, default=2)
        parser.add_argument("--daily-cap", type=int, default=8)
        parser.add_argument("--dry-run", action="store_true")

    def handle(self, *args, **o):
        creds = [os.environ.get(k, "") for k in ("X_API_KEY", "X_API_SECRET", "X_ACCESS_TOKEN", "X_ACCESS_SECRET")]
        if not all(creds) and not o["dry_run"]:
            self.stdout.write("X credentials not set; skipping.")
            return
        today = timezone.now().replace(hour=0, minute=0, second=0, microsecond=0)
        room = o["daily_cap"] - XPostLog.objects.filter(posted_at__gte=today).count()
        jobs = pick_jobs(min(o["max"], max(room, 0)))
        if not jobs:
            self.stdout.write("Nothing to post (no new vacancies or daily cap reached).")
            return
        for job in jobs:
            text = compose(job)
            if o["dry_run"]:
                self.stdout.write(f"--- {job.slug} ({_x_len(text.replace(chr(10), ' '))} chars)\n{text}")
                continue
            try:
                resp = requests.post(TWEET_URL, json={"text": text}, timeout=15,
                                     headers={"Authorization": oauth1_header("POST", TWEET_URL, *creds)})
            except requests.RequestException as e:
                self.stderr.write(f"X request failed for {job.slug}: {e}")
                return
            if resp.status_code == 201:
                XPostLog.objects.create(job=job, tweet_id=resp.json()["data"]["id"])
                self.stdout.write(self.style.SUCCESS(f"Posted {job.slug}"))
            else:
                # 429/403 etc.: stop this run; the next run retries the same jobs.
                self.stderr.write(f"X rejected {job.slug}: {resp.status_code} {resp.text[:200]}")
                return
