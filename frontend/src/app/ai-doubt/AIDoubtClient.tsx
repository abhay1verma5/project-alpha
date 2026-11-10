'use client';

import { useState } from 'react';
import { HelpCircle, Loader2, Send } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export function AIDoubtClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';
  const [doubt, setDoubt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const solve = async () => {
    if (!doubt.trim()) return;
    setLoading(true); setResult('');
    try {
      const res = await fetch('/api/ai-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'doubt', prompt: doubt, lang }),
      });
      const data = await res.json();
      setResult(data.reply || data.error || 'No response.');
    } catch { setResult('Error. Please try again.'); }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
          <HelpCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{hi ? 'AI डाउट सॉल्वर' : 'AI Doubt Solver'}</h1>
          <p className="text-sm text-gray-500">{hi ? 'कोई भी संदेह पूछें, AI समझाएगा' : 'Ask any doubt, AI will explain clearly'}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <textarea
          value={doubt}
          onChange={e => setDoubt(e.target.value)}
          placeholder={hi ? 'अपना सवाल पूछें... (जैसे: मौलिक अधिकार और नीति निर्देशक तत्व में क्या अंतर है?)' : 'Ask your doubt... (e.g., What is the difference between Fundamental Rights and DPSP?)'}
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm resize-none focus:outline-none focus:border-indigo-400 mb-3"
        />
        <button onClick={solve} disabled={!doubt.trim() || loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-2">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> {hi ? 'समझा रहा है...' : 'Explaining...'}</> : <><Send className="w-4 h-4" /> {hi ? 'समझाएं' : 'Explain'}</>}
        </button>
      </div>

      {result && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="font-bold text-sm text-indigo-700 dark:text-indigo-300 mb-3">{hi ? 'व्याख्या' : 'Explanation'}</h3>
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{result}</div>
        </div>
      )}
    </div>
  );
}
