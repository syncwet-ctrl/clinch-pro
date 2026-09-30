import { NextResponse } from 'next/server';
import { getDashboardData } from '@/lib/api';

export const revalidate = 300;

export async function GET() {
  try {
    const data = await getDashboardData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
