// This tells the browser to stay ready in the background
self.addEventListener('install', (event) => {
  console.log('PWA Service Worker installed!');
});

self.addEventListener('fetch', (event) => {
  // This is where we would handle offline mode later
});