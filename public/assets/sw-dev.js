// importScripts('/assets/workbox-sw.prod.js');
importScripts('https://unpkg.com/workbox-sw@1.1.0');

// Create Workbox service worker instance
const workboxSW = new WorkboxSW({});

// Placeholder array which is populated automatically by workboxBuild.injectManifest()
workboxSW.precache([]);

// List of strategies to be used
const STRATEGIES = {
  networkFirst: workboxSW.strategies.networkFirst,
  staleWhileRevalidate: workboxSW.strategies.staleWhileRevalidate
};

// Register png files e.g. https://localhost:3000/images/1.png
workboxSW.router.registerRoute(
  /\/assets\//,
  workboxSW.strategies.cacheFirst());

// Register example path e.g. https://localhost:3000/example
workboxSW.router.registerRoute('/', workboxSW.strategies.staleWhileRevalidate());
workboxSW.router.registerRoute('/admin/', workboxSW.strategies.staleWhileRevalidate());
workboxSW.router.registerRoute('/merchants/', workboxSW.strategies.staleWhileRevalidate());

workboxSW.router.registerRoute('https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js', workboxSW.strategies.staleWhileRevalidate());
workboxSW.router.registerRoute('https://maps.googleapis.com/maps/api/js?key=AIzaSyAsqrZKCXbh9rFjnstvvC4K0tO3kO4w8co&libraries=places', workboxSW.strategies.staleWhileRevalidate());

workboxSW.router.registerRoute('/assets/js/index-bundle.js', workboxSW.strategies.cacheFirst());
workboxSW.router.registerRoute('/assets/css/main.min.css', workboxSW.strategies.cacheFirst());

// Register express like route paths e.g. https://localhost:3000/list/one
workboxSW.router.registerRoute(/\/api\//,
  workboxSW.strategies.networkFirst({
    cacheName: 'cache-with-expiration',
    cacheExpiration: {
      maxEntries: 15,
      maxAgeSeconds: 7 * 24 * 60 * 60
    }
  })
);
