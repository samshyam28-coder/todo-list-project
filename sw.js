self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
});

self.addEventListener('fetch', (event) => {
  // This helps the app load faster
  event.respondWith(fetch(event.request));
});