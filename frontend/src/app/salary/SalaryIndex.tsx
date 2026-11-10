'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, IndianRupee } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';
import { SALARY_DATA, SALARY_CATEGORIES } from './salary-data';

function fmtSalary(n: number) {
  if (n >= 100000) return `${(n / 100000).toFixed(1)}L`;
  return `${(n / 1000).toFixed(0)}K`;
}

export function SalaryIndex() {
  const { lang, t } = useLanguage();
  const isHi = lang === 'hi';
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string>('all');

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return SALARY_DATA.filter((p) => {
      if (cat !== 'all' && p.category !== cat) return false;
      if (needle && !`${p.name} ${p.name_hi} ${p.exam}`.toLowerCase().includes(needle)) return false;
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
          placeholder={isHi ? 'पद या परीक्षा खोजें...' : 'Search post or exam...'}
          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
        />
      </label>

      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {SALARY_CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            className={cn(
              'text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors',
              cat === c.key
                ? 'bg-amber-600 text-white border-amber-600'
                : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-amber-400',
            )}
          >
            {isHi ? c.hi : c.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-500 mb-3">{filtered.length} {t('posts', 'पद')}</p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            href={`/salary/${p.slug}`}
            className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:border-amber-400 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <IndianRupee className="w-4 h-4 text-amber-500" />
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase">
                {p.category}
              </span>
            </div>
            <h2 className="font-bold text-gray-900 dark:text-white">{isHi ? p.name_hi : p.name}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">{p.exam} · {p.payLevel}</p>

            <div className="mt-3">
              <p className="text-[10px] text-gray-400 font-semibold">{t('In-hand Salary', 'इन-हैंड सैलरी')}</p>
              <p className="text-lg font-extrabold text-amber-600 dark:text-amber-400">
                {fmtSalary(p.inHandSalary.other)} – {fmtSalary(p.inHandSalary.metro)}
              </p>
              <p className="text-[10px] text-gray-400">{t('per month', 'प्रति माह')}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
