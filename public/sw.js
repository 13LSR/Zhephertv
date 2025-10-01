if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + '.js', i).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, n) => {
    const c =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[c]) return;
    let t = {};
    const o = (e) => a(e, c),
      r = { module: { uri: c }, exports: t, require: o };
    s[c] = Promise.all(i.map((e) => r[e] || o(e))).then((e) => (n(...e), t));
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
          revision: '7eedc856b51e3a6dc5dcbfff46aad256',
        },
        {
          url: '/_next/static/CIUsFCo8P-KJeOaQHi5GP/_buildManifest.js',
          revision: '046380ae5bc74b46b6d5eac3eed65355',
        },
        {
          url: '/_next/static/CIUsFCo8P-KJeOaQHi5GP/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/123-1a7c36f8fd0ab10e.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/264.fe9ebe2758db78b6.js',
          revision: 'fe9ebe2758db78b6',
        },
        {
          url: '/_next/static/chunks/29-147aefe3d1326a5c.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/32.e0675a1c3e605611.js',
          revision: 'e0675a1c3e605611',
        },
        {
          url: '/_next/static/chunks/427-06581b88b8166c29.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/429-7c36387b037f6c1f.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/431-fa91ef843a5c508e.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/499.75f65f21fd516c4e.js',
          revision: '75f65f21fd516c4e',
        },
        {
          url: '/_next/static/chunks/51b697cb-6aa6f0a91173421a.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/667-9eff9fbe52dbb4ec.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/697-51126d82d9749050.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/6cd9b098-3d6e2a71429d4b56.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-49e110685307904d.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/app/admin/page-87d7524be46085d6.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/app/douban/page-01b0a7d6f367ef0f.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/app/layout-f55af332800bcfb9.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/app/login/page-af43f0fb235f8043.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/app/page-79cecd9ac63d160e.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/app/play-stats/page-0288f6736170cff9.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/app/play/page-0438512f4c0aaf2e.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/app/register/page-bc9d9f363376bc2a.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/app/release-calendar/page-af3762ac607cbedb.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/app/search/page-795f891f079b0446.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/app/shortdrama/page-2ddf6d421c7d99ad.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/app/tvbox/page-d8bc5ca13b16ebbe.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/app/warning/page-11cba4cf9332a238.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/framework-6e06c675866dc992.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/main-4a6557347222fe7f.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/main-app-ac64f872bc8e7054.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/pages/_app-792b631a362c29e1.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/pages/_error-9fde6601392a2a99.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-f7925f9a811efee9.js',
          revision: 'CIUsFCo8P-KJeOaQHi5GP',
        },
        {
          url: '/_next/static/css/6578865b2fa3233d.css',
          revision: '6578865b2fa3233d',
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
              event: a,
              state: i,
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
