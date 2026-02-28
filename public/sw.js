const CACHE_NAME = 'ridenet-pwa-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    // Pass-through fetch to satisfy PWA installability requirements
    // In a full PWA, we'd aggressively cache static assets here.
    event.respondWith(
        fetch(event.request).catch(() => {
            return new Response('You are offline.', {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({ 'Content-Type': 'text/plain' })
            });
        })
    );
});
