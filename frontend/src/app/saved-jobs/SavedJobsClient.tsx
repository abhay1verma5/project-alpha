'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Trash2, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { EmptyState } from '@/components/EmptyState';

interface SavedJob {
  slug: string;
  title: string;
  title_hi?: string;
  organization?: string;
  category?: string;
  savedAt: string;
}

const SAVED_KEY = 'sarkari_saved_jobs';

function getSavedJobs(): SavedJob[] {
  try {
    const data = localStorage.getItem(SAVED_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
}

export function SavedJobsClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';
  const [jobs, setJobs] = useState<SavedJob[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setJobs(getSavedJobs());
    setMounted(true);
  }, []);

  const removeJob = (slug: string) => {
    const updated = jobs.filter(j => j.slug !== slug);
    setJobs(updated);
    try { localStorage.setItem(SAVED_KEY, JSON.stringify(updated)); } catch {}
  };

  const clearAll = () => {
    setJobs([]);
    try { localStorage.removeItem(SAVED_KEY); } catch {}
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#ff6f00] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            {hi ? 'सेव्ड नौकरियाँ' : 'Saved Jobs'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {jobs.length} {hi ? 'नौकरियाँ सेव की गई' : 'jobs saved'}
          </p>
        </div>
        {jobs.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs font-semibold text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            {hi ? 'सभी हटाएँ' : 'Clear All'}
          </button>
        )}
      </div>

      {jobs.length === 0 ? (
        <EmptyState
          icon={Heart}
          title={hi ? 'कोई सेव्ड नौकरी नहीं' : 'No Saved Jobs'}
          description={
            hi
              ? 'नौकरी कार्ड पर हार्ट आइकन दबाकर नौकरियाँ सेव करें।'
              : 'Tap the heart icon on job cards to save jobs here.'
          }
          actionLabel={hi ? 'नौकरियाँ देखें' : 'Browse Jobs'}
          actionHref="/jobs"
        />
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div key={job.slug} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <Link href={`/jobs/${job.slug}`} className="font-bold text-sm text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
                  {hi && job.title_hi ? job.title_hi : job.title}
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  {job.organization && <span className="text-xs text-gray-500">{job.organization}</span>}
                  {job.category && <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-400">{job.category}</span>}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {hi ? 'सेव किया' : 'Saved'}: {new Date(job.savedAt).toLocaleDateString('en-IN')}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href={`/jobs/${job.slug}`} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-blue-600 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => removeJob(job.slug)}
                  className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
