[根目录](../../CLAUDE.md) > **lib**

# 核心库模块 (src/lib)

> 业务逻辑、数据访问、工具函数的核心实现库

## 变更记录 (Changelog)

### 2025-09-28 17:17:51
- 🚀 **模块文档初始化**：完成核心库模块结构分析
- 📊 **库文件分类**：识别出30个库文件，分为数据访问、业务逻辑、工具库三大类
- 🔧 **架构模式分析**：数据访问层、缓存层、客户端层的分层架构

---

## 模块职责

核心库模块是 Zhephertv 的业务逻辑核心，负责：

- **数据访问层**：统一的数据存储接口，支持多种存储后端
- **业务逻辑层**：影视搜索、用户管理、内容推荐等核心业务
- **缓存管理**：多级缓存策略，提升系统性能
- **第三方集成**：豆瓣、TMDB、YouTube等外部API集成
- **工具函数库**：加密、时间处理、版本管理等通用工具

## 入口与启动

### 架构设计
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   业务逻辑层    │    │    缓存管理层   │    │   数据访问层    │
│                 │    │                 │    │                 │
│ • douban.ts     │────│ • search-cache  │────│ • db.ts         │
│ • live.ts       │    │ • client-cache  │    │ • redis.db.ts   │
│ • auth.ts       │    │ • tmdb-cache    │    │ • upstash.db.ts │
│ • config.ts     │    │ • shortdrama-c  │    │ • kvrocks.db.ts │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 核心入口点
- **配置管理**：`config.ts` - 系统配置中心
- **数据库**：`db.ts` - 统一数据访问接口
- **类型定义**：`types.ts` - 全局类型定义
- **认证系统**：`auth.ts` - 用户认证与权限

## 对外接口

### 数据访问层

| 文件名 | 功能描述 | 主要接口 |
|--------|----------|----------|
| **db.ts** | 数据库抽象层 | `IStorage` 接口实现 |
| **redis.db.ts** | Redis数据库实现 | Redis连接与操作 |
| **upstash.db.ts** | Upstash云Redis实现 | 云Redis连接 |
| **kvrocks.db.ts** | KVRocks数据库实现 | KVRocks连接 |
| **redis-base.db.ts** | Redis基础实现 | 通用Redis操作 |
| **db.client.ts** | 客户端数据访问 | 前端数据API |

### 业务逻辑层

| 文件名 | 功能描述 | 主要功能 |
|--------|----------|----------|
| **auth.ts** | 用户认证系统 | 登录验证、会话管理、权限控制 |
| **config.ts** | 配置管理系统 | 系统配置读取、用户配置、源管理 |
| **douban.ts** | 豆瓣数据集成 | 豆瓣API调用、数据格式化 |
| **live.ts** | 直播电视系统 | 直播源管理、EPG处理 |
| **downstream.ts** | 下游数据聚合 | 多源搜索、结果聚合 |
| **fetchVideoDetail.ts** | 视频详情获取 | 视频信息解析、播放链接获取 |
| **channel-search.ts** | 频道搜索 | 直播频道搜索与匹配 |
| **release-calendar-scraper.ts** | 发布日历爬虫 | 影视发布信息抓取 |

### 客户端库

| 文件名 | 功能描述 | 主要功能 |
|--------|----------|----------|
| **douban.client.ts** | 豆瓣客户端库 | 豆瓣数据获取、分类查询 |
| **shortdrama.client.ts** | 短剧客户端库 | 短剧搜索、推荐、解析 |
| **tmdb.client.ts** | TMDB客户端库 | 演员信息、影视元数据 |
| **bangumi.client.ts** | 番剧客户端库 | 番剧日历、新番推荐 |
| **ai-recommend.client.ts** | AI推荐客户端 | AI推荐请求、结果处理 |

### 缓存管理

| 文件名 | 功能描述 | 缓存策略 |
|--------|----------|----------|
| **client-cache.ts** | 客户端缓存 | 浏览器localStorage缓存 |
| **database-cache.ts** | 数据库缓存 | Redis缓存管理 |
| **search-cache.ts** | 搜索结果缓存 | 搜索API结果缓存 |
| **tmdb-cache.ts** | TMDB数据缓存 | 演员信息缓存 |
| **shortdrama-cache.ts** | 短剧数据缓存 | 短剧推荐缓存 |

### 工具库

| 文件名 | 功能描述 | 主要功能 |
|--------|----------|----------|
| **utils.ts** | 通用工具函数 | 字符串处理、数组操作、格式化 |
| **crypto.ts** | 加密工具 | 密码加密、数据加密解密 |
| **time.ts** | 时间处理工具 | 时间格式化、日期计算 |
| **version.ts** | 版本管理 | 版本信息获取、更新检查 |
| **version_check.ts** | 版本检查工具 | 版本比较、更新提醒 |
| **changelog.ts** | 变更日志工具 | 变更记录管理 |
| **yellow.ts** | 内容过滤工具 | 敏感内容过滤词库 |

### 类型定义

| 文件名 | 功能描述 | 主要类型 |
|--------|----------|----------|
| **types.ts** | 全局类型定义 | 核心业务类型、接口定义 |
| **admin.types.ts** | 管理员类型定义 | 管理员配置、权限类型 |

### 特殊文件

| 文件名 | 功能描述 | 说明 |
|--------|----------|------|
| **artplayer-plugin-chromecast.js** | Chromecast插件 | ArtPlayer投屏插件 |
| **watching-updates.ts** | 观看更新追踪 | 用户观看行为追踪 |

## 关键依赖与配置

### 核心依赖
```json
{
  "@upstash/redis": "^1.25.0",
  "redis": "^4.6.7",
  "crypto-js": "^4.2.0",
  "bs58": "^6.0.0",
  "he": "^1.2.0",
  "zod": "^3.24.1"
}
```

### 数据库配置
```typescript
// 支持的存储类型
type StorageType = 'localstorage' | 'redis' | 'upstash' | 'kvrocks';

// 数据库实例选择
const getStorageImplementation = (type: StorageType): IStorage => {
  switch (type) {
    case 'redis': return new RedisStorage();
    case 'upstash': return new UpstashStorage();
    case 'kvrocks': return new KVRocksStorage();
    default: return new LocalStorage();
  }
};
```

### 缓存配置
```typescript
// 缓存配置
interface CacheConfig {
  defaultTTL: number;        // 默认过期时间
  searchCacheTTL: number;    // 搜索缓存过期时间
  tmdbCacheTTL: number;      // TMDB缓存过期时间
  shortdramaCacheTTL: number; // 短剧缓存过期时间
}
```

## 数据模型

### 核心业务类型

```typescript
// 用户相关
interface PlayRecord {
  title: string;
  source_name: string;
  cover: string;
  year: string;
  index: number;
  total_episodes: number;
  play_time: number;
  total_time: number;
  save_time: number;
  search_title: string;
}

interface Favorite {
  source_name: string;
  total_episodes: number;
  title: string;
  year: string;
  cover: string;
  save_time: number;
  search_title: string;
  origin?: 'vod' | 'live' | 'shortdrama';
}

// 搜索相关
interface SearchResult {
  id: string;
  title: string;
  poster: string;
  episodes: string[];
  episodes_titles: string[];
  source: string;
  source_name: string;
  class?: string;
  year: string;
  desc?: string;
  type_name?: string;
  douban_id?: number;
}

// 豆瓣相关
interface DoubanItem {
  id: string;
  title: string;
  poster: string;
  rate: string;
  year: string;
  directors?: string[];
  cast?: string[];
  genres?: string[];
  plot_summary?: string;
}
```

### 配置管理类型

```typescript
// 管理员配置
interface AdminConfig {
  ConfigFile: string;
  ConfigSubscribtion: ConfigSubscription;
  SiteConfig: SiteConfig;
  UserConfig: UserConfig;
  SourceConfig: SourceConfig[];
  CustomCategories: CustomCategory[];
  LiveConfig: LiveConfig[];
  NetDiskConfig?: NetDiskConfig;
  AIRecommendConfig?: AIRecommendConfig;
  YouTubeConfig?: YouTubeConfig;
}

// 站点配置
interface SiteConfig {
  SiteName: string;
  Announcement: string;
  SearchDownstreamMaxPage: number;
  SiteInterfaceCacheTime: number;
  DoubanProxyType: string;
  DoubanProxy: string;
  DisableYellowFilter: boolean;
  FluidSearch: boolean;
  TMDBApiKey: string;
  TMDBLanguage: string;
  EnableTMDBActorSearch: boolean;
}
```

### 存储接口规范

```typescript
interface IStorage {
  // 播放记录相关
  getPlayRecord(userName: string, key: string): Promise<PlayRecord | null>;
  setPlayRecord(userName: string, key: string, record: PlayRecord): Promise<void>;
  getAllPlayRecords(userName: string): Promise<{ [key: string]: PlayRecord }>;
  deletePlayRecord(userName: string, key: string): Promise<void>;

  // 收藏相关
  getFavorite(userName: string, key: string): Promise<Favorite | null>;
  setFavorite(userName: string, key: string, favorite: Favorite): Promise<void>;
  getAllFavorites(userName: string): Promise<{ [key: string]: Favorite }>;
  deleteFavorite(userName: string, key: string): Promise<void>;

  // 用户相关
  registerUser(userName: string, password: string): Promise<void>;
  verifyUser(userName: string, password: string): Promise<boolean>;
  changePassword(userName: string, newPassword: string): Promise<void>;
  deleteUser(userName: string): Promise<void>;

  // 缓存相关
  getCache(key: string): Promise<any | null>;
  setCache(key: string, data: any, expireSeconds?: number): Promise<void>;
  deleteCache(key: string): Promise<void>;
  clearExpiredCache(prefix?: string): Promise<void>;
}
```

## 测试与质量

### 测试策略
- ✅ **类型安全**：完整的TypeScript类型定义
- ✅ **错误处理**：完善的异常捕获与处理
- ⚠️ **待完善**：单元测试覆盖
- ⚠️ **待完善**：集成测试
- ⚠️ **待完善**：性能测试

### 代码质量保证
- **接口抽象**：统一的数据访问接口
- **错误边界**：所有异步操作都有错误处理
- **缓存策略**：多级缓存，避免重复请求
- **性能优化**：惰性加载、结果缓存

### 安全性
- **密码加密**：使用crypto-js加密用户密码
- **输入验证**：使用zod进行数据验证
- **权限控制**：细粒度的用户权限管理
- **敏感信息**：避免敏感配置硬编码

## 常见问题 (FAQ)

### Q: 如何添加新的存储后端？
A: 实现 `IStorage` 接口，在 `db.ts` 中注册新的存储类型。

### Q: 如何扩展缓存策略？
A: 在对应的 `*-cache.ts` 文件中添加新的缓存逻辑，或创建新的缓存模块。

### Q: 如何集成新的第三方API？
A: 创建对应的 `*.client.ts` 文件，实现API调用逻辑，并添加缓存支持。

### Q: 如何调试数据库连接问题？
A: 检查环境变量配置，查看控制台错误日志，验证网络连接。

### Q: 如何优化API性能？
A: 使用缓存、批量请求、并发控制、超时机制等策略。

## 相关文件清单

### 数据访问层 (6个)
- `db.ts` - 数据库抽象层
- `redis.db.ts` - Redis实现
- `upstash.db.ts` - Upstash实现
- `kvrocks.db.ts` - KVRocks实现
- `redis-base.db.ts` - Redis基础实现
- `db.client.ts` - 客户端数据访问

### 业务逻辑层 (8个)
- `auth.ts` - 用户认证系统
- `config.ts` - 配置管理系统
- `douban.ts` - 豆瓣数据集成
- `live.ts` - 直播电视系统
- `downstream.ts` - 下游数据聚合
- `fetchVideoDetail.ts` - 视频详情获取
- `channel-search.ts` - 频道搜索
- `release-calendar-scraper.ts` - 发布日历爬虫

### 客户端库 (5个)
- `douban.client.ts` - 豆瓣客户端
- `shortdrama.client.ts` - 短剧客户端
- `tmdb.client.ts` - TMDB客户端
- `bangumi.client.ts` - 番剧客户端
- `ai-recommend.client.ts` - AI推荐客户端

### 缓存管理 (5个)
- `client-cache.ts` - 客户端缓存
- `database-cache.ts` - 数据库缓存
- `search-cache.ts` - 搜索缓存
- `tmdb-cache.ts` - TMDB缓存
- `shortdrama-cache.ts` - 短剧缓存

### 工具库 (7个)
- `utils.ts` - 通用工具
- `crypto.ts` - 加密工具
- `time.ts` - 时间处理
- `version.ts` - 版本管理
- `version_check.ts` - 版本检查
- `changelog.ts` - 变更日志
- `yellow.ts` - 内容过滤

### 类型定义 (2个)
- `types.ts` - 全局类型定义
- `admin.types.ts` - 管理员类型

### 特殊文件 (2个)
- `artplayer-plugin-chromecast.js` - Chromecast插件
- `watching-updates.ts` - 观看更新追踪