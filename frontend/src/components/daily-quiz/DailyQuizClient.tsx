'use client';

import { useState, useEffect, useMemo } from 'react';
import { Flame, CheckCircle, XCircle, Trophy, Calendar, RotateCcw, Share2 } from 'lucide-react';

function ConfettiBurst() {
  const pieces = useMemo(() => Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    duration: `${2 + Math.random() * 2}s`,
    color: ['#f43f5e', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'][i % 6],
    size: `${6 + Math.random() * 6}px`,
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <style>{`
        @keyframes confetti-fall { 0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; } 100% { transform: translateY(110vh) rotate(720deg); opacity: 0; } }
        @keyframes confetti-sway { 0%, 100% { margin-left: 0; } 50% { margin-left: 30px; } }
      `}</style>
      {pieces.map(p => (
        <span key={p.id} style={{
          position: 'absolute', top: 0, left: p.left,
          width: p.size, height: p.size, backgroundColor: p.color,
          borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          animation: `confetti-fall ${p.duration} ${p.delay} ease-out forwards, confetti-sway ${p.duration} ${p.delay} ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface QuizQ {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const STREAK_KEY = 'daily_quiz_streak';
const HISTORY_KEY = 'daily_quiz_history';

interface StreakData { count: number; lastDate: string; }
interface HistoryEntry { date: string; score: number; total: number; }

function loadStreak(): StreakData {
  try { const s = localStorage.getItem(STREAK_KEY); return s ? JSON.parse(s) : { count: 0, lastDate: '' }; } catch { return { count: 0, lastDate: '' }; }
}

function loadHistory(): HistoryEntry[] {
  try { const h = localStorage.getItem(HISTORY_KEY); return h ? JSON.parse(h) : []; } catch { return []; }
}

export function DailyQuizClient() {
  const [quiz, setQuiz] = useState<QuizQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [finished, setFinished] = useState(false);
  const [streak, setStreak] = useState<StreakData>({ count: 0, lastDate: '' });
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const s = loadStreak();
    const h = loadHistory();
    setStreak(s);
    setHistory(h);

    // Check if already completed today
    if (h.some(e => e.date === today)) {
      setAlreadyDone(true);
    }

    fetchQuiz();
  }, []);

  async function fetchQuiz() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/daily-quiz/`);
      if (res.ok) {
        const data = await res.json();
        if (data.quiz?.length > 0) {
          setQuiz(data.quiz);
        }
      }
    } catch {}
    setLoading(false);
  }

  function handleAnswer(optIdx: number) {
    if (revealed[currentQ]) return;
    setAnswers(prev => ({ ...prev, [currentQ]: optIdx }));
    setRevealed(prev => ({ ...prev, [currentQ]: true }));
  }

  function nextQuestion() {
    if (currentQ < quiz.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    setFinished(true);
    const score = Object.entries(answers).filter(([i, a]) => quiz[Number(i)]?.correct === a).length;

    // Update streak
    const s = loadStreak();
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    let newCount = 1;
    if (s.lastDate === yesterday) newCount = s.count + 1;
    else if (s.lastDate === today) newCount = s.count;

    const newStreak = { count: newCount, lastDate: today };
    setStreak(newStreak);
    localStorage.setItem(STREAK_KEY, JSON.stringify(newStreak));

    // Update history
    const h = loadHistory().filter(e => e.date !== today);
    h.unshift({ date: today, score, total: quiz.length });
    const trimmed = h.slice(0, 30);
    setHistory(trimmed);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmed));
  }

  const score = Object.entries(answers).filter(([i, a]) => quiz[Number(i)]?.correct === a).length;

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-surface rounded animate-pulse" />
        {[1,2,3].map(i => <div key={i} className="h-32 bg-surface rounded animate-pulse" />)}
      </div>
    );
  }

  if (quiz.length === 0) {
    return (
      <div className="text-center py-16">
        <Calendar className="w-16 h-16 mx-auto text-muted mb-4" />
        <h2 className="text-xl font-bold mb-2">Daily Quiz Coming Soon!</h2>
        <p className="text-muted">Today&apos;s quiz is being prepared. Check back soon.</p>
      </div>
    );
  }

  // Show results
  if (finished || alreadyDone) {
    const todayResult = history.find(e => e.date === today);
    const displayScore = todayResult?.score ?? score;
    const displayTotal = todayResult?.total ?? quiz.length;
    const pct = Math.round((displayScore / displayTotal) * 100);

    return (
      <div className="space-y-4">
        {pct === 100 && <ConfettiBurst />}
        <div className="text-center">
          <h1 className="text-2xl font-bold">Daily GK Quiz</h1>
        </div>

        {/* Streak */}
        <div className="flex items-center justify-center gap-2 py-3 px-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
          <Flame className="w-6 h-6 text-orange-500" />
          <span className="text-2xl font-bold text-orange-600">{streak.count}</span>
          <span className="text-sm text-muted">Day Streak</span>
        </div>

        {/* Score Card */}
        <div className="bg-surface border border-border rounded-xl p-6 text-center">
          <Trophy className={`w-12 h-12 mx-auto mb-2 ${pct >= 70 ? 'text-yellow-500' : 'text-muted'}`} />
          <div className="text-4xl font-bold">{displayScore}/{displayTotal}</div>
          <div className="text-lg text-muted">{pct}%</div>
          <p className="text-sm mt-2">
            {pct === 100 ? 'Perfect Score! You\'re a GK champion!' :
             pct >= 80 ? 'Excellent! Keep it up!' :
             pct >= 60 ? 'Good work! Practice more to improve.' :
             'Keep studying! Read today\'s current affairs.'}
          </p>
          {alreadyDone && !finished && (
            <p className="text-xs text-muted mt-3">You already completed today&apos;s quiz. Come back tomorrow!</p>
          )}
        </div>

        {/* Recent History */}
        {history.length > 1 && (
          <div className="bg-surface border border-border rounded-lg p-4">
            <h3 className="font-semibold text-sm mb-3">Recent Scores</h3>
            <div className="space-y-2">
              {history.slice(0, 7).map((h, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-muted">{new Date(h.date + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-muted/20 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${(h.score / h.total) * 100}%` }} />
                    </div>
                    <span className="font-medium w-12 text-right">{h.score}/{h.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Share Score */}
        <button
          onClick={() => {
            const text = `I scored ${displayScore}/${displayTotal} (${pct}%) on today's Daily GK Quiz on SarkariAlert! 🔥 ${streak.count} day streak!`;
            if (navigator.share) {
              navigator.share({ title: 'Daily GK Quiz Score', text, url: 'https://sarkarialert.online/daily-quiz' }).catch(() => {});
            } else {
              window.open(`https://wa.me/?text=${encodeURIComponent(text + '\nhttps://sarkarialert.online/daily-quiz')}`, '_blank');
            }
          }}
          className="w-full py-3 bg-green-600 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2"
        >
          <Share2 className="w-4 h-4" /> Share Score
        </button>

        {!alreadyDone && (
          <button onClick={() => { setFinished(false); setCurrentQ(0); setAnswers({}); setRevealed({}); setAlreadyDone(true); }}
            className="w-full py-3 bg-surface border border-border rounded-lg text-sm font-medium flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4" /> Review Answers
          </button>
        )}
      </div>
    );
  }

  // Playing quiz
  const q = quiz[currentQ];
  const isRevealed = revealed[currentQ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Daily GK Quiz</h1>
        <p className="text-xs text-muted mt-1">
          {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Streak */}
      {streak.count > 0 && (
        <div className="flex items-center justify-center gap-2 py-2 px-4 bg-orange-500/10 border border-orange-500/30 rounded-lg text-sm">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="font-bold text-orange-600">{streak.count} Day Streak!</span>
        </div>
      )}

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-muted/20 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${((currentQ + (isRevealed ? 1 : 0)) / quiz.length) * 100}%` }} />
        </div>
        <span className="text-sm font-medium text-muted">{currentQ + 1}/{quiz.length}</span>
      </div>

      {/* Question */}
      <div className="bg-surface border border-border rounded-xl p-5">
        <p className="font-semibold leading-relaxed break-words">
          <span className="text-muted mr-2">Q{currentQ + 1}.</span>
          {q.question}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {q.options.map((opt, oIdx) => {
          const selected = answers[currentQ] === oIdx;
          const correct = isRevealed && oIdx === q.correct;
          const wrong = isRevealed && selected && oIdx !== q.correct;
          return (
            <button key={oIdx}
              onClick={() => handleAnswer(oIdx)}
              disabled={isRevealed}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-all flex items-center gap-3 ${
                correct ? 'bg-green-500/10 border-green-500' :
                wrong ? 'bg-red-500/10 border-red-500' :
                selected ? 'bg-blue-500/10 border-blue-500' :
                'border-border hover:bg-muted/10 active:scale-[0.99]'
              }`}>
              <span className={`w-7 h-7 flex items-center justify-center rounded-full border text-sm font-bold shrink-0 ${
                correct ? 'bg-green-500 text-white border-green-500' :
                wrong ? 'bg-red-500 text-white border-red-500' :
                'border-current'
              }`}>
                {String.fromCharCode(65 + oIdx)}
              </span>
              <span className="flex-1 text-sm break-words min-w-0">{opt}</span>
              {correct && <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />}
              {wrong && <XCircle className="w-5 h-5 text-red-600 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {isRevealed && q.explanation && (
        <div className="px-4 py-3 bg-blue-500/5 border border-blue-500/20 rounded-lg text-sm text-muted">
          {q.explanation}
        </div>
      )}

      {/* Next button */}
      {isRevealed && (
        <button onClick={nextQuestion}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium">
          {currentQ < quiz.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      )}
    </div>
  );
}
