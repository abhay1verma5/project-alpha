import Link from 'next/link';
import { AlertTriangle, Award, BarChart3, ChevronRight, Clock, HelpCircle } from 'lucide-react';
import { ApproxNote, TwText } from './TwText';
import { accentFor, BASE_PATH, TREND_BADGE, type ExamSummary } from './types';

export function ExamCard({ exam }: { exam: ExamSummary }) {
  const accent = accentFor(exam.color);
  const topTopics = exam.top_topics.slice(0, 3);

  return (
    <Link
      href={`${BASE_PATH}/${exam.slug}`}
      className={`group flex min-w-0 flex-col rounded-2xl border-2 border-l-4 border-gray-200 bg-white p-5 transition-all hover:shadow-lg active:scale-[0.98] dark:border-gray-800 dark:bg-gray-900 sm:p-6 ${accent.border}`}
    >
      <div className="mb-3 flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="break-words text-xl font-extrabold text-gray-900 transition-colors group-hover:text-indigo-700 dark:text-white dark:group-hover:text-indigo-400">
            {exam.exam}
          </h2>
          <p className="mt-0.5 break-words text-sm font-semibold text-gray-500 dark:text-gray-400">{exam.paper}</p>
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accent.icon} shadow-md`}>
          <BarChart3 className="h-5 w-5 text-white" aria-hidden="true" />
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-2 text-sm min-[400px]:grid-cols-2">
        <div className="flex min-w-0 items-center gap-2">
          <HelpCircle className="h-4 w-4 shrink-0 text-blue-500" aria-hidden="true" />
          <span className="min-w-0 text-gray-700 dark:text-gray-300">
            <span className="font-bold">{exam.total_questions}</span> <TwText id="tw.questions" />
            {' / '}
            <span className="font-bold">{exam.total_marks}</span> <TwText id="tw.marks" />
          </span>
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <Clock className="h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
          <span className="min-w-0 font-semibold text-gray-700 dark:text-gray-300">{exam.duration}</span>
        </div>
        <div className="flex min-w-0 items-center gap-2">
          <Award className="h-4 w-4 shrink-0 text-green-500" aria-hidden="true" />
          <span className="min-w-0 text-gray-700 dark:text-gray-300">
            <span className="font-bold">{exam.subjects.length}</span> <TwText id="tw.subjects" />
          </span>
        </div>
        {exam.negative_marking && (
          <div className="flex min-w-0 items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" aria-hidden="true" />
            <span className="min-w-0 break-words text-xs font-semibold text-red-600 dark:text-red-400">
              <TwText id="tw.negative" />: {exam.negative_marking}
            </span>
          </div>
        )}
      </div>

      {topTopics.length > 0 && (
        <div className="mb-4 min-w-0 border-t border-gray-100 pt-3 dark:border-gray-800">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            <TwText id="tw.topTopics" />
          </p>
          <ul className="space-y-2">
            {topTopics.map((topic) => (
              <li key={`${topic.subject}-${topic.topic}`} className="flex min-w-0 items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="break-words text-sm font-bold text-gray-900 dark:text-white">{topic.topic}</p>
                  <p className="break-words text-xs text-gray-500 dark:text-gray-400">{topic.subject}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className={`whitespace-nowrap rounded-lg px-2 py-0.5 text-xs font-bold ${TREND_BADGE[topic.trend] ?? TREND_BADGE.low}`}>
                    <TwText id={`tw.trend.${topic.trend}`} />
                  </span>
                  <span className="w-12 text-right text-sm font-extrabold text-gray-800 dark:text-gray-200">{topic.weightage}%</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto space-y-3">
        <ApproxNote asOf={exam.as_of} />
        <span className="flex items-center gap-1 text-sm font-bold text-indigo-600 transition-all group-hover:gap-2 dark:text-indigo-400">
          <TwText id="tw.viewWeightage" /> <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
