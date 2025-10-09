/* eslint-disable @typescript-eslint/no-explicit-any, @next/next/no-img-element */
'use client';

import { Music, Search } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { formatDuration, parseLyrics } from '@/lib/music-utils';
import { LyricLine, MusicSearchResult, SongDetail } from '@/lib/types';

import PageLayout from '@/components/PageLayout';

export default function MusicPage() {
  // 搜索相关状态
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<MusicSearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  // 播放器相关状态
  const [currentSong, setCurrentSong] = useState<SongDetail | null>(null);
  const [_currentSongUrl, setCurrentSongUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [quality] = useState('exhigh');

  // 歌词相关状态
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [activeLyricIndex, setActiveLyricIndex] = useState(-1);

  // Refs
  const audioRef = useRef<HTMLAudioElement>(null);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // 搜索音乐
  const handleSearch = useCallback(async () => {
    if (!searchKeyword.trim()) return;

    setSearching(true);
    try {
      const response = await fetch(
        `/api/music/search?keyword=${encodeURIComponent(
          searchKeyword
        )}&limit=20&type=1`
      );
      const data = await response.json();

      if (data.success && data.data) {
        setSearchResults(data.data);
      } else {
        alert('搜索失败');
      }
    } catch (error) {
      // 搜索错误处理
      alert('搜索失败');
    } finally {
      setSearching(false);
    }
  }, [searchKeyword]);

  // 播放歌曲
  const playSong = useCallback(
    async (songId: string) => {
      try {
        // 获取歌曲详情和URL
        const [detailRes, urlRes] = await Promise.all([
          fetch(`/api/music/song?id=${songId}&type=json`),
          fetch(`/api/music/song?id=${songId}&type=url&level=${quality}`),
        ]);

        const detailData = await detailRes.json();
        const urlData = await urlRes.json();

        if (detailData.success && urlData.success && urlData.data?.url) {
          setCurrentSong(detailData.data);
          setCurrentSongUrl(urlData.data.url);

          // 解析歌词
          if (detailData.data.lyric) {
            const parsedLyrics = parseLyrics(detailData.data.lyric);
            setLyrics(parsedLyrics);
          } else {
            setLyrics([]);
          }

          // 播放音频
          if (audioRef.current) {
            audioRef.current.src = urlData.data.url;
            audioRef.current.load();
            audioRef.current.play();
            setIsPlaying(true);
          }
        } else {
          alert('获取歌曲信息失败');
        }
      } catch (error) {
        // 播放错误处理
        alert('播放失败');
      }
    },
    [quality]
  );

  // 播放/暂停控制
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 音频事件监听
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);

      // 更新歌词高亮
      if (lyrics.length > 0) {
        let activeIdx = -1;
        for (let i = lyrics.length - 1; i >= 0; i--) {
          if (audio.currentTime >= lyrics[i].time) {
            activeIdx = i;
            break;
          }
        }
        setActiveLyricIndex(activeIdx);

        // 自动滚动歌词
        if (activeIdx >= 0 && lyricsContainerRef.current) {
          const activeLine = lyricsContainerRef.current.querySelector(
            `[data-index="${activeIdx}"]`
          );
          if (activeLine) {
            activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [lyrics]);

  // 音量控制
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // 进度条拖拽功能
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !audioRef.current || !duration) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleProgressClick(e);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!progressBarRef.current || !audioRef.current || !duration) return;

      const rect = progressBarRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = x / rect.width;
      const newTime = percentage * duration;

      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, duration]);

  // 移动端触摸支持
  const handleProgressTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (!progressBarRef.current || !audioRef.current || !duration) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (!progressBarRef.current || !audioRef.current || !duration) return;

      const rect = progressBarRef.current.getBoundingClientRect();
      const x = Math.max(
        0,
        Math.min(e.touches[0].clientX - rect.left, rect.width)
      );
      const percentage = x / rect.width;
      const newTime = percentage * duration;

      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, duration]);

  return (
    <PageLayout activePath='/music'>
      <div className='container mx-auto px-4 py-6 max-w-7xl'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2'>
            <Music className='w-8 h-8' />
            音乐播放器
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-2'>
            搜索并播放您喜欢的音乐
          </p>
        </div>

        {/* 搜索栏 */}
        <div className='mb-6'>
          <div className='flex gap-2'>
            <input
              type='text'
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder='搜索歌曲、歌手...'
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
        </div>

        {/* 主内容区域 */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* 搜索结果列表 */}
          <div className='lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
            <h2 className='text-xl font-semibold mb-4 text-gray-900 dark:text-white'>
              搜索结果
            </h2>
            <div className='space-y-2 max-h-[600px] overflow-y-auto'>
              {searchResults.length === 0 ? (
                <p className='text-gray-500 dark:text-gray-400 text-center py-8'>
                  暂无搜索结果，请输入关键词搜索
                </p>
              ) : (
                searchResults.map((song, idx) => (
                  <div
                    key={song.id}
                    onClick={() => playSong(song.id)}
                    className='flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors'
                  >
                    <div className='w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-full text-sm font-medium'>
                      {idx + 1}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='font-medium text-gray-900 dark:text-white truncate'>
                        {song.name}
                      </p>
                      <p className='text-sm text-gray-600 dark:text-gray-400 truncate'>
                        {song.artists || song.artist_string || song.ar_name}
                      </p>
                    </div>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      {formatDuration(song.duration || song.dt || 0)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 播放器和歌词 */}
          <div className='space-y-6'>
            {/* 播放器 */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
              <h2 className='text-xl font-semibold mb-4 text-gray-900 dark:text-white'>
                正在播放
              </h2>
              {currentSong ? (
                <div className='space-y-4'>
                  {/* 封面 */}
                  <div className='aspect-square rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700'>
                    {currentSong.pic ||
                    currentSong.al_pic ||
                    currentSong.pic_url ? (
                      <img
                        src={
                          currentSong.pic ||
                          currentSong.al_pic ||
                          currentSong.pic_url
                        }
                        alt={currentSong.name}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center'>
                        <Music className='w-16 h-16 text-gray-400' />
                      </div>
                    )}
                  </div>

                  {/* 歌曲信息 */}
                  <div className='text-center'>
                    <h3 className='font-bold text-lg text-gray-900 dark:text-white'>
                      {currentSong.name}
                    </h3>
                    <p className='text-gray-600 dark:text-gray-400'>
                      {currentSong.ar_name}
                    </p>
                  </div>

                  {/* 播放控制 */}
                  <div className='space-y-3'>
                    <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400'>
                      <span>
                        {Math.floor(currentTime / 60)}:
                        {String(Math.floor(currentTime % 60)).padStart(2, '0')}
                      </span>
                      <div
                        ref={progressBarRef}
                        className='flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden cursor-pointer relative'
                        onClick={handleProgressClick}
                        onMouseDown={handleProgressMouseDown}
                        onTouchStart={handleProgressTouchStart}
                      >
                        <div
                          className='h-full bg-blue-500 transition-all'
                          style={{
                            width: `${
                              duration ? (currentTime / duration) * 100 : 0
                            }%`,
                          }}
                        />
                        {/* 拖拽按钮 */}
                        <div
                          className='absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-lg'
                          style={{
                            left: `${
                              duration ? (currentTime / duration) * 100 : 0
                            }%`,
                            transform: 'translate(-50%, -50%)',
                          }}
                        />
                      </div>
                      <span>
                        {Math.floor(duration / 60)}:
                        {String(Math.floor(duration % 60)).padStart(2, '0')}
                      </span>
                    </div>

                    <div className='flex items-center justify-center gap-4'>
                      <button
                        onClick={togglePlay}
                        className='w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white'
                      >
                        {isPlaying ? '⏸️' : '▶️'}
                      </button>
                    </div>

                    <div className='flex items-center gap-2'>
                      <span className='text-sm text-gray-600 dark:text-gray-400'>
                        音量
                      </span>
                      <input
                        type='range'
                        min='0'
                        max='1'
                        step='0.01'
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className='flex-1'
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <p className='text-gray-500 dark:text-gray-400 text-center py-8'>
                  暂未播放歌曲
                </p>
              )}
            </div>

            {/* 歌词 */}
            {currentSong && lyrics.length > 0 && (
              <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'>
                <h2 className='text-xl font-semibold mb-4 text-gray-900 dark:text-white'>
                  歌词
                </h2>
                <div
                  ref={lyricsContainerRef}
                  className='max-h-[400px] overflow-y-auto space-y-2'
                >
                  {lyrics.map((line) => (
                    <p
                      key={line.index}
                      data-index={line.index}
                      className={`text-center transition-colors ${
                        line.index === activeLyricIndex
                          ? 'text-blue-500 font-bold text-lg'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {line.text}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 隐藏的音频元素 */}
        <audio ref={audioRef} />
      </div>
    </PageLayout>
  );
}
