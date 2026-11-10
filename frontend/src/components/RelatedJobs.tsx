import Link from 'next/link';
import { Clock, Building2, ArrowRight } from 'lucide-react';
import { getJobs, type Job } from '@/lib/api';
import { CATEGORY_LABELS, STATE_LABELS, cn } from '@/lib/utils';

interface RelatedJobsProps {
  category: string;
  state: string;
  currentSlug: string;
}

export default async function RelatedJobs({ category, currentSlug }: RelatedJobsProps) {
  let jobs: Job[];
  try {
    const res = await getJobs({ category, page_size: '4' });
    jobs = res.results.filter((j) => j.slug !== currentSlug).slice(0, 3);
  } catch {
    return null;
  }
  if (jobs.length === 0) return null;

  const categoryLabel = CATEGORY_LABELS[category] || category;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-6">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5">More in {categoryLabel}</h2>
      <div className="grid gap-3">
        {jobs.map((job) => {
          const stateLabel = STATE_LABELS[job.state] || job.state;
          return (
            <Link key={job.slug} href={`/jobs/${job.slug}`} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all group">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{job.title}</h3>
                {job.organization && (
                  <p className="flex items-center gap-1.5 text-xs text-gray-500 mt-1.5">
                    <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{job.organization}</span>
                  </p>
                )}
                <div className="flex items-center gap-3 mt-2">
                  {job.days_left !== null && job.days_left >= 0 && (
                    <span className={cn('inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md',
                      job.days_left <= 3 ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' :
                      job.days_left <= 7 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' :
                      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
                    )}>
                      <Clock className="w-3 h-3" />
                      {job.days_left === 0 ? 'Last Day' : `${job.days_left}d left`}
                    </span>
                  )}
                  {stateLabel && <span className="text-[11px] text-gray-400 font-medium">{stateLabel}</span>}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-1" />
            </Link>
          );
        })}
      </div>
      <Link href={`/category/${category}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors">
        View all {categoryLabel} jobs <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
