import { NextRequest, NextResponse } from 'next/server';

/**
 * 音乐搜索API
 * GET /api/music/search?keyword=xxx&limit=10&type=1
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get('keyword');
    const limit = searchParams.get('limit') || '10';
    const type = searchParams.get('type') || '1';

    if (!keyword) {
      return NextResponse.json(
        { success: false, message: '缺少搜索关键词' },
        { status: 400 }
      );
    }

    // 代理到音乐API (使用正确的API地址)
    const apiUrl = `https://zhepher-netease.hf.space/search?keyword=${encodeURIComponent(
      keyword
    )}&limit=${limit}&type=${type}`;

    const response = await fetch(apiUrl, {
      headers: {
        Referer: 'https://music.163.com/',
        Cookie: 'os=pc;',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: '搜索失败' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
    });
  } catch (error) {
    console.error('音乐搜索错误:', error);
    return NextResponse.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
    }
  );
}
