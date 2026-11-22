"""Per-IP hourly limiter for the AI endpoints, backed by Django's cache.

Fixed one-hour buckets per client IP. Each process/cache backend keeps its own
counts, so the effective limit is per cache (per worker with the default
LocMemCache, shared with a Redis/Memcached cache backend).
"""

import hashlib
import time

from django.core.cache import cache

HOUR_SECONDS = 60 * 60


def client_ip(request):
    """Client address as seen by the last proxy hop.

    Behind a proxy that appends to X-Forwarded-For, the rightmost entry is the
    address the proxy saw; the leftmost entry is whatever the client sent.
    """
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR", "")
    if forwarded:
        return forwarded.split(",")[-1].strip() or "unknown"
    return request.META.get("REMOTE_ADDR") or "unknown"


def allow_request(request, scope, limit):
    """Count this request against `scope` for the caller's IP.

    Returns True while the caller is within `limit` requests in the current hour.
    """
    bucket = int(time.time() // HOUR_SECONDS)
    ip_hash = hashlib.sha256(client_ip(request).encode()).hexdigest()
    key = f"ai-rate:{scope}:{ip_hash}:{bucket}"
    try:
        cache.add(key, 0, timeout=HOUR_SECONDS)
        count = cache.incr(key)
    except ValueError:
        # The key expired between add() and incr(); start a fresh bucket.
        cache.set(key, 1, timeout=HOUR_SECONDS)
        count = 1
    return count <= limit
