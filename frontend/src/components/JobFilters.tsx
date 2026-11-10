'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { X, SlidersHorizontal } from 'lucide-react';
import { CATEGORY_LABELS, STATE_LABELS, QUALIFICATION_GROUPS, SORT_OPTIONS, cn } from '@/lib/utils';

const CONTENT_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'job', label: 'Jobs' },
  { value: 'result', label: 'Results' },
  { value: 'admit_card', label: 'Admit Cards' },
  { value: 'answer_key', label: 'Answer Keys' },
  { value: 'admission', label: 'Admissions' },
  { value: 'syllabus', label: 'Syllabus' },
];

interface JobFiltersProps {
  basePath?: string;
  hideContentType?: boolean;
}

export function JobFilters({ basePath = '/jobs', hideContentType = false }: JobFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get('category') || '';
  const activeState = searchParams.get('state') || '';
  const activeQualification = searchParams.get('qualification') || '';
  const activeContentType = searchParams.get('content_type') || '';
  const activeSort = searchParams.get('ordering') || '-posted_date';

  const activeCount = [activeCategory, activeState, activeQualification, activeContentType].filter(Boolean).length;

  const applyFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page');
    router.push(`${basePath}?${params.toString()}`);
  };

  const clearAll = () => router.push(basePath);

  return (
    <div className="mb-8 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-gray-800 dark:text-gray-200" />
          <span className="text-base font-bold text-gray-900 dark:text-white">Filters</span>
          {activeCount > 0 && (
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {activeCount > 0 && (
            <button onClick={clearAll} className="text-sm font-semibold text-red-600 dark:text-red-400 flex items-center gap-1">
              <X className="w-4 h-4" /> Clear
            </button>
          )}
          {/* Sort */}
          <select
            value={activeSort}
            onChange={(e) => applyFilter('ordering', e.target.value)}
            className="text-sm font-semibold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Category chips - horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <button
          onClick={() => applyFilter('category', '')}
          className={cn(
            'flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-bold transition-all active:scale-[0.97]',
            !activeCategory
              ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          )}
        >
          All
        </button>
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => applyFilter('category', key)}
            className={cn(
              'flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-bold transition-all active:scale-[0.97]',
              activeCategory === key
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Dropdowns row - always visible */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* State */}
        <select
          value={activeState}
          onChange={(e) => applyFilter('state', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-900 dark:text-white border-2 border-transparent focus:border-blue-500 focus:outline-none"
        >
          <option value="">All States</option>
          {Object.entries(STATE_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>

        {/* Qualification - grouped */}
        <select
          value={activeQualification}
          onChange={(e) => applyFilter('qualification', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-900 dark:text-white border-2 border-transparent focus:border-blue-500 focus:outline-none"
        >
          <option value="">All Qualifications</option>
          {QUALIFICATION_GROUPS.map((group) => (
            <optgroup key={group.group} label={`── ${group.group} ──`}>
              {group.options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </optgroup>
          ))}
        </select>

        {/* Content Type */}
        {!hideContentType && (
          <select
            value={activeContentType}
            onChange={(e) => applyFilter('content_type', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-900 dark:text-white border-2 border-transparent focus:border-blue-500 focus:outline-none"
          >
            {CONTENT_TYPES.map((ct) => (
              <option key={ct.value} value={ct.value}>{ct.label}</option>
            ))}
          </select>
        )}

        {/* Sort (mobile - duplicate for easy access) */}
        <select
          value={activeSort}
          onChange={(e) => applyFilter('ordering', e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-900 dark:text-white border-2 border-transparent focus:border-blue-500 focus:outline-none sm:hidden lg:block"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Active filter tags */}
      {activeCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeCategory && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900 text-sm font-bold text-blue-800 dark:text-blue-200">
              {CATEGORY_LABELS[activeCategory]}
              <button onClick={() => applyFilter('category', '')}><X className="w-3.5 h-3.5" /></button>
            </span>
          )}
          {activeState && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900 text-sm font-bold text-rose-800 dark:text-rose-200">
              {STATE_LABELS[activeState]}
              <button onClick={() => applyFilter('state', '')}><X className="w-3.5 h-3.5" /></button>
            </span>
          )}
          {activeQualification && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900 text-sm font-bold text-purple-800 dark:text-purple-200">
              {activeQualification}
              <button onClick={() => applyFilter('qualification', '')}><X className="w-3.5 h-3.5" /></button>
            </span>
          )}
          {activeContentType && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-teal-100 dark:bg-teal-900 text-sm font-bold text-teal-800 dark:text-teal-200">
              {CONTENT_TYPES.find(ct => ct.value === activeContentType)?.label}
              <button onClick={() => applyFilter('content_type', '')}><X className="w-3.5 h-3.5" /></button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
