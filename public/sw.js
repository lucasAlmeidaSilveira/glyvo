const CACHE_NAME = 'glyvo-v1'

// Service Worker básico sem funcionalidades de cache
self.addEventListener('install', (event) => {
  // Sem cache
})

self.addEventListener('fetch', (event) => {
  // Sem interceptação de requisições
})

self.addEventListener('activate', (event) => {
  // Sem limpeza de cache
})
