'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  BookOpen, Loader2, CheckCircle2, XCircle, ArrowRight, RotateCcw,
  Trophy, TrendingUp, Clock, ChevronDown, Timer, ArrowLeft, Printer, Share2,
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { tr } from '@/lib/translations';
import { cn } from '@/lib/utils';
import {
  EXAM_CATEGORIES, findExamInfo,
  type PYQQuestion, type PYQMeta, type PYQCheckResult, type ExamCategory,
} from '@/lib/pyq-types';
import { MathText } from './MathText';
import { QuestionNotes } from './QuestionNotes';
import { trackWrongAnswer } from '@/app/revision/RevisionClient';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

type Phase = 'select_exam' | 'select_options' | 'loading' | 'playing' | 'results';
type Mode = 'practice' | 'mock';

const Q_COUNTS = [10, 20, 30, 50, 100, 200];
const MOCK_TIMES: Record<number, number> = { 10: 600, 20: 1200, 30: 1800, 50: 3000, 100: 6000, 200: 10800 }; // seconds

interface PYQStats {
  totalSessions: number;
  totalCorrect: number;
  totalQuestions: number;
  bestScore: number;
  streak: number;
}
const STATS_KEY = 'sarkari_pyq_stats';
function loadStats(): PYQStats {
  try { const r = localStorage.getItem(STATS_KEY); if (r) return JSON.parse(r); } catch {}
  return { totalSessions: 0, totalCorrect: 0, totalQuestions: 0, bestScore: 0, streak: 0 };
}
function saveStats(s: PYQStats) {
  try { localStorage.setItem(STATS_KEY, JSON.stringify(s)); } catch {}
}

export function PYQClient({ initialExam }: { initialExam?: string } = {}) {
  const { lang } = useLanguage();
  const hi = lang === 'hi';

  const [phase, setPhase] = useState<Phase>(initialExam ? 'select_options' : 'select_exam');
  const [selectedExam, setSelectedExam] = useState(initialExam || '');
  const [expandedCategory, setExpandedCategory] = useState('');
  const [mode, setMode] = useState<Mode>('practice');
  const [qCount, setQCount] = useState(20);
  const [selectedYear, setSelectedYear] = useState<number | ''>('');
  const [selectedSubject, setSelectedSubject] = useState('');

  // Meta from API
  const [meta, setMeta] = useState<PYQMeta | null>(null);
  const [metaLoading, setMetaLoading] = useState(false);

  // Questions
  const [questions, setQuestions] = useState<PYQQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [error, setError] = useState('');

  // Mock test timer
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Results
  const [checkResult, setCheckResult] = useState<PYQCheckResult | null>(null);
  const [stats, setStats] = useState<PYQStats>(loadStats());

  useEffect(() => { setStats(loadStats()); }, []);

  // Auto-fetch meta when initialExam is provided
  useEffect(() => {
    if (initialExam) fetchMeta(initialExam);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch meta when exam is selected
  const fetchMeta = useCallback(async (exam: string) => {
    setMetaLoading(true);
    try {
      const res = await fetch(`${API_BASE}/pyq/meta/?exam=${exam}`);
      const data: PYQMeta = await res.json();
      setMeta(data);
    } catch {
      setMeta(null);
    }
    setMetaLoading(false);
  }, []);

  // Start quiz
  const startQuiz = async () => {
    if (!selectedExam) return;
    setPhase('loading');
    setError('');

    const params = new URLSearchParams({ exam: selectedExam });
    if (selectedYear) params.set('year', String(selectedYear));
    if (selectedSubject) params.set('subject', selectedSubject);
    params.set('limit', String(qCount));

    const endpoint = mode === 'mock' ? 'pyq/mock' : 'pyq';

    try {
      const res = await fetch(`${API_BASE}/${endpoint}/?${params}`);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data: PYQQuestion[] = await res.json();

      if (!data.length) {
        setError(hi ? 'इस संयोजन के लिए कोई प्रश्न नहीं मिले।' : 'No questions found for this combination.');
        setPhase('select_options');
        return;
      }

      // Shuffle questions
      const shuffled = [...data].sort(() => Math.random() - 0.5);
      setQuestions(shuffled);
      setAnswers({});
      setCurrent(0);
      setSelected(null);
      setCheckResult(null);

      if (mode === 'mock') {
        const totalTime = MOCK_TIMES[qCount] || 1200;
        setTimeLeft(totalTime);
        timerRef.current = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              if (timerRef.current) clearInterval(timerRef.current);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }

      setPhase('playing');
    } catch (e) {
      setError(hi ? 'प्रश्न लोड करने में त्रुटि।' : 'Error loading questions.');
      setPhase('select_options');
    }
  };

  // Auto-submit mock when timer runs out
  useEffect(() => {
    if (mode === 'mock' && timeLeft === 0 && phase === 'playing' && questions.length > 0) {
      submitMock();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  // Cleanup timer
  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  // Practice mode: select option
  const selectOption = (idx: number) => {
    if (mode === 'practice' && selected !== null) return;
    if (mode === 'practice') {
      setSelected(idx);
      setAnswers(prev => ({ ...prev, [questions[current].id]: idx }));
    } else {
      // Mock mode: can change answer
      setAnswers(prev => ({ ...prev, [questions[current].id]: idx }));
    }
  };

  // Practice: next question
  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      finishPractice();
    }
  };

  const finishPractice = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const score = questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correct_answer ? 1 : 0);
    }, 0);
    // Track wrong answers for spaced repetition
    questions.forEach(q => {
      if (answers[q.id] !== q.correct_answer) {
        trackWrongAnswer(q.id);
      }
    });
    const pct = Math.round((score / questions.length) * 100);
    const updated: PYQStats = {
      totalSessions: stats.totalSessions + 1,
      totalCorrect: stats.totalCorrect + score,
      totalQuestions: stats.totalQuestions + questions.length,
      bestScore: Math.max(stats.bestScore, pct),
      streak: pct >= 60 ? stats.streak + 1 : 0,
    };
    setStats(updated);
    saveStats(updated);
    setPhase('results');
  };

  // Mock: submit all answers
  const submitMock = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    try {
      const res = await fetch(`${API_BASE}/pyq/check/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      const data: PYQCheckResult = await res.json();
      setCheckResult(data);
      // Track wrong answers for spaced repetition
      data.results.forEach(r => {
        if (!r.is_correct) {
          trackWrongAnswer(r.id);
        }
      });
      const pct = data.percentage;
      const updated: PYQStats = {
        totalSessions: stats.totalSessions + 1,
        totalCorrect: stats.totalCorrect + data.score,
        totalQuestions: stats.totalQuestions + data.total,
        bestScore: Math.max(stats.bestScore, pct),
        streak: pct >= 60 ? stats.streak + 1 : 0,
      };
      setStats(updated);
      saveStats(updated);
    } catch {
      // Fall through to results
    }
    setPhase('results');
  };

  const resetQuiz = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('select_exam');
    setQuestions([]);
    setAnswers({});
    setCurrent(0);
    setSelected(null);
    setSelectedExam('');
    setSelectedYear('');
    setSelectedSubject('');
    setCheckResult(null);
    setExpandedCategory('');
    setMeta(null);
  };

  const goBackToOptions = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setPhase('select_options');
    setQuestions([]);
    setAnswers({});
    setCurrent(0);
    setSelected(null);
  };

  const examInfo = selectedExam ? findExamInfo(selectedExam) : null;
  const examLabel = examInfo ? (hi ? examInfo.exam.labelHi : examInfo.exam.label) : selectedExam;

  const practiceScore = questions.reduce((acc, q) => acc + (answers[q.id] === q.correct_answer ? 1 : 0), 0);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  /* ═══════════════════════════════════════
     SELECT EXAM — Category grid
     ═══════════════════════════════════════ */
  if (phase === 'select_exam') {
    return (
      <div className="pb-28 md:pb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gov-saffron flex items-center justify-center shadow-lg shadow-orange-500/20">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">
            {hi ? 'PYQ अभ्यास' : 'PYQ Practice'}
          </h1>
        </div>
        <p className="text-sm text-muted mb-5">
          {hi ? 'पिछले वर्षों के प्रश्नपत्र — वर्ष, विषय चुनें और अभ्यास करें' : 'Previous Year Questions — select exam, year, subject and practice'}
        </p>

        {/* Stats bar */}
        {stats.totalSessions > 0 && (
          <div className="flex items-center justify-between bg-surface rounded-xl border border-border px-4 py-3 mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold text-foreground">{stats.totalSessions} {hi ? 'सत्र' : 'sessions'}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted font-semibold">
              <span>{stats.totalQuestions > 0 ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100) : 0}%</span>
              <span>{hi ? 'सर्वश्रेष्ठ' : 'Best'}: {stats.bestScore}%</span>
              {stats.streak > 1 && <span className="text-orange-500">{stats.streak}🔥</span>}
            </div>
          </div>
        )}

        {/* Category cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {EXAM_CATEGORIES.map(cat => (
            <div key={cat.id}>
              <button
                onClick={() => setExpandedCategory(expandedCategory === cat.id ? '' : cat.id)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-3.5 rounded-xl border-2 text-left transition-all active:scale-[0.98]',
                  expandedCategory === cat.id
                    ? 'border-gov-saffron bg-orange-50 dark:bg-orange-900/15'
                    : 'border-border bg-surface hover:border-gov-saffron/50'
                )}
              >
                <span className="text-xl">{cat.icon}</span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-foreground truncate">
                    {hi ? cat.labelHi : cat.label}
                  </p>
                  <p className="text-[10px] text-muted">{cat.exams.length} {hi ? 'परीक्षाएँ' : 'exams'}</p>
                </div>
                <ChevronDown className={cn(
                  'w-3.5 h-3.5 text-muted ml-auto transition-transform',
                  expandedCategory === cat.id && 'rotate-180'
                )} />
              </button>

              {/* Expanded exam list */}
              {expandedCategory === cat.id && (
                <div className="mt-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  {cat.exams.map(exam => (
                    <button
                      key={exam.value}
                      onClick={() => {
                        setSelectedExam(exam.value);
                        fetchMeta(exam.value);
                        setSelectedYear('');
                        setSelectedSubject('');
                        setPhase('select_options');
                      }}
                      className="w-full px-3 py-2.5 rounded-lg text-xs font-bold text-left bg-surface-hover hover:bg-gov-saffron/10 transition-all active:scale-[0.98] text-foreground"
                    >
                      {hi ? exam.labelHi : exam.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════
     SELECT OPTIONS — Year, Subject, Mode
     ═══════════════════════════════════════ */
  if (phase === 'select_options') {
    return (
      <div className="pb-28 md:pb-8">
        <button
          onClick={resetQuiz}
          className="flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> {hi ? 'वापस' : 'Back'}
        </button>

        <div className="bg-surface rounded-2xl border border-border p-4 mb-4">
          <h2 className="text-lg font-bold text-foreground mb-1">{examLabel}</h2>
          <p className="text-xs text-muted">
            {meta ? `${meta.total_questions} ${hi ? 'प्रश्न उपलब्ध' : 'questions available'}` : ''}
          </p>
        </div>

        {metaLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted" />
          </div>
        ) : (
          <>
            {/* Year selection */}
            {meta && meta.years.length > 0 && (
              <div className="bg-surface rounded-2xl border border-border p-4 mb-3">
                <h3 className="text-sm font-bold text-foreground mb-3">
                  {hi ? 'वर्ष चुनें' : 'Select Year'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedYear('')}
                    className={cn(
                      'px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95',
                      !selectedYear
                        ? 'bg-gov-saffron text-white ring-2 ring-gov-saffron ring-offset-2 ring-offset-surface'
                        : 'bg-surface-hover text-foreground'
                    )}
                  >
                    {hi ? 'सभी वर्ष' : 'All Years'}
                  </button>
                  {meta.years.map(y => (
                    <button
                      key={y}
                      onClick={() => setSelectedYear(y)}
                      className={cn(
                        'px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95',
                        selectedYear === y
                          ? 'bg-gov-saffron text-white ring-2 ring-gov-saffron ring-offset-2 ring-offset-surface'
                          : 'bg-surface-hover text-foreground'
                      )}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Subject selection */}
            {meta && meta.subjects.length > 0 && (
              <div className="bg-surface rounded-2xl border border-border p-4 mb-3">
                <h3 className="text-sm font-bold text-foreground mb-3">
                  {hi ? 'विषय चुनें' : 'Select Subject'}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedSubject('')}
                    className={cn(
                      'px-3 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95',
                      !selectedSubject
                        ? 'bg-indigo-600 text-white ring-2 ring-indigo-600 ring-offset-2 ring-offset-surface'
                        : 'bg-surface-hover text-foreground'
                    )}
                  >
                    {hi ? 'सभी विषय' : 'All Subjects'}
                  </button>
                  {meta.subjects.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSubject(s)}
                      className={cn(
                        'px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all active:scale-95',
                        selectedSubject === s
                          ? 'bg-indigo-600 text-white ring-2 ring-indigo-600 ring-offset-2 ring-offset-surface'
                          : 'bg-surface-hover text-foreground'
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mode toggle */}
            <div className="bg-surface rounded-2xl border border-border p-4 mb-3">
              <h3 className="text-sm font-bold text-foreground mb-3">
                {hi ? 'मोड चुनें' : 'Select Mode'}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setMode('practice')}
                  className={cn(
                    'flex flex-col items-center gap-1.5 px-3 py-3.5 rounded-xl transition-all active:scale-95',
                    mode === 'practice'
                      ? 'bg-green-600 text-white ring-2 ring-green-600 ring-offset-2 ring-offset-surface'
                      : 'bg-surface-hover text-foreground'
                  )}
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="text-xs font-bold">{hi ? 'अभ्यास' : 'Practice'}</span>
                  <span className="text-[10px] opacity-70">{hi ? 'तुरंत उत्तर' : 'Instant feedback'}</span>
                </button>
                <button
                  onClick={() => setMode('mock')}
                  className={cn(
                    'flex flex-col items-center gap-1.5 px-3 py-3.5 rounded-xl transition-all active:scale-95',
                    mode === 'mock'
                      ? 'bg-red-600 text-white ring-2 ring-red-600 ring-offset-2 ring-offset-surface'
                      : 'bg-surface-hover text-foreground'
                  )}
                >
                  <Timer className="w-5 h-5" />
                  <span className="text-xs font-bold">{hi ? 'मॉक टेस्ट' : 'Mock Test'}</span>
                  <span className="text-[10px] opacity-70">{hi ? 'टाइमर + अंत में स्कोर' : 'Timed + score at end'}</span>
                </button>
              </div>
            </div>

            {/* Question count */}
            <div className="bg-surface rounded-2xl border border-border p-4 mb-3">
              <h3 className="text-sm font-bold text-foreground mb-3">
                {hi ? 'प्रश्नों की संख्या' : 'Number of Questions'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {Q_COUNTS.map(c => (
                  <button
                    key={c}
                    onClick={() => setQCount(c)}
                    className={cn(
                      'px-4 py-3 rounded-xl text-sm font-bold transition-all active:scale-95',
                      qCount === c
                        ? 'bg-gov-saffron text-white ring-2 ring-gov-saffron ring-offset-2 ring-offset-surface'
                        : 'bg-surface-hover text-foreground'
                    )}
                  >
                    {c}
                  </button>
                ))}
                <button
                  onClick={() => setQCount(meta?.total_questions || 1000)}
                  className={cn(
                    'px-4 py-3 rounded-xl text-sm font-bold transition-all active:scale-95',
                    !Q_COUNTS.includes(qCount)
                      ? 'bg-gov-saffron text-white ring-2 ring-gov-saffron ring-offset-2 ring-offset-surface'
                      : 'bg-surface-hover text-foreground'
                  )}
                >
                  {hi ? 'सभी' : 'All'}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-3 mb-3 border border-red-200 dark:border-red-800">
                <p className="text-sm font-semibold text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            {/* Start button — safe-area aware for bottom nav */}
            <div className="fixed bottom-[4.5rem] md:bottom-0 left-0 right-0 p-3 pb-4 bg-surface/95 backdrop-blur-lg border-t border-border md:static md:p-0 md:bg-transparent md:border-0 md:backdrop-blur-none md:mt-2 z-40">
              <button
                onClick={startQuiz}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-gov-saffron to-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all"
              >
                {mode === 'mock' ? <Timer className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                {hi ? 'शुरू करें' : 'Start'} — {qCount}Q
                {mode === 'mock' && ` (${formatTime(MOCK_TIMES[qCount] || 1200)})`}
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  /* ═══════════════════════════
     LOADING
     ═══════════════════════════ */
  if (phase === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-20" style={{ minHeight: 'calc(100dvh - 200px)' }}>
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gov-saffron to-orange-600 flex items-center justify-center mb-5 shadow-lg shadow-orange-500/30">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        <p className="text-lg font-bold text-foreground">
          {hi ? 'प्रश्न लोड हो रहे हैं...' : 'Loading questions...'}
        </p>
        <p className="text-sm text-muted mt-1.5">{examLabel}</p>
      </div>
    );
  }

  /* ═══════════════════════════════════════
     PLAYING — Practice or Mock
     ═══════════════════════════════════════ */
  if (phase === 'playing') {
    const q = questions[current];
    if (!q) return null;

    const answeredThisQ = answers[q.id] !== undefined;

    // Mock mode: question navigator
    if (mode === 'mock') {
      return (
        <div className="pb-28 md:pb-8">
          {/* Header: timer + progress */}
          <div className="flex items-center justify-between mb-2">
            <span className="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-[11px] font-bold px-2 py-0.5 rounded-md">
              {current + 1}/{questions.length}
            </span>
            <span className="text-[11px] text-muted font-semibold">{examLabel}</span>
            <div className={cn(
              'flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold',
              timeLeft <= 60 ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300' : 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
            )}>
              <Clock className="w-3 h-3" />
              {formatTime(timeLeft)}
            </div>
          </div>
          <div className="h-1 bg-surface-hover rounded-full mb-3">
            <div
              className="h-1 bg-gradient-to-r from-gov-saffron to-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${((Object.keys(answers).length) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question */}
          <div className="bg-surface rounded-xl border border-border p-3 sm:p-4 mb-3">
            <p className="text-sm sm:text-base font-bold text-foreground leading-relaxed">
              <MathText text={q.question_text} />
            </p>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-2 mb-4">
            {q.options.map((opt, idx) => {
              const isSel = answers[q.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => selectOption(idx)}
                  className={cn(
                    'w-full flex items-center gap-2.5 px-3 py-3 rounded-xl border-2 text-left transition-all active:scale-[0.98]',
                    isSel
                      ? 'border-gov-saffron bg-orange-50 dark:bg-orange-900/20'
                      : 'border-border bg-surface hover:border-gov-saffron/50'
                  )}
                >
                  <span className={cn(
                    'flex-shrink-0 w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center',
                    isSel ? 'bg-gov-saffron text-white' : 'bg-surface-hover text-muted'
                  )}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-[13px] font-semibold leading-snug text-foreground break-words min-w-0"><MathText text={opt} /></span>
                </button>
              );
            })}
          </div>

          {/* Question nav + submit — fixed bottom on mobile */}
          <div className="fixed bottom-[4.5rem] md:bottom-0 left-0 right-0 p-3 pb-4 bg-surface/95 backdrop-blur-lg border-t border-border md:static md:p-0 md:bg-transparent md:border-0 md:backdrop-blur-none z-40">
            <div className="flex items-center gap-2">
              <button
                onClick={() => { if (current > 0) { setCurrent(current - 1); } }}
                disabled={current === 0}
                className="px-3 py-3 rounded-xl text-sm font-bold bg-surface-hover text-foreground disabled:opacity-30 border border-border"
              >
                {hi ? '←' : '←'}
              </button>
              <button
                onClick={() => { if (current < questions.length - 1) setCurrent(current + 1); }}
                disabled={current === questions.length - 1}
                className="px-3 py-3 rounded-xl text-sm font-bold bg-surface-hover text-foreground disabled:opacity-30 border border-border"
              >
                {hi ? '→' : '→'}
              </button>
              <button
                onClick={submitMock}
                className="flex-1 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-red-600 to-red-700 text-white active:scale-[0.98] transition-all shadow-lg"
              >
                {hi ? 'जमा करें' : 'Submit'} ({Object.keys(answers).length}/{questions.length})
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Practice mode
    return (
      <div className="pb-28 md:pb-8">
        {/* Progress */}
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <span className="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-[11px] font-bold px-2 py-0.5 rounded-md">
              {current + 1}/{questions.length}
            </span>
            <span className="text-[11px] text-muted font-semibold">{examLabel}</span>
          </div>
          {selectedSubject && <span className="text-[11px] text-muted font-semibold">{selectedSubject}</span>}
        </div>
        <div className="h-1 bg-surface-hover rounded-full mb-3">
          <div
            className="h-1 bg-gradient-to-r from-gov-saffron to-orange-500 rounded-full transition-all duration-500"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="bg-surface rounded-xl border border-border p-3 sm:p-4 mb-3">
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
            {q.year && (
              <span className="inline-block text-[10px] font-bold text-gov-saffron bg-orange-100 dark:bg-orange-900/30 px-1.5 py-0.5 rounded">
                {q.year}
              </span>
            )}
            {q.source === 'ai_generated' ? (
              <span
                className="inline-block text-[10px] font-bold text-purple-700 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-200 px-1.5 py-0.5 rounded"
                title="Written by AI in the style of this exam. Not from an actual paper."
              >
                Practice (AI)
              </span>
            ) : (
              <span
                className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-200 px-1.5 py-0.5 rounded"
                title={q.is_verified ? 'From an official paper with the official answer key' : 'From a previous year paper (community-parsed)'}
              >
                {q.is_verified ? 'Official paper' : 'Previous year'}
              </span>
            )}
          </div>
          <p className="text-sm sm:text-base font-bold text-foreground leading-relaxed">
            <MathText text={q.question_text} />
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-2 mb-3">
          {q.options.map((opt, idx) => {
            const isSel = selected === idx;
            const isCorr = idx === q.correct_answer;
            const done = selected !== null;

            let optClasses = 'border-border bg-surface hover:border-gov-saffron/50';
            if (done && isCorr) optClasses = 'border-green-500 bg-green-50 dark:bg-green-900/20';
            else if (done && isSel && !isCorr) optClasses = 'border-red-500 bg-red-50 dark:bg-red-900/20';
            else if (done && !isCorr && !isSel) optClasses = 'border-border bg-surface opacity-40';

            return (
              <button
                key={idx}
                onClick={() => selectOption(idx)}
                disabled={done}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-3 rounded-xl border-2 text-left transition-all active:scale-[0.98]',
                  optClasses,
                )}
              >
                <span className={cn(
                  'flex-shrink-0 w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center',
                  done && isCorr ? 'bg-green-500 text-white' :
                  done && isSel ? 'bg-red-500 text-white' :
                  'bg-surface-hover text-muted'
                )}>
                  {done && isCorr ? <CheckCircle2 className="w-4 h-4" /> :
                   done && isSel ? <XCircle className="w-4 h-4" /> :
                   String.fromCharCode(65 + idx)}
                </span>
                <span className={cn(
                  'text-[13px] font-semibold leading-snug break-words min-w-0',
                  done && isCorr ? 'text-green-800 dark:text-green-200' :
                  done && isSel && !isCorr ? 'text-red-800 dark:text-red-200' :
                  done && !isCorr && !isSel ? 'text-muted' :
                  'text-foreground'
                )}>
                  <MathText text={opt} />
                </span>
              </button>
            );
          })}
        </div>

        {/* Explanation — visible after answer, scrollable */}
        {selected !== null && q.explanation && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl px-3 py-3 mb-3 border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
              <span className="font-bold">{tr('quiz.explanation', lang)}:</span> {q.explanation}
            </p>
          </div>
        )}

        {/* Notes */}
        {selected !== null && (
          <div className="mb-3">
            <QuestionNotes questionId={String(q.id)} />
          </div>
        )}

        {/* Next/Submit button — fixed on mobile, static on desktop */}
        <div className="fixed bottom-[4.5rem] md:bottom-0 left-0 right-0 p-3 pb-4 bg-surface/95 backdrop-blur-lg border-t border-border md:static md:p-0 md:bg-transparent md:border-0 md:backdrop-blur-none z-40">
          <button
            onClick={selected !== null ? nextQuestion : undefined}
            disabled={selected === null}
            className={cn(
              'w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all',
              selected !== null
                ? 'bg-gradient-to-r from-gov-saffron to-orange-600 text-white shadow-lg shadow-orange-500/20 active:scale-[0.98]'
                : 'bg-surface-hover text-muted cursor-not-allowed'
            )}
          >
            {selected === null ? (
              hi ? 'उत्तर चुनें' : 'Select an answer'
            ) : current < questions.length - 1 ? (
              <>{tr('quiz.next', lang)} <ArrowRight className="w-4 h-4" /></>
            ) : (
              <>{tr('quiz.submit', lang)} <Trophy className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════
     RESULTS
     ═══════════════════════════ */
  const score = mode === 'mock' && checkResult ? checkResult.score : practiceScore;
  const total = mode === 'mock' && checkResult ? checkResult.total : questions.length;
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  // For review: use checkResult in mock mode, or questions directly in practice
  const reviewItems = mode === 'mock' && checkResult
    ? checkResult.results
    : questions.map(q => ({
        id: q.id,
        question_text: q.question_text,
        options: q.options,
        correct_answer: q.correct_answer!,
        selected: answers[q.id] ?? -1,
        is_correct: answers[q.id] === q.correct_answer,
        explanation: q.explanation || '',
      }));

  return (
    <div className="pb-28 md:pb-8">
      {/* Score card */}
      <div className="bg-gradient-to-br from-gov-saffron to-orange-700 rounded-2xl p-6 sm:p-8 text-center text-white mb-6 shadow-xl">
        <Trophy className="w-14 h-14 mx-auto mb-3 text-yellow-300" />
        <p className="text-5xl font-extrabold">{score}/{total}</p>
        <p className="text-xl font-bold mt-2">{pct}% {pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '💪'}</p>
        <p className="text-sm opacity-80 mt-1">{examLabel}{selectedSubject ? ` • ${selectedSubject}` : ''}{selectedYear ? ` • ${selectedYear}` : ''}</p>
        <div className="mt-4 flex justify-center gap-6 text-base font-semibold">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-5 h-5 text-green-300" /> {score}</span>
          <span className="flex items-center gap-1.5"><XCircle className="w-5 h-5 text-red-300" /> {total - score}</span>
        </div>
      </div>

      {/* Review */}
      <h3 className="font-bold text-base text-foreground mb-3 flex items-center gap-2">
        <BookOpen className="w-5 h-5" /> {tr('quiz.correctAnswer', lang)}
      </h3>
      <div className="space-y-3 mb-6">
        {reviewItems.map((r, i) => {
          const ok = r.is_correct;
          return (
            <div key={r.id} className="bg-surface rounded-2xl border border-border p-4">
              <div className="flex items-start gap-2.5 mb-2">
                {ok ? <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" /> : <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />}
                <p className="text-sm font-bold text-foreground break-words min-w-0">{i + 1}. <MathText text={r.question_text} /></p>
              </div>
              <div className="ml-7 text-sm space-y-1">
                {!ok && r.selected >= 0 && (
                  <p className="text-red-700 dark:text-red-400 break-words">
                    <span className="font-semibold">{tr('quiz.yourAnswer', lang)}:</span> <MathText text={r.options[r.selected]} />
                  </p>
                )}
                <p className="text-green-700 dark:text-green-400 break-words">
                  <span className="font-semibold">{tr('quiz.correctAnswer', lang)}:</span> <MathText text={r.options[r.correct_answer]} />
                </p>
                {r.explanation && (
                  <p className="text-muted text-xs mt-1">{r.explanation}</p>
                )}
                <div className="mt-2">
                  <QuestionNotes questionId={String(r.id)} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={goBackToOptions}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-surface border-2 border-border text-foreground font-bold text-base active:scale-[0.98] transition-all"
        >
          <RotateCcw className="w-5 h-5" /> {hi ? 'फिर से' : 'Retry'}
        </button>
        <button
          onClick={resetQuiz}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-gov-saffron to-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all"
        >
          {hi ? 'नई परीक्षा' : 'New Exam'}
        </button>
      </div>

      {/* Share + Print */}
      <div className="flex gap-3 mt-3">
        <button
          onClick={() => {
            const text = `I scored ${score}/${total} (${pct}%) on ${examLabel} PYQ Practice on SarkariAlert!`;
            if (navigator.share) {
              navigator.share({ title: `${examLabel} PYQ Score`, text, url: 'https://sarkarialert.online/pyq' }).catch(() => {});
            } else {
              window.open(`https://wa.me/?text=${encodeURIComponent(text + '\nhttps://sarkarialert.online/pyq')}`, '_blank');
            }
          }}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-green-600 text-white font-bold text-sm active:scale-[0.98] transition-all"
        >
          <Share2 className="w-4 h-4" /> {hi ? 'शेयर करें' : 'Share Score'}
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-surface border-2 border-border text-foreground font-bold text-sm active:scale-[0.98] transition-all"
        >
          <Printer className="w-4 h-4" /> {hi ? 'PDF डाउनलोड' : 'Download PDF'}
        </button>
      </div>
    </div>
  );
}
