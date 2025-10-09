import { NextRequest, NextResponse } from 'next/server';

/**
 * 音乐API统一代理 - 支持动态路径
 * 例如：
 * - /api/music/proxy/playlist?id=xxx
 * - /api/music/proxy/album?id=xxx
 * - /api/music/proxy/mv/detail?id=xxx
 * - /api/music/proxy/mv/url?id=xxx&r=480
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // 从动态路由参数构建路径
    const path = params.path.join('/');

    // 构建目标API URL
    const queryString = searchParams.toString();
    const targetUrl = `https://zhepher-netease.hf.space/${path}${
      queryString ? '?' + queryString : ''
    }`;

    console.log('代理请求:', targetUrl);

    const response = await fetch(targetUrl, {
      headers: {
        Referer: 'https://music.163.com/',
        Cookie: 'os=pc;',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      console.error('API响应错误:', response.status, response.statusText);

      // 尝试读取响应体，获取更详细的错误信息
      try {
        const errorData = await response.json();
        console.error('API错误详情:', errorData);
        return NextResponse.json(errorData, { status: response.status });
      } catch {
        return NextResponse.json(
          { success: false, message: `API请求失败: ${response.statusText}` },
          { status: response.status }
        );
      }
    }

    const data = await response.json();
    console.log('API响应成功:', JSON.stringify(data).substring(0, 200));

    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
    });
  } catch (error) {
    console.error('音乐API代理错误:', error);
    return NextResponse.json(
      {
        success: false,
        message:
          '服务器错误: ' +
          (error instanceof Error ? error.message : String(error)),
      },
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
