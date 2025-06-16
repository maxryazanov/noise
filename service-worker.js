const CACHE_NAME = 'noise-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './white.mp3',
  './heart.mp3',
  '.192.png',
  '.512.png',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
