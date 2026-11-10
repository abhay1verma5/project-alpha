'use client';

import { useMemo, useState } from 'react';
import { TrendingUp, Search } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';
import { CUTOFF_DATA, CUTOFF_CATEGORIES, type ExamCutoff } from './cutoff-data';

export function CutoffTrackerClient() {
  const { lang, t } = useLanguage();
  const isHi = lang === 'hi';
  const [sel, setSel] = useState(0);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState<string>('all');

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return CUTOFF_DATA.filter((e) => {
      if (cat !== 'all' && e.category !== cat) return false;
      if (needle && !`${e.name} ${e.hi}`.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [q, cat]);

  const exam: ExamCutoff | undefined = filtered[sel] ?? filtered[0];

  // reset selection when filters change
  const safeIdx = exam ? filtered.indexOf(exam) : 0;
  if (safeIdx !== sel && filtered.length > 0) {
    // will re-render
  }

  const handleSelect = (i: number) => setSel(i);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {t('Cut-off Marks Tracker', 'कट-ऑफ मार्क्स ट्रैकर')}
          </h1>
          <p className="text-sm text-gray-500">
            {t(`${CUTOFF_DATA.length} exams · 5 years of data (2022-2026)`, `${CUTOFF_DATA.length} परीक्षाएं · 5 वर्षों का डेटा (2022-2026)`)}
          </p>
        </div>
      </div>

      {/* Search */}
      <label className="relative block mb-3">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setSel(0); }}
          placeholder={isHi ? 'परीक्षा खोजें...' : 'Search exam...'}
          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
        />
      </label>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {CUTOFF_CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => { setCat(c.key); setSel(0); }}
            className={cn(
              'text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors',
              cat === c.key
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-green-400',
            )}
          >
            {isHi ? c.hi : c.label}
          </button>
        ))}
      </div>

      {/* Exam tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filtered.map((e, i) => (
          <button
            key={e.slug}
            onClick={() => handleSelect(i)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
              sel === i
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
            )}
          >
            {isHi ? e.hi : e.name}
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-500">{t('No exams found', 'कोई परीक्षा नहीं मिली')}</p>
        )}
      </div>

      {exam && (
        <>
          {/* Table */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
            <div className="px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600">
              <h3 className="font-bold text-sm text-white">{isHi ? exam.hi : exam.name}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="px-3 py-2.5 text-left text-xs font-bold text-gray-700 dark:text-gray-300">{t('Year', 'वर्ष')}</th>
                    <th className="px-3 py-2.5 text-center text-xs font-bold text-gray-700 dark:text-gray-300">{t('Total', 'कुल')}</th>
                    <th className="px-3 py-2.5 text-center text-xs font-bold text-gray-700 dark:text-gray-300">Gen</th>
                    <th className="px-3 py-2.5 text-center text-xs font-bold text-gray-700 dark:text-gray-300">EWS</th>
                    <th className="px-3 py-2.5 text-center text-xs font-bold text-gray-700 dark:text-gray-300">OBC</th>
                    <th className="px-3 py-2.5 text-center text-xs font-bold text-gray-700 dark:text-gray-300">SC</th>
                    <th className="px-3 py-2.5 text-center text-xs font-bold text-gray-700 dark:text-gray-300">ST</th>
                    <th className="px-3 py-2.5 text-center text-xs font-bold text-gray-700 dark:text-gray-300">{t('Trend', 'ट्रेंड')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {exam.data.map((r, idx) => {
                    const prev = idx > 0 ? exam.data[idx - 1] : null;
                    const delta = prev ? r.gen - prev.gen : 0;
                    return (
                      <tr key={r.year}>
                        <td className="px-3 py-3 font-extrabold text-gray-900 dark:text-white">{r.year}</td>
                        <td className="px-3 py-3 text-center text-gray-500">{r.total}</td>
                        <td className="px-3 py-3 text-center font-bold text-green-700 dark:text-green-400">{r.gen}</td>
                        <td className="px-3 py-3 text-center font-bold text-teal-700 dark:text-teal-400">{r.ews}</td>
                        <td className="px-3 py-3 text-center font-bold text-blue-700 dark:text-blue-400">{r.obc}</td>
                        <td className="px-3 py-3 text-center font-bold text-purple-700 dark:text-purple-400">{r.sc}</td>
                        <td className="px-3 py-3 text-center font-bold text-orange-700 dark:text-orange-400">{r.st}</td>
                        <td className="px-3 py-3 text-center">
                          {prev ? (
                            <span className={cn('text-xs font-bold', delta > 0 ? 'text-red-500' : delta < 0 ? 'text-green-500' : 'text-gray-400')}>
                              {delta > 0 ? `↑${delta}` : delta < 0 ? `↓${Math.abs(delta)}` : '—'}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary cards with trend */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
            {(() => {
              const l = exam.data[exam.data.length - 1];
              const p = exam.data[exam.data.length - 2];
              return [
                { label: 'General', cur: l.gen, prev: p.gen, c: 'text-green-700 dark:text-green-400' },
                { label: 'EWS', cur: l.ews, prev: p.ews, c: 'text-teal-700 dark:text-teal-400' },
                { label: 'OBC', cur: l.obc, prev: p.obc, c: 'text-blue-700 dark:text-blue-400' },
                { label: 'SC', cur: l.sc, prev: p.sc, c: 'text-purple-700 dark:text-purple-400' },
                { label: 'ST', cur: l.st, prev: p.st, c: 'text-orange-700 dark:text-orange-400' },
              ].map((i) => {
                const delta = i.cur - i.prev;
                return (
                  <div key={i.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-3 text-center">
                    <p className="text-xs text-gray-500 font-semibold mb-1">{i.label}</p>
                    <p className={cn('text-xl font-extrabold', i.c)}>{i.cur}</p>
                    <p className={cn('text-xs font-bold', delta > 0 ? 'text-red-500' : delta < 0 ? 'text-green-500' : 'text-gray-400')}>
                      {delta > 0 ? `↑${delta}` : delta < 0 ? `↓${Math.abs(delta)}` : '—'}
                    </p>
                  </div>
                );
              });
            })()}
          </div>
        </>
      )}

      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 p-4">
        <p className="text-xs text-yellow-800 dark:text-yellow-300 font-medium">
          {t(
            'Note: Cut-off marks are approximate and based on publicly available data. Always verify from the official website.',
            'नोट: ये कट-ऑफ अंक अनुमानित हैं और सार्वजनिक रूप से उपलब्ध डेटा पर आधारित हैं। हमेशा आधिकारिक वेबसाइट से जाँच करें।',
          )}
        </p>
      </div>
    </div>
  );
}
