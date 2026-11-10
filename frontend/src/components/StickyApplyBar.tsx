'use client';

import { ExternalLink } from 'lucide-react';

interface StickyApplyBarProps {
  applyLink: string;
  label: string;
}

export function StickyApplyBar({ applyLink, label }: StickyApplyBarProps) {
  return (
    <div className="md:hidden fixed bottom-[calc(4rem+env(safe-area-inset-bottom,0px))] left-0 right-0 z-40 px-4 pb-2 pt-2 bg-gradient-to-t from-white via-white dark:from-gray-950 dark:via-gray-950 to-transparent">
      <a
        href={applyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/30 active:scale-[0.98] text-sm"
      >
        <ExternalLink className="w-4 h-4" /> {label}
      </a>
    </div>
  );
}
