import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getJobs } from '@/lib/api';
import { JobCard } from '@/components/JobCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ScamWarning } from '@/components/ScamWarning';
import { LEVELS } from '@/lib/jobs-for-levels';

interface Props {
  params: Promise<{ level: string }>;
}

export function generateStaticParams() {
  return Object.keys(LEVELS).map((level) => ({ level }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { level } = await params;
  const meta = LEVELS[level];
  if (!meta) return { title: 'Not found' };
  return {
    title: `${meta.title} 2026-27 — Latest Vacancies, Last Dates, Official Links`,
    description: `${meta.blurb} Updated daily from official websites with last dates and apply links. ${meta.hi}.`,
    alternates: { canonical: `https://sarkarialert.online/jobs-for/${level}` },
  };
}

export default async function JobsForLevelPage({ params }: Props) {
  const { level } = await params;
  const meta = LEVELS[level];
  if (!meta) notFound();

  let jobs: Awaited<ReturnType<typeof getJobs>> | null = null;
  try {
    jobs = await getJobs({ qualification: meta.q, ordering: 'last_date', page_size: '40' });
  } catch {
    jobs = null;
  }
  const results = jobs?.results ?? [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: meta.title,
    description: meta.blurb,
    url: `https://sarkarialert.online/jobs-for/${level}`,
    mainEntity: { '@type': 'ItemList', numberOfItems: jobs?.count ?? results.length },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Jobs', href: '/jobs' }, { label: meta.title }]} />
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{meta.title}</h1>
      <p className="text-base text-gray-500 dark:text-gray-400">{meta.hi}</p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 mb-4">{meta.blurb}</p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {Object.entries(LEVELS).map(([key, l]) => (
          <Link
            key={key}
            href={`/jobs-for/${key}`}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${key === level ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'}`}
          >
            {l.title.replace(' Government Jobs', '').replace(' (PRT, TGT, PGT)', '')}
          </Link>
        ))}
      </div>

      <div className="mb-6"><ScamWarning /></div>

      {results.length === 0 ? (
        <p className="text-sm text-gray-500">No live notices match this level right now. Check <Link href="/jobs" className="underline">all jobs</Link>.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      )}
      <p className="text-xs text-gray-400 mt-6">
        {jobs?.count ?? results.length} notices · sorted by last date · showing only active listings.{' '}
        <Link href={`/jobs?qualification=${encodeURIComponent(meta.q)}`} className="underline">See all with filters</Link>
      </p>
    </div>
  );
}
