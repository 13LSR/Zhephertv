/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import {
  Cat,
  Clover,
  Film,
  Home,
  Music,
  PlaySquare,
  Star,
  Tv,
  Video,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface MobileBottomNavProps {
  /**
   * 主动指定当前激活的路径。当未提供时，自动使用 usePathname() 获取的路径。
   */
  activePath?: string;
}

const MobileBottomNav = ({ activePath }: MobileBottomNavProps) => {
  const pathname = usePathname();
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showMusicMenu, setShowMusicMenu] = useState(false);
  const [navItems, setNavItems] = useState([
    { icon: Home, label: '首页', href: '/' },
    { icon: Film, label: '类型', href: '#type', special: 'type' },
    { icon: Music, label: '音乐', href: '#music', special: 'music' },
  ]);
  const typeMenuRef = useRef<HTMLLIElement>(null);
  const musicMenuRef = useRef<HTMLLIElement>(null);

  // 当前激活路径：优先使用传入的 activePath，否则回退到浏览器地址
  const currentActive = activePath ?? pathname;

  const [typeMenuItems, setTypeMenuItems] = useState([
    { icon: Film, label: '电影', href: '/douban?type=movie' },
    { icon: Tv, label: '剧集', href: '/douban?type=tv' },
    { icon: PlaySquare, label: '短剧', href: '/shortdrama' },
    { icon: Cat, label: '动漫', href: '/douban?type=anime' },
    { icon: Clover, label: '综艺', href: '/douban?type=show' },
  ]);

  const musicMenuItems = [
    { icon: Music, label: '播放歌曲', href: '/music' },
    { icon: Video, label: '播放MV', href: '/mv' },
  ];

  // 动态添加自定义到主导航栏（不添加到类型菜单）
  useEffect(() => {
    const runtimeConfig = (window as any).RUNTIME_CONFIG;
    if (runtimeConfig?.CUSTOM_CATEGORIES?.length > 0) {
      // 只添加到导航栏
      setNavItems((prevItems) => [
        ...prevItems,
        {
          icon: Star,
          label: '自定义',
          href: '/douban?type=custom',
        },
      ]);
    }
  }, []);

  // 点击/触摸外部关闭菜单 - 添加延迟避免与菜单项点击冲突
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      // 检查是否点击在菜单内部
      const clickedInsideTypeMenu = document
        .getElementById('type-menu')
        ?.contains(target);
      const clickedInsideMusicMenu = document
        .getElementById('music-menu')
        ?.contains(target);

      if (
        showTypeMenu &&
        typeMenuRef.current &&
        !typeMenuRef.current.contains(target) &&
        !clickedInsideTypeMenu
      ) {
        setShowTypeMenu(false);
      }
      if (
        showMusicMenu &&
        musicMenuRef.current &&
        !musicMenuRef.current.contains(target) &&
        !clickedInsideMusicMenu
      ) {
        setShowMusicMenu(false);
      }
    };

    if (showTypeMenu || showMusicMenu) {
      // 添加小延迟确保菜单已渲染
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);
      }, 100);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showTypeMenu, showMusicMenu]);

  const isActive = (href: string) => {
    const typeMatch = href.match(/type=([^&]+)/)?.[1];

    // 解码URL以进行正确的比较
    const decodedActive = decodeURIComponent(currentActive);
    const decodedItemHref = decodeURIComponent(href);

    return (
      decodedActive === decodedItemHref ||
      (decodedActive.startsWith('/douban') &&
        decodedActive.includes(`type=${typeMatch}`)) ||
      (href === '/shortdrama' && decodedActive.startsWith('/shortdrama'))
    );
  };

  return (
    <>
      <nav
        className='md:hidden fixed left-0 right-0 z-[600] bg-white/90 backdrop-blur-xl border-t border-gray-200/50 dark:bg-gray-900/80 dark:border-gray-700/50'
        style={{
          /* 紧贴视口底部，同时在内部留出安全区高度 */
          bottom: 0,
          paddingBottom: 'env(safe-area-inset-bottom)',
          minHeight: 'calc(3.5rem + env(safe-area-inset-bottom))',
        }}
      >
        <ul className='flex items-center justify-around'>
          {navItems.map((item) => {
            let active = false;
            if (item.special === 'type') {
              // 类型导航激活：排除自定义
              active =
                (currentActive.startsWith('/douban') &&
                  !currentActive.includes('type=custom')) ||
                currentActive.startsWith('/shortdrama');
            } else if (item.special === 'music') {
              active =
                currentActive.startsWith('/music') ||
                currentActive.startsWith('/mv');
            } else {
              active = isActive(item.href);
            }

            if (item.special === 'type') {
              return (
                <li key={item.label} className='flex-1' ref={typeMenuRef}>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(
                        'Type menu clicked, current state:',
                        showTypeMenu
                      );
                      setShowTypeMenu((prev) => !prev);
                    }}
                    className='flex flex-col items-center justify-center w-full h-14 gap-1 text-xs touch-manipulation'
                  >
                    <item.icon
                      className={`h-6 w-6 ${
                        active
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    />
                    <span
                      className={
                        active
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-600 dark:text-gray-300'
                      }
                    >
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            }

            // 音乐菜单
            if (item.special === 'music') {
              return (
                <li key={item.label} className='flex-1' ref={musicMenuRef}>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(
                        'Music menu clicked, current state:',
                        showMusicMenu
                      );
                      setShowMusicMenu((prev) => !prev);
                    }}
                    className='flex flex-col items-center justify-center w-full h-14 gap-1 text-xs touch-manipulation'
                  >
                    <item.icon
                      className={`h-6 w-6 ${
                        active
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    />
                    <span
                      className={
                        active
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-600 dark:text-gray-300'
                      }
                    >
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            }

            return (
              <li key={item.href} className='flex-1'>
                <Link
                  href={item.href}
                  className='flex flex-col items-center justify-center w-full h-14 gap-1 text-xs'
                >
                  <item.icon
                    className={`h-6 w-6 ${
                      active
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  />
                  <span
                    className={
                      active
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-600 dark:text-gray-300'
                    }
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 类型菜单 - 使用fixed定位到nav外部 */}
      {showTypeMenu && (
        <div
          id='type-menu'
          className='md:hidden fixed z-[700] w-48'
          style={{
            bottom: 'calc(3.5rem + env(safe-area-inset-bottom) + 0.75rem)',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 py-2 overflow-hidden'>
            {typeMenuItems.map((typeItem) => {
              const TypeIcon = typeItem.icon;
              // 检查是否是当前激活页面
              const isItemActive =
                currentActive === typeItem.href ||
                (typeItem.href === '/shortdrama' &&
                  currentActive.startsWith('/shortdrama')) ||
                (typeItem.href.includes('type=') &&
                  currentActive.includes(typeItem.href.split('?')[1]));

              return (
                <Link
                  key={typeItem.label}
                  href={typeItem.href}
                  onClick={(e) => {
                    console.log('Type item clicked:', typeItem.label);
                    setShowTypeMenu(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    isItemActive
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600'
                  }`}
                >
                  <TypeIcon className='h-4 w-4' />
                  <span>{typeItem.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* 音乐菜单 - 使用fixed定位到nav外部 */}
      {showMusicMenu && (
        <div
          id='music-menu'
          className='md:hidden fixed z-[700] w-48'
          style={{
            bottom: 'calc(3.5rem + env(safe-area-inset-bottom) + 0.75rem)',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 py-2 overflow-hidden'>
            {musicMenuItems.map((musicItem) => {
              const MusicIcon = musicItem.icon;
              // 检查是否是当前激活页面
              const isItemActive =
                currentActive === musicItem.href ||
                (musicItem.href === '/music' &&
                  currentActive.startsWith('/music')) ||
                (musicItem.href === '/mv' && currentActive.startsWith('/mv'));

              return (
                <Link
                  key={musicItem.label}
                  href={musicItem.href}
                  onClick={(e) => {
                    console.log('Music item clicked:', musicItem.label);
                    setShowMusicMenu(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    isItemActive
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600'
                  }`}
                >
                  <MusicIcon className='h-4 w-4' />
                  <span>{musicItem.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileBottomNav;
