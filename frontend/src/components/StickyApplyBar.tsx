'use client';

import { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

interface StickyApplyBarProps {
  applyLink: string;
  label: string;
}

export function StickyApplyBar({ applyLink, label }: StickyApplyBarProps) {
  // layout.tsx reads this attribute to add enough bottom padding so the page content is not hidden behind the bar.
  useEffect(() => {
    document.body.dataset.stickyApply = 'true';
    return () => {
      delete document.body.dataset.stickyApply;
    };
  }, []);

  return (
    <div className="md:hidden fixed bottom-[var(--bottom-nav-h)] left-0 right-0 z-40 px-4 pb-2 pt-2 bg-gradient-to-t from-white via-white dark:from-gray-950 dark:via-gray-950 to-transparent">
      <a
        href={applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full min-h-12 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/30 active:scale-[0.98] text-sm"
      >
        <ExternalLink className="w-4 h-4" /> {label}
      </a>
    </div>
  );
}
