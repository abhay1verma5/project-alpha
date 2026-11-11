import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ChevronRight } from 'lucide-react';
import { getState, STATES } from '@/lib/districts';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return STATES.map(s => ({ state: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ state: string }> }
): Promise<Metadata> {
  const { state } = await params;
  const info = getState(state);
  if (!info) return { title: 'Not Found' };
  return {
    title: `Government Jobs in ${info.name} — District-wise | SarkariAlert`,
    description: `Find government jobs in ${info.name} by district. ${info.recruitmentBodies.join(', ')} vacancies in ${info.districts.map(d => d.name).join(', ')} and more.`,
    alternates: { canonical: `https://sarkarialert.online/government-jobs/${state}` },
  };
}

export default async function StateDistrictsPage(
  { params }: { params: Promise<{ state: string }> }
) {
  const { state } = await params;
  const info = getState(state);
  if (!info) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-gray-900 dark:text-gray-100 font-medium">{info.name} — District-wise Jobs</span>
      </nav>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            {info.name} Government Jobs
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{info.nameHi} सरकारी नौकरी — जिलेवार</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
        Find district-wise government job vacancies in {info.name}. Major recruitment bodies: {info.recruitmentBodies.join(', ')}.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {info.districts.map(d => (
          <Link
            key={d.slug}
            href={`/government-jobs/${state}/${d.slug}`}
            className="group p-4 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{d.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{d.nameHi}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href={`/${state}-government-jobs`}
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline"
        >
          View all {info.name} jobs <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
