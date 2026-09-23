const CACHE = "parwarda-v1";
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.open(CACHE).then(c =>
      c.match(e.request).then(r => r || fetch(e.request).then(res => {
        const copy = res.clone();
        if (e.request.url.startsWith("http")) c.put(e.request, copy);
        return res;
      }).catch(() => r))
  )
});
