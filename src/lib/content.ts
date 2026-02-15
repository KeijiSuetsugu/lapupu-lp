import type { ContentData } from './types';

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Redis } = require('@upstash/redis');
  return new Redis({ url, token }) as import('@upstash/redis').Redis;
}

export async function getContent(): Promise<ContentData> {
  const redis = getRedis();
  if (redis) {
    const data = await redis.get<ContentData>('content');
    if (data) return data;
  }

  // ローカル開発: ファイルから読み込み
  const fs = await import('fs');
  const path = await import('path');
  const filePath = path.join(process.cwd(), 'data', 'content.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as ContentData;
}
