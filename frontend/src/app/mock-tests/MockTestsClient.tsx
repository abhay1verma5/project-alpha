'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Timer, BookOpen, Trophy, CheckCircle2, XCircle, ArrowRight, ArrowLeft,
  Clock, Loader2, RotateCcw, ChevronDown, Share2, Printer, Play,
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';
import {
  EXAM_CATEGORIES, findExamInfo,
  type PYQQuestion, type PYQMeta, type PYQCheckResult, type ExamCategory,
} from '@/lib/pyq-types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

type Phase = 'browse' | 'config' | 'loading' | 'test' | 'results';

// Pre-configured mock test templates matching real exam patterns
const MOCK_TEMPLATES: Record<string, { questions: number; minutes: number; label: string; labelHi: string }> = {
  jee_main:       { questions: 30, minutes: 30, label: 'JEE Main Mock', labelHi: 'JEE मेन मॉक' },
  jee_advanced:   { questions: 30, minutes: 30, label: 'JEE Advanced Mock', labelHi: 'JEE एडवांस्ड मॉक' },
  neet:           { questions: 45, minutes: 45, label: 'NEET Mock', labelHi: 'NEET मॉक' },
  gate_cse:       { questions: 30, minutes: 30, label: 'GATE CSE Mock', labelHi: 'GATE CSE मॉक' },
  ssc_cgl:        { questions: 25, minutes: 20, label: 'SSC CGL Mock', labelHi: 'SSC CGL मॉक' },
  ssc_chsl:       { questions: 25, minutes: 20, label: 'SSC CHSL Mock', labelHi: 'SSC CHSL मॉक' },
  ssc_mts:        { questions: 25, minutes: 20, label: 'SSC MTS Mock', labelHi: 'SSC MTS मॉक' },
  ssc_gd:         { questions: 25, minutes: 20, label: 'SSC GD Mock', labelHi: 'SSC GD मॉक' },
  upsc_prelims:   { questions: 25, minutes: 25, label: 'UPSC Prelims Mock', labelHi: 'UPSC प्रीलिम्स मॉक' },
  rrb_ntpc:       { questions: 30, minutes: 25, label: 'RRB NTPC Mock', labelHi: 'RRB NTPC मॉक' },
  rrb_group_d:    { questions: 25, minutes: 20, label: 'RRB Group D Mock', labelHi: 'RRB ग्रुप D मॉक' },
  ibps_po:        { questions: 30, minutes: 25, label: 'IBPS PO Mock', labelHi: 'IBPS PO मॉक' },
  ibps_clerk:     { questions: 30, minutes: 25, label: 'IBPS Clerk Mock', labelHi: 'IBPS क्लर्क मॉक' },
  sbi_po:         { questions: 30, minutes: 25, label: 'SBI PO Mock', labelHi: 'SBI PO मॉक' },
  ctet:           { questions: 30, minutes: 25, label: 'CTET Mock', labelHi: 'CTET मॉक' },
  ugc_net:        { questions: 25, minutes: 20, label: 'UGC NET Mock', labelHi: 'UGC NET मॉक' },
  nda:            { questions: 25, minutes: 25, label: 'NDA Mock', labelHi: 'NDA मॉक' },
  cbse_10:        { questions: 25, minutes: 25, label: 'CBSE 10 Mock', labelHi: 'CBSE 10 मॉक' },
  cbse_12:        { questions: 25, minutes: 25, label: 'CBSE 12 Mock', labelHi: 'CBSE 12 मॉक' },
};

const Q_OPTIONS = [10, 20, 30, 50];
const TIME_OPTIONS = [10, 15, 20, 30, 45, 60]; // minutes

interface MockStats {
  tests: number;
  avgScore: number;
  bestScore: number;
  streak: number;
}
const STATS_KEY = 'sarkari_mock_stats';
function loadStats(): MockStats {
  try { const r = localStorage.getItem(STATS_KEY); if (r) return JSON.parse(r); } catch {}
  return { tests: 0, avgScore: 0, bestScore: 0, streak: 0 };
}
function saveStats(s: MockStats) {
  try { localStorage.setItem(STATS_KEY, JSON.stringify(s)); } catch {}
}

export function MockTestsClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';

  const [phase, setPhase] = useState<Phase>('browse');
  const [expandedCat, setExpandedCat] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [qCount, setQCount] = useState(25);
  const [timeMinutes, setTimeMinutes] = useState(20);
  const [selectedSubject, setSelectedSubject] = useState('');

  // Meta
  const [meta, setMeta] = useState<PYQMeta | null>(null);
  const [globalMeta, setGlobalMeta] = useState<PYQMeta | null>(null);

  // Questions & answers
  const [questions, setQuestions] = useState<PYQQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [error, setError] = useState('');

  // Timer
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Results
  const [checkResult, setCheckResult] = useState<PYQCheckResult | null>(null);
  const [stats, setStats] = useState<MockStats>(loadStats());

  // Load global meta on mount
  useEffect(() => {
    setStats(loadStats());
    fetch(`${API_BASE}/pyq/meta/`)
      .then(r => r.json())
      .then(d => setGlobalMeta(d))
      .catch(() => {});
  }, []);

  // Build exam counts from global meta
  const examCounts: Record<string, number> = {};
  if (globalMeta?.exams) {
    for (const e of globalMeta.exams) {
      examCounts[e.exam_type] = e.count;
    }
  }

  const fetchMeta = useCallback(async (exam: string) => {
    try {
      const res = await fetch(`${API_BASE}/pyq/meta/?exam=${exam}`);
      const data: PYQMeta = await res.json();
      setMeta(data);
    } catch {
      setMeta(null);
    }
  }, []);

  const selectExam = (examValue: string) => {
    setSelectedExam(examValue);
    setSelectedSubject('');
    const tpl = MOCK_TEMPLATES[examValue];
    if (tpl) {
      setQCount(tpl.questions);
      setTimeMinutes(tpl.minutes);
    } else {
      setQCount(25);
      setTimeMinutes(20);
    }
    fetchMeta(examValue);
    setPhase('config');
  };

  // Start mock test
  const startTest = async () => {
    setPhase('loading');
    setError('');

    const params = new URLSearchParams({ exam: selectedExam, limit: String(qCount) });
    if (selectedSubject) params.set('subject', selectedSubject);

    try {
      const res = await fetch(`${API_BASE}/pyq/mock/?${params}`);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data: PYQQuestion[] = await res.json();

      if (!data.length) {
        setError(hi ? 'इस परीक्षा के लिए कोई प्रश्न नहीं मिले।' : 'No questions found for this exam.');
        setPhase('config');
        return;
      }

      const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, qCount);
      setQuestions(shuffled);
      setAnswers({});
      setCurrent(0);
      setCheckResult(null);

      const totalSec = timeMinutes * 60;
      setTimeLeft(totalSec);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setPhase('test');
    } catch {
      setError(hi ? 'प्रश्न लोड करने में त्रुटि।' : 'Error loading questions.');
      setPhase('config');
    }
  };

  // Auto-submit when timer runs out
  useEffect(() => {
    if (timeLeft === 0 && phase === 'test' && questions.length > 0) {
      submitTest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  // Submit test
  const submitTest = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    try {
      const res = await fetch(`${API_BASE}/pyq/check/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      const data: PYQCheckResult = await res.json();
      setCheckResult(data);
      const pct = data.percentage;
      const updated: MockStats = {
        tests: stats.tests + 1,
        avgScore: Math.round(((stats.avgScore * stats.tests) + pct) / (stats.tests + 1)),
        bestScore: Math.max(stats.bestScore, pct),
        streak: pct >= 60 ? stats.streak + 1 : 0,
      };
      setStats(updated);
      saveStats(updated);
    } catch {}
    setPhase('results');
  };

  const resetAll = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('browse');
    setQuestions([]);
    setAnswers({});
    setCurrent(0);
    setSelectedExam('');
    setSelectedSubject('');
    setCheckResult(null);
    setExpandedCat('');
    setMeta(null);
  };

  const examInfo = selectedExam ? findExamInfo(selectedExam) : null;
  const examLabel = examInfo ? (hi ? examInfo.exam.labelHi : examInfo.exam.label) : selectedExam;

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  /* ═══════════════════════════════════
     BROWSE — Show available mock tests
     ═══════════════════════════════════ */
  if (phase === 'browse') {
    return (
      <div className="pb-28 md:pb-8">
        {/* Stats */}
        {stats.tests > 0 && (
          <div className="flex items-center justify-between bg-gradient-to-r from-[#1a3a5c] to-[#0f2b44] rounded-xl p-4 mb-4 text-white">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-300" />
              <div>
                <p className="text-sm font-bold">{stats.tests} {hi ? 'टेस्ट पूरे' : 'Tests Completed'}</p>
                <p className="text-xs text-blue-200">{hi ? 'औसत' : 'Avg'}: {stats.avgScore}% | {hi ? 'सर्वश्रेष्ठ' : 'Best'}: {stats.bestScore}%</p>
              </div>
            </div>
            {stats.streak > 1 && (
              <span className="text-lg font-bold">{stats.streak} 🔥</span>
            )}
          </div>
        )}

        {/* Global stats */}
        {globalMeta && (
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4 flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {globalMeta.total_questions.toLocaleString()}+ {hi ? 'प्रश्न' : 'Questions'}
              </p>
              <p className="text-xs text-gray-500">{globalMeta.exams.length} {hi ? 'परीक्षाएँ' : 'exams'} • {globalMeta.subjects.length} {hi ? 'विषय' : 'subjects'}</p>
            </div>
            <Timer className="w-8 h-8 text-[#ff6f00]" />
          </div>
        )}

        {/* Exam categories */}
        <div className="space-y-3">
          {EXAM_CATEGORIES.map(cat => {
            const availableExams = cat.exams.filter(e => examCounts[e.value] >= 10);
            const totalInCat = cat.exams.reduce((s, e) => s + (examCounts[e.value] || 0), 0);
            const isExpanded = expandedCat === cat.id;

            return (
              <div key={cat.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <button
                  onClick={() => setExpandedCat(isExpanded ? '' : cat.id)}
                  className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white">{hi ? cat.labelHi : cat.label}</h3>
                    <p className="text-xs text-gray-500">
                      {availableExams.length} {hi ? 'मॉक उपलब्ध' : 'mocks available'}
                      {totalInCat > 0 && ` • ${totalInCat.toLocaleString()} ${hi ? 'प्रश्न' : 'questions'}`}
                    </p>
                  </div>
                  {availableExams.length > 0 && (
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold rounded-lg">
                      {availableExams.length}
                    </span>
                  )}
                  <ChevronDown className={cn('w-5 h-5 text-gray-400 transition-transform', isExpanded && 'rotate-180')} />
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-3 space-y-2">
                    {cat.exams.map(exam => {
                      const count = examCounts[exam.value] || 0;
                      const tpl = MOCK_TEMPLATES[exam.value];
                      return (
                        <button
                          key={exam.value}
                          onClick={() => count >= 5 && selectExam(exam.value)}
                          disabled={count < 5}
                          className={cn(
                            'w-full flex items-center justify-between px-3 py-3 rounded-xl transition-colors',
                            count >= 5
                              ? 'hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer'
                              : 'opacity-50 cursor-not-allowed'
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', cat.color)}>
                              <Timer className="w-4 h-4 text-white" />
                            </div>
                            <div className="text-left">
                              <p className="font-semibold text-sm text-gray-900 dark:text-white">
                                {hi ? exam.labelHi : exam.label}
                              </p>
                              <p className="text-xs text-gray-500">
                                {count > 0
                                  ? `${count} ${hi ? 'प्रश्न' : 'questions'}${tpl ? ` • ${tpl.questions}Q/${tpl.minutes}min` : ''}`
                                  : hi ? 'जल्द आ रहा है' : 'Coming soon'}
                              </p>
                            </div>
                          </div>
                          {count >= 5 ? (
                            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ff6f00] text-white text-xs font-bold rounded-lg">
                              <Play className="w-3 h-3" /> {hi ? 'शुरू' : 'Start'}
                            </span>
                          ) : (
                            <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs font-bold rounded-lg">
                              {hi ? 'जल्द' : 'Soon'}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════
     CONFIG — Customize test settings
     ═══════════════════════════════════ */
  if (phase === 'config') {
    return (
      <div className="pb-28 md:pb-8">
        <button onClick={resetAll} className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white mb-4">
          <ArrowLeft className="w-4 h-4" /> {hi ? 'वापस' : 'Back'}
        </button>

        <div className="bg-gradient-to-r from-[#1a3a5c] to-[#0f2b44] rounded-2xl p-5 mb-4 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Timer className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{examLabel} {hi ? 'मॉक टेस्ट' : 'Mock Test'}</h2>
              <p className="text-xs text-blue-200">
                {meta ? `${meta.total_questions} ${hi ? 'प्रश्न उपलब्ध' : 'questions available'}` : hi ? 'लोड हो रहा...' : 'Loading...'}
              </p>
            </div>
          </div>
        </div>

        {/* Subject selection */}
        {meta && meta.subjects.length > 1 && (
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-3">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
              {hi ? 'विषय चुनें' : 'Select Subject'}
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSubject('')}
                className={cn(
                  'px-3 py-2 rounded-xl text-xs font-bold transition-all',
                  !selectedSubject ? 'bg-[#ff6f00] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                )}
              >
                {hi ? 'सभी विषय' : 'All Subjects'}
              </button>
              {meta.subjects.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSubject(s)}
                  className={cn(
                    'px-3 py-2 rounded-xl text-xs font-bold transition-all',
                    selectedSubject === s ? 'bg-[#ff6f00] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Question count */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-3">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
            {hi ? 'प्रश्नों की संख्या' : 'Number of Questions'}
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {Q_OPTIONS.map(c => (
              <button
                key={c}
                onClick={() => setQCount(c)}
                className={cn(
                  'py-3 rounded-xl text-sm font-bold transition-all',
                  qCount === c ? 'bg-[#ff6f00] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Time limit */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-3">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
            {hi ? 'समय सीमा (मिनट)' : 'Time Limit (minutes)'}
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {TIME_OPTIONS.map(t => (
              <button
                key={t}
                onClick={() => setTimeMinutes(t)}
                className={cn(
                  'py-3 rounded-xl text-sm font-bold transition-all',
                  timeMinutes === t ? 'bg-red-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                )}
              >
                {t} {hi ? 'मि' : 'min'}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-3 mb-3 border border-red-200 dark:border-red-800">
            <p className="text-sm font-semibold text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Start */}
        <div className="fixed bottom-20 left-0 right-0 p-3 bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 md:static md:p-0 md:bg-transparent md:border-0 md:backdrop-blur-none md:mt-2 z-40">
          <button
            onClick={startTest}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-base shadow-lg shadow-red-500/20 active:scale-[0.98] transition-all"
          >
            <Timer className="w-5 h-5" />
            {hi ? 'मॉक टेस्ट शुरू करें' : 'Start Mock Test'} — {qCount}Q / {timeMinutes} {hi ? 'मिनट' : 'min'}
          </button>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════
     LOADING
     ═══════════════════════════ */
  if (phase === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-20" style={{ minHeight: 'calc(100dvh - 300px)' }}>
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-5 shadow-lg shadow-red-500/30">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        <p className="text-lg font-bold text-gray-900 dark:text-white">
          {hi ? 'मॉक टेस्ट तैयार हो रहा है...' : 'Preparing Mock Test...'}
        </p>
        <p className="text-sm text-gray-500 mt-1.5">{examLabel} • {qCount} {hi ? 'प्रश्न' : 'questions'}</p>
      </div>
    );
  }

  /* ═══════════════════════════════════
     TEST — Full timed mock test
     ═══════════════════════════════════ */
  if (phase === 'test') {
    const q = questions[current];
    if (!q) return null;

    return (
      <div className="flex flex-col -mb-6 sm:-mb-8" style={{ height: 'calc(100dvh - 200px)' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-2 flex-shrink-0">
          <span className="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-[11px] font-bold px-2 py-0.5 rounded-md">
            {current + 1}/{questions.length}
          </span>
          <span className="text-[11px] text-gray-500 font-semibold">{examLabel}</span>
          <div className={cn(
            'flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold',
            timeLeft <= 60 ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 animate-pulse' : 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
          )}>
            <Clock className="w-3 h-3" />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-200 dark:bg-gray-800 rounded-full flex-shrink-0 mb-3">
          <div
            className="h-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-full transition-all duration-500"
            style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-3 sm:p-4 mb-3 flex-shrink-0">
          <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-relaxed">
            {q.question_text}
          </p>
        </div>

        {/* Options */}
        <div className="flex-1 flex flex-col gap-2 justify-center min-h-0">
          {q.options.map((opt, idx) => {
            const isSel = answers[q.id] === idx;
            return (
              <button
                key={idx}
                onClick={() => setAnswers(prev => ({ ...prev, [q.id]: idx }))}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 text-left transition-all active:scale-[0.98]',
                  isSel
                    ? 'border-[#ff6f00] bg-orange-50 dark:bg-orange-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-[#ff6f00]/50'
                )}
              >
                <span className={cn(
                  'flex-shrink-0 w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center',
                  isSel ? 'bg-[#ff6f00] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                )}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-[13px] font-semibold leading-snug text-gray-900 dark:text-white break-words min-w-0">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Question nav grid */}
        <div className="flex flex-wrap gap-1 mt-2 mb-2 flex-shrink-0">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                'w-7 h-7 rounded-md text-[10px] font-bold transition-all',
                i === current ? 'bg-[#ff6f00] text-white' :
                answers[questions[i].id] !== undefined ? 'bg-green-500 text-white' :
                'bg-gray-100 dark:bg-gray-800 text-gray-500'
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Nav buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => current > 0 && setCurrent(current - 1)}
            disabled={current === 0}
            className="px-4 py-3 rounded-xl text-sm font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-30"
          >
            {hi ? 'पिछला' : 'Prev'}
          </button>
          <button
            onClick={() => current < questions.length - 1 && setCurrent(current + 1)}
            disabled={current === questions.length - 1}
            className="px-4 py-3 rounded-xl text-sm font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-30"
          >
            {hi ? 'अगला' : 'Next'}
          </button>
          <button
            onClick={submitTest}
            className="flex-1 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-red-600 to-red-700 text-white active:scale-[0.98] transition-all"
          >
            {hi ? 'जमा करें' : 'Submit'} ({Object.keys(answers).length}/{questions.length})
          </button>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════
     RESULTS
     ═══════════════════════════ */
  const score = checkResult?.score ?? 0;
  const total = checkResult?.total ?? questions.length;
  const pct = checkResult?.percentage ?? (total > 0 ? Math.round((score / total) * 100) : 0);
  const reviewItems = checkResult?.results ?? [];

  return (
    <div className="pb-28 md:pb-8">
      {/* Score card */}
      <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-6 sm:p-8 text-center text-white mb-6 shadow-xl">
        <Trophy className="w-14 h-14 mx-auto mb-3 text-yellow-300" />
        <p className="text-5xl font-extrabold">{score}/{total}</p>
        <p className="text-xl font-bold mt-2">{pct}% {pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '💪'}</p>
        <p className="text-sm opacity-80 mt-1">{examLabel} {hi ? 'मॉक टेस्ट' : 'Mock Test'}{selectedSubject ? ` • ${selectedSubject}` : ''}</p>
        <div className="mt-4 flex justify-center gap-6 text-base font-semibold">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-5 h-5 text-green-300" /> {score}</span>
          <span className="flex items-center gap-1.5"><XCircle className="w-5 h-5 text-red-300" /> {total - score}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-5 h-5 text-blue-300" /> {qCount}Q</span>
        </div>
      </div>

      {/* Review */}
      {reviewItems.length > 0 && (
        <>
          <h3 className="font-bold text-base text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> {hi ? 'समीक्षा' : 'Review Answers'}
          </h3>
          <div className="space-y-3 mb-6">
            {reviewItems.map((r, i) => (
              <div key={r.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-start gap-2.5 mb-2">
                  {r.is_correct
                    ? <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    : <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />}
                  <p className="text-sm font-bold text-gray-900 dark:text-white break-words min-w-0">{i + 1}. {r.question_text}</p>
                </div>
                <div className="ml-7 text-sm space-y-1">
                  {!r.is_correct && r.selected >= 0 && (
                    <p className="text-red-700 dark:text-red-400">
                      <span className="font-semibold">{hi ? 'आपका उत्तर' : 'Your answer'}:</span> {r.options[r.selected]}
                    </p>
                  )}
                  <p className="text-green-700 dark:text-green-400">
                    <span className="font-semibold">{hi ? 'सही उत्तर' : 'Correct answer'}:</span> {r.options[r.correct_answer]}
                  </p>
                  {r.explanation && (
                    <p className="text-gray-500 text-xs mt-1">{r.explanation}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => { setPhase('config'); setQuestions([]); setAnswers({}); setCurrent(0); setCheckResult(null); }}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold text-base active:scale-[0.98] transition-all"
        >
          <RotateCcw className="w-5 h-5" /> {hi ? 'फिर से' : 'Retry'}
        </button>
        <button
          onClick={resetAll}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-[#ff6f00] to-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all"
        >
          {hi ? 'नया टेस्ट' : 'New Test'}
        </button>
      </div>

      {/* Share + Print */}
      <div className="flex gap-3 mt-3">
        <button
          onClick={() => {
            const text = `I scored ${score}/${total} (${pct}%) on ${examLabel} Mock Test on SarkariAlert!`;
            if (navigator.share) {
              navigator.share({ title: `${examLabel} Mock Test Score`, text, url: 'https://sarkarialert.online/mock-tests' }).catch(() => {});
            } else {
              window.open(`https://wa.me/?text=${encodeURIComponent(text + '\nhttps://sarkarialert.online/mock-tests')}`, '_blank');
            }
          }}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-green-600 text-white font-bold text-sm active:scale-[0.98] transition-all"
        >
          <Share2 className="w-4 h-4" /> {hi ? 'शेयर करें' : 'Share Score'}
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold text-sm active:scale-[0.98] transition-all"
        >
          <Printer className="w-4 h-4" /> {hi ? 'प्रिंट करें' : 'Print Results'}
        </button>
      </div>
    </div>
  );
}
