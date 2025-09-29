if (!self.define) {
  let e,
    s = {};
  const i = (i, n) => (
    (i = new URL(i + '.js', n).href),
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
  self.define = (n, a) => {
    const c =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[c]) return;
    let t = {};
    const r = (e) => i(e, c),
      o = { module: { uri: c }, exports: t, require: r };
    s[c] = Promise.all(n.map((e) => o[e] || r(e))).then((e) => (a(...e), t));
  };
}
define(['./workbox-02ee72bf'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/app-build-manifest.json',
          revision: '8081c7888fe7dec8711b707350c9ad12',
        },
        {
          url: '/_next/static/chunks/123-e7de99785fe50970.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/257-578a59a0b3e3ced6.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/264.5a16d92a6f849383.js',
          revision: '5a16d92a6f849383',
        },
        {
          url: '/_next/static/chunks/32.1894edd6b5d02d9c.js',
          revision: '1894edd6b5d02d9c',
        },
        {
          url: '/_next/static/chunks/362-5b04539d5a3dfd4c.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/427-4c4f8e3ec00644ed.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/429-b4e9cb6b9ac518ed.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/499.80833cd09fa778ac.js',
          revision: '80833cd09fa778ac',
        },
        {
          url: '/_next/static/chunks/51b697cb-f3135c4666a88364.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/578-d026a994d5e28b9f.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/667-d4d503b7312313a9.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/6cd9b098-9210a49772f85a3c.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-565fe396b3b3a02c.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/app/admin/page-01e1031e139051b2.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/app/douban/page-2f8870b25cf76c41.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/app/layout-87ff67192e366396.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/app/login/page-26a8bf1b381bf1cc.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/app/page-d6bfdb50a7444ce2.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/app/play-stats/page-9623c5d8b5f2751f.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/app/play/page-691eae9b48ad9cc2.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/app/register/page-428a6ae0cab6c2d7.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/app/release-calendar/page-9ef24dcf52bc14fa.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/app/search/page-8257aaf3cfe3730b.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/app/shortdrama/page-aea2d192e0f19eb6.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/app/tvbox/page-e39cace2ce11a57d.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/app/warning/page-de659838568f031f.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/framework-ded83d71b51ce901.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/main-10b9d9e3554b8948.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/main-app-ba34bd95f9cb3095.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/pages/_app-0931ca4aaa0b729b.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/pages/_error-94b4ec85284f69d1.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-9163602d9acf3df9.js',
          revision: 'i_LN67k0pWw3Au40qF2Wh',
        },
        {
          url: '/_next/static/css/7cca8e2c5137bd71.css',
          revision: '7cca8e2c5137bd71',
        },
        {
          url: '/_next/static/css/c3139f97f49d3cad.css',
          revision: 'c3139f97f49d3cad',
        },
        {
          url: '/_next/static/i_LN67k0pWw3Au40qF2Wh/_buildManifest.js',
          revision: '3071f28e5eda360c57cb73ee7d20feb7',
        },
        {
          url: '/_next/static/i_LN67k0pWw3Au40qF2Wh/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
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
        { url: '/favicon.ico', revision: '2a440afb7f13a0c990049fc7c383bdd4' },
        {
          url: '/icons/icon-192x192.png',
          revision: 'e214d3db80d2eb6ef7a911b3f9433b81',
        },
        {
          url: '/icons/icon-256x256.png',
          revision: 'a5cd7490191373b684033f1b33c9d9da',
        },
        {
          url: '/icons/icon-384x384.png',
          revision: '8540e29a41812989d2d5bf8f61e1e755',
        },
        {
          url: '/icons/icon-512x512.png',
          revision: '3e5597604f2c5d99d7ab62b02f6863d3',
        },
        { url: '/logo.png', revision: '5c1047adbe59b9a91cc7f8d3d2f95ef4' },
        { url: '/manifest.json', revision: 'f8a4f2b082d6396d3b1a84ce0e267dfe' },
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
              state: n,
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
