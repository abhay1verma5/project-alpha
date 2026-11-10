'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ClipboardList, ArrowRight } from 'lucide-react';

const STORAGE_KEY = 'sarkari_apply_tracker';

/**
 * A small banner that shows the number of applications the user is tracking
 * (read from localStorage). Displayed near the top of the homepage.
 *
 * - If the user has tracked applications: shows the count.
 * - If none: shows a CTA to start tracking.
 * - Renders nothing on the server (client-only via useEffect).
 */
export function ApplyTrackerBanner() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setCount(Array.isArray(parsed) ? parsed.length : 0);
      } else {
        setCount(0);
      }
    } catch {
      setCount(0);
    }
  }, []);

  // Don't render anything until we've read localStorage (avoids hydration flash)
  if (count === null) return null;

  return (
    <Link
      href="/apply-tracker"
      className="group block"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20 border border-violet-200 dark:border-violet-800/50 hover:border-violet-400 dark:hover:border-violet-600 transition-colors">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
            <ClipboardList className="w-4 h-4 text-white" />
          </div>
          {count > 0 ? (
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
              <span className="text-base">&#128202;</span>{' '}
              You&apos;re tracking{' '}
              <span className="font-extrabold text-violet-700 dark:text-violet-400">
                {count}
              </span>{' '}
              application{count !== 1 ? 's' : ''}
            </p>
          ) : (
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate">
              Start tracking your applications
            </p>
          )}
        </div>
        <ArrowRight className="w-4 h-4 flex-shrink-0 text-violet-500 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
}
