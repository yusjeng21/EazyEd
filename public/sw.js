const CACHE_NAME = "eazyed-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  // Note: Modern bundlers (like Vite/Webpack) hash CSS/JS file names.
  // For a basic setup, caching the root allows the offline page to trigger.
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version if found, otherwise fetch from network
      return response || fetch(event.request);
    }),
  );
});
