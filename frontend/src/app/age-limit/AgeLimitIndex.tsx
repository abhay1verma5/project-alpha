'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, Shield } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';
import { AGE_LIMIT_DATA, AGE_CATEGORIES } from './age-limit-data';

function ageColor(min: number, max: number) {
  const range = max - min;
  if (range >= 12) return 'text-green-600 dark:text-green-400';
  if (range >= 7) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
}

export function AgeLimitIndex() {
  const { lang, t } = useLanguage();
  const isHi = lang === 'hi';
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string>('all');

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return AGE_LIMIT_DATA.filter((e) => {
      if (cat !== 'all' && e.category !== cat) return false;
      if (needle && !`${e.name} ${e.name_hi} ${e.organization}`.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [q, cat]);

  return (
    <div>
      {/* Search */}
      <label className="relative block mb-3">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={isHi ? 'परीक्षा खोजें...' : 'Search exam...'}
          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
        />
      </label>

      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {AGE_CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            className={cn(
              'text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors',
              cat === c.key
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-400',
            )}
          >
            {isHi ? c.hi : c.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-500 mb-3">{filtered.length} {t('exams', 'परीक्षाएं')}</p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((e) => (
          <Link
            key={e.slug}
            href={`/age-limit/${e.slug}`}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:border-blue-400 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-blue-500" />
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase">
                {e.category}
              </span>
            </div>
            <h2 className="font-bold text-gray-900 dark:text-white">{isHi ? e.name_hi : e.name}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">{e.organization}</p>

            <div className="mt-3 flex items-center gap-4">
              <div>
                <p className="text-[10px] text-gray-400 font-semibold">{t('Age Range', 'आयु सीमा')}</p>
                <p className={cn('text-lg font-extrabold', ageColor(e.minAge, e.maxAge))}>
                  {e.maxAge >= 99 ? `${e.minAge}+` : `${e.minAge}-${e.maxAge}`}
                </p>
              </div>
              <div className="flex gap-2 text-[10px] font-bold">
                {e.relaxation.obc > 0 && <span className="px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">OBC +{e.relaxation.obc}</span>}
                {e.relaxation.sc_st > 0 && <span className="px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">SC/ST +{e.relaxation.sc_st}</span>}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{e.qualification}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
