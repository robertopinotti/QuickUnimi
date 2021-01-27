// INSTALL

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('quickunimi-cache').then(function(cache) {
    console.log('[ServiceWorker] Pre-caching offline page');
    return cache.addAll([
        'index.html',
        'manifest.json',
        'sw.js',
        'service-worker.js'
    ]);
   })
 );
});

// FETCH

self.addEventListener('fetch', function(e) {
  
  console.log('[ServiceWorker] fetch');
  console.log(e.request.url);
  
  e.respondWith(

    caches.open('quickunimi-cache').then(function(cache) {

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