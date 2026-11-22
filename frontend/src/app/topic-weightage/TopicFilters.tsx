'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { twTr } from './i18n';
import { BASE_PATH, type FilterListing, type FilterValues, TREND_VALUES } from './types';

interface Props {
  filters: FilterListing | null;
  values: FilterValues;
}

const CONTROL_CLASS =
  'w-full min-h-[44px] rounded-xl border-2 border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white';

const LABEL_CLASS = 'mb-1 block text-xs font-bold uppercase tracking-wide text-gray-600 dark:text-gray-400';

function hrefFor(values: FilterValues): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(values)) {
    if (value) params.set(key, value);
  }
  const qs = params.toString();
  return qs ? `${BASE_PATH}?${qs}` : BASE_PATH;
}

/** Filter controls. Every change is a URL change; the API does the filtering. */
export function TopicFilters({ filters, values }: Props) {
  const { lang } = useLanguage();
  const router = useRouter();
  const go = (next: FilterValues) => router.push(hrefFor(next), { scroll: false });
  const isActive = Object.values(values).some(Boolean);

  const trendLabels: Record<string, string> = {
    high: twTr('tw.filter.hasHigh', lang),
    medium: twTr('tw.filter.hasMedium', lang),
    low: twTr('tw.filter.hasLow', lang),
  };

  return (
    <div className="space-y-4">
      <form
        key={values.q}
        role="search"
        className="flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          go({ ...values, q: String(data.get('q') ?? '').trim().slice(0, 100) });
        }}
      >
        <label htmlFor="tw-q" className="sr-only">
          {twTr('tw.search.label', lang)}
        </label>
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            id="tw-q"
            name="q"
            type="search"
            defaultValue={values.q}
            placeholder={twTr('tw.search.placeholder', lang)}
            className={`${CONTROL_CLASS} pl-10`}
          />
        </div>
        <button
          type="submit"
          className="min-h-[44px] shrink-0 rounded-xl bg-indigo-600 px-4 text-sm font-bold text-white transition-colors hover:bg-indigo-700 active:scale-[0.98]"
        >
          {twTr('tw.search.button', lang)}
        </button>
      </form>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <label className="block min-w-0">
          <span className={LABEL_CLASS}>{twTr('tw.filter.category', lang)}</span>
          <select className={CONTROL_CLASS} value={values.category} onChange={(e) => go({ ...values, category: e.target.value })}>
            <option value="">{twTr('tw.filter.all', lang)}</option>
            {(filters?.categories ?? []).map((option) => (
              <option key={option.value} value={option.value}>
                {`${option.label} (${option.count})`}
              </option>
            ))}
          </select>
        </label>

        <label className="block min-w-0">
          <span className={LABEL_CLASS}>{twTr('tw.filter.level', lang)}</span>
          <select className={CONTROL_CLASS} value={values.level} onChange={(e) => go({ ...values, level: e.target.value })}>
            <option value="">{twTr('tw.filter.all', lang)}</option>
            {(filters?.levels ?? []).map((option) => (
              <option key={option.value} value={option.value}>
                {`${option.label} (${option.count})`}
              </option>
            ))}
          </select>
        </label>

        <label className="block min-w-0">
          <span className={LABEL_CLASS}>{twTr('tw.filter.state', lang)}</span>
          <select className={CONTROL_CLASS} value={values.state} onChange={(e) => go({ ...values, state: e.target.value })}>
            <option value="">{twTr('tw.filter.all', lang)}</option>
            {(filters?.states ?? []).map((option) => (
              <option key={option.value} value={option.value}>
                {`${option.label} (${option.count})`}
              </option>
            ))}
          </select>
        </label>

        <label className="block min-w-0">
          <span className={LABEL_CLASS}>{twTr('tw.filter.trend', lang)}</span>
          <select className={CONTROL_CLASS} value={values.trend} onChange={(e) => go({ ...values, trend: e.target.value })}>
            <option value="">{twTr('tw.filter.any', lang)}</option>
            {TREND_VALUES.map((trend) => (
              <option key={trend} value={trend}>
                {trendLabels[trend]}
              </option>
            ))}
          </select>
        </label>

        <label className="block min-w-0">
          <span className={LABEL_CLASS}>{twTr('tw.filter.sort', lang)}</span>
          <select className={CONTROL_CLASS} value={values.sort || 'name'} onChange={(e) => go({ ...values, sort: e.target.value })}>
            <option value="name">{twTr('tw.sort.name', lang)}</option>
            <option value="questions">{twTr('tw.sort.questions', lang)}</option>
          </select>
        </label>
      </div>

      {isActive && (
        <div>
          <Link
            href={BASE_PATH}
            scroll={false}
            className="inline-flex min-h-[44px] items-center rounded-xl px-3 text-sm font-bold text-indigo-700 underline-offset-4 hover:underline dark:text-indigo-300"
          >
            {twTr('tw.reset', lang)}
          </Link>
        </div>
      )}
    </div>
  );
}
