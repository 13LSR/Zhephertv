import { NextRequest, NextResponse } from 'next/server';

/**
 * MV 搜索 API
 * 搜索网易云音乐 MV
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keywords =
      searchParams.get('keywords') || searchParams.get('keyword') || '';
    const limit = searchParams.get('limit') || '20';
    const offset = searchParams.get('offset') || '0';

    if (!keywords) {
      return NextResponse.json(
        { success: false, message: '请提供搜索关键词' },
        { status: 400 }
      );
    }

    // 尝试使用 type=1004 搜索（通常是 MV 搜索类型）
    const targetUrl = `https://zhepher-netease.hf.space/search?keywords=${encodeURIComponent(
      keywords
    )}&type=1004&limit=${limit}&offset=${offset}`;

    console.log('MV搜索请求:', targetUrl);

    const response = await fetch(targetUrl, {
      headers: {
        Referer: 'https://music.163.com/',
        Cookie: 'os=pc;',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      console.error('MV搜索API响应错误:', response.status, response.statusText);

      try {
        const errorData = await response.json();
        console.error('MV搜索API错误详情:', errorData);
        return NextResponse.json(errorData, { status: response.status });
      } catch {
        return NextResponse.json(
          { success: false, message: `搜索失败: ${response.statusText}` },
          { status: response.status }
        );
      }
    }

    const data = await response.json();
    console.log('MV搜索响应:', JSON.stringify(data).substring(0, 300));

    // 检查响应数据
    if (!data.success || !data.data) {
      return NextResponse.json(
        { success: false, message: '搜索失败，未找到相关MV' },
        { status: 404 }
      );
    }

    // 处理搜索结果，尝试为每个结果添加 mvId 字段
    // 注意：type=1004 可能返回的是歌曲数据，需要通过歌曲详情获取 MV ID
    const results = data.data.map((item: any) => ({
      ...item,
      // 保持原有字段
      songId: item.id, // 保存歌曲 ID，后续可能用于获取 MV ID
    }));

    return NextResponse.json(
      {
        success: true,
        data: results,
        message: data.message || '搜索完成',
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': '*',
        },
      }
    );
  } catch (error) {
    console.error('MV搜索API错误:', error);
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
