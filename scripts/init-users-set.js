/**
 * 初始化 Redis users:set
 * 用于将现有用户迁移到新的 SET 结构
 *
 * 使用方法：
 * node scripts/init-users-set.js
 */

const { createClient } = require('redis');

async function initUsersSet() {
  // 从环境变量读取 Redis URL
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

  console.log('连接到 Redis:', redisUrl);

  const client = createClient({
    url: redisUrl,
  });

  client.on('error', (err) => console.error('Redis Client Error:', err));

  try {
    await client.connect();
    console.log('✓ Redis 连接成功\n');

    // 1. 检查 users:set 是否已存在
    const existingUsers = await client.sMembers('users:set');
    console.log(
      `现有 users:set 包含 ${existingUsers.length} 个用户:`,
      existingUsers
    );

    // 2. 扫描所有用户密码 key
    console.log('\n扫描所有用户...');
    const userKeys = await client.keys('u:*:pwd');
    console.log(`找到 ${userKeys.length} 个用户密钥\n`);

    // 3. 提取用户名
    const usernames = userKeys
      .map((key) => {
        const match = key.match(/^u:(.+?):pwd$/);
        return match ? match[1] : null;
      })
      .filter((name) => name !== null);

    console.log('提取到的用户名:', usernames);

    // 4. 添加到 SET
    if (usernames.length > 0) {
      console.log(`\n将 ${usernames.length} 个用户添加到 users:set...`);
      await client.sAdd('users:set', usernames);
      console.log('✓ 用户添加完成');

      // 5. 验证
      const finalUsers = await client.sMembers('users:set');
      console.log(
        `\n✓ users:set 现在包含 ${finalUsers.length} 个用户:`,
        finalUsers
      );
    } else {
      console.log('\n⚠️ 没有找到任何用户');
    }
  } catch (error) {
    console.error('❌ 错误:', error);
  } finally {
    await client.quit();
    console.log('\nRedis 连接已关闭');
  }
}

// 运行初始化
initUsersSet();
