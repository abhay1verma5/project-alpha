'use client';

import { useState } from 'react';
import { Calculator, Loader2, Send } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export function AIMathClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const solve = async () => {
    if (!problem.trim()) return;
    setLoading(true); setResult('');
    try {
      const res = await fetch('/api/ai-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'math', prompt: problem, lang }),
      });
      const data = await res.json();
      setResult(data.reply || data.error || 'No response.');
    } catch { setResult('Error. Please try again.'); }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{hi ? 'AI गणित सॉल्वर' : 'AI Math Solver'}</h1>
          <p className="text-sm text-gray-500">{hi ? 'कोई भी गणित सवाल हल करें' : 'Step-by-step math solutions'}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <textarea
          value={problem}
          onChange={e => setProblem(e.target.value)}
          placeholder={hi ? 'गणित का सवाल लिखें... (जैसे: 15% of 480 = ?, या अनुक्रम 2, 6, 18, 54, ? का अगला पद)' : 'Enter math problem... (e.g., 15% of 480 = ?, or Find next: 2, 6, 18, 54, ?)'}
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm resize-none focus:outline-none focus:border-blue-400 mb-3"
        />
        <button onClick={solve} disabled={!problem.trim() || loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-2">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> {hi ? 'हल कर रहा है...' : 'Solving...'}</> : <><Send className="w-4 h-4" /> {hi ? 'हल करें' : 'Solve'}</>}
        </button>
      </div>

      {result && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="font-bold text-sm text-blue-700 dark:text-blue-300 mb-3">{hi ? 'हल' : 'Solution'}</h3>
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{result}</div>
        </div>
      )}
    </div>
  );
}
