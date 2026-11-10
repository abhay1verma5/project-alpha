const CACHE_VERSION = 'v3';
const STATIC_CACHE = `sarkarialert-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `sarkarialert-dynamic-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline';

const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.svg',
  '/offline',
];

const MAX_DYNAMIC_CACHE = 100;

// Install — pre-cache static assets + offline page
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== STATIC_CACHE && k !== DYNAMIC_CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Trim dynamic cache to prevent storage bloat
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > maxItems) {
    await Promise.all(keys.slice(0, keys.length - maxItems).map((k) => cache.delete(k)));
  }
}

// Fetch — network-first for API, stale-while-revalidate for pages, cache-first for assets
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Skip chrome-extension and non-http(s) requests
  if (!url.protocol.startsWith('http')) return;

  // Network-first for API calls
  if (url.pathname.startsWith('/api') || url.hostname !== self.location.hostname) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(event.request, clone);
              trimCache(DYNAMIC_CACHE, MAX_DYNAMIC_CACHE);
            });
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          return cached || new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
        })
    );
    return;
  }

  // Cache-first for static assets (fonts, images, CSS, JS)
  if (
    url.pathname.match(/\.(js|css|woff2?|ttf|eot|svg|png|jpg|jpeg|webp|ico|json)$/)
  ) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then((cache) => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => new Response('', { status: 408, statusText: 'Offline' }));
      })
    );
    return;
  }

  // Stale-while-revalidate for HTML pages
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(event.request, clone);
              trimCache(DYNAMIC_CACHE, MAX_DYNAMIC_CACHE);
            });
          }
          return response;
        })
        .catch(async () => {
          // Offline — show offline page for navigation requests
          if (event.request.mode === 'navigate') {
            const offlinePage = await caches.match(OFFLINE_URL);
            return offlinePage || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/html' } });
          }
          return cached || new Response('', { status: 408, statusText: 'Offline' });
        });
      return cached || fetchPromise;
    })
  );
});

// Push notification handler
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {};
  const title = data.title || 'SarkariAlert';
  const options = {
    body: data.body || 'New update available!',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: { url: data.url || '/' },
    actions: data.actions || [],
    vibrate: [100, 50, 100],
    tag: data.tag || 'sarkarialert-notification',
    renotify: true,
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      const existing = clients.find((c) => c.url.includes(url));
      if (existing) return existing.focus();
      return self.clients.openWindow(url);
    })
  );
});
