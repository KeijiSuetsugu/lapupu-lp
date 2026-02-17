import { Redis } from '@upstash/redis';
import type { ContentData } from './types';
import defaultContent from '../../data/content.json';

export async function getContent(): Promise<ContentData> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    try {
      const redis = new Redis({ url, token });
      const data = await redis.get<ContentData>('content');
      if (data) return data;
    } catch {
      // Redis接続エラー時はデフォルトにフォールバック
    }
  }

  return defaultContent as ContentData;
}
