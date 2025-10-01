// 此文件由 scripts/convert-changelog.js 自动生成
// 请勿手动编辑

export interface ChangelogEntry {
  version: string;
  date: string;
  added: string[];
  changed: string[];
  fixed: string[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: '1.0.1',
    date: '2025-10-01',
    added: [
      // 无新增内容
    ],
    changed: ['🔄 版本更新机制优化', '📝 修复CHANGELOG格式错误'],
    fixed: [
      // 无修复内容
    ],
  },
  {
    version: '1.0.0',
    date: '2025-09-29',
    added: [
      '🚀 Zhephertv视频流媒体聚合平台正式上线',
      '📺 多源影视搜索与播放功能',
      '🎬 短剧专区与智能推荐',
      '🤖 AI智能推荐系统',
      '👤 用户收藏与播放记录管理',
      '🎨 响应式现代化界面设计',
      '⚡ PWA支持，支持移动端安装',
    ],
    changed: [
      '🔧 项目架构全面优化',
      '📊 完善模块文档系统',
      '🧹 移除过时功能模块',
    ],
    fixed: ['✅ 代码质量优化和ESLint问题修复'],
  },
];

export default changelog;
