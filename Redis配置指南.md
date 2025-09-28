# Redis 配置指南 - 获取管理员权限

## 问题分析

在 `localstorage` 存储模式下，系统存在权限限制：

- **localstorage 模式**：只验证环境变量密码，所有用户默认获得 `'user'` 角色
- **Redis/数据库模式**：支持用户名+密码验证，环境变量中的 `USERNAME` 自动获得 `'owner'` 角色

## Redis 配置步骤

### 1. 环境变量配置

修改 `.env.local` 文件：

```env
# 站点基本配置
NEXT_PUBLIC_SITE_NAME=MoonTV

# 存储配置 - 改为 Redis 存储
NEXT_PUBLIC_STORAGE_TYPE=redis

# 管理员账户配置 (必填)
USERNAME=admin
PASSWORD=admin123

# Redis 配置
REDIS_URL=redis://localhost:6379
# 或者使用详细配置
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# 站点功能配置
NEXT_PUBLIC_SEARCH_MAX_PAGE=5
NEXT_PUBLIC_FLUID_SEARCH=true
NEXT_PUBLIC_DISABLE_YELLOW_FILTER=false

# 豆瓣代理配置 (可选)
NEXT_PUBLIC_DOUBAN_PROXY_TYPE=direct
NEXT_PUBLIC_DOUBAN_PROXY=
NEXT_PUBLIC_DOUBAN_IMAGE_PROXY_TYPE=direct
NEXT_PUBLIC_DOUBAN_IMAGE_PROXY=

# TMDB配置 (可选)
TMDB_API_KEY=

# 站点公告
ANNOUNCEMENT=本网站仅提供影视信息搜索服务，所有内容均来自第三方网站。本站不存储任何视频资源，不对任何内容的准确性、合法性、完整性负责。

# Next.js 配置
NODE_ENV=development
```

### 2. 关键配置项说明

#### 存储类型变更
```env
# 从
NEXT_PUBLIC_STORAGE_TYPE=localstorage
# 改为
NEXT_PUBLIC_STORAGE_TYPE=redis
```

#### Redis 连接配置
```env
# 方式一：使用连接字符串（推荐）
REDIS_URL=redis://localhost:6379

# 方式二：分别配置（适合复杂环境）
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password  # 如果有密码
REDIS_DB=0                          # 数据库编号
```

### 3. 权限体系说明

Redis 模式下的权限等级：

1. **owner**（站长）
   - 环境变量 `USERNAME` 对应的用户
   - 拥有最高权限，包括所有管理功能
   - 自动在配置中设置为 `'owner'` 角色

2. **admin**（管理员）
   - 可通过管理后台设置
   - 拥有大部分管理功能权限

3. **user**（普通用户）
   - 注册用户默认角色
   - 基础访问权限

### 4. 登录方式变化

#### localstorage 模式
```
只需要密码：admin123
```

#### Redis 模式
```
需要用户名和密码：
用户名：admin
密码：admin123
```

### 5. Redis 服务检查

确保 Redis 服务正在运行：

```bash
# Windows
redis-server

# 检查 Redis 是否运行
redis-cli ping
# 应该返回 PONG
```

### 6. 验证配置

1. 重启应用服务
2. 访问登录页面
3. 使用用户名 `admin` 和密码 `admin123` 登录
4. 访问 `/admin` 页面验证管理员权限

## 注意事项

### 数据迁移
- 从 localstorage 切换到 Redis 后，之前的本地数据不会自动迁移
- 需要重新配置相关设置

### 安全性
- Redis 模式下密码会被哈希存储
- 建议在生产环境中设置 Redis 密码

### 故障排除

1. **连接失败**
   ```
   检查 Redis 服务是否启动
   检查端口是否被占用
   检查防火墙设置
   ```

2. **权限不足**
   ```
   确认 USERNAME 环境变量设置正确
   检查用户名是否与环境变量一致
   ```

3. **缓存问题**
   ```
   清除浏览器缓存和 Cookie
   重启应用服务
   ```

## 配置完成后

切换到 Redis 后，您将获得：

- ✅ 完整的管理员权限
- ✅ 用户管理功能
- ✅ 数据持久化存储
- ✅ 多用户支持
- ✅ 角色权限控制

这样就可以以管理员身份访问所有管理功能了。