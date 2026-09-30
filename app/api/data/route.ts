import { getDashboardData } from '@/lib/real-data';
import { NextResponse } from 'next/server';

export const revalidate = 30; // Revalidate every 30 seconds for live updates

export async function GET() {
  try {
    const data = await getDashboardData();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to load combat sports data' },
      { status: 500 }
    );
  }
}
