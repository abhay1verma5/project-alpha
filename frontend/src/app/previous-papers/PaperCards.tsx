'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen, ChevronDown, Play, FileText, TrendingUp,
} from 'lucide-react';
import { EXAM_CATEGORIES, type ExamCategory, type PYQMeta } from '@/lib/pyq-types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Map category filters to exam category IDs
const CATEGORY_FILTER_MAP: Record<string, string[]> = {
  'All': [],
  'Class 10': ['board_10'],
  'Class 12': ['board_12'],
  'Engineering': ['engineering'],
  'Medical': ['medical'],
  'Law': ['law'],
  'MBA': ['mba'],
  'University': ['board_10', 'board_12'],
  'SSC': ['ssc'],
  'UPSC': ['central'],
  'Railway': ['railway'],
  'Banking': ['banking'],
  'Police': ['state_police'],
  'Teaching': ['teaching', 'state_teacher'],
  'Defence': ['central'],
};

export function PaperCards({ filterCategory }: { filterCategory: string }) {
  const [meta, setMeta] = useState<PYQMeta | null>(null);
  const [expandedCats, setExpandedCats] = useState<Set<string>>(new Set(['board_10', 'board_12']));

  useEffect(() => {
    fetch(`${API_BASE}/pyq/meta/`)
      .then(r => r.json())
      .then(d => setMeta(d))
      .catch(() => {});
  }, []);

  // Build exam counts map from meta
  const examCounts: Record<string, number> = {};
  if (meta?.exams) {
    for (const e of meta.exams) {
      examCounts[e.exam_type] = e.count;
    }
  }

  // Filter categories based on selected filter
  const filteredCategories = filterCategory === 'All'
    ? EXAM_CATEGORIES
    : EXAM_CATEGORIES.filter(cat => {
        const mapped = CATEGORY_FILTER_MAP[filterCategory] || [];
        return mapped.includes(cat.id);
      });

  return (
    <div className="space-y-4">
      {/* Stats banner */}
      {meta && (
        <div className="bg-gradient-to-r from-[#1a3a5c] to-[#0f2b44] rounded-xl p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6" />
            <div>
              <p className="text-lg font-bold">{meta.total_questions.toLocaleString()}+ Questions</p>
              <p className="text-xs text-blue-200">{meta.exams.length} exams • {meta.years.length} years • {meta.subjects.length} subjects</p>
            </div>
          </div>
          <Link
            href="/pyq"
            className="px-4 py-2 bg-[#ff6f00] rounded-lg text-sm font-bold hover:bg-[#e65100] transition-colors"
          >
            Practice Now
          </Link>
        </div>
      )}

      {/* Exam categories */}
      {filteredCategories.map(cat => {
        const hasQuestions = cat.exams.some(e => examCounts[e.value] > 0);
        const totalInCat = cat.exams.reduce((sum, e) => sum + (examCounts[e.value] || 0), 0);
        const isExpanded = expandedCats.has(cat.id);

        return (
          <div key={cat.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <button
              onClick={() => setExpandedCats(prev => {
                const next = new Set(prev);
                if (next.has(cat.id)) next.delete(cat.id);
                else next.add(cat.id);
                return next;
              })}
              className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-2xl">{cat.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 dark:text-white">{cat.label}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {cat.exams.length} exams • {totalInCat > 0 ? `${totalInCat.toLocaleString()} questions` : 'Coming soon'}
                </p>
              </div>
              {totalInCat > 0 && (
                <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold rounded-lg">
                  {totalInCat.toLocaleString()}
                </span>
              )}
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </button>

            {isExpanded && (
              <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-3 space-y-2">
                {cat.exams.map(exam => {
                  const count = examCounts[exam.value] || 0;
                  return (
                    <Link
                      key={exam.value}
                      href={`/pyq/${exam.value}`}
                      className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${cat.color} flex items-center justify-center`}>
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-[#ff6f00] transition-colors">
                            {exam.label}
                          </p>
                          <p className="text-xs text-gray-500">
                            {count > 0 ? `${count} questions available` : 'Questions being added'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {count > 0 ? (
                          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ff6f00] text-white text-xs font-bold rounded-lg group-hover:bg-[#e65100] transition-colors">
                            <Play className="w-3 h-3" /> Practice
                          </span>
                        ) : (
                          <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs font-bold rounded-lg">
                            Soon
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {filteredCategories.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="font-semibold">No exams in this category yet</p>
        </div>
      )}
    </div>
  );
}
