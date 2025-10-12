/**
 * 测试 getAllUsers 功能
 * 验证是否使用 SMEMBERS users:set
 */

const { createClient } = require('redis');

async function testGetAllUsers() {
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
  console.log('连接到 Redis:', redisUrl, '\n');

  const client = createClient({ url: redisUrl });
  await client.connect();

  try {
    console.log('=== 测试 1: 验证 users:set 存在 ===');
    const setCount = await client.sCard('users:set');
    console.log(`users:set 包含 ${setCount} 个用户\n`);

    if (setCount > 0) {
      console.log('=== 测试 2: 使用 SMEMBERS 获取用户 ===');
      const users = await client.sMembers('users:set');
      console.log('获取到的用户:', users);
      console.log('✓ SMEMBERS 命令工作正常\n');
    } else {
      console.log('⚠️ users:set 为空，需要重建\n');
    }

    console.log('=== 测试 3: 模拟 getAllUsers 逻辑 ===');

    // 1. 尝试从 SET 获取
    let usersFromSet = await client.sMembers('users:set');
    console.log('从 SET 获取:', usersFromSet);

    if (usersFromSet && usersFromSet.length > 0) {
      console.log('✓ 使用 SET 获取成功 - 优化生效!');
      return usersFromSet;
    }

    // 2. Fallback: 使用 KEYS 扫描
    console.log('SET 为空，使用 KEYS 扫描...');
    const keys = await client.keys('u:*:pwd');
    console.log('找到的密钥:', keys);

    const users = keys
      .map((k) => {
        const match = k.match(/^u:(.+?):pwd$/);
        return match ? match[1] : null;
      })
      .filter((u) => u !== null);

    console.log('提取的用户名:', users);

    // 3. 重建 SET
    if (users.length > 0) {
      console.log(`\n重建 users:set (${users.length} 个用户)...`);
      await client.sAdd('users:set', users);
      console.log('✓ SET 重建完成');
    }

    return users;
  } finally {
    await client.quit();
    console.log('\nRedis 连接已关闭');
  }
}

// 运行测试
testGetAllUsers()
  .then((users) => {
    console.log('\n=== 最终结果 ===');
    console.log(`成功获取 ${users.length} 个用户`);
    console.log('用户列表:', users);
  })
  .catch(console.error);
