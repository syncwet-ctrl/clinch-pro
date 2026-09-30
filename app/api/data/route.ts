import { NextResponse } from 'next/server';
import { getDashboardData } from '@/lib/api';

export async function GET() {
  try {
    const data = await getDashboardData();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
      }
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
