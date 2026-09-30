import { NextResponse } from 'next/server';
import { getNewsFeed } from '@/lib/dashboard';

export async function GET() {
  const news = await getNewsFeed();
  return NextResponse.json(news);
}
