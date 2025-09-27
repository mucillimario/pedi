/* eslint-disable no-restricted-globals */

// Este es un Service Worker de ejemplo, que puedes personalizar.
// Consulta la documentación de Workbox para más opciones:
// https://developers.google.com/web/tools/workbox/modules

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

// Precarga todos los activos de tu aplicación.
precacheAndRoute(self.__WB_MANIFEST);

// Estrategia para servir activos desde la caché.
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
  })
);
