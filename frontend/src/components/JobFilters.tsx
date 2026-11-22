'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X, SlidersHorizontal, Search } from 'lucide-react';
import { CATEGORY_LABELS, STATE_LABELS, QUALIFICATION_GROUPS, SORT_OPTIONS, cn } from '@/lib/utils';

const CONTENT_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'job', label: 'Jobs' },
  { value: 'result', label: 'Results' },
  { value: 'admit_card', label: 'Admit Cards' },
  { value: 'answer_key', label: 'Answer Keys' },
  { value: 'admission', label: 'Admissions' },
  { value: 'syllabus', label: 'Syllabus' },
  { value: 'exam_date', label: 'Exam Dates' },
  { value: 'notice', label: 'Notices' },
];

const SEARCH_DEBOUNCE_MS = 400;

/** URL for the current filters with `search` set (or removed when empty). Page resets to 1. */
function buildSearchUrl(basePath: string, currentParams: string, term: string): string {
  const params = new URLSearchParams(currentParams);
  if (term) params.set('search', term); else params.delete('search');
  params.delete('page');
  return `${basePath}?${params.toString()}`;
}

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
  const activeSearch = searchParams.get('search') || '';

  // Free-text search box. Typing updates local state; the URL (and the backend query) updates after a pause.
  const [searchText, setSearchText] = useState(activeSearch);
  // Last search value this component wrote to the URL, so a URL change we caused does not overwrite what the user is typing.
  const lastSearchRef = useRef(activeSearch);

  // Keep the box in sync when the search is cleared or changed elsewhere (chip, Clear all, back button).
  useEffect(() => {
    if (activeSearch !== lastSearchRef.current) {
      lastSearchRef.current = activeSearch;
      setSearchText(activeSearch);
    }
  }, [activeSearch]);

  useEffect(() => {
    const term = searchText.trim();
    if (term === activeSearch || term === lastSearchRef.current) return;
    const timer = setTimeout(() => {
      lastSearchRef.current = term;
      router.push(buildSearchUrl(basePath, searchParams.toString(), term));
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [searchText, activeSearch, searchParams, basePath, router]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = searchText.trim();
    if (term === activeSearch) return;
    lastSearchRef.current = term;
    router.push(buildSearchUrl(basePath, searchParams.toString(), term));
  };

  const clearSearch = () => {
    setSearchText('');
    if (!activeSearch) return;
    lastSearchRef.current = '';
    router.push(buildSearchUrl(basePath, searchParams.toString(), ''));
  };

  const activeCount = [activeCategory, activeState, activeQualification, activeContentType, activeSearch].filter(Boolean).length;

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

  // "Jobs for me": a saved qualification + state, applied in one tap.
  const PROFILE_KEY = 'sa_my_profile';
  const [profile, setProfile] = useState<{ qualification?: string; state?: string } | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (raw) setProfile(JSON.parse(raw));
    } catch {}
  }, []);
  const saveProfile = () => {
    const p = { qualification: activeQualification || undefined, state: activeState || undefined };
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch {}
    setProfile(p);
  };
  const applyProfile = () => {
    if (!profile) return;
    const params = new URLSearchParams(searchParams.toString());
    if (profile.qualification) params.set('qualification', profile.qualification); else params.delete('qualification');
    if (profile.state) params.set('state', profile.state); else params.delete('state');
    params.delete('page');
    router.push(`${basePath}?${params.toString()}`);
  };
  const profileLabel = profile
    ? [profile.qualification && (QUALIFICATION_GROUPS.flatMap((g) => g.options).find((o) => o.value === profile.qualification)?.label || profile.qualification),
       profile.state && (STATE_LABELS[profile.state] || profile.state)].filter(Boolean).join(' · ')
    : '';
  const profileActive = !!profile && (profile.qualification || '') === activeQualification && (profile.state || '') === activeState;

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

      {/* Search box — the backend matches the text; this only writes ?search= */}
      <form role="search" onSubmit={submitSearch} className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
        <input
          type="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search jobs, exams, organizations..."
          aria-label="Search"
          enterKeyHint="search"
          autoComplete="off"
          className="w-full min-h-11 pl-10 pr-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-900 dark:text-white placeholder:font-normal placeholder:text-gray-500 dark:placeholder:text-gray-400 border-2 border-transparent focus:border-blue-500 focus:outline-none"
        />
      </form>

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

      {/* Dropdowns row - always visible; 2 per row on phones to keep jobs above the fold */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
        {/* State */}
        <select
          value={activeState}
          onChange={(e) => applyFilter('state', e.target.value)}
          className="w-full min-w-0 px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-900 dark:text-white border-2 border-transparent focus:border-blue-500 focus:outline-none"
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
          className="w-full min-w-0 px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-900 dark:text-white border-2 border-transparent focus:border-blue-500 focus:outline-none"
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
            className="w-full min-w-0 px-3 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-900 dark:text-white border-2 border-transparent focus:border-blue-500 focus:outline-none"
          >
            {CONTENT_TYPES.map((ct) => (
              <option key={ct.value} value={ct.value}>{ct.label}</option>
            ))}
          </select>
        )}

      </div>

      {/* Jobs for me */}
      {profile && profileLabel && !profileActive && (
        <button
          onClick={applyProfile}
          className="w-full text-left rounded-xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2.5 text-sm font-bold text-emerald-800 dark:text-emerald-200"
        >
          ⭐ Jobs for me / मेरे लिए नौकरियां — {profileLabel}
        </button>
      )}
      {(activeQualification || activeState) && !profileActive && (
        <button onClick={saveProfile} className="text-sm font-semibold text-blue-700 dark:text-blue-300 underline">
          Save as my profile / इसे मेरी प्रोफ़ाइल बनाएं
        </button>
      )}
      {profileActive && (
        <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">⭐ Showing jobs for your profile</p>
      )}

      {/* Active filter tags */}
      {activeCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeSearch && (
            <span className="inline-flex items-center gap-1 pl-3 pr-1 py-1.5 rounded-full bg-gray-200 dark:bg-gray-700 text-sm font-bold text-gray-800 dark:text-gray-200 max-w-full">
              <span className="break-words min-w-0">&ldquo;{activeSearch}&rdquo;</span>
              <button type="button" onClick={clearSearch} aria-label="Remove search" className="-my-3 -mr-2 h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          {activeCategory && (
            <span className="inline-flex items-center gap-1 pl-3 pr-1 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900 text-sm font-bold text-blue-800 dark:text-blue-200 max-w-full">
              <span className="break-words min-w-0">{CATEGORY_LABELS[activeCategory]}</span>
              <button type="button" onClick={() => applyFilter('category', '')} aria-label={`Remove category ${CATEGORY_LABELS[activeCategory] || activeCategory}`} className="-my-3 -mr-2 h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          {activeState && (
            <span className="inline-flex items-center gap-1 pl-3 pr-1 py-1.5 rounded-full bg-rose-100 dark:bg-rose-900 text-sm font-bold text-rose-800 dark:text-rose-200 max-w-full">
              <span className="break-words min-w-0">{STATE_LABELS[activeState]}</span>
              <button type="button" onClick={() => applyFilter('state', '')} aria-label={`Remove state ${STATE_LABELS[activeState] || activeState}`} className="-my-3 -mr-2 h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          {activeQualification && (
            <span className="inline-flex items-center gap-1 pl-3 pr-1 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900 text-sm font-bold text-purple-800 dark:text-purple-200 max-w-full">
              <span className="break-words min-w-0">{activeQualification}</span>
              <button type="button" onClick={() => applyFilter('qualification', '')} aria-label={`Remove qualification ${activeQualification}`} className="-my-3 -mr-2 h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
          {activeContentType && (
            <span className="inline-flex items-center gap-1 pl-3 pr-1 py-1.5 rounded-full bg-teal-100 dark:bg-teal-900 text-sm font-bold text-teal-800 dark:text-teal-200 max-w-full">
              <span className="break-words min-w-0">{CONTENT_TYPES.find(ct => ct.value === activeContentType)?.label}</span>
              <button type="button" onClick={() => applyFilter('content_type', '')} aria-label={`Remove type ${CONTENT_TYPES.find(ct => ct.value === activeContentType)?.label || activeContentType}`} className="-my-3 -mr-2 h-10 w-10 flex-shrink-0 flex items-center justify-center rounded-full">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
