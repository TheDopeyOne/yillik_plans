self.addEventListener('install', (event) => {
  console.log('Hizmetli (Service Worker) yüklendi!');
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // Burası boş kalsa bile Chrome mutlu olur :)
});
