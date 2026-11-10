'use client';

import Link from 'next/link';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CategoryGridProps {
  stats?: { category: string; count: number }[];
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  railway: 'from-blue-500 to-blue-600',
  ssc: 'from-emerald-500 to-emerald-600',
  banking: 'from-amber-500 to-amber-600',
  defence: 'from-red-500 to-red-600',
  upsc: 'from-purple-500 to-purple-600',
  state_psc: 'from-indigo-500 to-indigo-600',
  teaching: 'from-pink-500 to-pink-600',
  police: 'from-orange-500 to-orange-600',
  health: 'from-teal-500 to-teal-600',
  engineering: 'from-cyan-500 to-cyan-600',
  other: 'from-gray-500 to-gray-600',
};

export function CategoryGrid({ stats }: CategoryGridProps) {
  const categories = Object.entries(CATEGORY_LABELS);
  const countMap = new Map(stats?.map((s) => [s.category, s.count]));

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 sm:gap-3">
      {categories.map(([key, label], i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.04 }}
        >
          <Link
            href={`/category/${key}`}
            className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 group active:scale-[0.97] transition-all hover:shadow-md"
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${CATEGORY_GRADIENTS[key] || CATEGORY_GRADIENTS.other} flex items-center justify-center text-xl sm:text-2xl shadow-lg`}>
              {CATEGORY_ICONS[key]}
            </div>
            <span className="text-[11px] sm:text-sm font-semibold text-gray-700 dark:text-gray-200 text-center leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {label}
            </span>
            {countMap.has(key) && (
              <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                {countMap.get(key)}
              </span>
            )}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
