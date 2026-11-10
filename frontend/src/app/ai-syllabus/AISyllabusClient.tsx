'use client';

import { useState } from 'react';
import { BookOpen, Loader2 } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';

const EXAMS = ['SSC CGL', 'SSC CHSL', 'UPSC CSE Prelims', 'IBPS PO', 'RRB NTPC', 'CTET', 'NDA', 'CDS', 'SSC MTS', 'UGC NET'];

export function AISyllabusClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';
  const [exam, setExam] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const analyze = async () => {
    if (!exam) return;
    setLoading(true); setResult('');
    try {
      const res = await fetch('/api/ai-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'syllabus', prompt: `Exam: ${exam}`, lang }),
      });
      const data = await res.json();
      setResult(data.reply || data.error || 'No response received.');
    } catch { setResult('Error fetching analysis. Please try again.'); }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{hi ? 'AI सिलेबस एनालाइज़र' : 'AI Syllabus Analyzer'}</h1>
          <p className="text-sm text-gray-500">{hi ? 'किसी भी परीक्षा का सिलेबस विश्लेषण' : 'Get detailed syllabus breakdown for any exam'}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">{hi ? 'परीक्षा चुनें' : 'Select Exam'}</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
          {EXAMS.map(e => (
            <button key={e} onClick={() => setExam(e)} className={cn('py-2.5 rounded-lg text-xs font-bold transition-all', exam === e ? 'bg-teal-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300')}>{e}</button>
          ))}
        </div>
        <button onClick={analyze} disabled={!exam || loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-2">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> {hi ? 'विश्लेषण हो रहा है...' : 'Analyzing...'}</> : (hi ? 'सिलेबस विश्लेषण करें' : 'Analyze Syllabus')}
        </button>
      </div>

      {result && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="font-bold text-sm text-teal-700 dark:text-teal-300 mb-3">{exam} — {hi ? 'सिलेबस विश्लेषण' : 'Syllabus Analysis'}</h3>
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{result}</div>
        </div>
      )}
    </div>
  );
}
