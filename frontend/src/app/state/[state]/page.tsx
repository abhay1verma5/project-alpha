import type { Metadata } from 'next';
import { getJobsByState } from '@/lib/api';
import { JobList } from '@/components/JobList';
import { Pagination } from '@/components/Pagination';
import { STATE_LABELS } from '@/lib/utils';
import { MapPin } from 'lucide-react';

interface Props {
  params: Promise<{ state: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state } = await params;
  const label = STATE_LABELS[state] || state;
  return {
    title: `Government Jobs in ${label} 2026-27 — Sarkari Naukri ${label}`,
    description: `Latest government job notifications in ${label} 2026 — State PSC, Police, Teaching, Railway, Banking vacancies. Apply online with eligibility & last date details.`,
    alternates: {
      canonical: `https://sarkarialert.online/state/${state}`,
    },
  };
}

export default async function StatePage({ params, searchParams }: Props) {
  const { state } = await params;
  const sp = await searchParams;
  const page = parseInt(sp.page || '1', 10);
  const label = STATE_LABELS[state] || state;

  let data;
  try {
    data = await getJobsByState(state, String(page));
  } catch {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Jobs in {label}</h1>
        </div>
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
          <p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load jobs</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil(data.count / 20);

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sarkarialert.online' },
      { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://sarkarialert.online/jobs' },
      { '@type': 'ListItem', position: 3, name: `Jobs in ${label}` },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Jobs in {label}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{data.count} jobs found</p>
        </div>
      </div>
      <JobList jobs={data.results} emptyMessage={`No jobs found in ${label}.`} />
      <Pagination currentPage={page} totalPages={totalPages} basePath={`/state/${state}`} />
    </div>
  );
}