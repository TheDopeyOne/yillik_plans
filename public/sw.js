// Kurulum Olayı: Tarayıcı bu dosyayı görünce çalıştırır
self.addEventListener('install', (event) => {
  console.log('Hizmetli (Service Worker) yüklendi!');
  // Bekleme yapma, hemen devreye gir komutu
  self.skipWaiting();
});

// Yakalama Olayı: İnternet trafiğini izler
self.addEventListener('fetch', (event) => {
  // Burayı boş bıraktık. Normalde çevrimdışı (offline) çalışma kodları buraya yazılır.
  // Chrome, içi boş olsa bile bu "fetch" olayını görünce "Tamam, bu bir PWA" der.
});
