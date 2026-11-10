'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Loader2, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, BookOpen, ChevronRight, TrendingUp, Brain } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { tr } from '@/lib/translations';
import { EXAM_OPTIONS, type QuizQuestion } from '@/lib/static-quizzes';
import { getSubjects } from '@/lib/quiz-data';
import { cn } from '@/lib/utils';

type Phase = 'setup' | 'loading' | 'playing' | 'results';

interface QuizStats {
  totalQuizzes: number;
  totalCorrect: number;
  totalQuestions: number;
  streak: number;
  bestScore: number;
}

const STATS_KEY = 'sarkari_quiz_stats';
const Q_COUNTS = [5, 10, 20, 30];

function loadStats(): QuizStats {
  try { const r = localStorage.getItem(STATS_KEY); if (r) return JSON.parse(r); } catch {}
  return { totalQuizzes: 0, totalCorrect: 0, totalQuestions: 0, streak: 0, bestScore: 0 };
}
function saveStats(s: QuizStats) {
  try { localStorage.setItem(STATS_KEY, JSON.stringify(s)); } catch {}
}
function getRank(s: QuizStats) {
  const p = s.totalQuestions > 0 ? (s.totalCorrect / s.totalQuestions) * 100 : 0;
  if (s.totalQuizzes >= 50 && p >= 80) return { en: 'Champion', hi: 'चैंपियन', color: 'text-yellow-500' };
  if (s.totalQuizzes >= 30 && p >= 70) return { en: 'Expert', hi: 'विशेषज्ञ', color: 'text-purple-500' };
  if (s.totalQuizzes >= 15 && p >= 60) return { en: 'Pro', hi: 'प्रो', color: 'text-blue-500' };
  if (s.totalQuizzes >= 5) return { en: 'Rising Star', hi: 'उभरता सितारा', color: 'text-green-500' };
  return { en: 'Beginner', hi: 'शुरुआती', color: 'text-muted' };
}

export function QuizClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';
  const [phase, setPhase] = useState<Phase>('setup');
  const [exam, setExam] = useState('');
  const [subject, setSubject] = useState('');
  const [chapter, setChapter] = useState('');
  const [qCount, setQCount] = useState(10);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [stats, setStats] = useState<QuizStats>(loadStats());

  useEffect(() => { setStats(loadStats()); }, []);

  const subjects = exam ? getSubjects(exam) : [];
  const currentSubject = subjects.find(s => s.value === subject);
  const chapters = currentSubject?.chapters || [];

  const handleExamChange = (v: string) => { setExam(v); setSubject(''); setChapter(''); };
  const handleSubjectChange = (v: string) => { setSubject(v); setChapter(''); };

  const currentChapter = chapters.find(c => c.value === chapter);
  const topicForApi = currentChapter
    ? `${currentSubject?.label || subject} - ${currentChapter.label}`
    : currentSubject?.label || subject;

  const generateQuiz = async () => {
    if (!exam || !subject) return;
    setPhase('loading'); setError('');
    try {
      const res = await fetch('/api/ai-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam, topic: topicForApi, lang, count: qCount }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); setPhase('setup'); return; }
      setQuestions(data.questions);
      setAnswers(new Array(data.questions.length).fill(null));
      setCurrent(0); setSelected(null); setPhase('playing');
    } catch {
      setError(tr('common.error', lang)); setPhase('setup');
    }
  };

  const selectOption = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const a = [...answers]; a[current] = idx; setAnswers(a);
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) { setCurrent(current + 1); setSelected(null); }
    else {
      const s = answers.filter((a, i) => a === questions[i]?.correct).length;
      const pct = Math.round((s / questions.length) * 100);
      const updated: QuizStats = {
        totalQuizzes: stats.totalQuizzes + 1,
        totalCorrect: stats.totalCorrect + s,
        totalQuestions: stats.totalQuestions + questions.length,
        streak: pct >= 60 ? stats.streak + 1 : 0,
        bestScore: Math.max(stats.bestScore, pct),
      };
      setStats(updated); saveStats(updated);
      setPhase('results');
    }
  };

  const resetQuiz = () => {
    setPhase('setup'); setQuestions([]); setAnswers([]); setCurrent(0); setSelected(null);
  };

  const score = answers.filter((a, i) => a === questions[i]?.correct).length;
  const examLabel = EXAM_OPTIONS.find(e => e.value === exam)?.[hi ? 'label_hi' : 'label'] || exam;
  const subjectLabel = currentSubject?.[hi ? 'labelHi' : 'label'] || subject;

  const classOpts = EXAM_OPTIONS.filter(e => e.value.startsWith('class_'));
  const compOpts = EXAM_OPTIONS.filter(e => !e.value.startsWith('class_'));

  /* ═══════════════════════════════════════════════════
     SETUP
     ═══════════════════════════════════════════════════ */
  if (phase === 'setup') {
    const rank = getRank(stats);
    return (
      <div className="pb-28 md:pb-8">
        {/* Page heading — matches tools page style */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">
            {hi ? 'AI क्विज़' : 'AI Quiz'}
          </h1>
        </div>
        <p className="text-sm text-muted mb-5">
          {hi ? 'कक्षा 1-12, SSC, UPSC, Railway — AI से प्रश्न बनाएं और अभ्यास करें' : 'Class 1-12, SSC, UPSC, Railway — AI-generated MCQ practice'}
        </p>

        {/* Stats bar */}
        {stats.totalQuizzes > 0 && (
          <div className="flex items-center justify-between bg-surface rounded-xl border border-border px-4 py-3 mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <span className={cn('text-sm font-bold', rank.color)}>{hi ? rank.hi : rank.en}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted font-semibold">
              <span>{stats.totalQuizzes} {hi ? 'क्विज़' : 'quizzes'}</span>
              <span>{stats.totalQuestions > 0 ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100) : 0}%</span>
              {stats.streak > 1 && <span className="text-orange-500">{stats.streak}🔥</span>}
            </div>
          </div>
        )}

        {/* Step 1: Class or Exam */}
        <div className="bg-surface rounded-2xl border border-border p-4 mb-3">
          <h3 className="text-sm font-bold text-foreground mb-3">
            {hi ? '① कक्षा या परीक्षा चुनें' : '① Select Class or Exam'}
          </h3>

          <p className="text-[11px] font-bold text-muted mb-2 uppercase tracking-wider">{hi ? 'कक्षा' : 'Class'}</p>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-4">
            {classOpts.map(e => (
              <button
                key={e.value}
                onClick={() => handleExamChange(e.value)}
                className={cn(
                  'h-11 rounded-xl text-sm font-bold transition-all active:scale-95',
                  exam === e.value
                    ? 'bg-purple-600 text-white ring-2 ring-purple-600 ring-offset-2 ring-offset-surface'
                    : 'bg-surface-hover text-foreground hover:bg-purple-50 dark:hover:bg-purple-900/20'
                )}
              >
                {e.value.replace('class_', '')}
              </button>
            ))}
          </div>

          <p className="text-[11px] font-bold text-muted mb-2 uppercase tracking-wider">{hi ? 'प्रतियोगी परीक्षा' : 'Competitive Exam'}</p>
          <div className="flex flex-wrap gap-2">
            {compOpts.map(e => (
              <button
                key={e.value}
                onClick={() => handleExamChange(e.value)}
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95',
                  exam === e.value
                    ? 'bg-purple-600 text-white ring-2 ring-purple-600 ring-offset-2 ring-offset-surface'
                    : 'bg-surface-hover text-foreground hover:bg-purple-50 dark:hover:bg-purple-900/20'
                )}
              >
                {hi ? e.label_hi : e.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Subject */}
        {exam && (
          <div className="bg-surface rounded-2xl border border-border p-4 mb-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <h3 className="text-sm font-bold text-foreground mb-3">
              {hi ? '② विषय चुनें' : '② Select Subject'}
              <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold ml-2">— {examLabel}</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {subjects.map(s => (
                <button
                  key={s.value}
                  onClick={() => handleSubjectChange(s.value)}
                  className={cn(
                    'flex items-center justify-between px-3.5 py-3 rounded-xl text-left transition-all active:scale-95',
                    subject === s.value
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-600 ring-offset-2 ring-offset-surface'
                      : 'bg-surface-hover text-foreground hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
                  )}
                >
                  <span className="text-xs font-bold">{hi ? s.labelHi : s.label}</span>
                  {s.chapters && s.chapters.length > 0 && (
                    <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2.5: Chapter */}
        {subject && chapters.length > 0 && (
          <div className="bg-surface rounded-2xl border border-border p-4 mb-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <h3 className="text-sm font-bold text-foreground mb-3">
              {hi ? 'अध्याय चुनें (वैकल्पिक)' : 'Select Chapter (optional)'}
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold ml-2">— {subjectLabel}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setChapter('')}
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95',
                  !chapter
                    ? 'bg-teal-600 text-white ring-2 ring-teal-600 ring-offset-2 ring-offset-surface'
                    : 'bg-surface-hover text-foreground'
                )}
              >
                {hi ? 'सभी अध्याय' : 'All Chapters'}
              </button>
              {chapters.map(c => (
                <button
                  key={c.value}
                  onClick={() => setChapter(c.value)}
                  className={cn(
                    'px-3.5 py-2 rounded-xl text-xs font-bold transition-all active:scale-95',
                    chapter === c.value
                      ? 'bg-teal-600 text-white ring-2 ring-teal-600 ring-offset-2 ring-offset-surface'
                      : 'bg-surface-hover text-foreground'
                  )}
                >
                  {hi ? c.labelHi : c.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Count */}
        {exam && subject && (
          <div className="bg-surface rounded-2xl border border-border p-4 mb-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <h3 className="text-sm font-bold text-foreground mb-3">
              {hi ? '③ कितने प्रश्न' : '③ Number of Questions'}
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {Q_COUNTS.map(c => (
                <button
                  key={c}
                  onClick={() => setQCount(c)}
                  className={cn(
                    'py-3 rounded-xl text-sm font-bold transition-all active:scale-95',
                    qCount === c
                      ? 'bg-gov-saffron text-white ring-2 ring-gov-saffron ring-offset-2 ring-offset-surface'
                      : 'bg-surface-hover text-foreground'
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-3 mb-3 border border-red-200 dark:border-red-800">
            <p className="text-sm font-semibold text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Generate button — fixed on mobile, inline on desktop */}
        {exam && subject && (
          <div className="fixed bottom-20 left-0 right-0 p-3 bg-surface/95 backdrop-blur-lg border-t border-border md:static md:p-0 md:bg-transparent md:border-0 md:backdrop-blur-none md:mt-2 z-40">
            <button
              onClick={generateQuiz}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-base shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-5 h-5" />
              {hi ? 'क्विज़ शुरू करें' : 'Start Quiz'} — {qCount}Q
            </button>
          </div>
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
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-5 shadow-lg shadow-purple-500/30">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        <p className="text-lg font-bold text-foreground">{tr('quiz.generating', lang)}</p>
        <p className="text-sm text-muted mt-1.5">{examLabel} — {subjectLabel} — {qCount}Q</p>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════
     PLAYING
     ═══════════════════════════════════════════════════════════ */
  if (phase === 'playing') {
    const q = questions[current];
    if (!q) return null;

    return (
      <div className="flex flex-col -mb-6 sm:-mb-8" style={{ height: 'calc(100dvh - 152px)' }}>
        {/* Progress — compact */}
        <div className="flex items-center justify-between mb-1.5 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-[11px] font-bold px-2 py-0.5 rounded-md">
              {current + 1}/{questions.length}
            </span>
            <span className="text-[11px] text-muted font-semibold">{examLabel}</span>
          </div>
          <span className="text-[11px] text-muted font-semibold">{subjectLabel}</span>
        </div>
        <div className="h-1 bg-surface-hover rounded-full flex-shrink-0 mb-3">
          <div
            className="h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question — compact card */}
        <div className="bg-surface rounded-xl border border-border p-3 sm:p-4 mb-3 flex-shrink-0">
          <p className="text-sm sm:text-base font-bold text-foreground leading-relaxed">
            {q.question}
          </p>
        </div>

        {/* Options — fill remaining space, vertically centered */}
        <div className="flex-1 flex flex-col gap-2 justify-center min-h-0">
          {q.options.map((opt, idx) => {
            const isSel = selected === idx;
            const isCorr = idx === q.correct;
            const done = selected !== null;

            let optClasses = 'border-border bg-surface hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/10';
            if (done && isCorr) optClasses = 'border-green-500 bg-green-50 dark:bg-green-900/20';
            else if (done && isSel && !isCorr) optClasses = 'border-red-500 bg-red-50 dark:bg-red-900/20';
            else if (done && !isCorr && !isSel) optClasses = 'border-border bg-surface opacity-40';

            let labelClasses = 'text-foreground';
            if (done && isCorr) labelClasses = 'text-green-800 dark:text-green-200';
            else if (done && isSel && !isCorr) labelClasses = 'text-red-800 dark:text-red-200';
            else if (done && !isCorr && !isSel) labelClasses = 'text-muted';

            return (
              <button
                key={idx}
                onClick={() => selectOption(idx)}
                disabled={done}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 text-left transition-all active:scale-[0.98]',
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
                <span className={cn('text-[13px] font-semibold leading-snug', labelClasses)}>
                  {opt}
                </span>
              </button>
            );
          })}
        </div>

        {/* Explanation — compact, only after answer */}
        {selected !== null && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl px-3 py-2 my-2 border border-blue-200 dark:border-blue-800 flex-shrink-0">
            <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed line-clamp-2">
              <span className="font-bold">{tr('quiz.explanation', lang)}:</span> {q.explanation}
            </p>
          </div>
        )}

        {/* Next button — pinned at bottom */}
        <button
          onClick={selected !== null ? nextQuestion : undefined}
          disabled={selected === null}
          className={cn(
            'w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 flex-shrink-0 transition-all',
            selected !== null
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20 active:scale-[0.98]'
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
    );
  }

  /* ═══════════════════════════
     RESULTS
     ═══════════════════════════ */
  const rank = getRank(stats);
  const pct = Math.round((score / questions.length) * 100);
  return (
    <div className="pb-28 md:pb-8">
      {/* Score card */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-center text-white mb-6 shadow-xl">
        <Trophy className="w-14 h-14 mx-auto mb-3 text-yellow-300" />
        <p className="text-5xl font-extrabold">{score}/{questions.length}</p>
        <p className="text-xl font-bold mt-2">{pct}% {pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '💪'}</p>
        <p className="text-sm opacity-80 mt-1">{examLabel} • {subjectLabel}</p>
        <div className="mt-4 flex justify-center gap-6 text-base font-semibold">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-5 h-5 text-green-300" /> {score}</span>
          <span className="flex items-center gap-1.5"><XCircle className="w-5 h-5 text-red-300" /> {questions.length - score}</span>
        </div>
        <div className="mt-4 pt-3 border-t border-white/20 text-sm flex items-center justify-center gap-4">
          <span className="font-bold">{hi ? 'रैंक' : 'Rank'}: {hi ? rank.hi : rank.en}</span>
          {stats.streak > 0 && <span>{stats.streak}🔥</span>}
          <span className="opacity-70">{stats.totalQuizzes} {hi ? 'कुल' : 'total'}</span>
        </div>
      </div>

      {/* Review */}
      <h3 className="font-bold text-base text-foreground mb-3 flex items-center gap-2">
        <BookOpen className="w-5 h-5" /> {tr('quiz.correctAnswer', lang)}
      </h3>
      <div className="space-y-3 mb-6">
        {questions.map((q, i) => {
          const ua = answers[i];
          const ok = ua === q.correct;
          return (
            <div key={i} className="bg-surface rounded-2xl border border-border p-4">
              <div className="flex items-start gap-2.5 mb-2">
                {ok ? <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" /> : <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />}
                <p className="text-sm font-bold text-foreground">{i + 1}. {q.question}</p>
              </div>
              <div className="ml-7 text-sm space-y-1">
                {!ok && ua !== null && (
                  <p className="text-red-700 dark:text-red-400"><span className="font-semibold">{tr('quiz.yourAnswer', lang)}:</span> {q.options[ua]}</p>
                )}
                <p className="text-green-700 dark:text-green-400"><span className="font-semibold">{tr('quiz.correctAnswer', lang)}:</span> {q.options[q.correct]}</p>
                <p className="text-muted text-xs mt-1">{q.explanation}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Try again */}
      <button
        onClick={resetQuiz}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-base shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all"
      >
        <RotateCcw className="w-5 h-5" /> {tr('quiz.tryAnother', lang)}
      </button>
    </div>
  );
}
