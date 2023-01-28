// SW Install
self.addEventListener("install", (e) => {
  // wait until resources are cached
  e.waitUntil(
    caches.open("static").then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./src/css/style.css",
        "./src/js/script.js",
        "./img/icons8-crane-bird-96.png",
        "./img/icons8-parakeet-96.png",
        "./img/icons8-parrot-96.png",
        "./img/icons8-pelican-96.png",
        "./img/icons8-woodpecker-96.png",
        "./img/memory-game.png",
      ]);
    })
  );
});

// SW Fetch
self.addEventListener("fetch", (e) => {
  console.log(`fetch request for ${e.request.url}`);
  e.respondWith(
    caches.match(e.request).then((response) => {
      // get resources from cache first, if not there then go to the network
      return response || fetch(e.request);
    })
  );
});
