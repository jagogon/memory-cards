const CACHE_NAME = 'app-game-memory-card';

const urlsToCache = [
  '/',
  '/bundle.js',
  '/assets/manifest.json',
  '/assets/styles.css',
  '/service-worker.js',
];

/* eslint-disable no-restricted-globals */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response; // Esta en caché
      }
      return fetch(event.request); // NO esta en cache, solicitud de red
    })
  );
});
/* eslint-enable no-restricted-globals */
