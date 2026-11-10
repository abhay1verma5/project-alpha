'use client';

import { Briefcase, Users, FileCheck, CreditCard, MapPin } from 'lucide-react';
import { type Stats } from '@/lib/api';
import { formatNumber } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import { tr } from '@/lib/translations';

export function StatsBar({ stats }: { stats: Stats }) {
  const { lang } = useLanguage();

  const items = [
    { icon: Briefcase, label: tr('stats.activeJobs', lang), value: stats.total_jobs, gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-100 dark:bg-blue-800/60', number: 'text-blue-800 dark:text-blue-100', label_text: 'text-blue-700 dark:text-blue-200', border: 'border-blue-300 dark:border-blue-600' },
    { icon: Users, label: tr('stats.vacancies', lang), value: stats.total_vacancies, gradient: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-800/60', number: 'text-emerald-800 dark:text-emerald-100', label_text: 'text-emerald-700 dark:text-emerald-200', border: 'border-emerald-300 dark:border-emerald-600' },
    { icon: FileCheck, label: tr('stats.results', lang), value: stats.total_results, gradient: 'from-purple-500 to-purple-600', bg: 'bg-purple-100 dark:bg-purple-800/60', number: 'text-purple-800 dark:text-purple-100', label_text: 'text-purple-700 dark:text-purple-200', border: 'border-purple-300 dark:border-purple-600' },
    { icon: CreditCard, label: tr('stats.admitCards', lang), value: stats.total_admit_cards, gradient: 'from-amber-500 to-amber-600', bg: 'bg-amber-100 dark:bg-amber-800/60', number: 'text-amber-800 dark:text-amber-100', label_text: 'text-amber-700 dark:text-amber-200', border: 'border-amber-300 dark:border-amber-600' },
    { icon: MapPin, label: tr('stats.states', lang), value: stats.states_covered, gradient: 'from-rose-500 to-rose-600', bg: 'bg-rose-100 dark:bg-rose-800/60', number: 'text-rose-800 dark:text-rose-100', label_text: 'text-rose-700 dark:text-rose-200', border: 'border-rose-300 dark:border-rose-600' },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide sm:grid sm:grid-cols-5 sm:overflow-visible sm:mx-0 sm:px-0">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className={`flex-shrink-0 w-[130px] sm:w-auto relative rounded-2xl ${item.bg} border ${item.border} p-4 sm:p-5 text-center`}
        >
          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg flex items-center justify-center mx-auto mb-2 sm:mb-3`}>
            <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <p className={`text-xl sm:text-2xl font-extrabold tracking-tight ${item.number}`}>
            {formatNumber(item.value)}
          </p>
          <p className={`text-[10px] sm:text-xs font-bold ${item.label_text} mt-0.5`}>{item.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
