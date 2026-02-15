import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { isAuthenticated } from '@/lib/auth';
import { getContent } from '@/lib/content';
import type { ContentData } from '@/lib/types';

const CONTENT_PATH = path.join(process.cwd(), 'data', 'content.json');

export async function GET() {
  try {
    const data = await getContent();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'コンテンツの読み込みに失敗しました' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticated()) {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
  }

  try {
    const body = await request.json() as ContentData;

    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (url && token) {
      // Vercel本番環境: Upstash Redisに保存
      const { Redis } = await import('@upstash/redis');
      const redis = new Redis({ url, token });
      await redis.set('content', JSON.stringify(body));
    } else {
      // ローカル開発: ファイルに保存
      fs.writeFileSync(CONTENT_PATH, JSON.stringify(body, null, 2), 'utf-8');
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: '保存に失敗しました' }, { status: 500 });
  }
}
