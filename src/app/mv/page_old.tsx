/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */
'use client';

import { Search, Video } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';

import {
  formatDuration,
  formatPlayCount,
  getMVQualityOptions,
} from '@/lib/music-utils';
import { MVDetail } from '@/lib/types';

import PageLayout from '@/components/PageLayout';

interface MVSearchResult {
  id: string;
  name: string;
  artistName: string;
  artist_name?: string;
  cover?: string;
  imgurl?: string;
  playCount?: number;
  duration: number;
}

export default function MVPage() {
  // 搜索相关状态
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<MVSearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  // MV详情和播放状态
  const [mvDetail, setMvDetail] = useState<MVDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // MV播放相关
  const [mvUrl, setMvUrl] = useState('');
  const [selectedQuality, setSelectedQuality] = useState('480');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 搜索MV
  const handleSearch = useCallback(async () => {
    if (!searchKeyword.trim()) return;

    setSearching(true);
    setError('');

    try {
      // 使用type=1004搜索MV
      const response = await fetch(
        `/api/music/search?keyword=${encodeURIComponent(
          searchKeyword
        )}&limit=20&type=1004`
      );
      const data = await response.json();

      if (data.success && data.data) {
        setSearchResults(data.data);
      } else {
        setError('搜索失败');
      }
    } catch (err) {
      console.error('搜索错误:', err);
      setError('网络错误，请重试');
    } finally {
      setSearching(false);
    }
  }, [searchKeyword]);

  // 解析并播放MV
  const parseMV = useCallback(
    async (mvId: string, mvInfo?: MVSearchResult) => {
      if (!mvId) {
        setError('无效的MV ID');
        return;
      }

      setLoading(true);
      setError('');

      try {
        console.log('开始解析MV, ID:', mvId);

        // 先尝试直接获取播放URL，绕过详情接口
        const urlEndpoint = `/api/music/proxy/mv/url?id=${mvId}&r=${selectedQuality}`;
        console.log('尝试直接获取MV播放链接:', urlEndpoint);

        const urlRes = await fetch(urlEndpoint);
        console.log('MV URL响应状态:', urlRes.status);

        const urlData = await urlRes.json();
        console.log('MV URL数据:', urlData);

        // 如果成功获取到播放链接，使用搜索结果的信息作为详情
        if (
          urlData.success &&
          urlData.data &&
          urlData.data.length > 0 &&
          urlData.data[0].url
        ) {
          console.log('获取到MV播放链接:', urlData.data[0].url);

          // 使用搜索结果信息构建简化的 MV 详情
          if (mvInfo) {
            setMvDetail({
              id: mvId,
              name: mvInfo.name,
              artistName: mvInfo.artistName || mvInfo.artist_name || '',
              duration: mvInfo.duration,
              playCount: mvInfo.playCount || 0,
              cover: mvInfo.cover || mvInfo.imgurl,
            } as MVDetail);
          }

          setMvUrl(urlData.data[0].url);
          setIsPlaying(true);
        } else {
          // 如果直接获取URL失败，尝试获取详情
          const detailUrl = `/api/music/proxy/mv/detail?id=${mvId}`;
          console.log('尝试获取MV详情:', detailUrl);

          const detailRes = await fetch(detailUrl);
          const detailData = await detailRes.json();

          if (detailData.success && detailData.data) {
            setMvDetail(detailData.data);
            await loadMVUrl(mvId, selectedQuality);
          } else {
            const errorMsg = 'MV不可播放: 该MV可能已下架或不可用';
            console.error(errorMsg, urlData, detailData);
            setError(errorMsg);
          }
        }
      } catch (err) {
        console.error('解析MV错误:', err);
        setError(
          '网络错误，请重试: ' +
            (err instanceof Error ? err.message : String(err))
        );
      } finally {
        setLoading(false);
      }
    },
    [selectedQuality]
  );

  // 加载MV播放URL
  const loadMVUrl = useCallback(async (mvId: string, quality: string) => {
    try {
      const urlEndpoint = `/api/music/proxy/mv/url?id=${mvId}&r=${quality}`;
      console.log('请求MV播放链接:', urlEndpoint);

      const urlRes = await fetch(urlEndpoint);
      console.log('MV URL响应状态:', urlRes.status);

      const urlData = await urlRes.json();
      console.log('MV URL数据:', urlData);

      if (
        urlData.success &&
        urlData.data &&
        urlData.data.length > 0 &&
        urlData.data[0].url
      ) {
        console.log('获取到MV播放链接:', urlData.data[0].url);
        setMvUrl(urlData.data[0].url);
        setIsPlaying(true);
      } else {
        const errorMsg = '无法获取MV播放链接';
        console.error(errorMsg, urlData);
        setError(errorMsg);
      }
    } catch (err) {
      console.error('加载MV URL错误:', err);
      setError(
        '加载播放链接失败: ' +
          (err instanceof Error ? err.message : String(err))
      );
    }
  }, []);

  // 切换画质
  const handleQualityChange = useCallback(
    (quality: string) => {
      setSelectedQuality(quality);
      if (mvDetail) {
        loadMVUrl(mvDetail.id, quality);
      }
    },
    [mvDetail, loadMVUrl]
  );

  return (
    <PageLayout activePath='/mv'>
      <div className='container mx-auto px-4 py-6 max-w-7xl'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2'>
            <Video className='w-8 h-8' />
            MV播放器
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-2'>
            搜索MV名称或艺术家，点击卡片即可播放
          </p>
        </div>

        {/* 搜索框 */}
        <div className='mb-6'>
          <div className='flex gap-2'>
            <input
              type='text'
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder='搜索MV名称或艺术家...'
              className='flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
              onClick={handleSearch}
              disabled={searching}
              className='px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2 disabled:opacity-50'
            >
              <Search className='w-5 h-5' />
              {searching ? '搜索中...' : '搜索'}
            </button>
          </div>
          {error && <p className='mt-2 text-red-500 text-sm'>{error}</p>}
        </div>

        {/* 搜索结果 */}
        {!mvDetail && searchResults.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6'>
            {searchResults.map((mv) => (
              <div
                key={mv.id}
                onClick={() => parseMV(mv.id, mv)}
                className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all transform hover:scale-105'
              >
                <div className='aspect-video bg-gray-200 dark:bg-gray-700 relative'>
                  {mv.cover || mv.imgurl ? (
                    <img
                      src={mv.cover || mv.imgurl}
                      alt={mv.name}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center'>
                      <Video className='w-12 h-12 text-gray-400' />
                    </div>
                  )}
                  <div className='absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded'>
                    {formatDuration(mv.duration)}
                  </div>
                </div>
                <div className='p-4'>
                  <h3 className='font-semibold text-gray-900 dark:text-white truncate mb-1'>
                    {mv.name}
                  </h3>
                  <p className='text-sm text-gray-600 dark:text-gray-400 truncate'>
                    {mv.artistName || mv.artist_name}
                  </p>
                  {mv.playCount && (
                    <p className='text-xs text-gray-500 dark:text-gray-500 mt-1'>
                      {formatPlayCount(mv.playCount)} 次播放
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 空状态 */}
        {!mvDetail && !searching && searchResults.length === 0 && (
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center'>
            <Video className='w-16 h-16 mx-auto mb-4 text-gray-400' />
            <p className='text-gray-600 dark:text-gray-400'>
              请输入关键词搜索MV
            </p>
            <p className='text-sm text-gray-500 dark:text-gray-500 mt-2'>
              例如：周杰伦、晴天、Mojito
            </p>
          </div>
        )}

        {/* MV播放器 */}
        {mvDetail && (
          <div className='mb-6'>
            <button
              onClick={() => {
                setMvDetail(null);
                setMvUrl('');
              }}
              className='mb-4 px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
            >
              ← 返回搜索结果
            </button>
          </div>
        )}

        {mvDetail && (
          <div className='space-y-6'>
            {/* MV播放器 */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden'>
              <div className='aspect-video bg-black'>
                {mvUrl ? (
                  <video
                    ref={videoRef}
                    src={mvUrl}
                    controls
                    autoPlay={isPlaying}
                    className='w-full h-full'
                  >
                    您的浏览器不支持视频播放
                  </video>
                ) : (
                  <div className='w-full h-full flex items-center justify-center'>
                    <p className='text-white'>加载中...</p>
                  </div>
                )}
              </div>

              {/* 播放控制栏 */}
              <div className='p-4'>
                <div className='flex items-center justify-between gap-4 mb-4'>
                  <div className='flex-1'>
                    <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
                      {mvDetail.name || mvDetail.title}
                    </h2>
                    <p className='text-gray-600 dark:text-gray-400'>
                      {mvDetail.artistName || mvDetail.artist_name}
                    </p>
                  </div>

                  {/* 画质选择 */}
                  <div className='flex items-center gap-2'>
                    <span className='text-sm text-gray-600 dark:text-gray-400'>
                      画质:
                    </span>
                    <select
                      value={selectedQuality}
                      onChange={(e) => handleQualityChange(e.target.value)}
                      className='px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                      {getMVQualityOptions().map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* MV信息 */}
                <div className='flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400'>
                  <span>时长: {formatDuration(mvDetail.duration)}</span>
                  <span>
                    播放量: {formatPlayCount(mvDetail.playCount || 0)}
                  </span>
                </div>

                {/* MV描述 */}
                {mvDetail.desc && (
                  <div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
                    <p className='text-gray-700 dark:text-gray-300 text-sm leading-relaxed'>
                      {mvDetail.desc}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* 下载按钮 */}
            {mvUrl && (
              <div className='flex justify-center'>
                <a
                  href={mvUrl}
                  download
                  target='_blank'
                  rel='noopener noreferrer'
                  className='px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2 transition-colors'
                >
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                    />
                  </svg>
                  下载MV ({selectedQuality}P)
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
