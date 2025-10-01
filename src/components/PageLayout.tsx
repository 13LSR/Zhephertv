import { BackButton } from './BackButton';
import MobileBottomNav from './MobileBottomNav';
import MobileHeader from './MobileHeader';
import TopNavbar from './TopNavbar';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';

interface PageLayoutProps {
  children: React.ReactNode;
  activePath?: string;
}

const PageLayout = ({ children, activePath = '/' }: PageLayoutProps) => {
  return (
    <div className='w-full min-h-screen'>
      {/* 移动端头部 */}
      <MobileHeader showBackButton={['/play'].includes(activePath)} />

      {/* 桌面端顶部导航栏 */}
      <TopNavbar activePath={activePath} />

      {/* 主要布局容器 */}
      <div className='flex w-full min-h-screen'>
        {/* 主内容区域 */}
        <div className='relative min-w-0 flex-1 w-full transition-all duration-300'>
          {/* 桌面端左上角返回按钮 */}
          {['/play'].includes(activePath) && (
            <div className='absolute top-20 left-4 z-20 hidden md:flex'>
              <BackButton />
            </div>
          )}

          {/* 桌面端顶部按钮 */}
          <div className='fixed top-4 right-4 z-[60] hidden md:flex items-center gap-2'>
            <ThemeToggle />
            <UserMenu />
          </div>

          {/* 主内容 */}
          <main
            className='flex-1 md:min-h-0 mb-14 md:mb-0 md:mt-16 mt-12'
            style={{
              paddingBottom: 'calc(3.5rem + env(safe-area-inset-bottom))',
            }}
          >
            {children}
          </main>
        </div>
      </div>

      {/* 移动端底部导航 */}
      <div className='md:hidden'>
        <MobileBottomNav activePath={activePath} />
      </div>
    </div>
  );
};

export default PageLayout;
