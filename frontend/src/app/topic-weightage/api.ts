// Server-side fetchers for the topic-weightage API. Server components only.
// Failures never throw: list returns null, detail returns { status: 'error' }.

import type { ExamDetail, ExamListResponse } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const REVALIDATE_SECONDS = 3600;
const TIMEOUT_MS = 8000;

export async function fetchExamList(
  params: Record<string, string> = {}
): Promise<ExamListResponse | null> {
  const qs = new URLSearchParams(params).toString();
  try {
    const res = await fetch(`${API_BASE}/topic-weightage/${qs ? `?${qs}` : ''}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return (await res.json()) as ExamListResponse;
  } catch {
    return null;
  }
}

export type ExamDetailResult =
  | { status: 'ok'; exam: ExamDetail }
  | { status: 'missing' }
  | { status: 'error' };

export async function fetchExamDetail(slug: string): Promise<ExamDetailResult> {
  try {
    const res = await fetch(`${API_BASE}/topic-weightage/${encodeURIComponent(slug)}/`, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (res.status === 404) return { status: 'missing' };
    if (!res.ok) return { status: 'error' };
    return { status: 'ok', exam: (await res.json()) as ExamDetail };
  } catch {
    return { status: 'error' };
  }
}

/** Slugs for generateStaticParams. Returns [] when the API is unreachable so builds never fail. */
export async function fetchExamSlugs(): Promise<string[]> {
  const data = await fetchExamList();
  return data ? data.results.map((exam) => exam.slug) : [];
}
