// Per-IP sliding-window limiter for the AI routes.
// In-memory only: it resets on each cold start and is per serverless instance,
// which is enough to stop one client from draining the Gemini quota.

import type { NextRequest } from 'next/server';

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const hits = new Map<string, number[]>();

export function clientIp(request: NextRequest): string {
  const fwd = request.headers.get('x-forwarded-for');
  return (fwd ? fwd.split(',')[0] : request.headers.get('x-real-ip') || 'unknown').trim();
}

/** Returns true when the caller is within `limit` requests per hour. */
export function allowRequest(request: NextRequest, limit: number): boolean {
  const ip = clientIp(request);
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= limit) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);

  // Drop idle IPs so the map does not grow unbounded.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }
  return true;
}
