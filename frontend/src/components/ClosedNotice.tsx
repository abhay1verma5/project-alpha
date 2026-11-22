import Link from 'next/link';
import { CATEGORY_LABELS } from '@/lib/utils';
import type { JobDetail } from '@/lib/api';

/**
 * Shown instead of a bare 404 when a listing has been deactivated (expired or
 * from a past year). The page is noindex (see generateMetadata) but keeps
 * visitors from old links and search results on the site.
 */
export function ClosedNotice({ job }: { job: JobDetail }) {
  const categoryLabel = CATEGORY_LABELS[job.category] || 'Government';
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      <p className="inline-block rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200 px-3 py-1 text-sm font-medium mb-4">
        Closed · बंद
      </p>
      <h1 className="text-2xl font-bold mb-3">{job.title}</h1>
      <p className="text-muted-foreground mb-8">
        This notice has closed and is no longer active.
        <br />
        यह सूचना अब सक्रिय नहीं है। नीचे नई सरकारी नौकरियां देखें।
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href={`/jobs?category=${encodeURIComponent(job.category)}`}
          className="rounded-xl bg-gov-saffron text-white px-5 py-3 font-semibold"
        >
          Latest {categoryLabel} jobs
        </Link>
        <Link href="/jobs" className="rounded-xl border border-border px-5 py-3 font-semibold">
          All latest jobs
        </Link>
      </div>
    </div>
  );
}
