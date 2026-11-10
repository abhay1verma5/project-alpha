import type { Metadata } from 'next';
import { getJobsByCategory } from '@/lib/api';
import { JobList } from '@/components/JobList';
import { Pagination } from '@/components/Pagination';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '@/lib/utils';

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = CATEGORY_LABELS[category] || category;
  return {
    title: `${label} Jobs 2026-27 — Latest ${label} Government Job Notifications`,
    description: `Latest ${label} government job notifications, results, admit cards & answer keys 2026. Apply online for ${label} vacancies — eligibility, last date, salary details.`,
    alternates: {
      canonical: `https://sarkarialert.online/category/${category}`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { category } = await params;
  const sp = await searchParams;
  const page = parseInt(sp.page || '1', 10);
  const label = CATEGORY_LABELS[category] || category;
  const icon = CATEGORY_ICONS[category] || '📌';

  let data;
  try {
    data = await getJobsByCategory(category, String(page));
  } catch {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-2xl">
            {icon}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{label} Jobs</h1>
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
      { '@type': 'ListItem', position: 3, name: `${label} Jobs` },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-2xl">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{label} Jobs</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{data.count} jobs found</p>
        </div>
      </div>
      <JobList jobs={data.results} emptyMessage={`No ${label} jobs found.`} />
      <Pagination currentPage={page} totalPages={totalPages} basePath={`/category/${category}`} />
    </div>
  );
}