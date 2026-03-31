// SuperMarket Calc — Service Worker
// Versión del caché: incrementa este número al hacer cambios
const CACHE_VERSION = 'supermarket-v1';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
];

// ── INSTALL: guarda todos los assets en caché ──────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: limpia cachés viejas ─────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_VERSION)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// ── FETCH: estrategia Cache-First con fallback a red ───────────────────────
self.addEventListener('fetch', event => {
  // Solo intercepta GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;

        // No está en caché: busca en red y guarda para la próxima vez
        return fetch(event.request)
          .then(response => {
            // Solo cachea respuestas válidas
            if (!response || response.status !== 200 || response.type === 'opaque') {
              return response;
            }
            const responseClone = response.clone();
            caches.open(CACHE_VERSION)
              .then(cache => cache.put(event.request, responseClone));
            return response;
          })
          .catch(() => {
            // Sin red y sin caché: muestra página offline básica
            if (event.request.destination === 'document') {
              return caches.match('./index.html');
            }
          });
      })
  );
});

// ── SYNC EN BACKGROUND (para datos de compras guardados offline) ───────────
self.addEventListener('sync', event => {
  if (event.tag === 'sync-purchases') {
    event.waitUntil(syncPurchases());
  }
});

async function syncPurchases() {
  // Aquí irá la lógica de sync cuando agregues backend
  console.log('[SW] Sincronizando compras pendientes...');
}
