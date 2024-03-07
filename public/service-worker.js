// Inside your service worker file
self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            // If the request is in the cache, return the cached response
            return cachedResponse;
          }
  
          // If the request is not in the cache, fetch it from the network
          return fetch(event.request)
            .then(networkResponse => {
              // Then cache the network response for next time
              return caches.open('api-cache')
                .then(cache => {
                  cache.put(event.request, networkResponse.clone());
                  return networkResponse;
                });
            });
        })
    );
  });
  