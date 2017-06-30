importScripts('workbox.js')

const wb = new WorkboxSW()

wb.router.registerRoute('/*', wb.strategies.cacheFirst())