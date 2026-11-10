import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import {
  Newspaper, Briefcase, FileCheck, CreditCard, Key, TrendingUp,
  ChevronRight, AlertCircle, MapPin, Tag, GraduationCap,
  BookOpen, Zap, ExternalLink,
} from 'lucide-react';
import { Pagination } from '@/components/Pagination';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { CATEGORY_LABELS, STATE_LABELS, formatDate, formatNumber } from '@/lib/utils';
import type { Job, PaginatedResponse } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Sarkari Job News — Latest Govt Vacancy Alerts, Results & Admit Cards 2026-27',
  description:
    'Real-time government job news feed — new vacancy announcements, exam results, admit card releases, answer keys from SSC, UPSC, Railway, Banking, Defence, Police, State PSC. Updated every hour from official sources.',
  alternates: {
    canonical: 'https://sarkarialert.online/exam-calendar',
  },
  openGraph: {
    title: 'Sarkari Job News — Live Government Job Updates',
    description: 'All latest sarkari naukri news, vacancy alerts, results, admit cards and answer keys updated every hour.',
    url: 'https://sarkarialert.online/exam-calendar',
  },
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const CONTENT_TYPE_CONFIG: Record<string, {
  label: string;
  labelHi: string;
  color: string;
  bgColor: string;
  borderColor: string;
  dotColor: string;
}> = {
  job: {
    label: 'New Vacancy',
    labelHi: 'नई भर्ती',
    color: 'text-blue-700 dark:text-blue-300',
    bgColor: 'bg-blue-50 dark:bg-blue-950/40',
    borderColor: 'border-l-blue-500',
    dotColor: 'bg-blue-500',
  },
  result: {
    label: 'Result Declared',
    labelHi: 'रिजल्ट घोषित',
    color: 'text-green-700 dark:text-green-300',
    bgColor: 'bg-green-50 dark:bg-green-950/40',
    borderColor: 'border-l-green-500',
    dotColor: 'bg-green-500',
  },
  admit_card: {
    label: 'Admit Card Released',
    labelHi: 'एडमिट कार्ड जारी',
    color: 'text-purple-700 dark:text-purple-300',
    bgColor: 'bg-purple-50 dark:bg-purple-950/40',
    borderColor: 'border-l-purple-500',
    dotColor: 'bg-purple-500',
  },
  answer_key: {
    label: 'Answer Key Out',
    labelHi: 'आंसर की जारी',
    color: 'text-amber-700 dark:text-amber-300',
    bgColor: 'bg-amber-50 dark:bg-amber-950/40',
    borderColor: 'border-l-amber-500',
    dotColor: 'bg-amber-500',
  },
  admission: {
    label: 'Admission Open',
    labelHi: 'प्रवेश खुला',
    color: 'text-cyan-700 dark:text-cyan-300',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/40',
    borderColor: 'border-l-cyan-500',
    dotColor: 'bg-cyan-500',
  },
  syllabus: {
    label: 'Syllabus Updated',
    labelHi: 'सिलेबस अपडेट',
    color: 'text-indigo-700 dark:text-indigo-300',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/40',
    borderColor: 'border-l-indigo-500',
    dotColor: 'bg-indigo-500',
  },
};

const FILTER_TABS = [
  { key: '', label: 'All Updates', icon: Newspaper },
  { key: 'job', label: 'Vacancies', icon: Briefcase },
  { key: 'result', label: 'Results', icon: FileCheck },
  { key: 'admit_card', label: 'Admit Cards', icon: CreditCard },
  { key: 'answer_key', label: 'Answer Keys', icon: Key },
  { key: 'admission', label: 'Admissions', icon: GraduationCap },
  { key: 'syllabus', label: 'Syllabus', icon: BookOpen },
];

function groupByDate(jobs: Job[]): { date: string; label: string; jobs: Job[] }[] {
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const groups: Record<string, Job[]> = {};

  for (const job of jobs) {
    const date = job.posted_date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(job);
  }

  return Object.entries(groups)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, jobs]) => ({
      date,
      label: date === today ? 'Today' : date === yesterday ? 'Yesterday' : fmtDate(date),
      jobs,
    }));
}

function fmtDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function fmtDateFull(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

interface Props {
  searchParams: Promise<Record<string, string>>;
}

async function NewsContent({ searchParams }: Props) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const contentType = params.type || '';
  const category = params.category || '';
  const state = params.state || '';

  const apiParams: Record<string, string> = { page: String(page) };
  if (contentType) apiParams.content_type = contentType;
  if (category) apiParams.category = category;
  if (state) apiParams.state = state;

  let data: PaginatedResponse<Job>;
  try {
    const res = await fetch(`${API_BASE}/news/?${new URLSearchParams(apiParams)}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    data = await res.json();
  } catch {
    return (
      <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
        <AlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
        <p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load news</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Please try again later.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(data.count / 20);
  const dateGroups = groupByDate(data.results);

  return (
    <>
      {/* Stats bar */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Zap className="w-4 h-4 text-amber-500" />
        <span className="font-semibold">{data.count.toLocaleString('en-IN')} updates</span>
        {contentType && (
          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${CONTENT_TYPE_CONFIG[contentType]?.bgColor} ${CONTENT_TYPE_CONFIG[contentType]?.color}`}>
            {CONTENT_TYPE_CONFIG[contentType]?.label || contentType}
          </span>
        )}
        {category && (
          <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
            {CATEGORY_LABELS[category] || category}
          </span>
        )}
        {state && (
          <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300 text-xs font-bold">
            {STATE_LABELS[state] || state}
          </span>
        )}
      </div>

      {/* Date-grouped news feed */}
      {dateGroups.length === 0 ? (
        <div className="text-center py-20">
          <Newspaper className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">No updates found</p>
        </div>
      ) : (
        <div className="space-y-8">
          {dateGroups.map((group) => (
            <div key={group.date}>
              {/* Date header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a3a5c] dark:bg-blue-900/60 text-white text-sm font-bold shadow-sm">
                  {group.label}
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {group.jobs.length} update{group.jobs.length > 1 ? 's' : ''}
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
              </div>

              {/* Comprehensive news cards */}
              <div className="space-y-4">
                {group.jobs.map((job) => {
                  const config = CONTENT_TYPE_CONFIG[job.content_type] || CONTENT_TYPE_CONFIG.job;
                  const stateLabel = STATE_LABELS[job.state] || job.state;
                  const catLabel = CATEGORY_LABELS[job.category] || job.category;

                  const directLink = job.apply_link || job.source_url;
                  const ctaLabel = directLink
                    ? `${job.content_type === 'result' ? 'See Result' : job.content_type === 'admit_card' ? 'Download Admit Card' : job.content_type === 'answer_key' ? 'Download Answer Key' : 'Apply Online'} / सीधे जाएं`
                    : 'View Full Details / पूरी जानकारी देखें';

                  const cardInner = (
                      <div className={`bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 border-l-4 ${config.borderColor} p-4 sm:p-5 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all`}>
                        {/* Type badge */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${config.bgColor} ${config.color}`}>
                            <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
                            {config.label} / {config.labelHi}
                          </span>
                          <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                            {catLabel}
                          </span>
                        </div>

                        {/* English Title */}
                        <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white leading-snug group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                          {job.title}
                        </h3>

                        {/* Hindi Title */}
                        {job.title_hi && job.title_hi !== job.title && (
                          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 leading-snug">
                            {job.title_hi}
                          </p>
                        )}

                        {/* Organization */}
                        {job.organization && (
                          <p className="text-sm font-semibold text-[#1a3a5c] dark:text-blue-300 mt-2">
                            Organization: {job.organization}
                          </p>
                        )}

                        {/* All details as plain text — no icons */}
                        <div className="mt-3 space-y-1.5 text-sm text-gray-700 dark:text-gray-300">
                          {/* Posted Date */}
                          <p>
                            <span className="font-bold text-gray-500 dark:text-gray-400">Posted:</span>{' '}
                            {fmtDateFull(job.posted_date)}
                          </p>

                          {/* Last Date */}
                          {job.last_date && (
                            <p>
                              <span className="font-bold text-gray-500 dark:text-gray-400">Last Date:</span>{' '}
                              <span className={job.days_left !== null && job.days_left <= 7 ? 'text-red-600 dark:text-red-400 font-bold' : ''}>
                                {fmtDateFull(job.last_date)}
                              </span>
                            </p>
                          )}

                          {/* Days Left */}
                          {job.days_left !== null && job.days_left >= 0 && (
                            <p>
                              <span className="font-bold text-gray-500 dark:text-gray-400">Days Left:</span>{' '}
                              <span className={`font-bold ${
                                job.days_left === 0
                                  ? 'text-red-600 dark:text-red-400'
                                  : job.days_left <= 3
                                    ? 'text-red-600 dark:text-red-400'
                                    : job.days_left <= 7
                                      ? 'text-amber-600 dark:text-amber-400'
                                      : 'text-green-600 dark:text-green-400'
                              }`}>
                                {job.days_left === 0 ? 'Last Day Today!' : `${job.days_left} days remaining`}
                              </span>
                            </p>
                          )}

                          {job.is_expired && (
                            <p>
                              <span className="font-bold text-red-600 dark:text-red-400">Status: Expired / आवेदन बंद</span>
                            </p>
                          )}

                          {/* Vacancies */}
                          {job.vacancies && job.vacancies > 0 && (
                            <p>
                              <span className="font-bold text-gray-500 dark:text-gray-400">Vacancies:</span>{' '}
                              {formatNumber(job.vacancies)} Posts / {formatNumber(job.vacancies)} पद
                            </p>
                          )}

                          {/* Qualification */}
                          {job.qualification && (
                            <p>
                              <span className="font-bold text-gray-500 dark:text-gray-400">Qualification:</span>{' '}
                              {job.qualification}
                            </p>
                          )}

                          {/* Salary */}
                          {job.salary && (
                            <p>
                              <span className="font-bold text-gray-500 dark:text-gray-400">Salary:</span>{' '}
                              {job.salary}
                            </p>
                          )}

                          {/* State */}
                          <p>
                            <span className="font-bold text-gray-500 dark:text-gray-400">State:</span>{' '}
                            {stateLabel}
                          </p>

                          {/* Category */}
                          <p>
                            <span className="font-bold text-gray-500 dark:text-gray-400">Category:</span>{' '}
                            {catLabel}
                          </p>
                        </div>

                        {/* CTA link */}
                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                          <span className="text-sm font-bold text-[#ff6f00] group-hover:text-orange-700 dark:group-hover:text-orange-300 inline-flex items-center gap-1">
                            {ctaLabel}
                            <ExternalLink className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                  );

                  return directLink ? (
                    <a key={job.id} href={directLink} target="_blank" rel="noopener noreferrer" className="block group">
                      {cardInner}
                    </a>
                  ) : (
                    <Link key={job.id} href={`/jobs/${job.slug}`} className="block group">
                      {cardInner}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/exam-calendar"
        queryParams={Object.fromEntries(
          Object.entries({ type: contentType, category, state }).filter(([, v]) => v)
        )}
      />
    </>
  );
}

function buildFilterUrl(base: Record<string, string>, override: Record<string, string>): string {
  const merged = { ...base, ...override };
  const filtered = Object.fromEntries(
    Object.entries(merged).filter(([k, v]) => v && k !== 'page')
  );
  const qs = new URLSearchParams(filtered).toString();
  return `/exam-calendar${qs ? `?${qs}` : ''}`;
}

const TOP_CATEGORIES = [
  { key: '', label: 'All' },
  { key: 'ssc', label: 'SSC' },
  { key: 'upsc', label: 'UPSC' },
  { key: 'railway', label: 'Railway' },
  { key: 'banking', label: 'Banking' },
  { key: 'defence', label: 'Defence' },
  { key: 'state_psc', label: 'State PSC' },
  { key: 'police', label: 'Police' },
  { key: 'teaching', label: 'Teaching' },
  { key: 'health', label: 'Health' },
  { key: 'engineering', label: 'Engineering' },
  { key: 'university', label: 'University' },
];

const TOP_STATES = [
  { key: '', label: 'All States' },
  { key: 'all_india', label: 'Central Govt' },
  { key: 'uttar_pradesh', label: 'UP' },
  { key: 'bihar', label: 'Bihar' },
  { key: 'rajasthan', label: 'Rajasthan' },
  { key: 'madhya_pradesh', label: 'MP' },
  { key: 'maharashtra', label: 'Maharashtra' },
  { key: 'delhi', label: 'Delhi' },
  { key: 'haryana', label: 'Haryana' },
  { key: 'punjab', label: 'Punjab' },
  { key: 'west_bengal', label: 'West Bengal' },
  { key: 'gujarat', label: 'Gujarat' },
  { key: 'tamil_nadu', label: 'Tamil Nadu' },
  { key: 'karnataka', label: 'Karnataka' },
  { key: 'jharkhand', label: 'Jharkhand' },
  { key: 'uttarakhand', label: 'Uttarakhand' },
  { key: 'chhattisgarh', label: 'Chhattisgarh' },
  { key: 'odisha', label: 'Odisha' },
  { key: 'kerala', label: 'Kerala' },
  { key: 'assam', label: 'Assam' },
];

export default async function JobNewsPage(props: Props) {
  const params = await props.searchParams;
  const activeType = params.type || '';
  const activeCategory = params.category || '';
  const activeState = params.state || '';
  const baseParams = { type: activeType, category: activeCategory, state: activeState };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a3a5c] via-[#1e4976] to-[#0f2b44] py-8 sm:py-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/30 rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-white/20 rounded-full" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-blue-100 text-sm font-medium mb-4">
            <Zap className="w-4 h-4 text-amber-400" />
            Live Updates — Every Hour
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            Sarkari Job News
          </h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto mb-2">
            सरकारी नौकरी समाचार — सभी जानकारी एक जगह
          </p>
          <p className="text-sm text-blue-200/80 max-w-2xl mx-auto">
            All government job announcements, exam results, admit cards & answer keys — with full details like eligibility, salary, last date, vacancies. Updated every hour from official sources.
          </p>

          {/* Quick links */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ff6f00] text-white text-sm font-bold hover:bg-[#e65100] transition-colors shadow-lg shadow-orange-500/30"
            >
              <Briefcase className="w-4 h-4" />
              All Jobs
            </Link>
            <Link
              href="/results"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/15 backdrop-blur-sm text-white text-sm font-bold hover:bg-white/25 transition-colors border border-white/20"
            >
              <FileCheck className="w-4 h-4" />
              Results
            </Link>
            <Link
              href="/admit-cards"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/15 backdrop-blur-sm text-white text-sm font-bold hover:bg-white/25 transition-colors border border-white/20"
            >
              <CreditCard className="w-4 h-4" />
              Admit Cards
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Content type filter tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3 -mx-4 px-4">
          {FILTER_TABS.map((tab) => {
            const isActive = activeType === tab.key;
            const Icon = tab.icon;
            return (
              <Link
                key={tab.key}
                href={buildFilterUrl(baseParams, { type: tab.key })}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-[#1a3a5c] text-white border-[#1a3a5c] shadow-lg shadow-blue-900/20'
                    : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Link>
            );
          })}
        </div>

        {/* Category + State filters */}
        <div className="space-y-2 mb-6">
          {/* Category filter */}
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
              {TOP_CATEGORIES.map((cat) => (
                <Link
                  key={cat.key}
                  href={buildFilterUrl(baseParams, { category: cat.key })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                    activeCategory === cat.key
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                  }`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          {/* State filter */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
              {TOP_STATES.map((st) => (
                <Link
                  key={st.key}
                  href={buildFilterUrl(baseParams, { state: st.key })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                    activeState === st.key
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-green-300'
                  }`}
                >
                  {st.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* News feed */}
        <Suspense fallback={<JobListSkeleton />}>
          <NewsContent searchParams={props.searchParams} />
        </Suspense>

        {/* CTA */}
        <div className="mt-10 bg-gradient-to-r from-[#1a3a5c] to-[#0f2b44] rounded-2xl p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            सभी सरकारी नौकरी अपडेट एक जगह
          </h2>
          <p className="text-blue-100 mb-6 max-w-lg mx-auto">
            Browse all government jobs, check results, download admit cards and answer keys. Everything you need for your sarkari naukri preparation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/jobs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ff6f00] text-white font-semibold hover:bg-[#e65100] transition-colors shadow-lg shadow-orange-500/30"
            >
              Browse All Jobs
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/15 text-white font-semibold hover:bg-white/25 transition-colors border border-white/20"
            >
              AI Search
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ with JSON-LD */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQS.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: { '@type': 'Answer', text: faq.a },
              })),
            }),
          }}
        />
      </section>
    </div>
  );
}

const FAQS = [
  {
    q: 'What type of news updates does SarkariAlert show?',
    a: 'SarkariAlert shows ALL government recruitment updates: new vacancy announcements, exam results, admit card releases, answer keys, admission notifications, and syllabus updates from SSC, UPSC, Railway, Banking, Defence, Police, State PSC, and more — all from official sources.',
  },
  {
    q: 'How often is the job news feed updated?',
    a: 'Our automated crawler runs every hour, pulling the latest notifications directly from official government recruitment portals. New announcements typically appear here within minutes of being published on official websites.',
  },
  {
    q: 'Are these updates from official sources?',
    a: 'Yes. SarkariAlert fetches data directly from official government recruitment portals like SSC, UPSC, RRB, IBPS, State Public Service Commissions, and other government agencies. All apply links point to the original official websites.',
  },
  {
    q: 'Can I filter news by category or state?',
    a: 'Yes! Use the filter tabs at the top to see only specific content types (vacancies, results, admit cards, answer keys, admissions, syllabus). You can further filter by category (SSC, UPSC, Railway, etc.) and state for targeted results.',
  },
  {
    q: 'What details are shown for each job notification?',
    a: 'Each card shows complete details: job title in both English and Hindi, organization name, posted date, last date to apply, days remaining, number of vacancies, eligibility/qualification, salary range, state, and category. Click any card to see the full notification with apply link.',
  },
  {
    q: 'Kya SarkariAlert par sabhi state ki naukri milti hai?',
    a: 'Haan, SarkariAlert par Central government aur sabhi rajyon ki sarkari naukri ki jaankari milti hai — UP, Bihar, Rajasthan, MP, Maharashtra, Delhi, Haryana, Punjab, West Bengal aur baaki sabhi states. State filter use karke apne state ki naukri dekh sakte hain.',
  },
  {
    q: 'How is SarkariAlert different from other job portals?',
    a: 'SarkariAlert provides: 1) Real-time updates every hour from official sources. 2) Bilingual content (English + Hindi). 3) AI-powered search. 4) Tools like salary calculator, age calculator, cutoff tracker. 5) Direct official apply links — no middleman. 6) Free with no registration required.',
  },
  {
    q: 'Can I get notifications for specific exams?',
    a: 'You can bookmark specific exam pages on SarkariAlert and check them regularly. We also have an Admit Card Tracker and Application Tracker tool where you can add your exams and track their status. Use the category and state filters to quickly find relevant updates.',
  },
];
