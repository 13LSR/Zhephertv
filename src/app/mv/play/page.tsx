/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */
'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';

import { formatDuration, formatPlayCount } from '@/lib/music-utils';
import { MVDetail } from '@/lib/types';

import PageLayout from '@/components/PageLayout';

function MVPlayPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 从 URL 参数获取 MV 信息
  const mvId = searchParams.get('id') || '';
  const mvName = searchParams.get('name') || 'MV';
  const mvArtist = searchParams.get('artist') || '';
  const mvCover = searchParams.get('cover') || '';

  console.log('MV 播放页面参数:', { mvId, mvName, mvArtist, mvCover });

  // 状态管理
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mvDetail, setMvDetail] = useState<MVDetail | null>(null);
  const [mvUrl, setMvUrl] = useState('');
  const [selectedQuality, setSelectedQuality] = useState('720');

  // 播放器 ref
  const artRef = useRef<HTMLDivElement>(null);
  const artPlayerRef = useRef<any>(null);

  // 加载 MV 详情和播放链接
  const loadMV = useCallback(async () => {
    if (!mvId) {
      setError('无效的 MV ID');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      console.log('加载 MV:', mvId);

      // 获取播放链接
      const urlRes = await fetch(
        `/api/music/proxy/mv/url?id=${mvId}&r=${selectedQuality}`
      );
      const urlData = await urlRes.json();

      if (
        urlData.success &&
        urlData.data &&
        urlData.data.length > 0 &&
        urlData.data[0].url
      ) {
        setMvUrl(urlData.data[0].url);

        // 尝试获取详情
        try {
          const detailRes = await fetch(
            `/api/music/proxy/mv/detail?id=${mvId}`
          );
          const detailData = await detailRes.json();

          if (detailData.success && detailData.data) {
            setMvDetail(detailData.data);
          } else {
            // 使用 URL 参数中的信息
            setMvDetail({
              id: mvId,
              name: mvName,
              artistName: mvArtist,
              cover: mvCover,
              duration: 0,
              playCount: 0,
            } as MVDetail);
          }
        } catch (err) {
          console.error('获取 MV 详情失败:', err);
          setMvDetail({
            id: mvId,
            name: mvName,
            artistName: mvArtist,
            cover: mvCover,
            duration: 0,
            playCount: 0,
          } as MVDetail);
        }
      } else {
        setError('无法获取 MV 播放链接');
      }
    } catch (err) {
      console.error('加载 MV 失败:', err);
      setError(
        '加载失败: ' + (err instanceof Error ? err.message : String(err))
      );
    } finally {
      setLoading(false);
    }
  }, [mvId, selectedQuality, mvName, mvArtist, mvCover]);

  // 初始化播放器
  const initPlayer = useCallback(async () => {
    console.log('initPlayer 被调用', { artRef: !!artRef.current, mvUrl });

    if (!artRef.current || !mvUrl) {
      console.warn('缺少必要的参数:', { artRef: !!artRef.current, mvUrl });
      return;
    }

    // 清理旧播放器
    if (artPlayerRef.current) {
      try {
        console.log('清理旧播放器');
        artPlayerRef.current.destroy();
        artPlayerRef.current = null;
      } catch (err) {
        console.error('清理播放器失败:', err);
      }
    }

    try {
      const Artplayer = (window as any).DynamicArtplayer;

      console.log('Artplayer 对象:', typeof Artplayer);

      if (!Artplayer) {
        const errorMsg = 'ArtPlayer 未加载，请刷新页面重试';
        console.error(errorMsg);
        setError(errorMsg);
        return;
      }

      console.log('创建 ArtPlayer 实例');
      console.log('MV URL:', mvUrl);
      console.log('容器:', artRef.current);

      // 检测设备
      const userAgent = navigator.userAgent;
      const isIOS = /iPad|iPhone|iPod/.test(userAgent);
      const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);

      console.log('设备信息:', { isIOS, isSafari });

      // 创建播放器实例
      artPlayerRef.current = new Artplayer({
        container: artRef.current,
        url: mvUrl,
        poster: mvDetail?.cover || mvCover,
        title: `${mvDetail?.name || mvName} - ${
          mvDetail?.artistName || mvArtist
        }`,
        volume: 0.8,
        isLive: false,
        muted: isIOS || isSafari,
        autoplay: true,
        pip: true,
        autoSize: false,
        screenshot: true,
        setting: true,
        loop: false,
        flip: true,
        playbackRate: true,
        aspectRatio: true,
        fullscreen: true,
        fullscreenWeb: true,
        miniProgressBar: true,
        mutex: true,
        playsInline: true,
        theme: '#22c55e',
        lang: 'zh-cn',
        hotkey: true,
        airplay: isIOS || isSafari,
        moreVideoAttr: {
          crossOrigin: 'anonymous',
        },
        // 画质切换
        quality: [],
        // 右键菜单
        contextmenu: [
          {
            html: 'MV 信息',
            click: function () {
              console.log('MV 信息:', mvDetail);
            },
          },
        ],
        // 控制栏
        controls: [
          {
            position: 'right',
            html: '画质',
            selector: [
              {
                html: '1080P',
                url: mvUrl.replace(/r=\d+/, 'r=1080'),
                default: selectedQuality === '1080',
              },
              {
                html: '720P',
                url: mvUrl.replace(/r=\d+/, 'r=720'),
                default: selectedQuality === '720',
              },
              {
                html: '480P',
                url: mvUrl.replace(/r=\d+/, 'r=480'),
                default: selectedQuality === '480',
              },
              {
                html: '240P',
                url: mvUrl.replace(/r=\d+/, 'r=240'),
                default: selectedQuality === '240',
              },
            ],
            onSelect: function (item: any) {
              console.log('切换画质:', item.html);
              return item.html;
            },
          },
        ],
      });

      // 播放器事件
      artPlayerRef.current.on('ready', () => {
        console.log('播放器准备就绪');
      });

      artPlayerRef.current.on('error', (error: any) => {
        console.error('播放器错误:', error);
        setError('播放失败，请重试');
      });

      console.log('ArtPlayer 实例创建成功');
    } catch (err) {
      console.error('初始化播放器失败:', err);
      setError('播放器初始化失败');
    }
  }, [mvUrl, mvDetail, mvCover, mvName, mvArtist, selectedQuality]);

  // 加载 MV
  useEffect(() => {
    loadMV();
  }, [loadMV]);

  // 动态导入并初始化播放器
  useEffect(() => {
    if (!mvUrl || loading) return;

    const loadAndInitPlayer = async () => {
      try {
        console.log('开始动态导入 ArtPlayer...');

        // 动态导入 ArtPlayer
        const { default: Artplayer } = await import('artplayer');

        // 设置为全局变量
        (window as any).DynamicArtplayer = Artplayer;

        console.log('ArtPlayer 导入成功');

        // 初始化播放器
        await initPlayer();
      } catch (error) {
        console.error('动态导入 ArtPlayer 失败:', error);
        setError('播放器加载失败，请刷新页面重试');
      }
    };

    loadAndInitPlayer();

    // 清理
    return () => {
      if (artPlayerRef.current) {
        try {
          artPlayerRef.current.destroy();
          artPlayerRef.current = null;
        } catch (err) {
          console.error('清理播放器失败:', err);
        }
      }
    };
  }, [mvUrl, loading, initPlayer]);

  // 返回
  const handleBack = () => {
    router.back();
  };

  return (
    <PageLayout activePath='/mv'>
      <div className='container mx-auto px-4 py-6 max-w-7xl'>
        {/* 返回按钮 */}
        <button
          onClick={handleBack}
          className='mb-4 px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2'
        >
          <ChevronLeft className='w-4 h-4' />
          返回
        </button>

        {/* 错误提示 */}
        {error && (
          <div className='mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg'>
            <p className='text-red-600 dark:text-red-400'>{error}</p>
          </div>
        )}

        {/* 加载中 */}
        {loading && (
          <div className='flex items-center justify-center h-96'>
            <div className='text-center'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4'></div>
              <p className='text-gray-600 dark:text-gray-400'>加载中...</p>
            </div>
          </div>
        )}

        {/* 播放器容器 */}
        {!loading && mvUrl && (
          <div className='space-y-6'>
            {/* 播放器 */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden'>
              <div
                ref={artRef}
                className='aspect-video bg-black'
                style={{ width: '100%', height: 'auto' }}
              />
            </div>

            {/* MV 信息 */}
            {mvDetail && (
              <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
                <div className='flex gap-6'>
                  {/* 封面 */}
                  {mvDetail.cover && (
                    <div className='flex-shrink-0'>
                      <img
                        src={mvDetail.cover}
                        alt={mvDetail.name}
                        className='w-48 h-27 object-cover rounded-lg'
                      />
                    </div>
                  )}

                  {/* 信息 */}
                  <div className='flex-1'>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
                      {mvDetail.name}
                    </h1>
                    <p className='text-lg text-gray-600 dark:text-gray-400 mb-4'>
                      {mvDetail.artistName}
                    </p>

                    {/* 统计信息 */}
                    <div className='flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-4'>
                      {mvDetail.duration > 0 && (
                        <span>时长: {formatDuration(mvDetail.duration)}</span>
                      )}
                      {mvDetail.playCount && mvDetail.playCount > 0 && (
                        <span>
                          播放量: {formatPlayCount(mvDetail.playCount)}
                        </span>
                      )}
                    </div>

                    {/* 描述 */}
                    {mvDetail.desc && (
                      <div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
                        <p className='text-gray-700 dark:text-gray-300 text-sm leading-relaxed'>
                          {mvDetail.desc}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default function MVPlayPage() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <MVPlayPageClient />
    </Suspense>
  );
}
