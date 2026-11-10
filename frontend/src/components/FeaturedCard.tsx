'use client';

import Link from 'next/link';
import { type Job } from '@/lib/api';
import { useLanguage } from './LanguageProvider';

export function FeaturedCard({ job, isFirst }: { job: Job; isFirst: boolean }) {
  const { t } = useLanguage();
  const title = t(job.title, job.title_hi);

  return (
    <div className="relative">
      {isFirst && (
        <div className="absolute -left-1 top-3 w-1 h-8 bg-gradient-to-b from-[#ff6f00] to-amber-500 rounded-full" />
      )}
      <Link href={`/jobs/${job.slug}`} className="block group active:scale-[0.99] transition-transform">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-orange-200 dark:border-orange-700/40 p-4 sm:p-5 hover:shadow-lg hover:shadow-orange-500/5 transition-shadow">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-orange-100 text-orange-800 dark:bg-orange-800/60 dark:text-orange-100">
                  Featured
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-800/60 dark:text-blue-100">
                  {job.category}
                </span>
              </div>
              <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white group-hover:text-[#ff6f00] transition-colors line-clamp-2">
                {title}
              </h3>
              {job.organization && (
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mt-1">{job.organization}</p>
              )}
            </div>
            {job.vacancies && (
              <span className="flex-shrink-0 text-xs font-extrabold text-emerald-800 dark:text-emerald-100 bg-emerald-100 dark:bg-emerald-800/60 px-2.5 py-1 rounded-lg">
                {job.vacancies.toLocaleString('en-IN')} posts
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
