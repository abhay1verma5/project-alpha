'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, AlertCircle } from 'lucide-react';
import { LEVEL_LABELS, type ExamPattern } from '@/lib/exam-patterns';
import { cn } from '@/lib/utils';

const GROUPS: { label: string; test: (p: ExamPattern) => boolean }[] = [
  { label: 'All', test: () => true },
  { label: 'SSC', test: (p) => p.key.startsWith('ssc_') || p.key === 'delhi_police' },
  { label: 'UPSC & Defence', test: (p) => ['upsc_prelims', 'upsc_mains', 'nda', 'cds', 'capf', 'afcat', 'ese'].includes(p.key) },
  { label: 'Railway', test: (p) => p.key.startsWith('rrb_') || p.key === 'rpf' },
  { label: 'Banking & Insurance', test: (p) => /^(ibps|sbi|rbi|nabard|sebi|lic|niacl|uiic|epfo|fci)/.test(p.key) },
  { label: 'Teaching (TET / PGT / TGT)', test: (p) => /tet$|^ctet|^ugc_net|^kvs|^dsssb|^supertet/.test(p.key) },
  { label: 'Police & SI', test: (p) => /police|_si$/.test(p.key) },
  { label: 'State PSC', test: (p) => /psc$/.test(p.key) },
  { label: 'Patwari / Lekhpal / Group C', test: (p) => /lekhpal|patwari|vdo|ro_aro|cdpo|vyapam|ldc|jssc|osssc|wbssc|hssc|icar/.test(p.key) },
  { label: 'JEE / NEET / GATE', test: (p) => /^(jee|neet|gate|isro|aiims|jipmer)/.test(p.key) },
  { label: 'CAT / CLAT / CUET', test: (p) => ['cat', 'xat', 'mat', 'clat', 'ailet', 'cuet'].includes(p.key) },
  { label: 'Nursing & Pharmacy', test: (p) => /^(gnm|anm|bsc_nursing|bpharm|dpharm|dmlt)/.test(p.key) },
  { label: 'School boards', test: (p) => p.level === 'School' },
];

const LEVELS = Object.keys(LEVEL_LABELS) as ExamPattern['level'][];

export function ExamPatternIndex({ patterns }: { patterns: ExamPattern[] }) {
  const [q, setQ] = useState('');
  const [group, setGroup] = useState('All');
  const [level, setLevel] = useState<ExamPattern['level'] | 'any'>('any');
  const [negative, setNegative] = useState<'any' | 'none' | 'yes'>('any');

  const rows = useMemo(() => {
    const test = GROUPS.find((g) => g.label === group)?.test ?? (() => true);
    const needle = q.trim().toLowerCase();
    return patterns.filter((p) => {
      if (!test(p)) return false;
      if (level !== 'any' && p.level !== level) return false;
      if (negative !== 'any') {
        const hasNeg = p.stages.some((s) => s.negative && !/^none/i.test(s.negative) && s.negative !== '—');
        if (negative === 'none' && hasNeg) return false;
        if (negative === 'yes' && !hasNeg) return false;
      }
      if (needle && !`${p.name} ${p.body} ${p.key}`.toLowerCase().includes(needle)) return false;
      return true;
    });
  }, [patterns, q, group, level, negative]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <label className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search exam (e.g. CGL, Patwari, TGT, NEET)"
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm"
          />
        </label>
        <select value={level} onChange={(e) => setLevel(e.target.value as typeof level)} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm px-3 py-2.5">
          <option value="any">Any qualification</option>
          {LEVELS.map((l) => <option key={l} value={l}>{LEVEL_LABELS[l]}</option>)}
        </select>
        <select value={negative} onChange={(e) => setNegative(e.target.value as typeof negative)} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm px-3 py-2.5">
          <option value="any">Negative marking: any</option>
          <option value="none">No negative marking</option>
          <option value="yes">Has negative marking</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {GROUPS.map((g) => (
          <button
            key={g.label}
            onClick={() => setGroup(g.label)}
            className={cn(
              'text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors',
              group === g.label
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-400',
            )}
          >
            {g.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-500 mb-3">{rows.length} exams</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {rows.map((p) => {
          const first = p.stages[0];
          const totalQ = first?.sections.reduce((s, x) => s + x.questions, 0) ?? 0;
          const totalM = first?.sections.reduce((s, x) => s + x.marks, 0) ?? 0;
          return (
            <Link
              key={p.key}
              href={`/exam-pattern/${p.key}`}
              className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:border-blue-400 transition-colors"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">{LEVEL_LABELS[p.level]}</span>
                {p.approx && (
                  <span className="text-[10px] text-amber-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> re-check</span>
                )}
              </div>
              <h2 className="font-bold text-gray-900 dark:text-white">{p.name}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">{p.body}</p>
              {first && (
                <p className="text-xs text-gray-600 dark:text-gray-300 mt-2">
                  {first.name}: {totalQ ? `${totalQ} Q · ` : ''}{totalM ? `${totalM} marks · ` : ''}{first.duration} · {first.negative === '—' ? 'no negative' : `negative ${first.negative}`}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
