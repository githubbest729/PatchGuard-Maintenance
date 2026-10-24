const V='pg-v1',A=['./','index.html','offline.html','manifest.webmanifest','css/styles.css','js/db.js','js/app.js','favicon.svg','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
if(r.mode==='navigate'){e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(h=>h.put(r,c));return x}).catch(()=>caches.match(r).then(m=>m||caches.match('offline.html'))));return}
e.respondWith(caches.match(r).then(m=>{const f=fetch(r).then(x=>{const c=x.clone();caches.open(V).then(h=>h.put(r,c));return x}).catch(()=>m);return m||f}))});
self.addEventListener('sync',e=>{if(e.tag==='pg-sync')e.waitUntil(Promise.resolve())});
self.addEventListener('push',e=>{const t=e.data?e.data.text():'Maintenance window reminder';e.waitUntil(self.registration.showNotification('PatchGuard',{body:t,icon:'icons/icon-192.png'}))});