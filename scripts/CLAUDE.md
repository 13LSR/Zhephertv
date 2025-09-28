[根目录](../../CLAUDE.md) > **scripts**

# 构建脚本模块 (scripts)

> 构建工具与部署脚本，支持项目的构建、打包和发布流程

## 变更记录 (Changelog)

### 2025-09-28 17:17:51
- 🚀 **模块文档初始化**：完成构建脚本模块分析
- 📊 **脚本功能梳理**：识别出2个核心构建脚本
- 🔧 **构建流程分析**：PWA清单生成和变更日志转换流程

---

## 模块职责

构建脚本模块负责项目的构建和发布相关任务：

- **PWA支持**：动态生成Web App Manifest文件
- **变更日志**：处理和转换项目变更记录
- **构建集成**：与Next.js构建流程集成
- **自动化工具**：简化重复性构建任务

## 入口与启动

### 脚本执行时机
```json
{
  "scripts": {
    "dev": "pnpm gen:manifest && next dev -H 0.0.0.0",
    "build": "pnpm gen:manifest && next build",
    "gen:manifest": "node scripts/generate-manifest.js"
  }
}
```

### 构建流程
1. **开发模式**：每次启动开发服务器前生成manifest
2. **生产构建**：构建前生成最新的manifest文件
3. **PWA优化**：确保PWA配置始终是最新的

## 对外接口

### 脚本列表

| 脚本文件 | 功能描述 | 执行时机 | 输出文件 |
|----------|----------|----------|----------|
| **generate-manifest.js** | PWA清单生成 | 构建前/开发启动前 | `public/manifest.json` |
| **convert-changelog.js** | 变更日志转换 | 手动执行 | 格式化的变更日志 |

### generate-manifest.js

**功能特性：**
- 动态读取项目配置生成PWA manifest
- 支持多种图标尺寸和格式
- 自动获取项目名称和版本信息
- 响应式图标适配不同设备

**生成的Manifest结构：**
```json
{
  "name": "项目名称",
  "short_name": "简称",
  "description": "项目描述",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

**执行方式：**
```bash
# 单独执行
node scripts/generate-manifest.js

# 通过npm script执行
pnpm gen:manifest
```

### convert-changelog.js

**功能特性：**
- 解析和转换变更日志格式
- 支持多种输入格式
- 生成标准化的变更记录
- 版本历史整理

**执行方式：**
```bash
# 手动执行变更日志转换
node scripts/convert-changelog.js
```

## 关键依赖与配置

### Node.js依赖
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### 文件系统操作
- 读取 `package.json` 获取项目信息
- 读取 `VERSION.txt` 获取版本号
- 写入 `public/manifest.json` 生成PWA配置
- 处理 `CHANGELOG` 文件格式转换

### 环境变量支持
脚本支持以下环境变量：
- `NEXT_PUBLIC_SITE_NAME` - 站点名称
- `NODE_ENV` - 环境标识（development/production）

## 数据模型

### PWA Manifest接口
```typescript
interface WebAppManifest {
  name: string;
  short_name: string;
  description: string;
  start_url: string;
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
  background_color: string;
  theme_color: string;
  orientation?: 'portrait' | 'landscape';
  icons: Array<{
    src: string;
    sizes: string;
    type: string;
    purpose?: 'any' | 'maskable' | 'any maskable';
  }>;
  screenshots?: Array<{
    src: string;
    sizes: string;
    type: string;
    form_factor?: 'narrow' | 'wide';
  }>;
}
```

### 变更日志结构
```typescript
interface ChangelogEntry {
  version: string;
  date: string;
  changes: Array<{
    type: 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed' | 'security';
    description: string;
  }>;
}
```

### 项目信息接口
```typescript
interface ProjectInfo {
  name: string;
  version: string;
  description: string;
  homepage?: string;
  author?: string;
}
```

## 测试与质量

### 脚本测试
- ✅ **语法检查**：JavaScript语法正确性
- ✅ **文件输出**：确保生成正确的输出文件
- ⚠️ **待完善**：自动化测试覆盖
- ⚠️ **待完善**：错误处理测试

### 质量保证
- **错误处理**：文件读写错误捕获
- **输入验证**：配置参数验证
- **输出验证**：生成文件格式验证
- **兼容性**：跨平台文件路径处理

### 性能考虑
- **快速执行**：脚本执行时间优化
- **缓存策略**：避免重复生成相同文件
- **依赖最小化**：减少外部依赖

## 常见问题 (FAQ)

### Q: PWA manifest为什么要动态生成？
A: 为了确保manifest文件始终反映最新的项目配置、版本信息和图标资源。

### Q: 如何自定义PWA配置？
A: 修改 `generate-manifest.js` 脚本中的配置对象，或通过环境变量传递参数。

### Q: 脚本执行失败怎么办？
A: 检查Node.js版本、文件权限、项目目录结构，查看控制台错误信息。

### Q: 如何添加新的构建脚本？
A: 在 `scripts` 目录下创建新的JavaScript文件，在 `package.json` 中添加对应的npm script。

### Q: 变更日志脚本的作用是什么？
A: 将原始变更记录转换为标准格式，便于展示和发布管理。

## 相关文件清单

### 构建脚本 (2个)
- `generate-manifest.js` - PWA清单生成器
  - 功能：动态生成Web App Manifest
  - 输入：项目配置、版本信息、图标文件
  - 输出：`public/manifest.json`
  - 依赖：Node.js fs模块、path模块

- `convert-changelog.js` - 变更日志转换器
  - 功能：转换和格式化变更日志
  - 输入：`CHANGELOG` 文件
  - 输出：格式化的变更记录
  - 依赖：Node.js fs模块

### 相关配置文件
- `../../package.json` - 项目基本信息源
- `../../VERSION.txt` - 版本信息文件
- `../../CHANGELOG` - 原始变更日志
- `../../public/icons/` - PWA图标资源目录

### 输出文件
- `../../public/manifest.json` - 生成的PWA清单文件