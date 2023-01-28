// SW Install
self.addEventListener("install", e => {
    // wait until resources are cached
    e.waitUntil(
        caches.open("static").then( cache => {
            return cache.addAll(["./", "./src/css/style.css", "./img"]);
        })
    )
});

// SW Fetch
self.addEventListener("fetch", e => {
    console.log(`fetch request for ${e.request.url}`);
    e.respondWith(
        caches.match(e.request).then(response => {
            // get resources from cache first, if not there then go to the network
            return response || fetch(e.request);
        })
    )
})