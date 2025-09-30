#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires, no-console, unused-imports/no-unused-vars */

const fs = require('fs');

// 获取所有使用cookie的API路由文件
const apiFiles = [
  'src/app/api/search/suggestions/route.ts',
  'src/app/api/ai-recommend/route.ts',
  'src/app/api/admin/cache/route.ts',
  'src/app/api/release-calendar/route.ts',
  'src/app/api/detail/route.ts',
  'src/app/api/user/my-stats/route.ts',
  'src/app/api/sources/route.ts',
  'src/app/api/skipconfigs/route.ts',
  'src/app/api/searchhistory/route.ts',
  'src/app/api/search/ws/route.ts',
  'src/app/api/search/route.ts',
  'src/app/api/search/one/route.ts',
  'src/app/api/playrecords/route.ts',
  'src/app/api/netdisk/search/route.ts',
  'src/app/api/favorites/route.ts',
  'src/app/api/change-password/route.ts',
  'src/app/api/admin/user/route.ts',
  'src/app/api/admin/source/validate/route.ts',
  'src/app/api/admin/tvbox-security/route.ts',
  'src/app/api/admin/source/route.ts',
  'src/app/api/admin/reset/route.ts',
  'src/app/api/admin/site/route.ts',
  'src/app/api/admin/play-stats/route.ts',
  'src/app/api/admin/netdisk/route.ts',
  'src/app/api/admin/data_migration/import/route.ts',
  'src/app/api/admin/data_migration/export/route.ts',
  'src/app/api/admin/config_subscription/fetch/route.ts',
  'src/app/api/admin/config_file/route.ts',
  'src/app/api/admin/category/route.ts',
  'src/app/api/admin/config/route.ts',
  'src/app/api/admin/ai-recommend/test/route.ts',
  'src/app/api/admin/ai-recommend/route.ts'
];

let fixedCount = 0;
let skippedCount = 0;

apiFiles.forEach(filePath => {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  跳过不存在的文件: ${filePath}`);
      skippedCount++;
      return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // 检查是否已经有 force-dynamic 配置
    if (content.includes('export const dynamic = \'force-dynamic\'')) {
      console.log(`✅ 已配置: ${filePath}`);
      skippedCount++;
      return;
    }

    // 检查是否有 runtime 配置
    if (content.includes('export const runtime')) {
      // 在 runtime 配置后添加 dynamic 配置
      content = content.replace(
        /(export const runtime = ['"][^'"]+['"];)/,
        '$1\nexport const dynamic = \'force-dynamic\';'
      );
    } else {
      // 在文件开头的import之后添加配置
      const lines = content.split('\n');
      let insertIndex = 0;

      // 找到最后一个import语句的位置
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('import ') || lines[i].startsWith('/* eslint')) {
          insertIndex = i + 1;
        } else if (lines[i].trim() === '') {
          continue;
        } else {
          break;
        }
      }

      lines.splice(insertIndex, 0, '', 'export const runtime = \'nodejs\';', 'export const dynamic = \'force-dynamic\';');
      content = lines.join('\n');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`🔧 已修复: ${filePath}`);
    fixedCount++;

  } catch (error) {
    console.error(`❌ 修复失败 ${filePath}:`, error.message);
  }
});

console.log(`\n✅ 修复完成!`);
console.log(`📊 统计: 修复 ${fixedCount} 个文件, 跳过 ${skippedCount} 个文件`);
console.log(`\n💡 下一步: 运行 pnpm build 测试构建`);