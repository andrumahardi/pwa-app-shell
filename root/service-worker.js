const staticCache = "pwa-app-shell-v1";

const assetsToCache = [
  "css/global-styles.css",
  "images/icon-home.png",
  "images/icon-original.png",
  "images/icon-shell.png",
  "app.js",
  "favicon.ico",
  "index.html",
  "/",
];

async function cacheStaticAssets() {
  const cache = await caches.open(staticCache);
  return cache.addAll(assetsToCache);
}

async function networkFirst(request) {
  try {
    return await fetch(request);
  } catch (error) {
    console.log("[Service Worker] network error", error);
    const cache = await caches.open(staticCache);
    return cache.match(request);
  }
}

self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing service worker");
  event.waitUntil(cacheStaticAssets());
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  console.log("[Service Worker] Activating service worker!");
  return self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  console.log("[Service Worker] Fetch event worker!", event.request.url);
  event.respondWith(networkFirst(event.request));
});
