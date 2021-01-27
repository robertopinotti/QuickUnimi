// INSTALL

self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('quickunimi-cache').then(function(cache) {
    console.log('[ServiceWorker] Pre-caching offline page');
    return cache.addAll([
        'index.html',
        'manifest.json',
        'sw.js',
        'service-worker.js',
        'images/base.png',
        'images/icon-144x144.png',
        'images/icon-512x512.png',
        'images/quickunimi-app.png',
        'images/quickunimi-cover.png',
        'images/quickunimi-ico.png'
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
        cacheResponse => cacheResponse || fetch(e.request).then(
          networkResponse => {
            cache.put(e.request, networkResponse.clone());
            return networkResponse;
          } // networkResponse
        ) // cacheResponse
      ) // return cache

    }) // cache.open

  ) // e.respondWith

}); // self