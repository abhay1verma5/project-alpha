'use client';

import Link from 'next/link';
import {
  ArrowRight, MapPin, Users, Calendar, Clock,
  AlertTriangle, Briefcase, FileCheck, CreditCard,
  Key, GraduationCap, BookOpen,
} from 'lucide-react';
import { type Job } from '@/lib/api';
import { CATEGORY_LABELS, CATEGORY_COLORS, STATE_LABELS, formatDate, formatNumber } from '@/lib/utils';
import { useLanguage } from './LanguageProvider';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  AlertTriangle, Briefcase, FileCheck, CreditCard,
  Key, GraduationCap, BookOpen,
};

interface HorizontalScrollerProps {
  title: string;
  subtitle: string;
  iconName: string;
  iconBg: string;
  jobs: Job[];
  viewAllHref: string;
  viewAllColor?: string;
  cardBorder?: string;
}

export function HorizontalScroller({
  title,
  subtitle,
  iconName,
  iconBg,
  jobs,
  viewAllHref,
  viewAllColor = 'text-[#1a3a5c] dark:text-blue-400',
  cardBorder = 'border-gray-200 dark:border-gray-700',
}: HorizontalScrollerProps) {
  const { t } = useLanguage();

  const Icon = ICON_MAP[iconName] || Briefcase;

  if (jobs.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg ${iconBg}`}>
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{subtitle}</p>
          </div>
        </div>
        <Link
          href={viewAllHref}
          className={`flex items-center gap-1 text-sm font-semibold ${viewAllColor} hover:opacity-80 transition-opacity`}
        >
          View all <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 snap-x snap-mandatory max-w-[100vw]">
        {jobs.map((job) => {
          const categoryLabel = CATEGORY_LABELS[job.category] || job.category;
          const categoryColor = CATEGORY_COLORS[job.category] || CATEGORY_COLORS.other;
          const stateLabel = STATE_LABELS[job.state] || job.state;
          const jobTitle = t(job.title, job.title_hi);

          return (
            <Link
              key={job.id}
              href={`/jobs/${job.slug}`}
              className="flex-shrink-0 w-[280px] sm:w-[320px] snap-start group"
            >
              <div className={`bg-white dark:bg-gray-900 rounded-2xl border-2 ${cardBorder} p-4 h-full hover:shadow-md transition-all group-hover:border-blue-400 dark:group-hover:border-blue-600`}>
                {/* Tags */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${categoryColor}`}>
                    {categoryLabel}
                  </span>
                  {job.days_left !== null && job.days_left >= 0 && job.days_left <= 7 && (
                    <span className={`flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md text-white ${
                      job.days_left <= 3 ? 'bg-red-600' : 'bg-amber-500'
                    }`}>
                      <Clock className="w-3 h-3" />
                      {job.days_left === 0 ? 'Last Day!' : `${job.days_left}d`}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-bold text-sm sm:text-base text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors min-h-[2.5rem]">
                  {jobTitle}
                </h3>

                {/* Org */}
                {job.organization && (
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{job.organization}</p>
                )}

                {/* Bottom details */}
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {job.vacancies && job.vacancies > 0 && (
                    <span className="flex items-center gap-1 font-bold text-blue-700 dark:text-blue-300">
                      <Users className="w-3 h-3" />
                      {formatNumber(job.vacancies)}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400 font-semibold">
                    <MapPin className="w-3 h-3 text-red-500" />
                    {stateLabel}
                  </span>
                  {job.last_date && (
                    <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400 font-semibold">
                      <Calendar className="w-3 h-3 text-amber-500" />
                      {formatDate(job.last_date)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
