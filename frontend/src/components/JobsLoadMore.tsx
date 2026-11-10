'use client';

import { useState, useCallback } from 'react';
import { type Job } from '@/lib/api';
import { JobCard } from './JobCard';
import { Loader2, ChevronDown } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface JobsLoadMoreProps {
  initialJobs: Job[];
  totalCount: number;
  nextUrl: string | null;
  filterParams: Record<string, string>;
}

export function JobsLoadMore({
  initialJobs,
  totalCount,
  nextUrl,
  filterParams,
}: JobsLoadMoreProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(nextUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMore = useCallback(async () => {
    if (!nextPageUrl || loading) return;

    setLoading(true);
    setError(null);

    try {
      // The API returns an absolute URL in the `next` field (e.g. http://localhost:8000/api/jobs/?page=2).
      // We need to use that URL to fetch the next page, but normalize it
      // to use our configured API_BASE in case the stored URL differs.
      let fetchUrl: string;
      try {
        const parsed = new URL(nextPageUrl);
        // Reconstruct using our API_BASE + the path & query
        fetchUrl = `${API_BASE}${parsed.pathname.replace(/^\/api/, '')}${parsed.search}`;
      } catch {
        // If the next URL is relative or unparseable, build it manually
        const currentPage = Math.ceil(jobs.length / 20) + 1;
        const params = new URLSearchParams({ ...filterParams, page: String(currentPage) });
        fetchUrl = `${API_BASE}/jobs/?${params.toString()}`;
      }

      const res = await fetch(fetchUrl);
      if (!res.ok) throw new Error(`Failed to load: ${res.status}`);

      const data = await res.json();
      setJobs((prev) => [...prev, ...data.results]);
      setNextPageUrl(data.next);
    } catch (err) {
      setError('Failed to load more jobs. Please try again.');
      console.error('Load more error:', err);
    } finally {
      setLoading(false);
    }
  }, [nextPageUrl, loading, jobs.length, filterParams]);

  const hasMore = nextPageUrl !== null;

  return (
    <div>
      {/* Job count summary */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Showing {jobs.length} of {totalCount.toLocaleString('en-IN')} jobs
      </p>

      {/* Job cards grid */}
      <div className="grid gap-3">
        {jobs.map((job, i) => (
          <JobCard key={job.id} job={job} index={i} />
        ))}
      </div>

      {/* Load More button */}
      {hasMore && (
        <div className="mt-8 flex flex-col items-center gap-3">
          {/* Progress indicator */}
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {jobs.length} of {totalCount.toLocaleString('en-IN')} loaded
          </p>

          {/* Progress bar */}
          <div className="w-48 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((jobs.length / totalCount) * 100, 100)}%` }}
            />
          </div>

          <button
            onClick={loadMore}
            disabled={loading}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 active:scale-[0.97]"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Load More Jobs
              </>
            )}
          </button>

          {error && (
            <p className="text-sm text-red-500 dark:text-red-400 font-medium">{error}</p>
          )}
        </div>
      )}

      {/* All loaded message */}
      {!hasMore && jobs.length > 0 && jobs.length >= 20 && (
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">
            All {totalCount.toLocaleString('en-IN')} jobs loaded
          </p>
        </div>
      )}
    </div>
  );
}
