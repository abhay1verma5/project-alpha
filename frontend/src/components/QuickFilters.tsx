'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Briefcase, FileCheck, CreditCard, Key, GraduationCap, MapPin, ChevronRight, Camera, Calculator, IndianRupee, BookOpen } from 'lucide-react';
import { cn, CATEGORY_LABELS, CATEGORY_ICONS, STATE_LABELS } from '@/lib/utils';
import { useLanguage } from './LanguageProvider';
import { tr } from '@/lib/translations';

const QUAL_COLORS = [
  'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200 dark:bg-blue-800/60 dark:text-blue-100 dark:border-blue-600',
  'bg-indigo-100 text-indigo-800 border-indigo-300 hover:bg-indigo-200 dark:bg-indigo-800/60 dark:text-indigo-100 dark:border-indigo-600',
  'bg-cyan-100 text-cyan-800 border-cyan-300 hover:bg-cyan-200 dark:bg-cyan-800/60 dark:text-cyan-100 dark:border-cyan-600',
  'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200 dark:bg-emerald-800/60 dark:text-emerald-100 dark:border-emerald-600',
  'bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200 dark:bg-purple-800/60 dark:text-purple-100 dark:border-purple-600',
  'bg-rose-100 text-rose-800 border-rose-300 hover:bg-rose-200 dark:bg-rose-800/60 dark:text-rose-100 dark:border-rose-600',
  'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200 dark:bg-amber-800/60 dark:text-amber-100 dark:border-amber-600',
  'bg-teal-100 text-teal-800 border-teal-300 hover:bg-teal-200 dark:bg-teal-800/60 dark:text-teal-100 dark:border-teal-600',
];

const QUICK_QUALIFICATIONS = [
  '8th', '10th', '12th', 'ITI', 'Diploma', 'Graduate', 'B.Tech', 'B.Sc', 'BA',
  'MBBS', 'GNM', 'ANM', 'B.Ed', 'BTC', 'D.Pharm', 'Post Graduate', 'PhD',
];

const CAT_BG: Record<string, string> = {
  railway: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-800/60 dark:text-blue-100 dark:border-blue-600',
  ssc: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-800/60 dark:text-emerald-100 dark:border-emerald-600',
  banking: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-800/60 dark:text-amber-100 dark:border-amber-600',
  defence: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-800/60 dark:text-red-100 dark:border-red-600',
  upsc: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-800/60 dark:text-purple-100 dark:border-purple-600',
  state_psc: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-800/60 dark:text-indigo-100 dark:border-indigo-600',
  teaching: 'bg-pink-100 text-pink-800 border-pink-300 dark:bg-pink-800/60 dark:text-pink-100 dark:border-pink-600',
  police: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-800/60 dark:text-orange-100 dark:border-orange-600',
  health: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-800/60 dark:text-teal-100 dark:border-teal-600',
  engineering: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-800/60 dark:text-cyan-100 dark:border-cyan-600',
  medical: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-800/60 dark:text-rose-100 dark:border-rose-600',
  university: 'bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-800/60 dark:text-violet-100 dark:border-violet-600',
  gramin: 'bg-lime-100 text-lime-800 border-lime-300 dark:bg-lime-800/60 dark:text-lime-100 dark:border-lime-600',
  other: 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600',
};

const TOP_STATES = [
  'uttar_pradesh', 'bihar', 'rajasthan', 'madhya_pradesh', 'maharashtra',
  'delhi', 'haryana', 'punjab', 'tamil_nadu', 'karnataka', 'west_bengal', 'gujarat',
];

export function QuickFilters() {
  const pathname = usePathname();
  const { lang } = useLanguage();

  const TYPE_TABS = [
    { href: '/jobs', label: tr('filter.latestJobs', lang), icon: Briefcase, gradient: 'from-blue-500 to-blue-600', lightBg: 'bg-blue-50 border-blue-200', darkBg: 'dark:bg-blue-800/50 dark:border-blue-700', lightText: 'text-blue-800', darkText: 'dark:text-white' },
    { href: '/results', label: tr('nav.results', lang), icon: FileCheck, gradient: 'from-emerald-500 to-emerald-600', lightBg: 'bg-emerald-50 border-emerald-200', darkBg: 'dark:bg-emerald-800/50 dark:border-emerald-700', lightText: 'text-emerald-800', darkText: 'dark:text-white' },
    { href: '/admit-cards', label: tr('nav.admitCards', lang), icon: CreditCard, gradient: 'from-orange-500 to-amber-500', lightBg: 'bg-amber-50 border-amber-200', darkBg: 'dark:bg-amber-800/50 dark:border-amber-700', lightText: 'text-amber-800', darkText: 'dark:text-white' },
    { href: '/answer-keys', label: tr('nav.answerKeys', lang), icon: Key, gradient: 'from-violet-500 to-purple-600', lightBg: 'bg-violet-50 border-violet-200', darkBg: 'dark:bg-violet-800/50 dark:border-violet-700', lightText: 'text-violet-800', darkText: 'dark:text-white' },
    { href: '/admissions', label: tr('nav.admissions', lang), icon: GraduationCap, gradient: 'from-cyan-500 to-cyan-600', lightBg: 'bg-cyan-50 border-cyan-200', darkBg: 'dark:bg-cyan-800/50 dark:border-cyan-700', lightText: 'text-cyan-800', darkText: 'dark:text-white' },
    { href: '/syllabus', label: tr('nav.syllabus', lang), icon: BookOpen, gradient: 'from-pink-500 to-pink-600', lightBg: 'bg-pink-50 border-pink-200', darkBg: 'dark:bg-pink-800/50 dark:border-pink-700', lightText: 'text-pink-800', darkText: 'dark:text-white' },
  ];

  return (
    <div className="space-y-8">
      {/* Type tabs */}
      <div>
        <h3 className="text-xs font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider mb-3 px-1">
          {tr('filter.browseByType', lang)}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TYPE_TABS.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-sm font-bold transition-all active:scale-[0.97]',
                  tab.lightBg, tab.darkBg, tab.lightText, tab.darkText,
                  isActive && 'shadow-md ring-2 ring-offset-1 ring-blue-400 dark:ring-blue-500 dark:ring-offset-gray-900'
                )}
              >
                <div className={cn('w-9 h-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-md', tab.gradient)}>
                  <tab.icon className="w-4 h-4" />
                </div>
                <span className="truncate">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Category chips */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider px-1">
            {tr('filter.categories', lang)}
          </h3>
          <Link href="/jobs" className="text-xs font-bold text-blue-600 dark:text-blue-300 flex items-center gap-0.5">
            {tr('filter.seeAll', lang)} <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <Link
              key={key}
              href={`/category/${key}`}
              className={cn(
                'flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold active:scale-[0.97] transition-all',
                CAT_BG[key] || CAT_BG.other
              )}
            >
              <span className="text-base">{CATEGORY_ICONS[key]}</span>
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Qualification pills */}
      <div>
        <div className="flex items-center gap-2 mb-3 px-1">
          <GraduationCap className="w-4 h-4 text-purple-500" />
          <h3 className="text-xs font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider">
            {tr('filter.filterByEducation', lang)}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK_QUALIFICATIONS.map((q, i) => (
            <Link
              key={q}
              href={`/jobs?qualification=${encodeURIComponent(q)}`}
              className={cn(
                'px-4 py-2 rounded-xl border text-xs font-bold active:scale-[0.97] transition-all',
                QUAL_COLORS[i % QUAL_COLORS.length]
              )}
            >
              {q}
            </Link>
          ))}
        </div>
      </div>

      {/* Top states */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 px-1">
            <MapPin className="w-4 h-4 text-rose-500" />
            <h3 className="text-xs font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider">
              {tr('filter.jobsByState', lang)}
            </h3>
          </div>
          <Link href="/jobs" className="text-xs font-bold text-rose-600 dark:text-rose-300 flex items-center gap-0.5">
            {tr('filter.allStates', lang)} <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          {TOP_STATES.map((key) => (
            <Link
              key={key}
              href={`/state/${key}`}
              className="flex-shrink-0 px-4 py-2 rounded-xl bg-rose-100 dark:bg-rose-800/60 border border-rose-300 dark:border-rose-600 text-xs font-bold text-rose-800 dark:text-rose-100 hover:bg-rose-200 dark:hover:bg-rose-700/60 active:scale-[0.97] transition-all"
            >
              {STATE_LABELS[key]}
            </Link>
          ))}
        </div>
      </div>

      {/* Free Tools */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-gray-800 dark:text-gray-100 uppercase tracking-wider px-1">
            {tr('filter.freeTools', lang)}
          </h3>
          <Link href="/tools" className="text-xs font-bold text-[#ff6f00] flex items-center gap-0.5">
            {tr('filter.allTools', lang)} <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2 min-w-0">
          <Link href="/tools/photo-resizer" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-100 dark:bg-blue-800/60 border border-blue-300 dark:border-blue-600 active:scale-95 transition-all">
            <Camera className="w-5 h-5 text-blue-600 dark:text-blue-200" />
            <span className="text-[11px] font-bold text-blue-800 dark:text-white text-center">{tr('filter.photoResizer', lang)}</span>
          </Link>
          <Link href="/tools/age-calculator" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-green-100 dark:bg-green-800/60 border border-green-300 dark:border-green-600 active:scale-95 transition-all">
            <Calculator className="w-5 h-5 text-green-600 dark:text-green-200" />
            <span className="text-[11px] font-bold text-green-800 dark:text-white text-center">{tr('filter.ageCalc', lang)}</span>
          </Link>
          <Link href="/tools/salary-calculator" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-purple-100 dark:bg-purple-800/60 border border-purple-300 dark:border-purple-600 active:scale-95 transition-all">
            <IndianRupee className="w-5 h-5 text-purple-600 dark:text-purple-200" />
            <span className="text-[11px] font-bold text-purple-800 dark:text-white text-center">{tr('filter.salaryCalc', lang)}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
