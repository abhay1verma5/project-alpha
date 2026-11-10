import { NextRequest, NextResponse } from 'next/server';

function getApiBase() { return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'; }

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || '';
  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const res = await fetch(`${getApiBase()}/search/?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
