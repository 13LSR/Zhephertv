/* eslint-disable @typescript-eslint/no-explicit-any,no-console */

import { NextRequest, NextResponse } from 'next/server';

import { getAuthInfoFromCookie } from '@/lib/auth';
import { getAvailableApiSites, getCacheTime, getConfig } from '@/lib/config';
import { searchFromApi } from '@/lib/downstream';
import { yellowWords } from '@/lib/yellow';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * 计算两个字符串的相似度（0-1之间）
 */
function calculateSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().replace(/[^\w\s\u4e00-\u9fff]/g, '');
  const s2 = str2.toLowerCase().replace(/[^\w\s\u4e00-\u9fff]/g, '');

  if (s1 === s2) return 1.0;

  // 使用简单的Levenshtein距离算法
  const len1 = s1.length;
  const len2 = s2.length;
  const maxLen = Math.max(len1, len2);

  if (maxLen === 0) return 1.0;

  // 简化版：检查包含关系
  if (s1.includes(s2) || s2.includes(s1)) {
    return 1.0 - Math.abs(len1 - len2) / maxLen;
  }

  // 检查单词重叠
  const words1 = s1.split(/\s+/).filter((w) => w.length > 0);
  const words2 = s2.split(/\s+/).filter((w) => w.length > 0);
  let commonWords = 0;

  words1.forEach((w1) => {
    if (words2.some((w2) => w1 === w2 || w1.includes(w2) || w2.includes(w1))) {
      commonWords++;
    }
  });

  return commonWords / Math.max(words1.length, words2.length);
}

/**
 * 搜索结果去重，标记相同内容但保留所有源
 * 修改策略：不合并源，而是给每个结果添加duplicate_group标记
 */
function deduplicateSearchResults(results: any[]): any[] {
  if (results.length === 0) return results;

  const groups: Map<number, any[]> = new Map();
  const processed: Set<number> = new Set();

  // 第一步：将相似的结果分组
  results.forEach((result, index) => {
    if (processed.has(index)) return;

    const group: any[] = [result];
    processed.add(index);

    // 查找相似的结果
    for (let i = index + 1; i < results.length; i++) {
      if (processed.has(i)) continue;

      const other = results[i];
      const similarity = calculateSimilarity(result.title, other.title);

      // 相似度阈值：0.90（提高到90%，更严格避免误判）
      if (similarity >= 0.9) {
        // 检查年份是否相同（如果都有的话）
        if (
          result.year &&
          other.year &&
          result.year !== 'unknown' &&
          other.year !== 'unknown'
        ) {
          if (result.year === other.year) {
            group.push(other);
            processed.add(i);
          }
        } else {
          // 如果没有年份信息，只看相似度
          group.push(other);
          processed.add(i);
        }
      }
    }

    groups.set(index, group);
  });

  // 第二步：保留所有源，但添加分组标记
  const deduplicatedResults: any[] = [];
  let groupId = 0;

  groups.forEach((group) => {
    if (group.length === 1) {
      // 只有一个源，直接使用
      deduplicatedResults.push(group[0]);
    } else {
      // 多个源，保留所有但添加分组标记
      groupId++;
      const allSources = group.map((r) => ({
        source: r.source,
        source_name: r.source_name,
        episodes_count: r.episodes.length,
      }));

      // 按集数排序，集数多的排前面
      const sortedGroup = [...group].sort(
        (a, b) => b.episodes.length - a.episodes.length
      );

      sortedGroup.forEach((result, idx) => {
        deduplicatedResults.push({
          ...result,
          // 添加分组信息
          duplicate_group: groupId,
          is_primary: idx === 0, // 第一个（集数最多的）标记为主要源
          duplicate_count: group.length,
          all_sources: allSources, // 保留所有源信息供前端参考
        });
      });
    }
  });

  console.log(
    `[DEBUG] 去重标记: 原始${results.length}个结果, 保留${deduplicatedResults.length}个（包含${groupId}组重复内容）`
  );

  return deduplicatedResults;
}

export async function GET(request: NextRequest) {
  const authInfo = getAuthInfoFromCookie(request);
  if (!authInfo || !authInfo.username) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    const cacheTime = await getCacheTime();
    return NextResponse.json(
      { results: [] },
      {
        headers: {
          'Cache-Control': `public, max-age=${cacheTime}, s-maxage=${cacheTime}`,
          'CDN-Cache-Control': `public, s-maxage=${cacheTime}`,
          'Vercel-CDN-Cache-Control': `public, s-maxage=${cacheTime}`,
          'Netlify-Vary': 'query',
        },
      }
    );
  }

  const config = await getConfig();
  const apiSites = await getAvailableApiSites(authInfo.username);

  // 添加超时控制和错误处理，避免慢接口拖累整体响应
  // 移除数字变体后，统一使用智能搜索变体
  const searchPromises = apiSites.map((site) =>
    Promise.race([
      searchFromApi(site, query),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error(`${site.name} timeout`)), 20000)
      ),
    ]).catch((err) => {
      console.warn(`搜索失败 ${site.name}:`, err.message);
      return []; // 返回空数组而不是抛出错误
    })
  );

  try {
    const results = await Promise.allSettled(searchPromises);
    const successResults = results
      .filter((result) => result.status === 'fulfilled')
      .map((result) => (result as PromiseFulfilledResult<any>).value);
    let flattenedResults = successResults.flat();

    // 过滤黄色内容
    if (!config.SiteConfig.DisableYellowFilter) {
      flattenedResults = flattenedResults.filter((result) => {
        const typeName = result.type_name || '';
        return !yellowWords.some((word: string) => typeName.includes(word));
      });
    }

    // ⚠️ 新增：搜索结果去重
    flattenedResults = deduplicateSearchResults(flattenedResults);

    const cacheTime = await getCacheTime();

    if (flattenedResults.length === 0) {
      // no cache if empty
      return NextResponse.json({ results: [] }, { status: 200 });
    }

    return NextResponse.json(
      { results: flattenedResults },
      {
        headers: {
          'Cache-Control': `public, max-age=${cacheTime}, s-maxage=${cacheTime}`,
          'CDN-Cache-Control': `public, s-maxage=${cacheTime}`,
          'Vercel-CDN-Cache-Control': `public, s-maxage=${cacheTime}`,
          'Netlify-Vary': 'query',
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ error: '搜索失败' }, { status: 500 });
  }
}
