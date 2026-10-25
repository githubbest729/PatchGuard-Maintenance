const V='agac-patchguard-v4',A=['./','index.html','offline.html','manifest.webmanifest','css/styles.css','js/db.js','js/app.js','favicon.svg','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==V)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(h=>h.put(r,c));return x}).catch(()=>caches.match(r).then(m=>m||(r.mode==='navigate'?caches.match('offline.html'):Response.error()))))});
self.addEventListener('sync',e=>{if(e.tag==='pg-sync')e.waitUntil(Promise.resolve())});
self.addEventListener('push',e=>{const t=e.data?e.data.text():'Maintenance window reminder';e.waitUntil(self.registration.showNotification('AGAC PatchGuard',{body:t,icon:'icons/icon-192.png'}))});