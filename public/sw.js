if (!self.define) {
  let e,
    s = {};
  const i = (i, c) => (
    (i = new URL(i + '.js', c).href),
    s[i] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, n) => {
    const a =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[a]) return;
    let t = {};
    const r = (e) => i(e, a),
      o = { module: { uri: a }, exports: t, require: r };
    s[a] = Promise.all(c.map((e) => o[e] || r(e))).then((e) => (n(...e), t));
  };
}
define(['./workbox-e9849328'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/app-build-manifest.json',
          revision: '39d0bad3bf54b07c599d54c862e29dec',
        },
        {
          url: '/_next/static/WhT-1920kkiPTRKLCick1/_buildManifest.js',
          revision: '046380ae5bc74b46b6d5eac3eed65355',
        },
        {
          url: '/_next/static/WhT-1920kkiPTRKLCick1/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/123-b5824606109bf7c9.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/264.fe9ebe2758db78b6.js',
          revision: 'fe9ebe2758db78b6',
        },
        {
          url: '/_next/static/chunks/29-147aefe3d1326a5c.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/32.e0675a1c3e605611.js',
          revision: 'e0675a1c3e605611',
        },
        {
          url: '/_next/static/chunks/405-4ebd834b3e06b592.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/429-568201868df0589a.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/499.75f65f21fd516c4e.js',
          revision: '75f65f21fd516c4e',
        },
        {
          url: '/_next/static/chunks/513-c8e358d752722b33.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/51b697cb-6aa6f0a91173421a.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/697-49a6e0690bd92c95.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/6cd9b098-3d6e2a71429d4b56.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/833-2c38e1c07f4f0520.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-49e110685307904d.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/app/admin/page-f3505a8bc58c81f1.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/app/douban/page-f3bead41aff80cfb.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/app/layout-a9dfb61f36d9ffe6.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/app/login/page-fbb991848d47d436.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/app/music/page-1921a75376fcd0d0.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/app/mv/page-1bc88f7c38113db3.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/app/mv/play/page-bdb668a5a8c80993.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/app/page-5dc073d240f7e941.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/app/play-stats/page-6fdc1830d8d73d2e.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/app/play/page-f6dd23a1678086c2.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/app/register/page-ed23691c24634252.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/app/release-calendar/page-f6f766e65a452808.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/app/search/page-3abfe0b53f290805.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/app/shortdrama/page-5ff4c44dcb313077.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/app/tvbox/page-89cb95f88ccb1e27.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/app/warning/page-11cba4cf9332a238.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/framework-6e06c675866dc992.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/main-5ee3086d0cb21802.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/main-app-ac64f872bc8e7054.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/pages/_app-792b631a362c29e1.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/pages/_error-9fde6601392a2a99.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-49ab851359529c5e.js',
          revision: 'WhT-1920kkiPTRKLCick1',
        },
        {
          url: '/_next/static/css/50f0fad2ca8d29c5.css',
          revision: '50f0fad2ca8d29c5',
        },
        {
          url: '/_next/static/css/7cca8e2c5137bd71.css',
          revision: '7cca8e2c5137bd71',
        },
        {
          url: '/_next/static/media/19cfc7226ec3afaa-s.woff2',
          revision: '9dda5cfc9a46f256d0e131bb535e46f8',
        },
        {
          url: '/_next/static/media/21350d82a1f187e9-s.woff2',
          revision: '4e2553027f1d60eff32898367dd4d541',
        },
        {
          url: '/_next/static/media/8e9860b6e62d6359-s.woff2',
          revision: '01ba6c2a184b8cba08b0d57167664d75',
        },
        {
          url: '/_next/static/media/ba9851c3c22cd980-s.woff2',
          revision: '9e494903d6b0ffec1a1e14d34427d44d',
        },
        {
          url: '/_next/static/media/c5fe6dc8356a8c31-s.woff2',
          revision: '027a89e9ab733a145db70f09b8a18b42',
        },
        {
          url: '/_next/static/media/df0a9ae256c0569c-s.woff2',
          revision: 'd54db44de5ccb18886ece2fda72bdfe0',
        },
        {
          url: '/_next/static/media/e4af272ccee01ff0-s.p.woff2',
          revision: '65850a373e258f1c897a2b3d75eb74de',
        },
        { url: '/favicon.ico', revision: '7a80b69dacd71e960b5a304f66c3ded8' },
        {
          url: '/icons/icon-192x192.png',
          revision: 'ea0f0f70b69ea8956d6aaf1319b605cd',
        },
        {
          url: '/icons/icon-256x256.png',
          revision: '56bf1ef3f4ecc4983181668b9cbe0ec4',
        },
        {
          url: '/icons/icon-384x384.png',
          revision: 'f3b557c5eee4c605fc15941cead0a1ca',
        },
        {
          url: '/icons/icon-512x512.png',
          revision: 'bce56a6f4c21a920df808523685ab933',
        },
        { url: '/logo.png', revision: '9241992739b4379f8e62f5b0d15e4a67' },
        { url: '/manifest.json', revision: '597155bce8ce45be6b3f4668f6fae9e6' },
        { url: '/robots.txt', revision: 'e2b2cd8514443456bc6fb9d77b3b1f3e' },
        {
          url: '/screenshot1.png',
          revision: 'd7de3a25686c5b9c9d8c8675bc6109fc',
        },
        {
          url: '/screenshot2.png',
          revision: 'b0b715a3018d2f02aba5d94762473bb6',
        },
        {
          url: '/screenshot3.png',
          revision: '7e454c28e110e291ee12f494fb3cf40c',
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: i,
              state: c,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    );
});
