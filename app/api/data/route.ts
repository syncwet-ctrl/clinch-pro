import { getDashboardData } from '@/lib/api';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.json(await getDashboardData(), { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: 'Live providers are temporarily unavailable. Please retry.' }, { status: 503 });
  }
}
