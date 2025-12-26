const CACHE_NAME = "image-cache-v1";

// List all the images you want to preload
const IMAGES = [
    "/GettyImages-170585283.jpg",
    "/GettyImages-579721334.jpg",
    "/GettyImages-592042405.jpg",
    "/GettyImages-926810046.jpg",
    "/GettyImages-2148113067.jpg",
    "/shutterstock_2483595635.jpg",
    "/Azure-DeveloperTools-Scene-2.png"
];

// Install event: cache all images
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(IMAGES))
    );
    self.skipWaiting(); // activate immediately
});

// Activate event: clean old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

// Fetch event: serve images from cache first
self.addEventListener("fetch", (event) => {
    if (event.request.destination === "image") {
        event.respondWith(
            caches.match(event.request).then(
                (response) => response || fetch(event.request)
            )
        );
    }
});
