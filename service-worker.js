
const CACHE_NAME = "advent-cache-2026-v1";

const FILES_TO_CACHE = [
  "/Advent2025/",
  "/Advent2025/index.html",
  "/Advent2025/manifest.json",
  "/Advent2025/icons/icon-192.png",
  "/Advent2025/icons/icon-512.png"
];

// Install the updated calendar.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Remove old calendar caches.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith("advent-cache") && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Use the network when available, with offline fallback.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
