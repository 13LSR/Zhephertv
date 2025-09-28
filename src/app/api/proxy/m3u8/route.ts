/* eslint-disable no-console,@typescript-eslint/no-explicit-any */

import { NextResponse } from "next/server";

export const runtime = 'nodejs';

export async function GET(request: Request): Promise<NextResponse> {
  // 直播源功能已移除，该API不再可用
  return NextResponse.json({ error: 'Live streaming feature has been removed' }, { status: 404 });
}