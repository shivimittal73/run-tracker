// Service Worker for JP Morgan Custom Trainer
// Version 2.0.0 - Updated for cache refresh

const CACHE_NAME = 'jp-custom-trainer-v3';
const urlsToCache = [
  '/jp-custom-trainer.html',
  '/manifest.json',
  '/index.html'
];

// Install event - cache resources and skip waiting
self.addEventListener('install', event => {
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened - v2');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - network first, fallback to cache for offline support
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Check if valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone and cache the response for offline use
        const responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request);
      })
  );
});

// Activate event - clean up old caches and take control immediately
self.addEventListener('activate', event => {
  // Take control of all pages immediately
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});
