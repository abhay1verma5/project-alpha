'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Keyboard, Timer, RotateCcw, Trophy } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';

const PASSAGES_EN = [
  "The Government of India provides numerous employment opportunities for citizens across various departments and organizations. Candidates with different educational qualifications can apply for positions ranging from clerical roles to administrative services. The selection process typically involves written examinations followed by interviews or skill tests.",
  "India is a democratic republic with a federal structure of governance. The Constitution of India provides fundamental rights to all citizens including the right to equality, right to freedom, and right against exploitation. The Parliament of India consists of two houses namely the Lok Sabha and the Rajya Sabha.",
  "The Indian economy is one of the fastest growing economies in the world. Agriculture plays a vital role in the economic development of the country with a majority of the population depending on farming for their livelihood. The government has launched several schemes to support farmers and promote agricultural growth.",
  "Education is the most powerful weapon which you can use to change the world. The government has taken several initiatives to improve the quality of education in India. Schemes like Sarva Shiksha Abhiyan and Mid Day Meal have helped increase enrollment rates in schools across the country.",
  "Information technology has transformed the way government services are delivered to citizens. Digital India initiative aims to ensure that government services are made available to citizens electronically by improved online infrastructure and by increasing Internet connectivity. This has greatly improved transparency and efficiency in governance.",
];

const DURATIONS = [1, 2, 3, 5]; // minutes

export function TypingTestClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';
  const [duration, setDuration] = useState(2);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [passage, setPassage] = useState('');
  const [typed, setTyped] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTest = useCallback(() => {
    const p = PASSAGES_EN[Math.floor(Math.random() * PASSAGES_EN.length)];
    setPassage(p);
    setTyped('');
    setTimeLeft(duration * 60);
    setStarted(true);
    setFinished(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [duration]);

  useEffect(() => {
    if (!started || finished) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [started, finished]);

  const calcResults = () => {
    const words = typed.trim().split(/\s+/).filter(w => w.length > 0);
    const passageWords = passage.split(/\s+/);
    let correct = 0;
    words.forEach((w, i) => { if (w === passageWords[i]) correct++; });
    const totalWords = words.length;
    const elapsed = duration * 60 - timeLeft;
    const minutes = elapsed / 60 || 1;
    const wpm = Math.round(totalWords / minutes);
    const accuracy = totalWords > 0 ? Math.round((correct / totalWords) * 100) : 0;
    const netWpm = Math.round(wpm * (accuracy / 100));
    return { totalWords, correct, wpm, accuracy, netWpm };
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (!started) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
            <Keyboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {hi ? 'टाइपिंग टेस्ट' : 'Typing Speed Test'}
            </h1>
            <p className="text-sm text-gray-500">
              {hi ? 'SSC/बैंकिंग टाइपिंग परीक्षा अभ्यास' : 'Practice for SSC/Banking typing exams'}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 mb-4">
          <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-3">
            {hi ? 'समय अवधि चुनें' : 'Select Duration'}
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {DURATIONS.map(d => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={cn(
                  'py-3 rounded-xl text-sm font-bold transition-all',
                  duration === d ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                )}
              >
                {d} {hi ? 'मिनट' : 'min'}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-4 mb-4">
          <h3 className="font-semibold text-sm text-blue-800 dark:text-blue-300 mb-2">{hi ? 'SSC टाइपिंग मानक' : 'SSC Typing Standards'}</h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-blue-700 dark:text-blue-400">
            <div>English: 35 WPM (SSC CHSL)</div>
            <div>English: 40 WPM (SSC CGL)</div>
            <div>Hindi: 30 WPM (SSC CHSL)</div>
            <div>IBPS: 30 WPM</div>
          </div>
        </div>

        <button
          onClick={startTest}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-base shadow-lg active:scale-[0.98] transition-all"
        >
          <Keyboard className="w-5 h-5 inline mr-2" />
          {hi ? 'टेस्ट शुरू करें' : 'Start Typing Test'}
        </button>
      </div>
    );
  }

  if (finished) {
    const r = calcResults();
    return (
      <div>
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 text-center text-white mb-6 shadow-xl">
          <Trophy className="w-12 h-12 mx-auto mb-3 text-yellow-300" />
          <p className="text-4xl font-extrabold">{r.netWpm} WPM</p>
          <p className="text-sm text-green-100 mt-1">{hi ? 'शुद्ध गति' : 'Net Speed'}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: hi ? 'कुल शब्द' : 'Total Words', value: r.totalWords },
            { label: hi ? 'सही शब्द' : 'Correct', value: r.correct },
            { label: hi ? 'सकल WPM' : 'Gross WPM', value: r.wpm },
            { label: hi ? 'शुद्धता' : 'Accuracy', value: `${r.accuracy}%` },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 text-center">
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4">
          <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-2">{hi ? 'मूल्यांकन' : 'Assessment'}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {r.netWpm >= 40 ? (hi ? 'उत्कृष्ट! SSC CGL मानक पास।' : 'Excellent! Meets SSC CGL standard.') :
             r.netWpm >= 35 ? (hi ? 'बहुत अच्छा! SSC CHSL मानक पास।' : 'Very Good! Meets SSC CHSL standard.') :
             r.netWpm >= 30 ? (hi ? 'अच्छा! IBPS मानक पास।' : 'Good! Meets IBPS standard.') :
             (hi ? 'और अभ्यास की आवश्यकता है। रोज़ 15 मिनट अभ्यास करें।' : 'Needs more practice. Practice 15 minutes daily.')}
          </p>
        </div>

        <button
          onClick={() => { setStarted(false); setFinished(false); }}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-sm"
        >
          <RotateCcw className="w-4 h-4" /> {hi ? 'फिर से' : 'Try Again'}
        </button>
      </div>
    );
  }

  // Active test
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="font-bold text-sm text-gray-900 dark:text-white">
          <Keyboard className="w-4 h-4 inline mr-1" /> {hi ? 'टाइपिंग टेस्ट' : 'Typing Test'}
        </span>
        <span className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold',
          timeLeft <= 30 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-green-100 text-green-700'
        )}>
          <Timer className="w-4 h-4" /> {formatTime(timeLeft)}
        </span>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-mono">
          {passage.split('').map((char, i) => {
            let color = 'text-gray-400';
            if (i < typed.length) {
              color = typed[i] === char ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-red-600 bg-red-50 dark:bg-red-900/20';
            } else if (i === typed.length) {
              color = 'bg-blue-200 dark:bg-blue-800 text-gray-900 dark:text-white';
            }
            return <span key={i} className={color}>{char}</span>;
          })}
        </p>
      </div>

      <textarea
        ref={inputRef}
        value={typed}
        onChange={e => setTyped(e.target.value)}
        className="w-full h-32 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-mono focus:border-green-400 focus:outline-none resize-none"
        placeholder={hi ? 'ऊपर का पैराग्राफ यहाँ टाइप करें...' : 'Start typing the passage above...'}
        autoFocus
      />

      <button
        onClick={() => { if (timerRef.current) clearInterval(timerRef.current); setFinished(true); }}
        className="mt-3 w-full py-3 rounded-xl bg-red-600 text-white font-bold text-sm active:scale-[0.98] transition-all"
      >
        {hi ? 'टेस्ट समाप्त करें' : 'End Test'}
      </button>
    </div>
  );
}
