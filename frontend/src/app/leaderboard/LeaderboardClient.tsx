'use client';

import { useState, useEffect, useMemo } from 'react';
import { Trophy, Medal, TrendingUp, Target, Flame, BarChart3, User } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────
   Types & localStorage keys (match existing keys)
   ───────────────────────────────────────────── */
interface MockStats {
  tests: number;
  avgScore: number;
  bestScore: number;
  streak: number;
}

interface QuizStats {
  totalQuizzes: number;
  totalCorrect: number;
  totalQuestions: number;
  streak: number;
  bestScore: number;
}

interface DailyStreak {
  count: number;
  lastDate: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  totalAttempted: number;
  accuracy: number;
  streak: number;
  score: number;
  isUser: boolean;
}

interface ScoreRecord {
  id: string;
  type: 'mock' | 'quiz';
  score: number;
  total: number;
  percentage: number;
  date: string;
}

const MOCK_STATS_KEY = 'sarkari_mock_stats';
const QUIZ_STATS_KEY = 'sarkari_quiz_stats';
const DAILY_STREAK_KEY = 'daily_quiz_streak';
const SCORE_HISTORY_KEY = 'sarkari_score_history';

function loadMockStats(): MockStats {
  try { const r = localStorage.getItem(MOCK_STATS_KEY); if (r) return JSON.parse(r); } catch {}
  return { tests: 0, avgScore: 0, bestScore: 0, streak: 0 };
}

function loadQuizStats(): QuizStats {
  try { const r = localStorage.getItem(QUIZ_STATS_KEY); if (r) return JSON.parse(r); } catch {}
  return { totalQuizzes: 0, totalCorrect: 0, totalQuestions: 0, streak: 0, bestScore: 0 };
}

function loadDailyStreak(): DailyStreak {
  try { const s = localStorage.getItem(DAILY_STREAK_KEY); return s ? JSON.parse(s) : { count: 0, lastDate: '' }; } catch { return { count: 0, lastDate: '' }; }
}

function loadScoreHistory(): ScoreRecord[] {
  try { const r = localStorage.getItem(SCORE_HISTORY_KEY); if (r) return JSON.parse(r); } catch {}
  return [];
}


function getRankTitle(accuracy: number, totalAttempted: number): { en: string; hi: string; color: string } {
  if (totalAttempted >= 500 && accuracy >= 80) return { en: 'Champion', hi: 'Champion', color: 'text-yellow-500' };
  if (totalAttempted >= 300 && accuracy >= 70) return { en: 'Expert', hi: 'Expert', color: 'text-purple-500' };
  if (totalAttempted >= 100 && accuracy >= 60) return { en: 'Pro', hi: 'Pro', color: 'text-blue-500' };
  if (totalAttempted >= 30) return { en: 'Rising Star', hi: 'Rising Star', color: 'text-green-500' };
  return { en: 'Beginner', hi: 'Beginner', color: 'text-gray-400' };
}

export function LeaderboardClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';
  const [mounted, setMounted] = useState(false);
  const [mockStats, setMockStats] = useState<MockStats>({ tests: 0, avgScore: 0, bestScore: 0, streak: 0 });
  const [quizStats, setQuizStats] = useState<QuizStats>({ totalQuizzes: 0, totalCorrect: 0, totalQuestions: 0, streak: 0, bestScore: 0 });
  const [dailyStreak, setDailyStreak] = useState<DailyStreak>({ count: 0, lastDate: '' });
  const [scoreHistory, setScoreHistory] = useState<ScoreRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'ranking' | 'history'>('ranking');

  useEffect(() => {
    setMockStats(loadMockStats());
    setQuizStats(loadQuizStats());
    setDailyStreak(loadDailyStreak());
    setScoreHistory(loadScoreHistory());
    setMounted(true);
  }, []);

  // Compute user stats
  const totalAttempted = quizStats.totalQuestions + (mockStats.tests * 25); // approximate 25 q per mock
  const totalCorrect = quizStats.totalCorrect + Math.round((mockStats.avgScore / 100) * mockStats.tests * 25);
  const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 10) / 10 : 0;
  const streakDays = Math.max(dailyStreak.count, mockStats.streak, quizStats.streak);
  const userScore = Math.round(totalCorrect * 5 + streakDays * 50 + accuracy * 10);

  // Build ranked leaderboard
  const leaderboard = useMemo(() => {
    const userEntry: Omit<LeaderboardEntry, 'rank'> = {
      name: hi ? 'You' : 'You',
      totalAttempted,
      accuracy,
      streak: streakDays,
      score: userScore,
      isUser: true,
    };

    // Only real data: this device's own stats. No invented users.
    const all = [userEntry]
      .sort((a, b) => b.score - a.score)
      .map((entry, idx) => ({ ...entry, rank: idx + 1 }));

    return all;
  }, [totalAttempted, accuracy, streakDays, userScore, hi]);

  const userRank = leaderboard.find(e => e.isUser)?.rank ?? leaderboard.length;
  const rankTitle = getRankTitle(accuracy, totalAttempted);

  if (!mounted) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-yellow-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pb-28 md:pb-8">
      {/* User Stats Card */}
      <div className="bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-600 rounded-2xl p-5 sm:p-6 mb-6 text-white shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold opacity-90">
              {hi ? 'Your Rank' : 'Your Rank'}
            </p>
            <p className="text-3xl font-extrabold">#{userRank}</p>
            <p className={cn('text-xs font-bold', 'opacity-90')}>
              {hi ? rankTitle.hi : rankTitle.en}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <Target className="w-5 h-5 mx-auto mb-1 opacity-90" />
            <p className="text-xl font-extrabold">{totalAttempted}</p>
            <p className="text-[11px] opacity-80">{hi ? 'Questions' : 'Questions'}</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <TrendingUp className="w-5 h-5 mx-auto mb-1 opacity-90" />
            <p className="text-xl font-extrabold">{accuracy}%</p>
            <p className="text-[11px] opacity-80">{hi ? 'Accuracy' : 'Accuracy'}</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <Flame className="w-5 h-5 mx-auto mb-1 opacity-90" />
            <p className="text-xl font-extrabold">{streakDays}</p>
            <p className="text-[11px] opacity-80">{hi ? 'Streak Days' : 'Streak Days'}</p>
          </div>
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <BarChart3 className="w-5 h-5 mx-auto mb-1 opacity-90" />
            <p className="text-xl font-extrabold">{userScore}</p>
            <p className="text-[11px] opacity-80">{hi ? 'Score' : 'Score'}</p>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('ranking')}
          className={cn(
            'flex-1 py-2.5 rounded-xl text-sm font-bold transition-all',
            activeTab === 'ranking'
              ? 'bg-yellow-500 text-white shadow-md shadow-yellow-500/20'
              : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
          )}
        >
          <Trophy className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
          {hi ? 'Rankings' : 'Rankings'}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={cn(
            'flex-1 py-2.5 rounded-xl text-sm font-bold transition-all',
            activeTab === 'history'
              ? 'bg-yellow-500 text-white shadow-md shadow-yellow-500/20'
              : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
          )}
        >
          <BarChart3 className="w-4 h-4 inline-block mr-1.5 -mt-0.5" />
          {hi ? 'History' : 'History'}
        </button>
      </div>

      {/* Rankings Table */}
      {activeTab === 'ranking' && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Top 3 Podium */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850 p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-end justify-center gap-3 sm:gap-6">
              {/* 2nd place */}
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mx-auto mb-1.5 ring-3 ring-gray-300 dark:ring-gray-600">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400" />
                </div>
                <Medal className="w-5 h-5 text-gray-400 mx-auto mb-0.5" />
                <p className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-[80px]">
                  {leaderboard[1]?.isUser ? (hi ? 'You' : 'You') : leaderboard[1]?.name}
                </p>
                <p className="text-[10px] text-gray-500">{leaderboard[1]?.score} pts</p>
              </div>
              {/* 1st place */}
              <div className="text-center -mb-2">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mx-auto mb-1.5 ring-3 ring-yellow-400">
                  <User className="w-7 h-7 sm:w-8 sm:h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-0.5" />
                <p className="text-sm font-extrabold text-gray-900 dark:text-white truncate max-w-[90px]">
                  {leaderboard[0]?.isUser ? (hi ? 'You' : 'You') : leaderboard[0]?.name}
                </p>
                <p className="text-[10px] text-gray-500">{leaderboard[0]?.score} pts</p>
              </div>
              {/* 3rd place */}
              <div className="text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mx-auto mb-1.5 ring-3 ring-orange-300 dark:ring-orange-700">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 dark:text-orange-400" />
                </div>
                <Medal className="w-5 h-5 text-orange-400 mx-auto mb-0.5" />
                <p className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-[80px]">
                  {leaderboard[2]?.isUser ? (hi ? 'You' : 'You') : leaderboard[2]?.name}
                </p>
                <p className="text-[10px] text-gray-500">{leaderboard[2]?.score} pts</p>
              </div>
            </div>
          </div>

          {/* Full table */}
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {/* Header */}
            <div className="grid grid-cols-12 gap-2 px-4 py-2.5 text-[11px] font-bold text-gray-500 uppercase tracking-wide">
              <div className="col-span-1">#</div>
              <div className="col-span-4">{hi ? 'Name' : 'Name'}</div>
              <div className="col-span-2 text-center">{hi ? 'Qs' : 'Qs'}</div>
              <div className="col-span-2 text-center">{hi ? 'Acc%' : 'Acc%'}</div>
              <div className="col-span-3 text-right">{hi ? 'Score' : 'Score'}</div>
            </div>

            {leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={cn(
                  'grid grid-cols-12 gap-2 px-4 py-3 items-center transition-colors',
                  entry.isUser
                    ? 'bg-yellow-50 dark:bg-yellow-900/10 border-l-4 border-yellow-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                )}
              >
                <div className="col-span-1">
                  {entry.rank === 1 ? (
                    <Trophy className="w-4 h-4 text-yellow-500" />
                  ) : entry.rank === 2 ? (
                    <Medal className="w-4 h-4 text-gray-400" />
                  ) : entry.rank === 3 ? (
                    <Medal className="w-4 h-4 text-orange-400" />
                  ) : (
                    <span className="text-xs font-bold text-gray-500">{entry.rank}</span>
                  )}
                </div>
                <div className="col-span-4">
                  <p className={cn(
                    'text-sm font-bold truncate',
                    entry.isUser ? 'text-yellow-700 dark:text-yellow-400' : 'text-gray-900 dark:text-white'
                  )}>
                    {entry.isUser ? (hi ? 'You' : 'You') : entry.name}
                  </p>
                  {entry.isUser && (
                    <p className="text-[10px] text-yellow-600 dark:text-yellow-500 font-semibold">
                      {streakDays > 0 ? `${streakDays}d streak` : ''}
                    </p>
                  )}
                </div>
                <div className="col-span-2 text-center">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {entry.totalAttempted.toLocaleString()}
                  </span>
                </div>
                <div className="col-span-2 text-center">
                  <span className={cn(
                    'text-xs font-bold',
                    entry.accuracy >= 80 ? 'text-green-600 dark:text-green-400' :
                    entry.accuracy >= 60 ? 'text-blue-600 dark:text-blue-400' :
                    'text-gray-600 dark:text-gray-400'
                  )}>
                    {entry.accuracy}%
                  </span>
                </div>
                <div className="col-span-3 text-right">
                  <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                    {entry.score.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Score History Tab */}
      {activeTab === 'history' && (
        <div>
          {/* Quick summary */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-xs font-bold text-gray-500 mb-1">{hi ? 'Mock Tests' : 'Mock Tests'}</p>
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{mockStats.tests}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {hi ? 'Avg' : 'Avg'}: {mockStats.avgScore}% | {hi ? 'Best' : 'Best'}: {mockStats.bestScore}%
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <p className="text-xs font-bold text-gray-500 mb-1">{hi ? 'AI Quizzes' : 'AI Quizzes'}</p>
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{quizStats.totalQuizzes}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {quizStats.totalQuestions > 0
                  ? `${Math.round((quizStats.totalCorrect / quizStats.totalQuestions) * 100)}% ${hi ? 'accuracy' : 'accuracy'}`
                  : hi ? 'No data yet' : 'No data yet'}
              </p>
            </div>
          </div>

          {/* Recent scores */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                {hi ? 'Recent Scores' : 'Recent Scores'}
              </h3>
            </div>
            {scoreHistory.length === 0 ? (
              <div className="text-center py-12 px-4">
                <BarChart3 className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                  {hi ? 'No scores yet' : 'No scores yet'}
                </h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto">
                  {hi
                    ? 'Take a mock test or quiz to see your scores here. Your data is tracked automatically.'
                    : 'Take a mock test or quiz to see your scores here. Your data is tracked automatically.'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {scoreHistory.slice(0, 20).map((record) => (
                  <div key={record.id} className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-9 h-9 rounded-lg flex items-center justify-center',
                        record.type === 'mock'
                          ? 'bg-red-100 dark:bg-red-900/20'
                          : 'bg-blue-100 dark:bg-blue-900/20'
                      )}>
                        {record.type === 'mock'
                          ? <Target className="w-4 h-4 text-red-600 dark:text-red-400" />
                          : <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          {record.type === 'mock' ? (hi ? 'Mock Test' : 'Mock Test') : (hi ? 'Quiz' : 'Quiz')}
                        </p>
                        <p className="text-[11px] text-gray-500">
                          {new Date(record.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-extrabold text-gray-900 dark:text-white">
                        {record.score}/{record.total}
                      </p>
                      <p className={cn(
                        'text-xs font-bold',
                        record.percentage >= 80 ? 'text-green-600' :
                        record.percentage >= 60 ? 'text-blue-600' :
                        record.percentage >= 40 ? 'text-orange-600' :
                        'text-red-600'
                      )}>
                        {record.percentage}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tips */}
          {totalAttempted === 0 && (
            <div className="mt-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-800 p-4">
              <h4 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-2">
                {hi ? 'How to climb the leaderboard' : 'How to climb the leaderboard'}
              </h4>
              <ul className="space-y-1.5 text-xs text-blue-700 dark:text-blue-400">
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5">1.</span>
                  {hi
                    ? 'Take mock tests regularly from the Mock Tests page'
                    : 'Take mock tests regularly from the Mock Tests page'}
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5">2.</span>
                  {hi
                    ? 'Practice AI quizzes to improve accuracy'
                    : 'Practice AI quizzes to improve accuracy'}
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5">3.</span>
                  {hi
                    ? 'Maintain a daily streak for bonus points'
                    : 'Maintain a daily streak for bonus points'}
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5">4.</span>
                  {hi
                    ? 'Higher accuracy earns more score per question'
                    : 'Higher accuracy earns more score per question'}
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
