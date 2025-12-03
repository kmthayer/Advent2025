self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("advent-cache").then((cache) => {
      return cache.addAll([
        "/Advent2025/",
        "/Advent2025/index.html",
        "/Advent2025/manifest.json",
        "/Advent2025/icons/icon-192.png",
        "/Advent2025/icons/icon-512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
