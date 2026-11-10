'use client';

import { useState } from 'react';
import { BookOpen, ChevronDown, TrendingUp } from 'lucide-react';
import type { ExamAnalysis } from '../exam-data';

function getWeightageColor(w: number): string {
  if (w >= 15) return 'bg-green-500';
  if (w >= 10) return 'bg-blue-500';
  if (w >= 5) return 'bg-amber-500';
  return 'bg-gray-400';
}

function getTrendBadge(t: 'high' | 'medium' | 'low'): { label: string; color: string } {
  if (t === 'high') return { label: 'High Priority', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' };
  if (t === 'medium') return { label: 'Medium', color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200' };
  return { label: 'Low', color: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' };
}

export function WeightageDetail({ exam }: { exam: ExamAnalysis }) {
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const currentSubject = exam.subjects[selectedSubject];

  return (
    <div>
      {/* Subject tabs — show as pills on desktop, dropdown on mobile */}
      {exam.subjects.length > 1 && (
        <>
          {/* Desktop tabs */}
          <div className="hidden sm:flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-1">
            {exam.subjects.map((sub, idx) => (
              <button
                key={sub.subject}
                onClick={() => setSelectedSubject(idx)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-bold whitespace-nowrap transition-all active:scale-[0.97] ${
                  selectedSubject === idx
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 shadow-sm'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-300'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                {sub.subject}
              </button>
            ))}
          </div>

          {/* Mobile dropdown */}
          <div className="sm:hidden relative mb-6">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 text-sm font-bold text-gray-900 dark:text-white hover:border-indigo-400 transition-colors"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-500" />
                <span>{currentSubject.subject}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden">
                {exam.subjects.map((sub, idx) => (
                  <button
                    key={sub.subject}
                    onClick={() => { setSelectedSubject(idx); setDropdownOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors ${
                      selectedSubject === idx
                        ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 font-bold'
                        : 'text-gray-700 dark:text-gray-300 font-semibold'
                    }`}
                  >
                    <span>{sub.subject}</span>
                    {selectedSubject === idx && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Topic-wise Weightage */}
      <div className={`bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-800 border-l-4 ${exam.color} overflow-hidden`}>
        <div className="p-5 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-500" />
            {currentSubject.subject}
          </h2>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Chapter-wise weightage based on last 10+ years analysis</span>
          </div>
        </div>

        <div className="p-5 space-y-1">
          {currentSubject.topics.map((topic) => {
            const trendBadge = getTrendBadge(topic.trend);
            return (
              <div key={topic.topic} className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                {/* Weightage bar */}
                <div className="w-20 flex-shrink-0">
                  <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getWeightageColor(topic.weightage)} transition-all`}
                      style={{ width: `${Math.min(topic.weightage * 2, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-extrabold text-gray-600 dark:text-gray-300">{topic.weightage}%</span>
                </div>

                {/* Topic name */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{topic.topic}</p>
                </div>

                {/* Questions */}
                <span className="text-xs font-bold text-gray-600 dark:text-gray-400 whitespace-nowrap bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-lg">
                  {topic.questions} Q
                </span>

                {/* Priority */}
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${trendBadge.color} whitespace-nowrap`}>
                  {trendBadge.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
