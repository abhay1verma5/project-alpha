'use client';

import { useState, useEffect, useCallback } from 'react';
import { CalendarDays, Plus, Trash2, CheckCircle2, Flame } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'sarkari_study_plan';

interface StudyTask {
  id: string;
  subject: string;
  dailyHours: number;
  targetDate: string;
  completedDays: string[]; // ISO date strings like '2026-10-19'
}

function getTodayStr(): string {
  return new Date().toISOString().split('T')[0];
}

function getWeekDates(): string[] {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

function calculateStreak(completedDays: string[]): number {
  if (completedDays.length === 0) return 0;
  const sorted = [...completedDays].sort().reverse();
  const today = getTodayStr();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  // Streak must include today or yesterday to be current
  if (sorted[0] !== today && sorted[0] !== yesterdayStr) return 0;

  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);
    const diff = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);
    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

const DAY_LABELS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_LABELS_HI = ['सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि', 'रवि'];

export function StudyPlannerClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';

  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [mounted, setMounted] = useState(false);

  // Form state
  const [subject, setSubject] = useState('');
  const [dailyHours, setDailyHours] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setTasks(JSON.parse(saved));
      }
    } catch {}
    setMounted(true);
  }, []);

  // Save to localStorage
  const saveTasks = useCallback((updated: StudyTask[]) => {
    setTasks(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}
  }, []);

  const addTask = () => {
    if (!subject.trim() || !dailyHours || !targetDate) return;
    const newTask: StudyTask = {
      id: Date.now().toString(),
      subject: subject.trim(),
      dailyHours: parseFloat(dailyHours),
      targetDate,
      completedDays: [],
    };
    saveTasks([...tasks, newTask]);
    setSubject('');
    setDailyHours('');
    setTargetDate('');
    setShowForm(false);
  };

  const deleteTask = (id: string) => {
    saveTasks(tasks.filter(t => t.id !== id));
  };

  const toggleToday = (id: string) => {
    const today = getTodayStr();
    saveTasks(tasks.map(t => {
      if (t.id !== id) return t;
      const has = t.completedDays.includes(today);
      return {
        ...t,
        completedDays: has
          ? t.completedDays.filter(d => d !== today)
          : [...t.completedDays, today],
      };
    }));
  };

  const weekDates = getWeekDates();
  const today = getTodayStr();

  if (!mounted) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-xl" />
        <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
          <CalendarDays className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {hi ? 'स्टडी प्लानर' : 'Study Planner'}
          </h1>
          <p className="text-sm text-gray-500">
            {hi ? 'अपनी परीक्षा की तैयारी का प्लान बनाएं' : 'Plan your exam preparation'}
          </p>
        </div>
      </div>

      {/* Add Task Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full mb-6 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 font-bold text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
        >
          <Plus className="w-4 h-4" />
          {hi ? 'नया विषय जोड़ें' : 'Add New Subject'}
        </button>
      )}

      {/* Add Task Form */}
      {showForm && (
        <div className="mb-6 p-4 bg-white dark:bg-gray-900 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800">
          <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm">
            {hi ? 'नया विषय जोड़ें' : 'Add New Subject'}
          </h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder={hi ? 'विषय का नाम (जैसे: गणित)' : 'Subject name (e.g. Mathematics)'}
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  {hi ? 'दैनिक घंटे' : 'Daily Hours Target'}
                </label>
                <input
                  type="number"
                  min="0.5"
                  max="16"
                  step="0.5"
                  placeholder="2"
                  value={dailyHours}
                  onChange={e => setDailyHours(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  {hi ? 'लक्ष्य तिथि' : 'Target Date'}
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={e => setTargetDate(e.target.value)}
                  min={today}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={addTask}
                disabled={!subject.trim() || !dailyHours || !targetDate}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm disabled:opacity-40 active:scale-[0.98] transition-all"
              >
                {hi ? 'जोड़ें' : 'Add Subject'}
              </button>
              <button
                onClick={() => { setShowForm(false); setSubject(''); setDailyHours(''); setTargetDate(''); }}
                className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-bold text-sm"
              >
                {hi ? 'रद्द' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {tasks.length === 0 && !showForm && (
        <div className="text-center py-12 text-gray-400">
          <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="font-bold">
            {hi ? 'कोई विषय नहीं जोड़ा गया' : 'No subjects added yet'}
          </p>
          <p className="text-sm mt-1">
            {hi ? 'अपनी पढ़ाई का प्लान बनाने के लिए विषय जोड़ें' : 'Add subjects to start planning your study'}
          </p>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map(task => {
          const streak = calculateStreak(task.completedDays);
          const isDoneToday = task.completedDays.includes(today);
          const daysLeft = Math.max(0, Math.ceil((new Date(task.targetDate).getTime() - new Date(today).getTime()) / (1000 * 60 * 60 * 24)));
          const dayLabels = hi ? DAY_LABELS_HI : DAY_LABELS_EN;

          return (
            <div
              key={task.id}
              className={cn(
                'p-4 bg-white dark:bg-gray-900 rounded-2xl border-2 transition-all',
                isDoneToday
                  ? 'border-green-300 dark:border-green-700'
                  : 'border-gray-200 dark:border-gray-800'
              )}
            >
              {/* Task Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-base">
                    {task.subject}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span>{task.dailyHours} {hi ? 'घंटे/दिन' : 'hrs/day'}</span>
                    <span>{daysLeft} {hi ? 'दिन बाकी' : 'days left'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {streak > 0 && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-100 dark:bg-orange-900/20">
                      <Flame className="w-3.5 h-3.5 text-orange-500" />
                      <span className="text-xs font-extrabold text-orange-600 dark:text-orange-400">
                        {streak} {hi ? 'दिन' : streak === 1 ? 'day' : 'days'}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    title={hi ? 'हटाएं' : 'Delete'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Today's Checkbox */}
              <button
                onClick={() => toggleToday(task.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-3 transition-all text-sm font-bold',
                  isDoneToday
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/10'
                )}
              >
                <CheckCircle2 className={cn(
                  'w-5 h-5 transition-colors',
                  isDoneToday ? 'text-green-500' : 'text-gray-300 dark:text-gray-600'
                )} />
                {isDoneToday
                  ? (hi ? 'आज की पढ़ाई पूरी!' : "Today's study done!")
                  : (hi ? 'आज की पढ़ाई पूरी करें' : "Mark today's study as done")}
              </button>

              {/* Weekly View */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  {hi ? 'इस सप्ताह' : 'This Week'}
                </p>
                <div className="grid grid-cols-7 gap-1.5">
                  {weekDates.map((date, i) => {
                    const isCompleted = task.completedDays.includes(date);
                    const isToday = date === today;
                    const isFuture = date > today;
                    return (
                      <div key={date} className="text-center">
                        <span className="block text-[10px] font-bold text-gray-400 mb-1">
                          {dayLabels[i]}
                        </span>
                        <div
                          className={cn(
                            'w-8 h-8 sm:w-9 sm:h-9 mx-auto rounded-lg flex items-center justify-center text-xs font-extrabold transition-all',
                            isCompleted
                              ? 'bg-green-500 text-white'
                              : isToday
                                ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-400'
                                : isFuture
                                  ? 'bg-gray-50 dark:bg-gray-800/50 text-gray-300 dark:text-gray-600'
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                          )}
                        >
                          {new Date(date).getDate()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Total completed */}
              <p className="text-[10px] text-gray-400 mt-3 text-center font-semibold">
                {hi
                  ? `कुल ${task.completedDays.length} दिन पूरे किए`
                  : `${task.completedDays.length} total days completed`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
