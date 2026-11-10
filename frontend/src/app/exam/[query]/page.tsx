import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText, Ticket, KeyRound, BarChart3, BookOpen, GraduationCap, Calendar, ExternalLink, Search,
} from 'lucide-react';
import { getExamTimeline } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { SourceBadge } from '@/components/SourceBadge';
import { Breadcrumbs } from '@/components/Breadcrumbs';

interface Props {
  params: Promise<{ query: string }>;
}

const STAGES: Record<string, { label: string; hi: string; icon: typeof FileText; color: string }> = {
  syllabus: { label: 'Syllabus', hi: 'पाठ्यक्रम', icon: BookOpen, color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30' },
  job: { label: 'Notification & application', hi: 'अधिसूचना', icon: FileText, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' },
  admit_card: { label: 'Admit card', hi: 'प्रवेश पत्र', icon: Ticket, color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30' },
  answer_key: { label: 'Answer key', hi: 'उत्तर कुंजी', icon: KeyRound, color: 'text-teal-600 bg-teal-100 dark:bg-teal-900/30' },
  result: { label: 'Result', hi: 'परिणाम', icon: BarChart3, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30' },
  admission: { label: 'Admission / counselling', hi: 'प्रवेश', icon: GraduationCap, color: 'text-pink-600 bg-pink-100 dark:bg-pink-900/30' },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { query } = await params;
  const name = decodeURIComponent(query);
  return {
    title: `${name} — Exam Timeline: Notification, Admit Card, Answer Key, Result`,
    description: `Every official update for ${name} in one place: notification and last date, admit card, answer key, result and admission, with the source of each notice.`,
    alternates: { canonical: `https://sarkarialert.online/exam/${encodeURIComponent(name)}` },
  };
}

export default async function ExamTimelinePage({ params }: Props) {
  const { query } = await params;
  const name = decodeURIComponent(query);
  let timeline: Awaited<ReturnType<typeof getExamTimeline>> | null = null;
  try {
    timeline = await getExamTimeline(name);
  } catch {
    timeline = null;
  }

  const stages = timeline?.stages ?? [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Exam timeline' }, { label: name }]} />

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{name}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Every notice we have for this exam, in the order the process runs. Each item shows where it was read from.
        </p>
      </div>

      {stages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center">
          <Search className="w-8 h-8 mx-auto text-gray-400 mb-3" />
          <p className="font-semibold text-gray-700 dark:text-gray-200">No notices found for “{name}” yet.</p>
          <p className="text-sm text-gray-500 mt-1">
            Try a shorter name, for example{' '}
            <Link href="/exam/SSC%20CGL" className="text-blue-600 underline">SSC CGL</Link>,{' '}
            <Link href="/exam/UPSC%20Civil%20Services" className="text-blue-600 underline">UPSC Civil Services</Link> or{' '}
            <Link href="/exam/RRB%20NTPC" className="text-blue-600 underline">RRB NTPC</Link>.
          </p>
        </div>
      ) : (
        <ol className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-4 space-y-8">
          {stages.map(({ stage, items }) => {
            const meta = STAGES[stage] ?? STAGES.job;
            const Icon = meta.icon;
            return (
              <li key={stage} className="ml-6">
                <span className={`absolute -left-[17px] flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white dark:ring-gray-950 ${meta.color}`}>
                  <Icon className="w-4 h-4" />
                </span>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {meta.label} <span className="text-sm font-medium text-gray-400">· {meta.hi}</span>
                </h2>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item.slug}
                      className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3.5"
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <SourceBadge isOfficial={item.is_official} sourceHost={item.source_host} sourceUrl={item.source_url} />
                        <span className="text-[11px] text-gray-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {formatDate(item.posted_date)}
                        </span>
                        {item.last_date && stage === 'job' && (
                          <span className="text-[11px] font-semibold text-red-600 dark:text-red-400">
                            Last date {formatDate(item.last_date)}
                          </span>
                        )}
                      </div>
                      <Link href={`/jobs/${item.slug}`} className="font-semibold text-sm text-gray-900 dark:text-white hover:text-blue-600">
                        {item.title}
                      </Link>
                      {item.apply_link && (
                        <a
                          href={item.apply_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 inline-flex items-center gap-1 text-[12px] text-blue-600 dark:text-blue-400"
                        >
                          Open <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
