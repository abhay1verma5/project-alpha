"""
Proxy manager using Scylla (https://github.com/MikeChongCan/scylla).

Scylla provides a REST API for fetching free proxies.
Default API: http://localhost:8899/api/v1/proxies
"""

import logging
import random

import requests

logger = logging.getLogger(__name__)

SCYLLA_API = "http://localhost:8899/api/v1/proxies"


class ProxyManager:
    """Fetch and rotate proxies from Scylla proxy pool."""

    def __init__(self, scylla_url=None):
        self.scylla_url = scylla_url or SCYLLA_API
        self._proxies = []
        self._index = 0

    def refresh(self, count=20, protocol="http"):
        """Fetch fresh proxies from Scylla."""
        try:
            resp = requests.get(
                self.scylla_url,
                params={"limit": count, "protocol": protocol, "is_valid": True},
                timeout=10,
            )
            data = resp.json()
            self._proxies = [
                f"{p.get('protocol', 'http')}://{p['ip']}:{p['port']}"
                for p in data.get("proxies", [])
                if p.get("ip") and p.get("port")
            ]
            logger.info("Fetched %d proxies from Scylla", len(self._proxies))
        except Exception as e:
            logger.warning("Failed to fetch proxies from Scylla: %s", e)
            self._proxies = []

    def get_proxy(self):
        """Get next proxy (round-robin). Returns None if no proxies available."""
        if not self._proxies:
            self.refresh()
        if not self._proxies:
            return None
        proxy = self._proxies[self._index % len(self._proxies)]
        self._index += 1
        return {"http": proxy, "https": proxy}

    def get_random_proxy(self):
        """Get a random proxy."""
        if not self._proxies:
            self.refresh()
        if not self._proxies:
            return None
        proxy = random.choice(self._proxies)
        return {"http": proxy, "https": proxy}

    @property
    def available(self):
        return len(self._proxies)


# Singleton
proxy_manager = ProxyManager()
