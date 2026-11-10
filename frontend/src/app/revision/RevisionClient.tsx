'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  RotateCcw, Loader2, CheckCircle2, XCircle, Brain,
  Calendar, ArrowRight, BookOpen, Inbox, TrendingUp,
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/pyq/MathText';
import { QuestionNotes } from '@/components/pyq/QuestionNotes';
import type { PYQQuestion } from '@/lib/pyq-types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// ── Spaced Repetition (SM-2 simplified) ──

const REVISION_STORE_KEY = 'sarkari_pyq_revision';

interface RevisionCard {
  questionId: number;
  nextReview: string; // ISO date string
  interval: number;   // days
  easeFactor: number; // starts at 2.5
}

type Difficulty = 'easy' | 'medium' | 'hard';

function loadRevisionCards(): RevisionCard[] {
  try {
    const raw = localStorage.getItem(REVISION_STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function saveRevisionCards(cards: RevisionCard[]) {
  try {
    localStorage.setItem(REVISION_STORE_KEY, JSON.stringify(cards));
  } catch {}
}

/**
 * Track a wrong answer for spaced repetition.
 * If already tracked, reset interval to 1 day.
 */
export function trackWrongAnswer(questionId: number) {
  const cards = loadRevisionCards();
  const existing = cards.find(c => c.questionId === questionId);
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextReview = tomorrow.toISOString().split('T')[0];

  if (existing) {
    // Reset to 1-day interval on new wrong answer
    existing.interval = 1;
    existing.nextReview = nextReview;
    existing.easeFactor = Math.max(1.3, existing.easeFactor - 0.2);
  } else {
    cards.push({
      questionId,
      nextReview,
      interval: 1,
      easeFactor: 2.5,
    });
  }
  saveRevisionCards(cards);
}

/**
 * Calculate next review using simplified SM-2 algorithm.
 */
function updateCard(card: RevisionCard, difficulty: Difficulty): RevisionCard {
  let { interval, easeFactor } = card;

  switch (difficulty) {
    case 'easy':
      easeFactor = Math.min(3.0, easeFactor + 0.15);
      interval = Math.round(interval * easeFactor * 1.3);
      break;
    case 'medium':
      // easeFactor stays roughly the same
      easeFactor = Math.max(1.3, easeFactor + 0.0);
      interval = Math.round(interval * easeFactor);
      break;
    case 'hard':
      easeFactor = Math.max(1.3, easeFactor - 0.2);
      interval = Math.max(1, Math.round(interval * 0.6));
      break;
  }

  // Clamp intervals to spaced repetition milestones: 1, 3, 7, 14, 30, 60, 120
  const milestones = [1, 3, 7, 14, 30, 60, 120];
  let closest = milestones[0];
  for (const m of milestones) {
    if (Math.abs(m - interval) < Math.abs(closest - interval)) {
      closest = m;
    }
  }
  interval = closest;

  const now = new Date();
  const next = new Date(now);
  next.setDate(next.getDate() + interval);
  const nextReview = next.toISOString().split('T')[0];

  return { ...card, interval, easeFactor, nextReview };
}

function getDueCards(): RevisionCard[] {
  const cards = loadRevisionCards();
  const today = new Date().toISOString().split('T')[0];
  return cards.filter(c => c.nextReview <= today);
}

function getUpcomingCards(): RevisionCard[] {
  const cards = loadRevisionCards();
  const today = new Date().toISOString().split('T')[0];
  return cards
    .filter(c => c.nextReview > today)
    .sort((a, b) => a.nextReview.localeCompare(b.nextReview));
}

// ── Component ──

type Phase = 'overview' | 'loading' | 'reviewing' | 'done';

export function RevisionClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';

  const [phase, setPhase] = useState<Phase>('overview');
  const [dueCards, setDueCards] = useState<RevisionCard[]>([]);
  const [upcomingCards, setUpcomingCards] = useState<RevisionCard[]>([]);
  const [questions, setQuestions] = useState<PYQQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [error, setError] = useState('');

  // Load cards on mount
  useEffect(() => {
    setDueCards(getDueCards());
    setUpcomingCards(getUpcomingCards());
  }, []);

  // Fetch questions for due cards from API
  const startReview = useCallback(async () => {
    const due = getDueCards();
    if (due.length === 0) return;

    setPhase('loading');
    setError('');

    // Fetch question details for all due card IDs
    const ids = due.map(c => c.questionId);
    try {
      const fetched: PYQQuestion[] = [];
      // Batch fetch in chunks of 20 to avoid URL length limits
      for (let i = 0; i < ids.length; i += 20) {
        const batch = ids.slice(i, i + 20);
        const params = new URLSearchParams();
        batch.forEach(id => params.append('ids', String(id)));
        const res = await fetch(`${API_BASE}/pyq/?${params}`);
        if (res.ok) {
          const data: PYQQuestion[] = await res.json();
          fetched.push(...data);
        }
      }

      if (fetched.length === 0) {
        // If API doesn't support ID-based fetch, try fetching by individual IDs
        // Fallback: remove stale cards and inform user
        setError(
          hi
            ? 'रिवीजन प्रश्न लोड नहीं हो सके। कुछ प्रश्न हटा दिए गए हो सकते हैं।'
            : 'Could not load revision questions. Some questions may have been removed.'
        );
        setPhase('overview');
        return;
      }

      // Sort questions by due card order
      const idSet = new Set(ids);
      const validQuestions = fetched.filter(q => idSet.has(q.id));
      setQuestions(validQuestions);
      setDueCards(due.filter(c => validQuestions.some(q => q.id === c.questionId)));
      setCurrentIdx(0);
      setShowAnswer(false);
      setReviewedCount(0);
      setPhase('reviewing');
    } catch {
      setError(hi ? 'प्रश्न लोड करने में त्रुटि।' : 'Error loading questions.');
      setPhase('overview');
    }
  }, [hi]);

  // Handle difficulty rating
  const rateDifficulty = useCallback((difficulty: Difficulty) => {
    const card = dueCards[currentIdx];
    if (!card) return;

    // Update card with SM-2 algorithm
    const updated = updateCard(card, difficulty);
    const allCards = loadRevisionCards();
    const idx = allCards.findIndex(c => c.questionId === card.questionId);
    if (idx !== -1) {
      allCards[idx] = updated;
    }
    saveRevisionCards(allCards);

    const newReviewed = reviewedCount + 1;
    setReviewedCount(newReviewed);

    // Move to next question or finish
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setPhase('done');
      setDueCards(getDueCards());
      setUpcomingCards(getUpcomingCards());
    }
  }, [dueCards, currentIdx, questions.length, reviewedCount]);

  // Remove a card from revision
  const removeCard = useCallback((questionId: number) => {
    const allCards = loadRevisionCards();
    const filtered = allCards.filter(c => c.questionId !== questionId);
    saveRevisionCards(filtered);
    setDueCards(getDueCards());
    setUpcomingCards(getUpcomingCards());
  }, []);

  // Clear all revision data
  const clearAll = useCallback(() => {
    saveRevisionCards([]);
    setDueCards([]);
    setUpcomingCards([]);
  }, []);

  const totalCards = loadRevisionCards().length;

  // ── OVERVIEW ──
  if (phase === 'overview') {
    return (
      <div className="pb-28 md:pb-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">
              {hi ? 'स्पेस्ड रिवीजन' : 'Spaced Revision'}
            </h1>
            <p className="text-xs text-muted">
              {hi ? 'गलत प्रश्नों को स्मार्ट अंतराल पर दोहराएं' : 'Review wrong answers at smart intervals'}
            </p>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-3 mt-5 mb-5">
          <div className="bg-surface rounded-xl border border-border p-3 text-center">
            <p className="text-2xl font-extrabold text-red-500">{dueCards.length}</p>
            <p className="text-[10px] font-bold text-muted mt-0.5">
              {hi ? 'आज देय' : 'Due Today'}
            </p>
          </div>
          <div className="bg-surface rounded-xl border border-border p-3 text-center">
            <p className="text-2xl font-extrabold text-amber-500">{upcomingCards.length}</p>
            <p className="text-[10px] font-bold text-muted mt-0.5">
              {hi ? 'आगामी' : 'Upcoming'}
            </p>
          </div>
          <div className="bg-surface rounded-xl border border-border p-3 text-center">
            <p className="text-2xl font-extrabold text-indigo-500">{totalCards}</p>
            <p className="text-[10px] font-bold text-muted mt-0.5">
              {hi ? 'कुल कार्ड' : 'Total Cards'}
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-3 mb-4 border border-red-200 dark:border-red-800">
            <p className="text-sm font-semibold text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Start review button */}
        {dueCards.length > 0 ? (
          <button
            onClick={startReview}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-base shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all mb-5"
          >
            <Brain className="w-5 h-5" />
            {hi ? `${dueCards.length} प्रश्न रिवाइज करें` : `Review ${dueCards.length} Due Question${dueCards.length > 1 ? 's' : ''}`}
          </button>
        ) : (
          <div className="bg-surface rounded-2xl border border-border p-8 text-center mb-5">
            <Inbox className="w-12 h-12 text-muted mx-auto mb-3" />
            <p className="text-base font-bold text-foreground mb-1">
              {hi ? 'आज कोई रिवीजन नहीं!' : 'No Reviews Due Today!'}
            </p>
            <p className="text-xs text-muted">
              {totalCards > 0
                ? (hi ? 'अगली रिवीजन जल्द आएगी। PYQ अभ्यास जारी रखें।' : 'Next review coming soon. Keep practicing PYQ.')
                : (hi ? 'PYQ अभ्यास में गलत उत्तर स्वचालित रूप से यहाँ जुड़ जाएंगे।' : 'Wrong answers from PYQ practice will automatically appear here.')}
            </p>
            <a
              href="/pyq"
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-gov-saffron text-white text-sm font-bold active:scale-95 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              {hi ? 'PYQ अभ्यास शुरू करें' : 'Start PYQ Practice'}
            </a>
          </div>
        )}

        {/* How it works */}
        <div className="bg-surface rounded-2xl border border-border p-4 mb-5">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-500" />
            {hi ? 'कैसे काम करता है' : 'How it Works'}
          </h3>
          <div className="space-y-2.5">
            {[
              { interval: '1', desc: hi ? 'गलत उत्तर अगले दिन दिखाई देता है' : 'Wrong answers appear the next day' },
              { interval: '3', desc: hi ? 'सही उत्तर दें तो 3 दिन बाद' : 'Answer right, next review in 3 days' },
              { interval: '7', desc: hi ? 'फिर सही तो 7 दिन बाद' : 'Right again, review in 7 days' },
              { interval: '14-30', desc: hi ? 'आसान प्रश्न 14-30 दिन बाद' : 'Easy questions move to 14-30 days' },
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="flex-shrink-0 w-8 h-6 rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold flex items-center justify-center">
                  {step.interval}d
                </span>
                <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming reviews */}
        {upcomingCards.length > 0 && (
          <div className="bg-surface rounded-2xl border border-border p-4 mb-5">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500" />
              {hi ? 'आगामी रिवीजन' : 'Upcoming Reviews'}
            </h3>
            <div className="space-y-2">
              {upcomingCards.slice(0, 10).map(card => {
                const daysUntil = Math.ceil(
                  (new Date(card.nextReview).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
                );
                return (
                  <div key={card.questionId} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                    <span className="text-xs text-muted font-semibold">
                      Q#{card.questionId}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-md">
                        {daysUntil === 1
                          ? (hi ? 'कल' : 'tomorrow')
                          : `${daysUntil} ${hi ? 'दिन' : 'days'}`}
                      </span>
                      <button
                        onClick={() => removeCard(card.questionId)}
                        className="text-red-400 hover:text-red-600 text-[10px] font-bold"
                        title={hi ? 'हटाएं' : 'Remove'}
                      >
                        &times;
                      </button>
                    </div>
                  </div>
                );
              })}
              {upcomingCards.length > 10 && (
                <p className="text-[10px] text-muted text-center pt-1">
                  +{upcomingCards.length - 10} {hi ? 'और' : 'more'}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Clear all */}
        {totalCards > 0 && (
          <button
            onClick={() => {
              if (window.confirm(hi ? 'सभी रिवीजन डेटा हटाएं?' : 'Clear all revision data?')) {
                clearAll();
              }
            }}
            className="w-full py-3 rounded-xl text-sm font-bold text-red-500 bg-surface border-2 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4 inline mr-1.5" />
            {hi ? 'सभी रिवीजन डेटा मिटाएं' : 'Clear All Revision Data'}
          </button>
        )}
      </div>
    );
  }

  // ── LOADING ──
  if (phase === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-20" style={{ minHeight: 'calc(100dvh - 200px)' }}>
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mb-5 shadow-lg shadow-indigo-500/30">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
        <p className="text-lg font-bold text-foreground">
          {hi ? 'रिवीजन प्रश्न लोड हो रहे हैं...' : 'Loading revision questions...'}
        </p>
      </div>
    );
  }

  // ── REVIEWING ──
  if (phase === 'reviewing') {
    const q = questions[currentIdx];
    const card = dueCards[currentIdx];
    if (!q || !card) return null;

    return (
      <div className="flex flex-col -mb-6 sm:-mb-8" style={{ minHeight: 'calc(100dvh - 200px)' }}>
        {/* Progress */}
        <div className="flex items-center justify-between mb-1.5 flex-shrink-0">
          <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold px-2 py-0.5 rounded-md">
            {currentIdx + 1}/{questions.length}
          </span>
          <span className="text-[11px] text-muted font-semibold">
            {hi ? 'रिवीजन' : 'Revision'} &middot; {hi ? 'अंतराल' : 'Interval'}: {card.interval}d
          </span>
        </div>
        <div className="h-1 bg-surface-hover rounded-full flex-shrink-0 mb-4">
          <div
            className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Question card */}
        <div className="bg-surface rounded-xl border border-border p-4 mb-4 flex-shrink-0">
          {q.year && (
            <span className="inline-block text-[10px] font-bold text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30 px-1.5 py-0.5 rounded mb-2">
              {q.exam_type} &middot; {q.year}
            </span>
          )}
          <p className="text-sm sm:text-base font-bold text-foreground leading-relaxed">
            <MathText text={q.question_text} />
          </p>
        </div>

        {/* Options */}
        <div className="flex-1 flex flex-col gap-2 min-h-0">
          {q.options.map((opt, idx) => {
            const isCorrect = idx === q.correct_answer;
            const revealed = showAnswer;

            let optClasses = 'border-border bg-surface';
            if (revealed && isCorrect) optClasses = 'border-green-500 bg-green-50 dark:bg-green-900/20';
            else if (revealed && !isCorrect) optClasses = 'border-border bg-surface opacity-40';

            return (
              <div
                key={idx}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border-2 text-left transition-all',
                  optClasses,
                )}
              >
                <span className={cn(
                  'flex-shrink-0 w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center',
                  revealed && isCorrect ? 'bg-green-500 text-white' : 'bg-surface-hover text-muted'
                )}>
                  {revealed && isCorrect ? <CheckCircle2 className="w-4 h-4" /> : String.fromCharCode(65 + idx)}
                </span>
                <span className={cn(
                  'text-[13px] font-semibold leading-snug',
                  revealed && isCorrect ? 'text-green-800 dark:text-green-200' :
                  revealed ? 'text-muted' : 'text-foreground'
                )}>
                  <MathText text={opt} />
                </span>
              </div>
            );
          })}
        </div>

        {/* Explanation */}
        {showAnswer && q.explanation && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl px-3 py-2 my-3 border border-blue-200 dark:border-blue-800 flex-shrink-0">
            <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
              <span className="font-bold">{hi ? 'व्याख्या' : 'Explanation'}:</span> {q.explanation}
            </p>
          </div>
        )}

        {/* Notes */}
        <div className="flex-shrink-0 my-2">
          <QuestionNotes questionId={String(q.id)} />
        </div>

        {/* Action buttons */}
        <div className="flex-shrink-0 mt-2">
          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all"
            >
              {hi ? 'उत्तर दिखाएं' : 'Show Answer'}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div>
              <p className="text-xs font-bold text-center text-muted mb-2">
                {hi ? 'यह कितना आसान था?' : 'How well did you remember?'}
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => rateDifficulty('hard')}
                  className="py-3 rounded-xl text-sm font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-2 border-red-200 dark:border-red-800 active:scale-95 transition-all"
                >
                  <XCircle className="w-4 h-4 mx-auto mb-1" />
                  {hi ? 'कठिन' : 'Hard'}
                  <span className="block text-[10px] opacity-60 mt-0.5">
                    {hi ? 'जल्दी दोहराएं' : 'Review soon'}
                  </span>
                </button>
                <button
                  onClick={() => rateDifficulty('medium')}
                  className="py-3 rounded-xl text-sm font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-2 border-amber-200 dark:border-amber-800 active:scale-95 transition-all"
                >
                  <RotateCcw className="w-4 h-4 mx-auto mb-1" />
                  {hi ? 'ठीक' : 'Medium'}
                  <span className="block text-[10px] opacity-60 mt-0.5">
                    {card.interval && `~${Math.round(card.interval * card.easeFactor)}d`}
                  </span>
                </button>
                <button
                  onClick={() => rateDifficulty('easy')}
                  className="py-3 rounded-xl text-sm font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-2 border-green-200 dark:border-green-800 active:scale-95 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4 mx-auto mb-1" />
                  {hi ? 'आसान' : 'Easy'}
                  <span className="block text-[10px] opacity-60 mt-0.5">
                    {card.interval && `~${Math.round(card.interval * card.easeFactor * 1.3)}d`}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── DONE ──
  return (
    <div className="pb-28 md:pb-8">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 sm:p-8 text-center text-white mb-6 shadow-xl">
        <Brain className="w-14 h-14 mx-auto mb-3 text-indigo-200" />
        <p className="text-3xl font-extrabold">{hi ? 'रिवीजन पूरा!' : 'Revision Complete!'}</p>
        <p className="text-base font-bold mt-2 opacity-90">
          {reviewedCount} {hi ? 'प्रश्नों की समीक्षा की गई' : `question${reviewedCount > 1 ? 's' : ''} reviewed`}
        </p>
        <p className="text-sm opacity-70 mt-1">
          {hi ? 'अगली रिवीजन तिथि स्वचालित सेट की गई' : 'Next review dates set automatically'}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => {
            setDueCards(getDueCards());
            setUpcomingCards(getUpcomingCards());
            setPhase('overview');
          }}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-surface border-2 border-border text-foreground font-bold text-base active:scale-[0.98] transition-all"
        >
          <RotateCcw className="w-5 h-5" /> {hi ? 'डैशबोर्ड' : 'Dashboard'}
        </button>
        <a
          href="/pyq"
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-gov-saffron to-orange-600 text-white font-bold text-base shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all"
        >
          <BookOpen className="w-5 h-5" /> {hi ? 'PYQ अभ्यास' : 'PYQ Practice'}
        </a>
      </div>
    </div>
  );
}
