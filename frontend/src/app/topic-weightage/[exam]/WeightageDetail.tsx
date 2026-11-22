'use client';

import { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { twTr } from '../i18n';
import { TwText } from '../TwText';
import {
  TREND_BADGE,
  weightageBarClass,
  type ExamDetail,
  type SubjectDetail,
  type TopicRow,
} from '../types';

const CONTROL_CLASS =
  'w-full min-h-[44px] rounded-xl border-2 border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-900 focus:border-indigo-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white';

function matchesAllWords(text: string, words: string[]): boolean {
  const lower = text.toLowerCase();
  return words.every((word) => lower.includes(word));
}

export function WeightageDetail({ exam }: { exam: ExamDetail }) {
  const { lang } = useLanguage();
  const [selected, setSelected] = useState(0);
  const [query, setQuery] = useState('');

  const subjects = exam.subjects;
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const searching = words.length > 0;
  const current = subjects[selected] ?? subjects[0];

  if (subjects.length === 0) {
    return (
      <p className="rounded-2xl border-2 border-gray-200 bg-white p-5 text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
        <TwText id="tw.noTopics" />
      </p>
    );
  }

  const searchHits = searching
    ? subjects
        .map((subject) => ({
          subject,
          topics: subject.topics.filter((topic) => matchesAllWords(topic.topic, words)),
        }))
        .filter((hit) => hit.topics.length > 0)
    : [];

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="tw-topic-search" className="mb-1.5 block text-sm font-bold text-gray-700 dark:text-gray-300">
          <TwText id="tw.topicSearch" />
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            id="tw-topic-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={twTr('tw.topicSearch.placeholder', lang)}
            className={`${CONTROL_CLASS} pl-10`}
          />
        </div>
      </div>

      {!searching && (
        <>
          {/* Desktop: subject pills (wrap, no horizontal scroll) */}
          <div className="hidden flex-wrap gap-2 sm:flex" role="tablist">
            {subjects.map((subject, idx) => {
              const isSelected = idx === selected;
              return (
                <button
                  key={subject.subject}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelected(idx)}
                  className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl border-2 px-4 py-2 text-sm font-bold transition-all active:scale-[0.97] ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm dark:bg-indigo-900/30 dark:text-indigo-300'
                      : 'border-gray-200 text-gray-700 hover:border-indigo-300 dark:border-gray-700 dark:text-gray-300'
                  }`}
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  {subject.subject}
                </button>
              );
            })}
          </div>

          {/* Mobile: native select, full width */}
          <div className="sm:hidden">
            <label htmlFor="tw-subject" className="sr-only">
              <TwText id="tw.subjects" />
            </label>
            <select
              id="tw-subject"
              value={selected}
              onChange={(event) => setSelected(Number(event.target.value))}
              className={CONTROL_CLASS}
            >
              {subjects.map((subject, idx) => (
                <option key={subject.subject} value={idx}>
                  {subject.subject}
                </option>
              ))}
            </select>
          </div>

          {current && <SubjectCard subject={current} topics={current.topics} />}
        </>
      )}

      {searching &&
        (searchHits.length === 0 ? (
          <p className="rounded-2xl border-2 border-gray-200 bg-white p-5 text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
            <TwText id="tw.noTopics" />
          </p>
        ) : (
          <div className="space-y-6">
            {searchHits.map((hit) => (
              <SubjectCard key={hit.subject.subject} subject={hit.subject} topics={hit.topics} />
            ))}
          </div>
        ))}
    </div>
  );
}

function SubjectCard({ subject, topics }: { subject: SubjectDetail; topics: TopicRow[] }) {
  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border-2 border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="border-b border-gray-100 p-4 sm:p-5 dark:border-gray-800">
        <h2 className="flex min-w-0 items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
          <BookOpen className="h-5 w-5 shrink-0 text-indigo-500" aria-hidden="true" />
          <span className="min-w-0 break-words">{subject.subject}</span>
        </h2>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          <TwText id="tw.subjectNote" />
        </p>
      </div>
      <ul className="divide-y divide-gray-100 px-2 sm:px-3 dark:divide-gray-800">
        {topics.map((topic) => (
          <TopicItem key={topic.topic} topic={topic} />
        ))}
      </ul>
    </section>
  );
}

function TopicItem({ topic }: { topic: TopicRow }) {
  const width = Math.max(0, Math.min(100, topic.weightage));
  return (
    <li className="min-w-0 py-3">
      <div className="flex min-w-0 flex-wrap items-start justify-between gap-x-3 gap-y-2">
        <p className="min-w-0 flex-1 break-words text-sm font-bold text-gray-900 dark:text-white">{topic.topic}</p>
        <span className={`whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-bold ${TREND_BADGE[topic.trend] ?? TREND_BADGE.low}`}>
          <TwText id={`tw.trend.${topic.trend}`} />
        </span>
      </div>
      <div className="mt-2 flex min-w-0 items-center gap-3">
        <div className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800" aria-hidden="true">
          <div className={`h-full rounded-full ${weightageBarClass(topic.weightage)}`} style={{ width: `${width}%` }} />
        </div>
        <span
          className="w-14 shrink-0 text-right text-sm font-extrabold text-gray-800 dark:text-gray-200"
          title={`Raw score: ${topic.weightage_raw}`}
        >
          {topic.weightage}%
        </span>
        <span className="shrink-0 rounded-lg bg-gray-100 px-2 py-1 text-xs font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          <TwText id="tw.qs" vars={{ n: topic.questions }} />
        </span>
      </div>
    </li>
  );
}
