'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  queryParams?: Record<string, string>;
}

export function Pagination({ currentPage, totalPages, basePath, queryParams = {} }: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const params = new URLSearchParams({ ...queryParams, page: String(page) });
    return `${basePath}?${params.toString()}`;
  };

  const pages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-10">
      {currentPage > 1 && (
        <Link
          href={buildHref(currentPage - 1)}
          className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      )}

      {pages.map((page, idx) =>
        page === '...' ? (
          <span key={`dots-${idx}`} className="px-2 text-gray-400 dark:text-gray-600">...</span>
        ) : (
          <Link
            key={page}
            href={buildHref(page)}
            className={cn(
              'w-10 h-10 flex items-center justify-center rounded-xl text-sm font-semibold transition-all',
              page === currentPage
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
            )}
          >
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link
          href={buildHref(currentPage + 1)}
          className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      )}
    </nav>
  );
}
