import { NextRequest, NextResponse } from 'next/server';

/**
 * 歌曲详情/URL API
 * GET /api/music/song?id=xxx&type=json|url&level=exhigh
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const type = searchParams.get('type') || 'json';
    const level = searchParams.get('level') || 'exhigh';

    if (!id) {
      return NextResponse.json(
        { success: false, message: '缺少歌曲ID' },
        { status: 400 }
      );
    }

    // 构建API URL (使用正确的API地址)
    let apiUrl = `https://zhepher-netease.hf.space/song?id=${id}&type=${type}`;
    if (type === 'url') {
      apiUrl += `&level=${level}`;
    }

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
        { success: false, message: '获取歌曲信息失败' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
    });
  } catch (error) {
    console.error('获取歌曲信息错误:', error);
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
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
    }
  );
}
