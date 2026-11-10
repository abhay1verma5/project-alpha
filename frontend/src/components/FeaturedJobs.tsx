import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { type Job } from '@/lib/api';
import { JobCard } from './JobCard';

export function FeaturedJobs({ jobs }: { jobs: Job[] }) {
  if (jobs.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Featured Jobs</h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Don&apos;t miss these opportunities</p>
          </div>
        </div>
        <Link
          href="/jobs"
          className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid gap-3">
        {jobs.map((job, i) => (
          <JobCard key={job.id} job={job} index={i} />
        ))}
      </div>
    </section>
  );
}
