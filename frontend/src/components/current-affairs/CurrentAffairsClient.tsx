'use client';

import { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Globe, Landmark, TrendingUp, FlaskConical, Trophy, Award, Shield, Users, Lightbulb, Flame, CheckCircle, XCircle } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const LOCAL_API = '/api/current-affairs';

interface CAItem {
  title: string;
  detail: string;
  category: string;
}

interface QuizQ {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface CADay {
  date: string;
  items: CAItem[];
  quiz: QuizQ[];
}

const CATEGORY_META: Record<string, { icon: typeof Globe; color: string; label: string }> = {
  national: { icon: Landmark, color: 'text-orange-500', label: 'National' },
  international: { icon: Globe, color: 'text-blue-500', label: 'International' },
  economy: { icon: TrendingUp, color: 'text-green-500', label: 'Economy' },
  science: { icon: FlaskConical, color: 'text-purple-500', label: 'Science & Tech' },
  sports: { icon: Trophy, color: 'text-yellow-500', label: 'Sports' },
  awards: { icon: Award, color: 'text-pink-500', label: 'Awards' },
  defence: { icon: Shield, color: 'text-red-500', label: 'Defence' },
  appointments: { icon: Users, color: 'text-teal-500', label: 'Appointments' },
  schemes: { icon: Lightbulb, color: 'text-indigo-500', label: 'Schemes' },
};

export function CurrentAffairsClient() {
  const [data, setData] = useState<CADay[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'affairs' | 'quiz'>('affairs');
  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  // Streak
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Load streak from localStorage
    const saved = localStorage.getItem('ca_streak');
    if (saved) {
      const { count, lastDate } = JSON.parse(saved);
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastDate === today || lastDate === yesterday) {
        setStreak(count);
      }
    }
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      // Try local static data first (updated during deploy), fall back to backend
      let res = await fetch(`${LOCAL_API}?days=7`).catch(() => null);
      if (!res || !res.ok) {
        res = await fetch(`${API_BASE}/current-affairs/?days=7`).catch(() => null);
      }
      if (res && res.ok) {
        const json = await res.json();
        setData(json.results || []);
        if (json.results?.length > 0) {
          setSelectedDate(json.results[0].date);
        }
      }
    } catch {}
    setLoading(false);
  }

  const current = data.find(d => d.date === selectedDate);
  const dateIndex = data.findIndex(d => d.date === selectedDate);

  function navigateDate(dir: -1 | 1) {
    const newIdx = dateIndex + dir;
    if (newIdx >= 0 && newIdx < data.length) {
      setSelectedDate(data[newIdx].date);
      setTab('affairs');
      setQuizAnswers({});
      setQuizSubmitted(false);
    }
  }

  function handleQuizAnswer(qIdx: number, optIdx: number) {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  }

  function submitQuiz() {
    setQuizSubmitted(true);
    // Update streak
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem('ca_streak');
    let newStreak = 1;
    if (saved) {
      const { count, lastDate } = JSON.parse(saved);
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastDate === yesterday) newStreak = count + 1;
      else if (lastDate === today) newStreak = count;
    }
    setStreak(newStreak);
    localStorage.setItem('ca_streak', JSON.stringify({ count: newStreak, lastDate: today }));
  }

  const quizScore = current?.quiz ? Object.entries(quizAnswers).filter(([i, a]) => current.quiz[Number(i)]?.correct === a).length : 0;
  const totalAnswered = Object.keys(quizAnswers).length;

  function formatDate(d: string) {
    return new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-surface rounded animate-pulse" />
        {[1,2,3,4,5].map(i => <div key={i} className="h-24 bg-surface rounded animate-pulse" />)}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-16">
        <Calendar className="w-16 h-16 mx-auto text-muted mb-4" />
        <h2 className="text-xl font-bold mb-2">Current Affairs Coming Soon!</h2>
        <p className="text-muted">Daily GK updates will appear here. Check back tomorrow.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold">Daily Current Affairs</h1>
        <p className="text-sm text-muted mt-1">For UPSC, SSC, Banking, Railway & All Competitive Exams</p>
      </div>

      {/* Streak Badge */}
      {streak > 0 && (
        <div className="flex items-center justify-center gap-2 py-2 px-4 bg-orange-500/10 border border-orange-500/30 rounded-lg text-sm">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="font-bold text-orange-600">{streak} Day Streak!</span>
          <span className="text-muted">Keep practicing daily</span>
        </div>
      )}

      {/* Date Navigator */}
      <div className="flex items-center justify-between bg-surface border border-border rounded-lg p-3">
        <button onClick={() => navigateDate(1)} disabled={dateIndex >= data.length - 1}
          className="p-2 rounded-lg hover:bg-muted/20 disabled:opacity-30">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <div className="font-semibold">{formatDate(selectedDate)}</div>
          <div className="text-xs text-muted">{current?.items?.length || 0} updates</div>
        </div>
        <button onClick={() => navigateDate(-1)} disabled={dateIndex <= 0}
          className="p-2 rounded-lg hover:bg-muted/20 disabled:opacity-30">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button onClick={() => setTab('affairs')}
          className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-colors ${tab === 'affairs' ? 'bg-blue-600 text-white' : 'bg-surface border border-border'}`}>
          Current Affairs ({current?.items?.length || 0})
        </button>
        <button onClick={() => setTab('quiz')}
          className={`flex-1 py-2.5 rounded-lg font-medium text-sm transition-colors ${tab === 'quiz' ? 'bg-green-600 text-white' : 'bg-surface border border-border'}`}>
          Daily Quiz ({current?.quiz?.length || 0} Qs)
        </button>
      </div>

      {/* Content */}
      {tab === 'affairs' && current?.items && (
        <div className="space-y-3">
          {current.items.map((item, idx) => {
            const meta = CATEGORY_META[item.category] || CATEGORY_META.national;
            const Icon = meta.icon;
            return (
              <div key={idx} className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 ${meta.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full bg-current/10 ${meta.color} font-medium`}>
                        {meta.label}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm leading-snug">{item.title}</h3>
                    <p className="text-sm text-muted mt-1 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'quiz' && current?.quiz && (
        <div className="space-y-4">
          {current.quiz.length === 0 ? (
            <p className="text-center text-muted py-8">No quiz available for this date.</p>
          ) : (
            <>
              {current.quiz.map((q, qIdx) => {
                const answered = quizAnswers[qIdx] !== undefined;
                const isCorrect = quizSubmitted && quizAnswers[qIdx] === q.correct;
                const isWrong = quizSubmitted && answered && quizAnswers[qIdx] !== q.correct;
                return (
                  <div key={qIdx} className="bg-surface border border-border rounded-lg p-4">
                    <p className="font-medium text-sm mb-3">
                      <span className="text-muted mr-2">Q{qIdx + 1}.</span>
                      {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => {
                        const selected = quizAnswers[qIdx] === oIdx;
                        const correct = quizSubmitted && oIdx === q.correct;
                        const wrong = quizSubmitted && selected && oIdx !== q.correct;
                        return (
                          <button key={oIdx}
                            onClick={() => handleQuizAnswer(qIdx, oIdx)}
                            disabled={quizSubmitted}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-colors flex items-center gap-2 ${
                              correct ? 'bg-green-500/10 border-green-500 text-green-700' :
                              wrong ? 'bg-red-500/10 border-red-500 text-red-700' :
                              selected ? 'bg-blue-500/10 border-blue-500' :
                              'border-border hover:bg-muted/10'
                            }`}>
                            <span className="w-6 h-6 flex items-center justify-center rounded-full border text-xs font-medium shrink-0">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="flex-1">{opt}</span>
                            {correct && <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />}
                            {wrong && <XCircle className="w-4 h-4 text-red-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                    {quizSubmitted && q.explanation && (
                      <div className="mt-2 px-3 py-2 bg-blue-500/5 border border-blue-500/20 rounded text-xs text-muted">
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Submit / Score */}
              {!quizSubmitted ? (
                <button onClick={submitQuiz}
                  disabled={totalAnswered < current.quiz.length}
                  className="w-full py-3 bg-green-600 text-white rounded-lg font-medium disabled:opacity-50">
                  Submit Quiz ({totalAnswered}/{current.quiz.length} answered)
                </button>
              ) : (
                <div className="bg-surface border border-border rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold">{quizScore}/{current.quiz.length}</div>
                  <div className="text-sm text-muted mt-1">
                    {quizScore === current.quiz.length ? 'Perfect! 🎯' :
                     quizScore >= current.quiz.length * 0.7 ? 'Great job! 👏' :
                     quizScore >= current.quiz.length * 0.4 ? 'Good effort! 💪' : 'Keep practicing! 📚'}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
