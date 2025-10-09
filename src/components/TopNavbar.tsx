/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import {
  Cat,
  ChevronDown,
  Clover,
  Film,
  Home,
  Music,
  PlaySquare,
  Search,
  Star,
  Tv,
  Video,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { useSite } from './SiteProvider';

interface TopNavbarProps {
  activePath?: string;
}

const Logo = () => {
  const { siteName } = useSite();
  return (
    <Link
      href='/'
      className='flex items-center select-none hover:opacity-80 transition-opacity duration-200'
    >
      <span className='text-xl sm:text-2xl font-bold text-green-600 tracking-tight'>
        {siteName}
      </span>
    </Link>
  );
};

const TopNavbar = ({ activePath = '/' }: TopNavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState(activePath);
  const [showMusicDropdown, setShowMusicDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  useEffect(() => {
    if (activePath) {
      setActive(activePath);
    } else {
      const getCurrentFullPath = () => {
        const queryString = searchParams.toString();
        return queryString ? `${pathname}?${queryString}` : pathname;
      };
      const fullPath = getCurrentFullPath();
      setActive(fullPath);
    }
  }, [activePath, pathname, searchParams]);

  const handleSearchClick = useCallback(() => {
    router.push('/search');
  }, [router]);

  const [menuItems, setMenuItems] = useState([
    {
      icon: Home,
      label: '首页',
      href: '/',
    },
    {
      icon: Search,
      label: '搜索',
      href: '/search',
    },
  ]);

  const typeMenuItems = [
    {
      icon: Film,
      label: '电影',
      href: '/douban?type=movie',
    },
    {
      icon: Tv,
      label: '剧集',
      href: '/douban?type=tv',
    },
    {
      icon: PlaySquare,
      label: '短剧',
      href: '/shortdrama',
    },
    {
      icon: Cat,
      label: '动漫',
      href: '/douban?type=anime',
    },
    {
      icon: Clover,
      label: '综艺',
      href: '/douban?type=show',
    },
  ];

  // 动态添加自定义到主导航栏
  useEffect(() => {
    const runtimeConfig = (window as any).RUNTIME_CONFIG;
    if (runtimeConfig?.CUSTOM_CATEGORIES?.length > 0) {
      setMenuItems((prevItems) => [
        ...prevItems,
        {
          icon: Star,
          label: '自定义',
          href: '/douban?type=custom',
        },
      ]);
    }
  }, []);

  return (
    <nav className='hidden md:flex fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-50 shadow-sm dark:bg-gray-900/80 dark:border-gray-700/50'>
      <div className='w-full max-w-screen-2xl mx-auto px-4 flex items-center justify-between gap-8'>
        {/* Logo */}
        <div className='flex-shrink-0'>
          <Logo />
        </div>

        {/* 导航菜单 */}
        <div className='flex-1 flex items-center justify-center'>
          <div className='flex items-center gap-1'>
            {menuItems.map((item) => {
              const typeMatch = item.href.match(/type=([^&]+)/)?.[1];
              const decodedActive = decodeURIComponent(active);
              const decodedItemHref = decodeURIComponent(item.href);

              const isActive =
                decodedActive === decodedItemHref ||
                (decodedActive.startsWith('/douban') &&
                  decodedActive.includes(`type=${typeMatch}`)) ||
                (item.href === '/' && decodedActive === '/') ||
                (item.href === '/search' && decodedActive === '/search');

              const Icon = item.icon;

              const handleClick = (e: React.MouseEvent) => {
                if (item.href === '/search') {
                  e.preventDefault();
                  handleSearchClick();
                }
                setActive(item.href);
              };

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={handleClick}
                  data-active={isActive}
                  className='group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100/50 hover:text-green-600 data-[active=true]:bg-green-500/10 data-[active=true]:text-green-700 transition-colors duration-200 dark:text-gray-300 dark:hover:text-green-400 dark:hover:bg-gray-700/50 dark:data-[active=true]:bg-green-500/10 dark:data-[active=true]:text-green-400'
                >
                  <Icon className='h-4 w-4' />
                  <span className='whitespace-nowrap'>{item.label}</span>
                </Link>
              );
            })}

            {/* 类型下拉菜单 */}
            <div
              className='relative'
              onMouseEnter={() => setShowTypeDropdown(true)}
              onMouseLeave={() => setShowTypeDropdown(false)}
            >
              <button
                data-active={
                  (active.startsWith('/douban') &&
                    !active.includes('type=custom')) ||
                  active.startsWith('/shortdrama')
                }
                className='group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100/50 hover:text-green-600 data-[active=true]:bg-green-500/10 data-[active=true]:text-green-700 transition-colors duration-200 dark:text-gray-300 dark:hover:text-green-400 dark:hover:bg-gray-700/50 dark:data-[active=true]:bg-green-500/10 dark:data-[active=true]:text-green-400'
              >
                <Film className='h-4 w-4' />
                <span className='whitespace-nowrap'>类型</span>
                <ChevronDown className='h-3 w-3' />
              </button>

              {/* 下拉菜单 */}
              {showTypeDropdown && (
                <div className='absolute top-full left-0 mt-0 pt-2 w-48 z-50'>
                  <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 overflow-hidden'>
                    {typeMenuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => {
                            setActive(item.href);
                            setShowTypeDropdown(false);
                          }}
                          className='flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                        >
                          <Icon className='h-4 w-4' />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 音乐下拉菜单 */}
            <div
              className='relative'
              onMouseEnter={() => setShowMusicDropdown(true)}
              onMouseLeave={() => setShowMusicDropdown(false)}
            >
              <button
                data-active={
                  active.startsWith('/music') || active.startsWith('/mv')
                }
                className='group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100/50 hover:text-green-600 data-[active=true]:bg-green-500/10 data-[active=true]:text-green-700 transition-colors duration-200 dark:text-gray-300 dark:hover:text-green-400 dark:hover:bg-gray-700/50 dark:data-[active=true]:bg-green-500/10 dark:data-[active=true]:text-green-400'
              >
                <Music className='h-4 w-4' />
                <span className='whitespace-nowrap'>音乐</span>
                <ChevronDown className='h-3 w-3' />
              </button>

              {/* 下拉菜单 - 增加内边距以防止鼠标移开时立即消失 */}
              {showMusicDropdown && (
                <div className='absolute top-full left-0 mt-0 pt-2 w-48 z-50'>
                  <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 overflow-hidden'>
                    <Link
                      href='/music'
                      onClick={() => {
                        setActive('/music');
                        setShowMusicDropdown(false);
                      }}
                      className='flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                    >
                      <Music className='h-4 w-4 text-blue-500' />
                      <span>播放歌曲</span>
                    </Link>
                    <Link
                      href='/mv'
                      onClick={() => {
                        setActive('/mv');
                        setShowMusicDropdown(false);
                      }}
                      className='flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                    >
                      <Video className='h-4 w-4 text-purple-500' />
                      <span>播放MV</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 右侧占位，为右上角按钮留出空间 */}
        <div className='flex-shrink-0 w-32'></div>
      </div>
    </nav>
  );
};

export default TopNavbar;
