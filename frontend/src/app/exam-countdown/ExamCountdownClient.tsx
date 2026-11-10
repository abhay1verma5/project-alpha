'use client';

import { useState, useEffect } from 'react';
import { Timer, Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';

interface ExamDate { name: string; date: string; custom?: boolean; }

const DEFAULT_EXAMS: ExamDate[] = [
  { name: 'SSC CGL 2026 Tier-1', date: '2026-12-15' },
  { name: 'UPSC CSE Prelims 2027', date: '2027-06-15' },
  { name: 'IBPS PO Prelims 2026', date: '2026-10-25' },
  { name: 'RRB NTPC CBT-1 2026', date: '2026-11-20' },
  { name: 'SSC CHSL 2026', date: '2027-01-10' },
  { name: 'CTET Dec 2026', date: '2026-12-22' },
  { name: 'NDA 2027-I', date: '2027-04-13' },
  { name: 'IBPS Clerk 2026', date: '2026-12-05' },
];

const CUSTOM_KEY = 'sarkari_custom_exams';
function getCustom(): ExamDate[] { try { const d = localStorage.getItem(CUSTOM_KEY); return d ? JSON.parse(d) : []; } catch { return []; } }
function saveCustom(e: ExamDate[]) { try { localStorage.setItem(CUSTOM_KEY, JSON.stringify(e)); } catch {} }

function getCountdown(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    passed: false,
  };
}

export function ExamCountdownClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';
  const [mounted, setMounted] = useState(false);
  const [custom, setCustom] = useState<ExamDate[]>([]);
  const [, setTick] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDate, setNewDate] = useState('');

  useEffect(() => { setCustom(getCustom()); setMounted(true); }, []);
  useEffect(() => { const i = setInterval(() => setTick(t => t + 1), 1000); return () => clearInterval(i); }, []);

  const all = [...DEFAULT_EXAMS, ...custom.map(e => ({ ...e, custom: true }))].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const add = () => {
    if (!newName.trim() || !newDate) return;
    const u = [...custom, { name: newName.trim(), date: newDate, custom: true }];
    setCustom(u); saveCustom(u); setNewName(''); setNewDate(''); setShowAdd(false);
  };
  const remove = (i: number) => { const u = custom.filter((_, j) => j !== i); setCustom(u); saveCustom(u); };

  if (!mounted) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center">
          <Timer className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{hi ? 'परीक्षा काउंटडाउन' : 'Exam Countdown Timers'}</h1>
          <p className="text-sm text-gray-500">{hi ? 'आगामी परीक्षाओं की उल्टी गिनती' : 'Live countdowns to upcoming exams'}</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {all.map((exam, idx) => {
          const cd = getCountdown(exam.date);
          const ci = exam.custom ? custom.findIndex(e => e.name === exam.name && e.date === exam.date) : -1;
          return (
            <div key={`${exam.name}-${idx}`} className={cn('bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4', cd.passed && 'opacity-50')}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">{exam.name}</h3>
                  <p className="text-xs text-gray-500">{new Date(exam.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                {exam.custom && ci >= 0 && (
                  <button onClick={() => remove(ci)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                )}
              </div>
              {cd.passed ? (
                <p className="text-xs font-bold text-gray-400">{hi ? 'परीक्षा तिथि बीत चुकी' : 'Exam date has passed'}</p>
              ) : (
                <div className="grid grid-cols-4 gap-2">
                  {[{ v: cd.days, l: hi ? 'दिन' : 'Days' }, { v: cd.hours, l: hi ? 'घंटे' : 'Hrs' }, { v: cd.minutes, l: hi ? 'मिनट' : 'Min' }, { v: cd.seconds, l: hi ? 'सेकंड' : 'Sec' }].map(u => (
                    <div key={u.l} className="bg-red-50 dark:bg-red-900/20 rounded-lg p-2 text-center">
                      <p className="text-xl font-extrabold text-red-700 dark:text-red-300">{u.v}</p>
                      <p className="text-[10px] font-bold text-red-500 uppercase">{u.l}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showAdd ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl border-2 border-dashed border-red-300 dark:border-red-700 p-4 mb-4">
          <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-3">{hi ? 'कस्टम परीक्षा जोड़ें' : 'Add Custom Exam'}</h3>
          <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder={hi ? 'परीक्षा का नाम' : 'Exam name'} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm mb-2 focus:outline-none focus:border-red-400" />
          <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm mb-3 focus:outline-none focus:border-red-400" />
          <div className="flex gap-2">
            <button onClick={add} className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-sm">{hi ? 'जोड़ें' : 'Add'}</button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 font-bold text-sm">{hi ? 'रद्द' : 'Cancel'}</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setShowAdd(true)} className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-500 font-bold text-sm flex items-center justify-center gap-2 hover:border-red-400 hover:text-red-500 transition-colors">
          <Plus className="w-4 h-4" /> {hi ? 'कस्टम परीक्षा जोड़ें' : 'Add Custom Exam'}
        </button>
      )}
    </div>
  );
}
