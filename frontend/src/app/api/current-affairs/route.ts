import { NextResponse } from 'next/server';
import data from '@/data/current-affairs.json';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const days = Math.min(parseInt(searchParams.get('days') || '7'), 30);
  const dateParam = searchParams.get('date');

  let results = data.results;

  if (dateParam) {
    results = results.filter((r: any) => r.date === dateParam);
  } else {
    results = results.slice(0, days);
  }

  return NextResponse.json({
    count: results.length,
    results,
  });
}
