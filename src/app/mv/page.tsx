/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */
'use client';

import { Search, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { formatDuration, formatPlayCount } from '@/lib/music-utils';

import PageLayout from '@/components/PageLayout';

export default function MVPage() {
  const router = useRouter();

  // 搜索相关状态
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');

  // 搜索 MV
  const handleSearch = useCallback(async () => {
    if (!searchKeyword.trim()) {
      setError('请输入搜索关键词');
      return;
    }

    setSearching(true);
    setError('');
    setSearchResults([]);

    try {
      console.log('搜索MV:', searchKeyword);

      // 使用正确的 MV 搜索 API
      const response = await fetch(
        `/api/music/proxy/mv/search?keywords=${encodeURIComponent(
          searchKeyword
        )}&limit=20`
      );
      const data = await response.json();

      console.log('MV搜索响应:', data);

      if (data.success && data.data && data.data.length > 0) {
        setSearchResults(data.data);
      } else {
        setError('未找到相关MV，请尝试其他关键词');
      }
    } catch (err) {
      console.error('搜索MV错误:', err);
      setError('搜索失败，请重试');
    } finally {
      setSearching(false);
    }
  }, [searchKeyword]);

  // 跳转到播放页面
  const playMV = useCallback(
    (mvId: string, mvInfo?: any) => {
      const params = new URLSearchParams({
        id: mvId,
        name: mvInfo?.name || 'MV',
        artist: mvInfo?.artistName || '',
        cover: mvInfo?.cover || '',
      });

      router.push(`/mv/play?${params.toString()}`);
    },
    [router]
  );

  return (
    <PageLayout activePath='/mv'>
      <div className='container mx-auto px-4 py-6 max-w-7xl'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2'>
            <Video className='w-8 h-8' />
            MV搜索
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
              placeholder='搜索MV名称或艺术家...（例如：陶喆、找自己）'
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
          {error && !searching && (
            <p className='mt-2 text-red-500 text-sm'>{error}</p>
          )}
        </div>

        {/* 搜索结果 */}
        {searchResults.length > 0 && (
          <div className='mb-6'>
            <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-4'>
              搜索结果 ({searchResults.length})
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              {searchResults.map((mv) => (
                <div
                  key={mv.id}
                  onClick={() => playMV(String(mv.id), mv)}
                  className='bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all transform hover:scale-105'
                >
                  <div className='aspect-video bg-gray-200 dark:bg-gray-700 relative'>
                    {mv.cover ? (
                      <img
                        src={mv.cover}
                        alt={mv.name}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center'>
                        <Video className='w-12 h-12 text-gray-400' />
                      </div>
                    )}
                    {mv.duration > 0 && (
                      <div className='absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded'>
                        {formatDuration(mv.duration)}
                      </div>
                    )}
                  </div>
                  <div className='p-4'>
                    <h3 className='font-semibold text-gray-900 dark:text-white truncate mb-1'>
                      {mv.name}
                    </h3>
                    <p className='text-sm text-gray-600 dark:text-gray-400 truncate'>
                      {mv.artistName}
                    </p>
                    {mv.playCount > 0 && (
                      <p className='text-xs text-gray-500 dark:text-gray-500 mt-1'>
                        {formatPlayCount(mv.playCount)} 次播放
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 空状态 */}
        {!searching && searchResults.length === 0 && (
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center'>
            <Video className='w-16 h-16 mx-auto mb-4 text-gray-400' />
            <p className='text-gray-600 dark:text-gray-400'>
              请输入关键词搜索MV
            </p>
            <p className='text-sm text-gray-500 dark:text-gray-500 mt-2'>
              例如：陶喆、找自己、周杰伦
            </p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
