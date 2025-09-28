[根目录](../../CLAUDE.md) > **app**

# 前端应用模块 (src/app)

> Next.js 14 App Router 应用入口，包含页面组件和API路由

## 变更记录 (Changelog)

### 2025-09-28 17:17:51
- 🚀 **模块文档初始化**：完成前端应用模块结构分析
- 📊 **页面路由梳理**：识别13个主要页面路由
- 🔗 **API路由分析**：梳理55个API端点，分为公共API和管理员API

---

## 模块职责

前端应用模块是 Zhephertv 的核心应用层，负责：

- **页面路由**：基于文件系统的 Next.js App Router 页面
- **API端点**：RESTful API 路由，分为前台和后台管理
- **应用入口**：全局布局、主题、配置加载
- **静态资源**：全局样式、字体、图标等静态资源

## 入口与启动

### 应用入口
- **根布局**：`layout.tsx` - 全局HTML结构、主题提供者、配置注入
- **主页面**：`page.tsx` - 首页，包含热门推荐、收藏夹等功能
- **全局样式**：`globals.css` - Tailwind CSS基础样式

### 启动流程
1. **配置加载**：`layout.tsx` 中通过 `getConfig()` 加载应用配置
2. **主题系统**：集成 `next-themes` 支持暗色/亮色模式切换
3. **用户会话**：`SessionTracker` 组件管理用户会话状态
4. **错误处理**：`GlobalErrorIndicator` 提供全局错误提示

### 运行时配置
通过 `window.RUNTIME_CONFIG` 注入运行时配置，包括：
- 存储类型、代理配置
- 豆瓣接口配置
- 黄色内容过滤设置
- 自定义分类配置

## 对外接口

### 页面路由

| 路径 | 组件 | 功能描述 | 权限要求 |
|-----|------|----------|---------|
| `/` | `page.tsx` | 首页 - 热门推荐、收藏夹 | 登录用户 |
| `/admin` | `admin/page.tsx` | 管理后台首页 | 管理员 |
| `/login` | `login/page.tsx` | 用户登录页面 | 公开 |
| `/register` | `register/page.tsx` | 用户注册页面 | 公开 |
| `/search` | `search/page.tsx` | 搜索结果页面 | 登录用户 |
| `/play` | `play/page.tsx` | 视频播放页面 | 登录用户 |
| `/live` | `live/page.tsx` | 直播电视页面 | 登录用户 |
| `/douban` | `douban/page.tsx` | 豆瓣影视发现 | 登录用户 |
| `/shortdrama` | `shortdrama/page.tsx` | 短剧专区 | 登录用户 |
| `/tvbox` | `tvbox/page.tsx` | TVBox配置生成 | 登录用户 |
| `/play-stats` | `play-stats/page.tsx` | 播放统计页面 | 登录用户 |
| `/release-calendar` | `release-calendar/page.tsx` | 影视发布日历 | 登录用户 |
| `/warning` | `warning/page.tsx` | 警告页面 | 公开 |

### API路由结构

#### 公共API (`/api/`)
**用户认证**
- `POST /api/login` - 用户登录
- `POST /api/logout` - 用户登出
- `POST /api/register` - 用户注册
- `POST /api/change-password` - 修改密码

**内容搜索**
- `GET /api/search` - 多源影视搜索
- `GET /api/search/suggestions` - 搜索建议
- `GET /api/search/resources` - 资源搜索
- `GET /api/search/one` - 单一搜索
- `WebSocket /api/search/ws` - 实时搜索

**影视详情**
- `GET /api/detail` - 影视详情获取
- `GET /api/parse` - 播放链接解析

**豆瓣集成**
- `GET /api/douban` - 豆瓣数据获取
- `GET /api/douban/categories` - 豆瓣分类
- `GET /api/douban/details` - 豆瓣详情
- `GET /api/douban/recommends` - 豆瓣推荐

**短剧相关**
- `GET /api/shortdrama/categories` - 短剧分类
- `GET /api/shortdrama/list` - 短剧列表
- `GET /api/shortdrama/detail` - 短剧详情
- `GET /api/shortdrama/parse` - 短剧解析
- `GET /api/shortdrama/search` - 短剧搜索
- `GET /api/shortdrama/recommend` - 短剧推荐

**直播电视**
- `GET /api/live/channels` - 直播频道
- `GET /api/live/sources` - 直播源
- `GET /api/live/epg` - 电子节目单
- `GET /api/live/merged` - 合并直播源

**用户数据**
- `GET/POST/DELETE /api/favorites` - 收藏管理
- `GET/POST/DELETE /api/playrecords` - 播放记录
- `GET/POST/DELETE /api/searchhistory` - 搜索历史
- `GET/POST/DELETE /api/skipconfigs` - 跳过配置

**功能服务**
- `GET /api/sources` - 获取可用源
- `GET /api/server-config` - 服务器配置
- `POST /api/ai-recommend` - AI推荐
- `GET /api/youtube/search` - YouTube搜索
- `GET /api/tmdb/actor` - TMDB演员信息
- `GET /api/release-calendar` - 发布日历
- `GET /api/netdisk/search` - 网盘搜索

**工具服务**
- `GET /api/cache` - 缓存管理
- `GET /api/image-proxy` - 图片代理
- `GET /api/proxy/*` - 媒体代理
- `GET /api/danmu-external` - 弹幕服务
- `POST /api/cron` - 定时任务
- `GET /api/tvbox` - TVBox配置
- `GET /api/user/my-stats` - 用户统计

#### 管理员API (`/api/admin/`)
**系统管理**
- `GET/POST /api/admin/config` - 系统配置管理
- `GET/POST /api/admin/config_file` - 配置文件管理
- `POST /api/admin/config_subscription/fetch` - 配置订阅获取
- `POST /api/admin/reset` - 系统重置

**用户管理**
- `GET/POST/PUT/DELETE /api/admin/user` - 用户管理
- `GET /api/admin/play-stats` - 播放统计

**内容管理**
- `GET/POST/PUT/DELETE /api/admin/source` - 源管理
- `POST /api/admin/source/validate` - 源验证
- `GET/POST/PUT/DELETE /api/admin/category` - 分类管理
- `GET/POST/PUT/DELETE /api/admin/site` - 站点管理

**直播管理**
- `GET/POST/PUT/DELETE /api/admin/live` - 直播源管理
- `POST /api/admin/live/refresh` - 直播源刷新

**功能配置**
- `GET/POST /api/admin/ai-recommend` - AI推荐配置
- `GET/POST /api/admin/ai-recommend/test` - AI推荐测试
- `GET/POST /api/admin/youtube` - YouTube配置
- `GET/POST /api/admin/netdisk` - 网盘搜索配置
- `GET/POST /api/admin/tvbox-security` - TVBox安全配置

**数据管理**
- `GET/POST /api/admin/cache` - 缓存管理
- `POST /api/admin/data_migration/export` - 数据导出
- `POST /api/admin/data_migration/import` - 数据导入

## 关键依赖与配置

### 核心依赖
```json
{
  "next": "^14.2.23",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "typescript": "^4.9.5"
}
```

### 关键配置文件
- **Next.js配置**：`../../next.config.js` - 构建配置、PWA设置
- **TypeScript配置**：`../../tsconfig.json` - 类型检查、路径别名
- **Tailwind配置**：`../../tailwind.config.ts` - 样式主题、响应式断点

### 中间件
- **认证中间件**：`../middleware.ts` - 路由保护、用户认证检查
- **权限控制**：所有API路由都包含用户权限验证

## 数据模型

### 页面状态管理
- **客户端状态**：React Hooks (useState, useEffect)
- **全局状态**：Context API (`SiteProvider`, `ThemeProvider`)
- **服务端状态**：Next.js SSR/SSG + API路由

### API响应格式
```typescript
// 标准响应格式
interface ApiResponse<T> {
  code: number;
  data?: T;
  message?: string;
}

// 错误响应
interface ErrorResponse {
  error: string;
  details?: any;
}
```

### 路由参数类型
```typescript
// 搜索参数
interface SearchParams {
  q?: string;          // 搜索关键词
  page?: string;       // 页码
  type?: string;       // 类型过滤
}

// 播放参数
interface PlayParams {
  source: string;      // 视频源
  id: string;          // 视频ID
  episode?: string;    // 集数
}
```

## 测试与质量

### 测试覆盖范围
- ✅ **页面渲染**：所有页面组件可正常渲染
- ✅ **API路由**：基本的路由响应测试
- ⚠️ **待完善**：用户交互流程测试
- ⚠️ **待完善**：API端点单元测试
- ⚠️ **待完善**：错误边界测试

### 质量保证
- **TypeScript**：严格类型检查，避免运行时错误
- **ESLint**：代码规范检查，特别是React Hooks使用
- **Next.js最佳实践**：SEO优化、性能优化、安全性

### 性能优化
- **代码分割**：页面级自动代码分割
- **图片优化**：Next.js Image组件优化
- **缓存策略**：API响应缓存、静态资源缓存
- **懒加载**：组件和页面懒加载

## 常见问题 (FAQ)

### Q: 如何添加新的页面路由？
A: 在 `src/app` 目录下创建新的文件夹和 `page.tsx` 文件，Next.js会自动生成路由。

### Q: 如何在API路由中处理认证？
A: 使用 `getAuthInfoFromCookie(request)` 获取用户信息，检查权限后再处理业务逻辑。

### Q: 页面如何访问服务端配置？
A: 通过 `window.RUNTIME_CONFIG` 获取注入的运行时配置，或使用 `/api/server-config` 端点。

### Q: 如何处理页面错误和加载状态？
A: 使用 React Error Boundaries、Suspense组件，以及 `loading.tsx`、`error.tsx` 等特殊文件。

## 相关文件清单

### 页面组件
- `layout.tsx` - 根布局组件
- `page.tsx` - 首页组件
- `globals.css` - 全局样式文件
- `admin/page.tsx` - 管理后台首页
- `login/page.tsx` - 登录页面
- `register/page.tsx` - 注册页面
- `search/page.tsx` - 搜索页面
- `play/page.tsx` - 播放页面
- `live/page.tsx` - 直播页面
- `douban/page.tsx` - 豆瓣页面
- `shortdrama/page.tsx` - 短剧页面
- `tvbox/page.tsx` - TVBox页面
- `play-stats/page.tsx` - 统计页面
- `release-calendar/page.tsx` - 发布日历
- `warning/page.tsx` - 警告页面

### API路由 (55个端点)
详见上方"对外接口"部分的完整API列表

### 核心依赖文件
- `../middleware.ts` - 路由中间件
- `../../next.config.js` - Next.js配置
- `../../tsconfig.json` - TypeScript配置