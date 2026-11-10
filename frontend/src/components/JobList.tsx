import { type Job } from '@/lib/api';
import { JobCard } from './JobCard';
import { FileX } from 'lucide-react';

interface JobListProps {
  jobs: Job[];
  emptyMessage?: string;
}

export function JobList({ jobs, emptyMessage = 'No jobs found.' }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
          <FileX className="w-8 h-8 text-gray-400 dark:text-gray-500" />
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">{emptyMessage}</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {jobs.map((job, i) => (
        <JobCard key={job.id} job={job} index={i} />
      ))}
    </div>
  );
}
