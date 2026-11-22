'use client';

import Link from 'next/link';
import { Calendar, MapPin, Users, GraduationCap, IndianRupee, Clock, Heart, Share2, ExternalLink, CalendarCheck, UserCheck, Wallet, Briefcase } from 'lucide-react';
import { type Job } from '@/lib/api';
import { cn, CATEGORY_LABELS, CATEGORY_COLORS, STATE_LABELS, formatDate, formatNumber } from '@/lib/utils';
import { useLanguage } from './LanguageProvider';
import { tr } from '@/lib/translations';
import { useState, useEffect } from 'react';
import { SourceBadge } from './SourceBadge';

const SAVED_KEY = 'sarkari_saved_jobs';

function isSaved(slug: string): boolean {
  try {
    const d = localStorage.getItem(SAVED_KEY);
    if (!d) return false;
    return JSON.parse(d).some((j: { slug: string }) => j.slug === slug);
  } catch { return false; }
}

function toggleSave(job: Job): boolean {
  try {
    const d = localStorage.getItem(SAVED_KEY);
    const arr = d ? JSON.parse(d) : [];
    const exists = arr.findIndex((j: { slug: string }) => j.slug === job.slug);
    if (exists >= 0) {
      arr.splice(exists, 1);
      localStorage.setItem(SAVED_KEY, JSON.stringify(arr));
      return false;
    }
    arr.unshift({ slug: job.slug, title: job.title, title_hi: job.title_hi, organization: job.organization, category: CATEGORY_LABELS[job.category] || job.category, savedAt: new Date().toISOString() });
    localStorage.setItem(SAVED_KEY, JSON.stringify(arr));
    return true;
  } catch { return false; }
}

function getPostedAgo(dateStr: string, lang: string): string | null {
  const posted = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return lang === 'hi' ? 'आज' : 'Today';
  if (diffDays === 1) return lang === 'hi' ? 'कल' : 'Yesterday';
  if (diffDays <= 3) return lang === 'hi' ? `${diffDays} दिन पहले` : `${diffDays}d ago`;
  return null;
}

/** Compact fee summary: "Gen ₹500 | OBC ₹250 | SC/ST Free" */
function formatFee(fee: Record<string, string> | null | undefined): string | null {
  if (!fee || Object.keys(fee).length === 0) return null;
  return Object.entries(fee).map(([k, v]) => `${k}: ${v}`).join(' | ');
}

export function JobCard({ job }: { job: Job; index?: number }) {
  const { t, lang } = useLanguage();
  const [saved, setSaved] = useState(false);
  const categoryLabel = CATEGORY_LABELS[job.category] || job.category;
  const categoryColor = CATEGORY_COLORS[job.category] || CATEGORY_COLORS.other;
  const stateLabel = STATE_LABELS[job.state] || job.state;
  const title = t(job.title, job.title_hi);

  useEffect(() => {
    setSaved(isSaved(job.slug));
  }, [job.slug]);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggleSave(job);
    setSaved(result);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `https://sarkarialert.online/jobs/${job.slug}`;
    const text = `${job.title} - ${job.organization || 'Government Job'}`;
    if (navigator.share) {
      navigator.share({ title: text, url }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + '\n' + url)}`, '_blank');
    }
  };

  const contentTypeLabel = (ct: string) => {
    const map: Record<string, string> = {
      result: tr('job.result', lang),
      admit_card: tr('job.admitCard', lang),
      answer_key: tr('job.answerKey', lang),
      admission: tr('job.admission', lang),
      syllabus: tr('job.syllabusLabel', lang),
      notice: tr('job.noticeLabel', lang),
      exam_date: tr('job.examDateLabel', lang),
    };
    return map[ct] || ct;
  };

  const postedAgo = getPostedAgo(job.posted_date, lang);
  const feeStr = formatFee(job.fee);

  return (
    <div className="relative block min-w-0 max-w-full active:scale-[0.995] transition-transform">
      <div className={cn(
        "group bg-white dark:bg-gray-900 rounded-2xl border-2 p-4 sm:p-5 transition-colors relative",
        job.is_expired
          ? "border-gray-300 dark:border-gray-700 opacity-75"
          : "border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
      )}>
        {/* Whole-card link. Interactive children below are lifted with relative z-10 so they stay tappable. */}
        <Link
          href={`/jobs/${job.slug}`}
          aria-label={title}
          className="absolute inset-0 z-0 rounded-2xl"
        />

        {/* Urgency badge — last 3 days */}
        {!job.is_expired && job.days_left !== null && job.days_left >= 0 && job.days_left <= 3 && (
          <div className="pointer-events-none absolute -top-2 -right-2 px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded-lg shadow-md animate-pulse z-10">
            {job.days_left === 0
              ? tr('job.lastDay', lang)
              : `${job.days_left} ${tr('job.daysLeft', lang)}!`}
          </div>
        )}

        {/* Expired badge */}
        {job.is_expired && (
          <div className="pointer-events-none absolute -top-2 -right-2 px-2 py-0.5 bg-gray-500 text-white text-xs font-bold rounded-lg shadow-md z-10">
            {tr('job.expired', lang)}
          </div>
        )}

        {/* "New" badge for recent posts */}
        {postedAgo && !job.is_expired && (
          <div className="pointer-events-none absolute -top-2 -left-2 px-2 py-0.5 bg-green-600 text-white text-xs font-bold rounded-lg shadow-md z-10">
            {postedAgo}
          </div>
        )}

        {/* Tags + Actions */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5 min-w-0">
            <span className={cn('text-xs font-bold px-2.5 py-1 rounded-lg', categoryColor)}>
              {categoryLabel}
            </span>
            {job.is_featured && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-800/60 dark:text-amber-100">
                ★ {tr('job.featured', lang)}
              </span>
            )}
            {job.content_type !== 'job' && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-800/60 dark:text-emerald-100">
                {contentTypeLabel(job.content_type)}
              </span>
            )}
            {job.is_official && <SourceBadge isOfficial sourceHost={job.source_host} />}
          </div>
          <div className="relative z-10 flex items-center gap-0.5 flex-shrink-0">
            <button
              type="button"
              onClick={handleShare}
              className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 text-gray-400 hover:text-green-600 transition-colors"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleSave}
              className={cn(
                'h-10 w-10 flex items-center justify-center rounded-lg transition-colors',
                saved
                  ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
              )}
              aria-label={saved ? 'Unsave' : 'Save'}
            >
              <Heart className={cn('w-4 h-4', saved && 'fill-current')} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors break-words">
          {title}
        </h3>

        {/* Organization */}
        {job.organization && (
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mt-1 break-words">{job.organization}</p>
        )}

        {/* ── Important Dates / महत्वपूर्ण तिथियाँ ── */}
        <div className="mt-3 px-3 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1.5">
            {tr('job.dates', lang)}
          </p>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
            {/* Last Date */}
            {job.last_date && (
            <span className={cn('flex items-start gap-1.5 font-semibold min-w-0',
              job.is_expired ? 'text-red-500 line-through' : 'text-gray-800 dark:text-gray-200'
            )}>
              <Calendar className="w-3.5 h-3.5 mt-0.5 text-red-500 flex-shrink-0" />
              <span className="min-w-0 break-words">
                <span className="text-xs text-gray-500 dark:text-gray-400 block leading-tight">{tr('job.lastDate', lang)}</span>
                {formatDate(job.last_date)}
              </span>
            </span>
            )}

            {/* Posted Date */}
            <span className="flex items-start gap-1.5 font-semibold min-w-0 text-gray-700 dark:text-gray-300">
              <CalendarCheck className="w-3.5 h-3.5 mt-0.5 text-green-600 flex-shrink-0" />
              <span className="min-w-0 break-words">
                <span className="text-xs text-gray-500 dark:text-gray-400 block leading-tight">{tr('job.postedOn', lang)}</span>
                {formatDate(job.posted_date)}
              </span>
            </span>
          </div>
        </div>

        {/* ── Eligibility / पात्रता ── (only fields we actually know) */}
        {(job.qualification || job.age_limit || feeStr) && (
        <div className="mt-2.5 px-3 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-800/40">
          <p className="text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider mb-1.5">
            {tr('job.eligibility', lang)}
          </p>
          <div className="space-y-1.5 text-sm">
            {/* Qualification — always show, wraps fully */}
            {job.qualification && (
            <span className="flex items-start gap-1.5 font-semibold min-w-0 text-purple-800 dark:text-purple-200">
              <GraduationCap className="w-3.5 h-3.5 mt-0.5 text-purple-500 flex-shrink-0" />
              <span className="min-w-0 break-words">{job.qualification}</span>
            </span>
            )}

            {/* Age Limit — always show, wraps fully */}
            {job.age_limit && (
            <span className="flex items-start gap-1.5 font-semibold min-w-0 text-orange-700 dark:text-orange-300">
              <UserCheck className="w-3.5 h-3.5 mt-0.5 text-orange-500 flex-shrink-0" />
              <span className="min-w-0 break-words">{`${tr('job.ageLimit', lang)}: ${job.age_limit}`}</span>
            </span>
            )}

            {/* Fee — show when available, wraps fully */}
            {feeStr && (
              <span className="flex items-start gap-1.5 font-semibold min-w-0 text-rose-700 dark:text-rose-300">
                <Wallet className="w-3.5 h-3.5 mt-0.5 text-rose-500 flex-shrink-0" />
                <span className="min-w-0 break-words">{tr('job.fee', lang)}: {feeStr}</span>
              </span>
            )}
          </div>
        </div>
        )}

        {/* ── Job Details / नौकरी विवरण ── */}
        <div className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
          {/* Vacancies */}
          {!!job.vacancies && (
          <span className="flex items-start gap-1.5 font-bold min-w-0 text-blue-800 dark:text-blue-300">
            <Users className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
            <span className="min-w-0 break-words">{`${formatNumber(job.vacancies)} ${tr('job.posts', lang)}`}</span>
          </span>
          )}

          {/* Location */}
          <span className="flex items-start gap-1.5 font-semibold min-w-0 text-gray-700 dark:text-gray-300">
            <MapPin className="w-4 h-4 mt-0.5 text-red-500 flex-shrink-0" />
            <span className="min-w-0 break-words">{stateLabel}</span>
          </span>

          {/* Salary — always show, wraps fully */}
          {job.salary && (
          <span className="flex items-start gap-1.5 font-semibold col-span-2 min-w-0 text-green-700 dark:text-green-300">
            <IndianRupee className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
            <span className="min-w-0 break-words">{job.salary}</span>
          </span>
          )}
        </div>

        {/* Days Left bar — show when > 3 days remaining */}
        {!job.is_expired && job.days_left !== null && job.days_left > 3 && (
          <div className="mt-3 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all',
                  job.days_left <= 7 ? 'bg-amber-500' : job.days_left <= 15 ? 'bg-yellow-400' : 'bg-emerald-500'
                )}
                style={{ width: `${Math.max(5, Math.min(100, (1 - job.days_left / 60) * 100))}%` }}
              />
            </div>
            <span className={cn('text-xs font-bold whitespace-nowrap',
              job.days_left <= 7 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
            )}>
              {job.days_left} {tr('job.daysLeft', lang)}
            </span>
          </div>
        )}

        {/* Apply Online / View button — real anchor, lifted above the card link */}
        {job.apply_link && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <a
              href={job.apply_link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "relative z-10 inline-flex items-center gap-1.5 min-h-10 px-4 py-2 text-white text-xs font-bold rounded-lg transition-colors active:scale-[0.97]",
                job.is_expired ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-600 hover:bg-blue-700"
              )}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {job.content_type === 'result' ? tr('job.seeResult', lang) :
               job.content_type === 'admit_card' ? tr('job.admitCardDl', lang) :
               job.content_type === 'answer_key' ? tr('job.viewAnswerKey', lang) :
               tr('job.applyOnline', lang)}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
