self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('quickunimi-cache').then(function(cache) {
    console.log('[ServiceWorker] Pre-caching offline page');
    return cache.addAll([
       'index.html'
    ]);
   })
 );
});

self.addEventListener('fetch', function(e) {
  
  console.log(e.request.url);
  
  e.respondWith(

    cache.open('quickunimi-cache').then(cache => {

      return cache.match(e.request).then(
        cacheResponse => cacheResponse || fetch(evt.request).then(
          networkResponse => {
            cache.put(e.request, networkResponse.clone());
            return networkResponse;
          } // networkResponse
        ) // cacheResponse
      ) // return cache

    }) // cache.open

  ) // e.respondWith

}); // self