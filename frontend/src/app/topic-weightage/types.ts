// Shared types and presentation helpers for /topic-weightage.
// Data and logic live in the Django backend; this file only describes the API shape
// and maps server-provided values to fixed Tailwind class strings.

export const BASE_PATH = '/topic-weightage';

export const TREND_VALUES = ['high', 'medium', 'low'] as const;
export type Trend = (typeof TREND_VALUES)[number];

export const SORT_VALUES = ['name', 'questions'] as const;

export interface TopTopic {
  subject: string;
  topic: string;
  questions: number;
  weightage: number;
  trend: Trend;
}

export interface ExamSummary {
  slug: string;
  exam: string;
  paper: string;
  category: string;
  level: string;
  state: string;
  total_questions: number;
  total_marks: number;
  duration: string;
  negative_marking: string | null;
  subjects: string[];
  top_topics: TopTopic[];
  color: string;
  approx: boolean;
  as_of: string;
}

export interface TopicRow {
  topic: string;
  questions: number;
  weightage: number;
  weightage_raw: number;
  trend: Trend;
}

export interface SubjectDetail {
  subject: string;
  topics: TopicRow[];
}

export interface ExamDetail extends Omit<ExamSummary, 'subjects'> {
  subjects: SubjectDetail[];
}

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface FilterListing {
  categories: FilterOption[];
  levels: FilterOption[];
  states: FilterOption[];
}

export interface ExamListResponse {
  count: number;
  results: ExamSummary[];
  filters: FilterListing;
}

/** URL-driven filter state. Empty string means "not set". */
export interface FilterValues {
  q: string;
  category: string;
  level: string;
  state: string;
  trend: string;
  sort: string;
}

type SearchParamsInput = Record<string, string | string[] | undefined>;

const TOKEN_PATTERN = /^[a-z0-9_]{1,40}$/;

function firstValue(raw: string | string[] | undefined): string {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return typeof value === 'string' ? value.trim() : '';
}

/** Parses and validates ?q=&category=&level=&state=&trend=&sort= from the URL. */
export function readFilterValues(params: SearchParamsInput): FilterValues {
  const token = (key: string): string => {
    const value = firstValue(params[key]);
    return TOKEN_PATTERN.test(value) ? value : '';
  };
  const trend = firstValue(params.trend);
  const sort = firstValue(params.sort);
  return {
    q: firstValue(params.q).slice(0, 100),
    category: token('category'),
    level: token('level'),
    state: token('state'),
    trend: (TREND_VALUES as readonly string[]).includes(trend) ? trend : '',
    sort: (SORT_VALUES as readonly string[]).includes(sort) ? sort : '',
  };
}

/** Only non-empty filters are forwarded to the API. */
export function toApiParams(values: FilterValues): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(values)) {
    if (value) out[key] = value;
  }
  return out;
}

interface AccentStyle {
  border: string;
  icon: string;
}

// Every class string is written out in full so Tailwind can detect it.
// Never build these with template interpolation like `border-l-${color}-500`.
const ACCENT_STYLES: Record<string, AccentStyle> = {
  green: { border: 'border-l-green-500', icon: 'from-green-500 to-green-700' },
  blue: { border: 'border-l-blue-500', icon: 'from-blue-500 to-blue-700' },
  amber: { border: 'border-l-amber-500', icon: 'from-amber-500 to-amber-700' },
  red: { border: 'border-l-red-500', icon: 'from-red-500 to-red-700' },
  purple: { border: 'border-l-purple-500', icon: 'from-purple-500 to-purple-700' },
  indigo: { border: 'border-l-indigo-500', icon: 'from-indigo-500 to-indigo-700' },
  teal: { border: 'border-l-teal-500', icon: 'from-teal-500 to-teal-700' },
  orange: { border: 'border-l-orange-500', icon: 'from-orange-500 to-orange-700' },
  pink: { border: 'border-l-pink-500', icon: 'from-pink-500 to-pink-700' },
  cyan: { border: 'border-l-cyan-500', icon: 'from-cyan-500 to-cyan-700' },
  rose: { border: 'border-l-rose-500', icon: 'from-rose-500 to-rose-700' },
  slate: { border: 'border-l-slate-500', icon: 'from-slate-500 to-slate-700' },
};

export function accentFor(color: string): AccentStyle {
  return Object.prototype.hasOwnProperty.call(ACCENT_STYLES, color)
    ? ACCENT_STYLES[color]
    : ACCENT_STYLES.indigo;
}

export const TREND_BADGE: Record<Trend, string> = {
  high: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200',
  medium: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
  low: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
};

export function weightageBarClass(weightage: number): string {
  if (weightage >= 15) return 'bg-green-500';
  if (weightage >= 10) return 'bg-blue-500';
  if (weightage >= 5) return 'bg-amber-500';
  return 'bg-gray-400';
}
