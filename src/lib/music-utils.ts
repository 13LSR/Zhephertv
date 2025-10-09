/**
 * 音乐相关工具函数
 */

import { LyricLine } from './types';

/**
 * 格式化时长（毫秒转为 mm:ss 格式）
 * @param milliseconds 毫秒数
 * @returns 格式化后的时间字符串 (例如: "3:45")
 */
export function formatDuration(milliseconds: number): string {
  if (!milliseconds || milliseconds === 0) return '0:00';

  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * 格式化时间（秒转为 mm:ss 格式）
 * @param seconds 秒数
 * @returns 格式化后的时间字符串
 */
export function formatTime(seconds: number): string {
  if (!seconds || seconds === 0) return '0:00';

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * 格式化文件大小（字节转为可读格式）
 * @param sizeBytes 文件大小（字节）
 * @returns 格式化后的文件大小 (例如: "3.45MB")
 */
export function formatFileSize(sizeBytes: number): string {
  if (!sizeBytes || sizeBytes === 0) return '0.00MB';

  const sizeInMB = parseFloat(String(sizeBytes)) / (1024 * 1024);

  return `${sizeInMB.toFixed(2)}MB`;
}

/**
 * 解析歌曲ID（从链接或纯ID）
 * @param input 输入字符串（可能是ID或链接）
 * @returns 解析出的ID，失败返回null
 */
export function parseSongId(input: string): string | null {
  const trimmed = input.trim();

  // 如果是纯数字，直接返回
  if (/^\d+$/.test(trimmed)) {
    return trimmed;
  }

  // 尝试从URL中提取ID
  const match = trimmed.match(/id=(\d+)/);
  return match ? match[1] : null;
}

/**
 * 通用ID解析函数（支持歌单、专辑、MV等）
 * @param input 输入字符串
 * @param type 类型 ('playlist' | 'album' | 'mv')
 * @returns 解析出的ID，失败返回null
 */
export function parseId(
  input: string,
  type: 'playlist' | 'album' | 'mv'
): string | null {
  const trimmed = input.trim();

  // 如果是纯数字，直接返回
  if (/^\d+$/.test(trimmed)) {
    return trimmed;
  }

  // 根据类型使用不同的正则表达式
  let pattern: RegExp;
  if (type === 'playlist') {
    pattern = /(?:playlist\?id=|playlist\/)(\d+)/;
  } else if (type === 'album') {
    pattern = /(?:album\?id=|album\/)(\d+)/;
  } else if (type === 'mv') {
    pattern = /(?:mv\?id=|mv\/|mvid=)(\d+)/;
  } else {
    pattern = /id=(\d+)/;
  }

  const match = trimmed.match(pattern);
  return match ? match[1] : null;
}

/**
 * 解析歌词文本，生成歌词行数组
 * @param lyricsText 原始歌词文本
 * @returns 解析后的歌词行数组
 */
export function parseLyrics(lyricsText: string): LyricLine[] {
  if (!lyricsText || lyricsText.trim() === '') {
    return [];
  }

  const lines = lyricsText.split('\n');
  const lyricsData: LyricLine[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 匹配时间标签 [mm:ss.xxx] 或 [mm:ss.xx]
    const timeMatch = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\]/);

    if (timeMatch) {
      const minutes = parseInt(timeMatch[1]);
      const seconds = parseInt(timeMatch[2]);
      // 处理两位或三位毫秒数 - 如果是两位数则乘以10变成三位数
      const ms =
        timeMatch[3].length === 2
          ? parseInt(timeMatch[3]) * 10
          : parseInt(timeMatch[3]);
      const timeInSeconds = minutes * 60 + seconds + ms / 1000;

      // 获取歌词文本（移除时间标签）
      const cleanLine = line.replace(/\[\d{2}:\d{2}\.\d{2,3}\]/g, '').trim();

      if (cleanLine && cleanLine !== '') {
        lyricsData.push({
          time: timeInSeconds,
          text: cleanLine,
          index: lyricsData.length,
        });
      }
    }
  }

  return lyricsData;
}

/**
 * 格式化歌词预览（用于显示部分歌词）
 * @param lyricsText 原始歌词文本
 * @param maxLines 最多显示的行数
 * @returns 格式化后的HTML字符串
 */
export function formatLyricsPreview(lyricsText: string, maxLines = 10): string {
  if (!lyricsText) return '暂无歌词';

  // 移除时间标签并分行显示
  const lines = lyricsText.split('\n');
  const formattedLines: string[] = [];

  for (const line of lines) {
    // 移除时间标签 [00:00.00]
    const cleanLine = line.replace(/\[\d{2}:\d{2}\.\d{2,3}\]/g, '').trim();
    if (cleanLine && cleanLine !== '') {
      formattedLines.push(cleanLine);
    }
  }

  // 最多显示指定行数
  const preview = formattedLines.slice(0, maxLines).join('<br>');
  if (formattedLines.length > maxLines) {
    return (
      preview +
      '<br><span style="color: rgba(255, 255, 255, 0.5); font-size: 12px;">... (更多歌词在播放时显示)</span>'
    );
  }

  return preview || '暂无歌词';
}

/**
 * 根据当前播放时间查找对应的歌词行索引
 * @param currentTime 当前播放时间（秒）
 * @param lyricsData 歌词数据数组
 * @returns 当前应高亮的歌词行索引，未找到返回-1
 */
export function findActiveLyricIndex(
  currentTime: number,
  lyricsData: LyricLine[]
): number {
  if (lyricsData.length === 0) return -1;

  let activeIndex = -1;

  // 找到当前时间对应的歌词行
  for (let i = lyricsData.length - 1; i >= 0; i--) {
    if (currentTime >= lyricsData[i].time) {
      activeIndex = i;
      break;
    }
  }

  return activeIndex;
}

/**
 * 获取音质显示名称
 * @param quality 音质代码
 * @returns 音质显示名称
 */
export function getQualityDisplay(quality: string): string {
  const qualityMap: { [key: string]: string } = {
    standard: '标准 128K',
    exhigh: '极高 320K',
    lossless: '无损 FLAC',
    hires: 'Hi-Res 音质',
    jyeffect: '高清环绕声',
  };

  return qualityMap[quality] || quality;
}

/**
 * 获取MV画质选项
 * @returns MV画质选项数组
 */
export function getMVQualityOptions() {
  return [
    { value: '1080', label: '1080P 超清' },
    { value: '720', label: '720P 高清' },
    { value: '480', label: '480P 标清' },
    { value: '240', label: '240P 流畅' },
  ];
}

/**
 * 格式化播放次数（大数字转为万）
 * @param count 播放次数
 * @returns 格式化后的字符串
 */
export function formatPlayCount(count: number): string {
  if (!count || count === 0) return '未知';

  if (count > 10000) {
    return (count / 10000).toFixed(1) + '万';
  }

  return String(count);
}
