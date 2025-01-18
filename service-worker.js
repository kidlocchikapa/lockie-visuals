// public/service-worker.js
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('v1').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/static/js/main.chunk.js',
          // Add other static assets
        ]);
      })
    );
  });