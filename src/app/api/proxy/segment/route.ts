/* eslint-disable no-console,@typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

// 连接池管理
import * as http from 'http';
import * as https from 'https';

const httpsAgent = new https.Agent({
  keepAlive: true,
  maxSockets: 100,
  maxFreeSockets: 20,
  timeout: 30000,
  keepAliveMsecs: 30000,
});

const httpAgent = new http.Agent({
  keepAlive: true,
  maxSockets: 100,
  maxFreeSockets: 20,
  timeout: 30000,
  keepAliveMsecs: 30000,
});

// 性能统计
const segmentStats = {
  requests: 0,
  errors: 0,
  totalBytes: 0,
  avgResponseTime: 0,
  activeStreams: 0,
};

export async function GET(request: Request) {
  const startTime = Date.now();
  segmentStats.requests++;
  segmentStats.activeStreams++;

  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const source = searchParams.get('moontv-source');

  if (!url) {
    segmentStats.errors++;
    segmentStats.activeStreams--;
    return NextResponse.json({ error: 'Missing url' }, { status: 400 });
  }

  // 直播功能已移除
  segmentStats.errors++;
  segmentStats.activeStreams--;
  return NextResponse.json(
    { error: 'Live streaming feature has been removed' },
    { status: 404 }
  );
}
