/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server';


export const runtime = 'nodejs';

// Logo 缓存管理
const logoCache = new Map<string, { data: ArrayBuffer; contentType: string; timestamp: number; etag?: string }>();
const LOGO_CACHE_TTL = 86400000; // 24小时
const MAX_CACHE_SIZE = 500;

// 连接池管理
import * as http from 'http';
import * as https from 'https';

const httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 30,
  maxFreeSockets: 10,
  timeout: 20000,
  keepAliveMsecs: 30000,
});

const httpAgent = new http.Agent({
  keepAlive: true,
  maxSockets: 30,
  maxFreeSockets: 10,
  timeout: 20000,
  keepAliveMsecs: 30000,
});

// 性能统计
const logoStats = {
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
  const cacheEntries = Array.from(logoCache.entries());
  for (const [key, value] of cacheEntries) {
    if (now - value.timestamp > LOGO_CACHE_TTL) {
      logoCache.delete(key);
      cleanedCount++;
    }
  }
  
  // 如果缓存仍然过大，删除最老的条目
  if (logoCache.size > MAX_CACHE_SIZE) {
    const entries = Array.from(logoCache.entries()).sort((a, b) => a[1].timestamp - b[1].timestamp);
    const toDelete = entries.slice(0, entries.length - MAX_CACHE_SIZE);
    toDelete.forEach(([key]) => logoCache.delete(key));
    cleanedCount += toDelete.length;
  }
  
  if (cleanedCount > 0 && process.env.NODE_ENV === 'development') {
    console.log(`Cleaned ${cleanedCount} expired logo cache entries`);
  }
}

// 检测图片格式和大小
function validateImageResponse(contentType: string | null, contentLength: number): { isValid: boolean; reason?: string } {
  if (!contentType) {
    return { isValid: true }; // 允许没有 content-type 的响应
  }
  
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/x-icon', 'image/vnd.microsoft.icon'];
  const isValidType = validTypes.some(type => contentType.toLowerCase().includes(type));
  
  if (!isValidType) {
    return { isValid: false, reason: `Invalid content type: ${contentType}` };
  }
  
  // 限制图片大小为 5MB
  if (contentLength > 5 * 1024 * 1024) {
    return { isValid: false, reason: `Image too large: ${contentLength} bytes` };
  }
  
  return { isValid: true };
}

export async function GET(request: Request) {
  const startTime = Date.now();
  logoStats.requests++;

  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');
  const source = searchParams.get('source'); // 注意这里是 'source' 不是 'moontv-source'

  if (!imageUrl) {
    logoStats.errors++;
    return NextResponse.json({ error: 'Missing image URL' }, { status: 400 });
  }

  // 直播功能已移除
  logoStats.errors++;
  return NextResponse.json({ error: 'Live streaming feature has been removed' }, { status: 404 });
}
