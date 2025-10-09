/* eslint-disable no-console,@typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Key 缓存管理
const keyCache = new Map<
  string,
  { data: ArrayBuffer; timestamp: number; etag?: string }
>();
const KEY_CACHE_TTL = 300000; // 5分钟
const MAX_CACHE_SIZE = 200;

// 连接池管理
import * as http from 'http';
import * as https from 'https';

const httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 30,
  maxFreeSockets: 10,
  timeout: 15000,
  keepAliveMsecs: 30000,
});

const httpAgent = new http.Agent({
  keepAlive: true,
  maxSockets: 30,
  maxFreeSockets: 10,
  timeout: 15000,
  keepAliveMsecs: 30000,
});

// 性能统计
const keyStats = {
  requests: 0,
  errors: 0,
  cacheHits: 0,
  avgResponseTime: 0,
  totalBytes: 0,
};

// 清理过期缓存
function cleanupExpiredCache() {
  const now = Date.now();
  let cleanedCount = 0;

  // 使用 Array.from() 来避免迭代器问题
  const cacheEntries = Array.from(keyCache.entries());
  for (const [key, value] of cacheEntries) {
    if (now - value.timestamp > KEY_CACHE_TTL) {
      keyCache.delete(key);
      cleanedCount++;
    }
  }

  // 如果缓存仍然过大，删除最老的条目
  if (keyCache.size > MAX_CACHE_SIZE) {
    const entries = Array.from(keyCache.entries()).sort(
      (a, b) => a[1].timestamp - b[1].timestamp
    );
    const toDelete = entries.slice(0, entries.length - MAX_CACHE_SIZE);
    toDelete.forEach(([key]) => keyCache.delete(key));
    cleanedCount += toDelete.length;
  }

  if (cleanedCount > 0 && process.env.NODE_ENV === 'development') {
    console.log(`Cleaned ${cleanedCount} expired key cache entries`);
  }
}

export async function GET(request: Request) {
  const startTime = Date.now();
  keyStats.requests++;

  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const source = searchParams.get('moontv-source');

  if (!url) {
    keyStats.errors++;
    return NextResponse.json({ error: 'Missing url' }, { status: 400 });
  }

  // 直播功能已移除
  keyStats.errors++;
  return NextResponse.json(
    { error: 'Live streaming feature has been removed' },
    { status: 404 }
  );
}
