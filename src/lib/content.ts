import { Redis } from '@upstash/redis';
import type { ContentData, SiteSettings } from './types';
import defaultContent from '../../data/content.json';

const defaultSettings: SiteSettings = {
  heroSize: 'md',
  headingSize: 'md',
  bodySize: 'md',
};

export async function getContent(): Promise<ContentData> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    try {
      const redis = new Redis({ url, token });
      const data = await redis.get<ContentData>('content');
      if (data) {
        // 既存データにsettingsがない場合はデフォルト値を補完
        if (!data.settings) {
          data.settings = defaultSettings;
        }
        if (!data.charStyles) {
          data.charStyles = {};
        }
        return data;
      }
    } catch {
      // Redis接続エラー時はデフォルトにフォールバック
    }
  }

  return defaultContent as ContentData;
}
