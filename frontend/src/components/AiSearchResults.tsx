'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Loader2, AlertCircle, Filter } from 'lucide-react';
import { JobCard } from './JobCard';
import { type Job } from '@/lib/api';
import { CATEGORY_LABELS, STATE_LABELS } from '@/lib/utils';

interface AiSearchResponse {
  results: Job[];
  summary: string;
  filters: {
    category?: string | null;
    state?: string | null;
    qualification?: string | null;
    content_type?: string | null;
  };
  ai_powered: boolean;
}

export function AiSearchResults({ query, useAi }: { query: string; useAi: boolean }) {
  const [data, setData] = useState<AiSearchResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!query || query.length < 2) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    const controller = new AbortController();

    fetch('/api/ai-search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setError(json.error);
        } else {
          setData(json);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError('Search failed. Please try again.');
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [query, useAi]);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          <span className="text-blue-800 dark:text-blue-200 font-bold">
            AI is searching for: &ldquo;{query}&rdquo;
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800 dark:text-red-200 font-semibold">{error}</span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const activeFilters = Object.entries(data.filters || {}).filter(([, v]) => v);

  return (
    <div>
      {/* AI Summary */}
      {data.summary && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-base font-bold text-gray-900 dark:text-white">{data.summary}</p>
              {data.ai_powered && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Powered by AI — results filtered automatically</p>
              )}
            </div>
          </div>

          {/* Applied filters */}
          {activeFilters.length > 0 && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              {activeFilters.map(([key, value]) => (
                <span key={key} className="px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                  {key === 'category' ? CATEGORY_LABELS[value as string] || value :
                   key === 'state' ? STATE_LABELS[value as string] || value :
                   value as string}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Results count */}
      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
        {data.results.length} {data.results.length === 1 ? 'result' : 'results'} found
      </p>

      {/* Job cards */}
      {data.results.length > 0 ? (
        <div className="grid gap-3">
          {data.results.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">No results found</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Try different keywords or search for &ldquo;SSC&rdquo;, &ldquo;Railway&rdquo;, &ldquo;10th pass job&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
