// INFO https://nariohtools.com/sw.js

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

// ACTIVATE

self.addEventListener('activate', function(e) {
    
    console.log('[ServiceWorker] Activate');

    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== 'quickunimi-cache') {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );

    self.clients.claim(); // ?
});

// FETCH

self.addEventListener('fetch', function(e) {
  
  console.log('[ServiceWorker] fetch');
  console.log(e.request.url);
  
  e.respondWith(

    caches.open('quickunimi-cache').then(function(cache) {

      // https://stackoverflow.com/questions/48463483/what-causes-a-failed-to-execute-fetch-on-serviceworkerglobalscope-only-if
      if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') return;

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