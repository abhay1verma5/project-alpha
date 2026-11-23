const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface Job {
  id: number;
  title: string;
  title_hi: string;
  slug: string;
  organization: string;
  content_type: string;
  category: string;
  state: string;
  vacancies: number | null;
  last_date: string | null;
  qualification: string | null;
  salary: string | null;
  is_featured: boolean;
  posted_date: string;
  days_left: number | null;
  is_expired: boolean;
  /** True when the notice was read from the recruiting body's own website. */
  is_official?: boolean;
  replacement_slug?: string | null;
  source_host?: string;
  age_limit?: string | null;
  apply_link?: string | null;
  source_url?: string | null;
  fee?: Record<string, string> | null;
}

export interface ExamTimeline {
  query: string;
  total: number;
  stages: { stage: string; items: Job[] }[];
}

export interface JobDetail extends Job {
  age_limit: string | null;
  apply_link: string | null;
  notification_pdf: string | null;
  source_url: string | null;
  description: string | null;
  fee: Record<string, string> | null;
  vacancy_details: Record<string, number> | null;
  is_active: boolean;
  created_at: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Stats {
  total_jobs: number;
  total_vacancies: number;
  total_results: number;
  total_admit_cards: number;
  total_answer_keys: number;
  states_covered: number;
  categories: { category: string; count: number }[];
}

async function fetchAPI<T>(path: string): Promise<T> {
  // Retry briefly on rate limits / a waking Render instance instead of failing
  // the page (one 429 used to abort the whole Netlify build).
  const delays = [1000, 3000];
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(`${API_BASE}${path}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) return res.json();
    const retryable = res.status === 429 || res.status === 502 || res.status === 503 || res.status === 504;
    if (!retryable || attempt >= delays.length) throw new Error(`API error: ${res.status}`);
    await new Promise((r) => setTimeout(r, delays[attempt]));
  }
}

export async function getJobs(params?: Record<string, string>): Promise<PaginatedResponse<Job>> {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  return fetchAPI(`/jobs/${query}`);
}

export async function getExamTimeline(query: string): Promise<ExamTimeline> {
  const res = await fetch(`${API_BASE}/exam-timeline/?q=${encodeURIComponent(query)}`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error('Timeline fetch failed');
  return res.json();
}

export async function getJob(slug: string): Promise<JobDetail> {
  return fetchAPI(`/jobs/${slug}/`);
}

export async function getFeaturedJobs(): Promise<Job[]> {
  return fetchAPI('/featured/');
}

export async function getResults(params?: Record<string, string>): Promise<PaginatedResponse<Job>> {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  return fetchAPI(`/results/${query}`);
}

export async function getAdmitCards(params?: Record<string, string>): Promise<PaginatedResponse<Job>> {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  return fetchAPI(`/admit-cards/${query}`);
}

export async function getAnswerKeys(params?: Record<string, string>): Promise<PaginatedResponse<Job>> {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  return fetchAPI(`/answer-keys/${query}`);
}

export async function getJobsByCategory(category: string, page?: string): Promise<PaginatedResponse<Job>> {
  const query = page ? `?page=${page}` : '';
  return fetchAPI(`/category/${category}/${query}`);
}

export async function getJobsByState(state: string, page?: string): Promise<PaginatedResponse<Job>> {
  const query = page ? `?page=${page}` : '';
  return fetchAPI(`/state/${state}/${query}`);
}

export async function getStats(): Promise<Stats> {
  return fetchAPI('/stats/');
}

export async function getAdmissions(params?: Record<string, string>): Promise<PaginatedResponse<Job>> {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  return fetchAPI(`/admissions/${query}`);
}

export async function getSyllabus(params?: Record<string, string>): Promise<PaginatedResponse<Job>> {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  return fetchAPI(`/syllabus/${query}`);
}

export async function getNews(params?: Record<string, string>): Promise<PaginatedResponse<Job>> {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  return fetchAPI(`/news/${query}`);
}

export async function searchJobs(query: string): Promise<{ results: Job[] }> {
  if (!query || query.length < 2) return { results: [] };
  const params = new URLSearchParams({ q: query });
  const res = await fetch(`${API_BASE}/search/?${params.toString()}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// ── AI API (Django /ai/<name>/) ──

export const AI_UNAVAILABLE_EN = 'AI is unavailable right now';
export const AI_UNAVAILABLE_HI = 'AI अभी उपलब्ध नहीं है';

export type AiEndpoint = 'career' | 'tool' | 'search' | 'quiz' | 'eligibility';

/**
 * POST to {API_BASE}/ai/<name>/. Success bodies are returned unchanged.
 * HTTP 503 (AI unavailable) resolves to `{ error }` carrying both the English and Hindi
 * text, so callers show the message instead of a made-up answer. Other error bodies
 * ({ error } from 400/429/500) are returned as-is; a non-JSON failure throws.
 */
export async function postAI<T extends object = Record<string, unknown>>(
  name: AiEndpoint,
  body: unknown,
  init?: { signal?: AbortSignal },
): Promise<T & { error?: string }> {
  const res = await fetch(`${API_BASE}/ai/${name}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: init?.signal,
  });
  if (res.status === 503) {
    return { error: `${AI_UNAVAILABLE_EN} — ${AI_UNAVAILABLE_HI}` } as T & { error?: string };
  }
  const data = await res.json();
  if (!res.ok && !data?.error) throw new Error(`API error: ${res.status}`);
  return data;
}

// ── PYQ API ──

import type { PYQQuestion, PYQMeta, PYQCheckResult } from './pyq-types';

export async function getPYQQuestions(params: Record<string, string>): Promise<PYQQuestion[]> {
  const query = '?' + new URLSearchParams(params).toString();
  return fetchAPI(`/pyq/${query}`);
}

export async function getPYQMockQuestions(params: Record<string, string>): Promise<PYQQuestion[]> {
  const query = '?' + new URLSearchParams(params).toString();
  return fetchAPI(`/pyq/mock/${query}`);
}

export async function getPYQMeta(exam?: string): Promise<PYQMeta> {
  const query = exam ? `?exam=${exam}` : '';
  return fetchAPI(`/pyq/meta/${query}`);
}

// ── Current Affairs API ──

export async function getCurrentAffairs(days?: number): Promise<{ count: number; results: { date: string; items: { title: string; detail: string; category: string }[]; quiz: { question: string; options: string[]; correct: number; explanation: string }[] }[] }> {
  return fetchAPI(`/current-affairs/?days=${days || 7}`);
}

export async function getDailyQuiz(date?: string): Promise<{ date: string; quiz: { question: string; options: string[]; correct: number; explanation: string }[]; count: number }> {
  const query = date ? `?date=${date}` : '';
  return fetchAPI(`/daily-quiz/${query}`);
}

export async function checkPYQAnswers(answers: Record<number, number>): Promise<PYQCheckResult> {
  const res = await fetch(`${API_BASE}/pyq/check/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
