[根目录](../../CLAUDE.md) > **components**

# 组件模块 (src/components)

> React可复用组件库，提供UI组件、业务组件和布局组件

## 变更记录 (Changelog)

### 2025-09-28 17:17:51
- 🚀 **模块文档初始化**：完成组件模块结构分析
- 📊 **组件分类梳理**：识别出38个组件，分为UI、业务、布局三大类
- 🎨 **设计系统分析**：基于Tailwind CSS + Headless UI的组件设计体系

---

## 模块职责

组件模块是 Zhephertv 的UI组件库，负责：

- **UI组件**：基础的可复用界面元素
- **业务组件**：封装特定业务逻辑的复合组件
- **布局组件**：页面结构和导航相关组件
- **主题管理**：暗色/亮色模式切换支持
- **响应式设计**：移动端和桌面端适配

## 入口与启动

### 组件设计原则
- **可复用性**：高度抽象的通用组件
- **可组合性**：小组件组合成大组件
- **类型安全**：完整的TypeScript类型定义
- **无障碍性**：遵循ARIA标准
- **响应式**：移动端优先的响应式设计

### 主题系统
- **ThemeProvider** (`ThemeProvider.tsx`): 基于 next-themes 的主题管理
- **颜色系统**: Tailwind CSS的暗色/亮色模式类名
- **图标系统**: Lucide React + React Icons

### 状态管理
- **SiteProvider** (`SiteProvider.tsx`): 全局站点配置管理
- **本地状态**: 组件内部使用 React Hooks
- **上下文传递**: Context API用于跨组件数据共享

## 对外接口

### UI基础组件

| 组件名 | 文件 | 功能描述 | Props |
|--------|------|----------|-------|
| **BackButton** | `BackButton.tsx` | 返回按钮 | `className?`, `onClick?` |
| **CapsuleSwitch** | `CapsuleSwitch.tsx` | 胶囊式切换器 | `options`, `active`, `onChange` |
| **ImagePlaceholder** | `ImagePlaceholder.tsx` | 图片占位符 | `src`, `alt`, `className` |
| **ThemeToggle** | `ThemeToggle.tsx` | 主题切换按钮 | 无props |
| **UserMenu** | `UserMenu.tsx` | 用户菜单下拉 | 无props |
| **MobileActionSheet** | `MobileActionSheet.tsx` | 移动端操作面板 | `isOpen`, `onClose`, `children` |
| **MobileBottomNav** | `MobileBottomNav.tsx` | 移动端底部导航 | 无props |
| **MobileHeader** | `MobileHeader.tsx` | 移动端顶部导航 | 无props |

### 业务组件

| 组件名 | 文件 | 功能描述 | 主要Props |
|--------|------|----------|-----------|
| **VideoCard** | `VideoCard.tsx` | 视频卡片展示 | `title`, `poster`, `year`, `rate`, `from` |
| **ShortDramaCard** | `ShortDramaCard.tsx` | 短剧卡片 | `drama: ShortDramaItem` |
| **YouTubeVideoCard** | `YouTubeVideoCard.tsx` | YouTube视频卡片 | `video`, `onPlay` |
| **DoubanCardSkeleton** | `DoubanCardSkeleton.tsx` | 豆瓣卡片骨架屏 | 无props |
| **SearchResultFilter** | `SearchResultFilter.tsx` | 搜索结果过滤器 | `filters`, `onFilter` |
| **SearchSuggestions** | `SearchSuggestions.tsx` | 搜索建议 | `suggestions`, `onSelect` |
| **NetDiskSearchResults** | `NetDiskSearchResults.tsx` | 网盘搜索结果 | `results`, `loading` |
| **TMDBFilterPanel** | `TMDBFilterPanel.tsx` | TMDB过滤面板 | `filters`, `onChange` |

### 选择器组件

| 组件名 | 文件 | 功能描述 | 主要Props |
|--------|------|----------|-----------|
| **EpisodeSelector** | `EpisodeSelector.tsx` | 集数选择器 | `episodes`, `current`, `onSelect` |
| **DoubanSelector** | `DoubanSelector.tsx` | 豆瓣选择器 | `categories`, `onSelect` |
| **DoubanCustomSelector** | `DoubanCustomSelector.tsx` | 豆瓣自定义选择器 | `customCategories`, `onSelect` |
| **MultiLevelSelector** | `MultiLevelSelector.tsx` | 多级选择器 | `levels`, `value`, `onChange` |
| **WeekdaySelector** | `WeekdaySelector.tsx` | 星期选择器 | `selected`, `onSelect` |

### 布局组件

| 组件名 | 文件 | 功能描述 | 主要Props |
|--------|------|----------|-----------|
| **PageLayout** | `PageLayout.tsx` | 页面布局容器 | `children`, `showSidebar?` |
| **Sidebar** | `Sidebar.tsx` | 侧边栏导航 | 无props |
| **ScrollableRow** | `ScrollableRow.tsx` | 横向滚动行 | `children`, `title?` |
| **EpgScrollableRow** | `EpgScrollableRow.tsx` | EPG横向滚动 | `items`, `onSelect` |

### 功能组件

| 组件名 | 文件 | 功能描述 | 主要Props |
|--------|------|----------|-----------|
| **ContinueWatching** | `ContinueWatching.tsx` | 继续观看组件 | 无props |
| **TopContentList** | `TopContentList.tsx` | 热门内容列表 | `type`, `limit?` |
| **AIRecommendModal** | `AIRecommendModal.tsx` | AI推荐弹窗 | `isOpen`, `onClose` |
| **AIRecommendConfig** | `AIRecommendConfig.tsx` | AI推荐配置 | `config`, `onChange` |
| **DirectYouTubePlayer** | `DirectYouTubePlayer.tsx` | YouTube播放器 | `videoId`, `options?` |

### 管理组件

| 组件名 | 文件 | 功能描述 | 主要Props |
|--------|------|----------|-----------|
| **CacheManager** | `CacheManager.tsx` | 缓存管理 | 无props |
| **DataMigration** | `DataMigration.tsx` | 数据迁移 | 无props |
| **TVBoxSecurityConfig** | `TVBoxSecurityConfig.tsx` | TVBox安全配置 | `config`, `onChange` |
| **YouTubeConfig** | `YouTubeConfig.tsx` | YouTube配置 | `config`, `onChange` |
| **VersionPanel** | `VersionPanel.tsx` | 版本信息面板 | 无props |

### 虚拟化组件

| 组件名 | 文件 | 功能描述 | 主要Props |
|--------|------|----------|-----------|
| **VirtualDoubanGrid** | `VirtualDoubanGrid.tsx` | 豆瓣虚拟网格 | `items`, `onLoadMore` |
| **VirtualSearchGrid** | `VirtualSearchGrid.tsx` | 搜索虚拟网格 | `results`, `onLoadMore` |

### 系统组件

| 组件名 | 文件 | 功能描述 | 主要Props |
|--------|------|----------|-----------|
| **SiteProvider** | `SiteProvider.tsx` | 站点配置提供者 | `siteName`, `announcement`, `children` |
| **ThemeProvider** | `ThemeProvider.tsx` | 主题提供者 | `children`, 其他next-themes属性 |
| **SessionTracker** | `SessionTracker.tsx` | 会话跟踪 | 无props |
| **GlobalErrorIndicator** | `GlobalErrorIndicator.tsx` | 全局错误指示器 | 无props |

## 关键依赖与配置

### 核心UI库
```json
{
  "@headlessui/react": "^2.2.4",
  "@heroicons/react": "^2.2.0",
  "lucide-react": "^0.438.0",
  "react-icons": "^5.4.0",
  "framer-motion": "^12.18.1"
}
```

### 媒体相关
```json
{
  "artplayer": "^5.3.0",
  "artplayer-plugin-danmuku": "^5.2.0",
  "@vidstack/react": "^1.12.13",
  "hls.js": "^1.6.13"
}
```

### 虚拟化与交互
```json
{
  "react-window": "^2.1.2",
  "react-window-infinite-loader": "^1.0.10",
  "@dnd-kit/core": "^6.3.1",
  "@dnd-kit/sortable": "^10.0.0",
  "swiper": "^11.2.8"
}
```

### 样式系统
```json
{
  "tailwind-merge": "^2.6.0",
  "clsx": "^2.0.0",
  "next-themes": "^0.4.6"
}
```

## 数据模型

### 组件Props接口

```typescript
// 视频卡片Props
interface VideoCardProps {
  title: string;
  poster: string;
  year?: string;
  rate?: string;
  douban_id?: number;
  from: 'douban' | 'search' | 'favorite';
  type?: 'movie' | 'tv' | '';
  episodes?: number;
  currentEpisode?: number;
  query?: string;
  id?: string;
  source?: string;
  isBangumi?: boolean;
}

// 短剧卡片Props
interface ShortDramaCardProps {
  drama: ShortDramaItem;
  onClick?: (drama: ShortDramaItem) => void;
}

// 选择器通用Props
interface SelectorProps<T> {
  options: Array<{
    value: T;
    label: string;
    disabled?: boolean;
  }>;
  value?: T;
  onChange: (value: T) => void;
  placeholder?: string;
}
```

### 主题类型
```typescript
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: string) => void;
  resolvedTheme: 'light' | 'dark';
}

interface SiteContextType {
  siteName: string;
  announcement: string;
}
```

### 响应式断点
```css
/* Tailwind CSS断点 */
sm: '640px',   /* 小屏设备 */
md: '768px',   /* 中等屏幕 */
lg: '1024px',  /* 大屏幕 */
xl: '1280px',  /* 超大屏幕 */
2xl: '1536px'  /* 超超大屏幕 */
```

## 测试与质量

### 组件测试策略
- ✅ **渲染测试**：确保组件正常渲染
- ✅ **快照测试**：检测UI变更
- ⚠️ **待完善**：交互测试（点击、输入等）
- ⚠️ **待完善**：无障碍性测试
- ⚠️ **待完善**：响应式测试

### 设计系统一致性
- **颜色规范**：严格遵循Tailwind颜色体系
- **间距规范**：使用Tailwind间距类名
- **字体规范**：Inter字体，统一字重和行高
- **圆角规范**：统一圆角尺寸 (rounded-lg, rounded-xl)

### 性能优化
- **懒加载**：虚拟化组件支持大列表
- **防抖处理**：搜索输入防抖
- **图片优化**：Next.js Image组件
- **代码分割**：动态导入重型组件

## 常见问题 (FAQ)

### Q: 如何创建新的业务组件？
A: 1. 创建新的TSX文件 2. 定义Props接口 3. 实现组件逻辑 4. 添加默认样式 5. 导出组件

### Q: 如何处理组件的响应式设计？
A: 使用Tailwind的响应式前缀 (sm:, md:, lg:)，移动端优先设计，桌面端增强。

### Q: 如何在组件中访问全局配置？
A: 使用 `useSite()` Hook获取站点配置，或通过props传递必要配置。

### Q: 组件如何支持暗色模式？
A: 使用 `dark:` 前缀的Tailwind类名，或通过 `useTheme()` Hook获取当前主题。

### Q: 如何优化组件的性能？
A: 使用 React.memo、useMemo、useCallback，避免不必要的重渲染，对大列表使用虚拟化。

## 相关文件清单

### UI基础组件 (8个)
- `BackButton.tsx` - 返回按钮
- `CapsuleSwitch.tsx` - 胶囊切换器
- `ImagePlaceholder.tsx` - 图片占位符
- `ThemeToggle.tsx` - 主题切换
- `UserMenu.tsx` - 用户菜单
- `MobileActionSheet.tsx` - 移动操作面板
- `MobileBottomNav.tsx` - 移动底部导航
- `MobileHeader.tsx` - 移动顶部导航

### 业务组件 (8个)
- `VideoCard.tsx` - 视频卡片
- `ShortDramaCard.tsx` - 短剧卡片
- `YouTubeVideoCard.tsx` - YouTube卡片
- `DoubanCardSkeleton.tsx` - 豆瓣骨架屏
- `SearchResultFilter.tsx` - 搜索过滤器
- `SearchSuggestions.tsx` - 搜索建议
- `NetDiskSearchResults.tsx` - 网盘搜索结果
- `TMDBFilterPanel.tsx` - TMDB过滤面板

### 选择器组件 (5个)
- `EpisodeSelector.tsx` - 集数选择器
- `DoubanSelector.tsx` - 豆瓣选择器
- `DoubanCustomSelector.tsx` - 豆瓣自定义选择器
- `MultiLevelSelector.tsx` - 多级选择器
- `WeekdaySelector.tsx` - 星期选择器

### 布局组件 (4个)
- `PageLayout.tsx` - 页面布局
- `Sidebar.tsx` - 侧边栏
- `ScrollableRow.tsx` - 横向滚动行
- `EpgScrollableRow.tsx` - EPG滚动行

### 功能组件 (5个)
- `ContinueWatching.tsx` - 继续观看
- `TopContentList.tsx` - 热门内容
- `AIRecommendModal.tsx` - AI推荐弹窗
- `AIRecommendConfig.tsx` - AI推荐配置
- `DirectYouTubePlayer.tsx` - YouTube播放器

### 管理组件 (5个)
- `CacheManager.tsx` - 缓存管理
- `DataMigration.tsx` - 数据迁移
- `TVBoxSecurityConfig.tsx` - TVBox安全配置
- `YouTubeConfig.tsx` - YouTube配置
- `VersionPanel.tsx` - 版本面板

### 虚拟化组件 (2个)
- `VirtualDoubanGrid.tsx` - 豆瓣虚拟网格
- `VirtualSearchGrid.tsx` - 搜索虚拟网格

### 系统组件 (4个)
- `SiteProvider.tsx` - 站点配置提供者
- `ThemeProvider.tsx` - 主题提供者
- `SessionTracker.tsx` - 会话跟踪
- `GlobalErrorIndicator.tsx` - 全局错误指示器