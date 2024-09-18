const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/d5595c66-85ed-46ca-9a20-7e4988fb0618',
  'https://fcdn.answerly.io/477718fd-e50b-4758-8fcb-7709dedf75ec/8c825ef9-d96d-49af-ba9a-951c761f104d.png' // Voeg andere benodigde bestanden toe
];

// Installatie van de service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activeren van de service worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetchen van de netwerkverzoeken
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
