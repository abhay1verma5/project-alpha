'use client';

import { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';

const YEARS = [2021, 2022, 2023, 2024, 2025];

interface ExamData {
  key: string;
  nameEn: string;
  nameHi: string;
  vacancies: number[];
  color: string;
  barColor: string;
}

const EXAMS: ExamData[] = [
  {
    key: 'ssc',
    nameEn: 'SSC',
    nameHi: 'एसएससी',
    vacancies: [25000, 28000, 32000, 35000, 38000],
    color: 'text-emerald-600 dark:text-emerald-400',
    barColor: 'bg-emerald-500',
  },
  {
    key: 'railway',
    nameEn: 'Railway',
    nameHi: 'रेलवे',
    vacancies: [35000, 40000, 45000, 50000, 55000],
    color: 'text-blue-600 dark:text-blue-400',
    barColor: 'bg-blue-500',
  },
  {
    key: 'banking',
    nameEn: 'Banking',
    nameHi: 'बैंकिंग',
    vacancies: [15000, 18000, 20000, 22000, 25000],
    color: 'text-amber-600 dark:text-amber-400',
    barColor: 'bg-amber-500',
  },
  {
    key: 'upsc',
    nameEn: 'UPSC',
    nameHi: 'यूपीएससी',
    vacancies: [800, 850, 900, 950, 1000],
    color: 'text-purple-600 dark:text-purple-400',
    barColor: 'bg-purple-500',
  },
  {
    key: 'defence',
    nameEn: 'Defence',
    nameHi: 'रक्षा',
    vacancies: [45000, 50000, 55000, 60000, 65000],
    color: 'text-red-600 dark:text-red-400',
    barColor: 'bg-red-500',
  },
  {
    key: 'state_psc',
    nameEn: 'State PSC',
    nameHi: 'राज्य पीएससी',
    vacancies: [20000, 22000, 25000, 28000, 30000],
    color: 'text-indigo-600 dark:text-indigo-400',
    barColor: 'bg-indigo-500',
  },
];

const YEAR_BAR_COLORS = [
  'bg-slate-400',
  'bg-sky-400',
  'bg-teal-400',
  'bg-violet-400',
  'bg-rose-400',
];

function formatVacancy(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
  }
  return num.toLocaleString('en-IN');
}

function growthPercent(prev: number, curr: number): number {
  return Math.round(((curr - prev) / prev) * 100);
}

export function VacancyTrendsClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';

  const [selectedExam, setSelectedExam] = useState<string>('ssc');
  const exam = EXAMS.find(e => e.key === selectedExam)!;

  const maxVacancy = Math.max(...exam.vacancies);
  const overallGrowth = growthPercent(exam.vacancies[0], exam.vacancies[exam.vacancies.length - 1]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {hi ? 'वैकेंसी ट्रेंड्स' : 'Vacancy Trends'}
          </h1>
          <p className="text-sm text-gray-500">
            {hi ? 'सरकारी नौकरी भर्ती के आंकड़े (2021–2025)' : 'Government job vacancy statistics (2021–2025)'}
          </p>
        </div>
      </div>

      {/* Exam Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {EXAMS.map(e => (
          <button
            key={e.key}
            onClick={() => setSelectedExam(e.key)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
              selectedExam === e.key
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            )}
          >
            {hi ? e.nameHi : e.nameEn}
          </button>
        ))}
      </div>

      {/* Summary Card */}
      <div className="mb-6 p-4 bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              {hi ? 'कुल वृद्धि (2021–2025)' : 'Overall Growth (2021–2025)'}
            </p>
            <p className={cn('text-3xl font-extrabold mt-1', exam.color)}>
              {overallGrowth > 0 ? '+' : ''}{overallGrowth}%
            </p>
          </div>
          <div className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center',
            overallGrowth >= 0
              ? 'bg-green-100 dark:bg-green-900/20'
              : 'bg-red-100 dark:bg-red-900/20'
          )}>
            {overallGrowth >= 0
              ? <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              : <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
          <span>{formatVacancy(exam.vacancies[0])} (2021)</span>
          <span className="text-gray-300 dark:text-gray-600">&rarr;</span>
          <span className="font-bold text-gray-700 dark:text-gray-300">
            {formatVacancy(exam.vacancies[exam.vacancies.length - 1])} (2025)
          </span>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
          {hi ? `${exam.nameHi} — वार्षिक रिक्तियां` : `${exam.nameEn} — Yearly Vacancies`}
        </p>
        <div className="space-y-3">
          {YEARS.map((year, i) => {
            const vacancy = exam.vacancies[i];
            const percentage = (vacancy / maxVacancy) * 100;
            const yoyGrowth = i > 0 ? growthPercent(exam.vacancies[i - 1], vacancy) : null;

            return (
              <div key={year}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300 w-12">
                    {year}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                      {vacancy.toLocaleString('en-IN')}
                    </span>
                    {yoyGrowth !== null && (
                      <span className={cn(
                        'text-[10px] font-bold px-1.5 py-0.5 rounded',
                        yoyGrowth >= 0
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                      )}>
                        {yoyGrowth > 0 ? '+' : ''}{yoyGrowth}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full h-7 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-lg transition-all duration-500 ease-out flex items-center justify-end pr-2',
                      YEAR_BAR_COLORS[i]
                    )}
                    style={{ width: `${Math.max(percentage, 8)}%` }}
                  >
                    <span className="text-[10px] font-bold text-white drop-shadow-sm">
                      {formatVacancy(vacancy)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
          {YEARS.map((year, i) => (
            <div key={year} className="flex items-center gap-1.5">
              <div className={cn('w-3 h-3 rounded-sm', YEAR_BAR_COLORS[i])} />
              <span className="text-[10px] font-bold text-gray-500">{year}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Year over Year Table */}
      <div className="p-4 bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
          {hi ? 'साल-दर-साल तुलना' : 'Year-over-Year Comparison'}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <th className="pb-2 pr-3">{hi ? 'वर्ष' : 'Year'}</th>
                <th className="pb-2 pr-3 text-right">{hi ? 'रिक्तियां' : 'Vacancies'}</th>
                <th className="pb-2 text-right">{hi ? 'वृद्धि' : 'Growth'}</th>
              </tr>
            </thead>
            <tbody>
              {YEARS.map((year, i) => {
                const vacancy = exam.vacancies[i];
                const yoyGrowth = i > 0 ? growthPercent(exam.vacancies[i - 1], vacancy) : null;
                return (
                  <tr key={year} className="border-t border-gray-50 dark:border-gray-800">
                    <td className="py-2 pr-3 font-bold text-gray-700 dark:text-gray-300">{year}</td>
                    <td className="py-2 pr-3 text-right font-extrabold text-gray-900 dark:text-white">
                      {vacancy.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2 text-right">
                      {yoyGrowth !== null ? (
                        <span className={cn(
                          'text-xs font-bold',
                          yoyGrowth >= 0
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        )}>
                          {yoyGrowth > 0 ? '+' : ''}{yoyGrowth}%
                        </span>
                      ) : (
                        <span className="text-xs text-gray-300 dark:text-gray-600">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* All Exams Overview */}
      <div className="mt-6 p-4 bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
          {hi ? 'सभी परीक्षाओं का अवलोकन (2025)' : 'All Exams Overview (2025)'}
        </p>
        <div className="space-y-2.5">
          {EXAMS.map(e => {
            const latest = e.vacancies[e.vacancies.length - 1];
            const growth = growthPercent(e.vacancies[0], latest);
            const allMax = Math.max(...EXAMS.map(ex => ex.vacancies[ex.vacancies.length - 1]));
            const pct = (latest / allMax) * 100;
            return (
              <button
                key={e.key}
                onClick={() => setSelectedExam(e.key)}
                className={cn(
                  'w-full text-left p-3 rounded-xl transition-all',
                  selectedExam === e.key
                    ? 'bg-blue-50 dark:bg-blue-900/10 ring-2 ring-blue-400'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                )}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {hi ? e.nameHi : e.nameEn}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                      {formatVacancy(latest)}
                    </span>
                    <span className={cn(
                      'text-[10px] font-bold',
                      growth >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    )}>
                      {growth > 0 ? '+' : ''}{growth}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all duration-500', e.barColor)}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
