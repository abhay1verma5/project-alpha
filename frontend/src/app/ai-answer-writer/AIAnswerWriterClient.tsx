'use client';

import { useState } from 'react';
import { PenTool, Loader2, Send } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export function AIAnswerWriterClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const generate = async () => {
    if (!question.trim()) return;
    setLoading(true); setResult('');
    try {
      const res = await fetch('/api/ai-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'answer-writer', prompt: question, lang }),
      });
      const data = await res.json();
      setResult(data.reply || data.error || 'No response.');
    } catch { setResult('Error. Please try again.'); }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-600 to-pink-600 flex items-center justify-center">
          <PenTool className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{hi ? 'AI उत्तर लेखक' : 'AI Answer Writer'}</h1>
          <p className="text-sm text-gray-500">{hi ? 'किसी भी प्रश्न का मॉडल उत्तर पाएं' : 'Get model answers for descriptive questions'}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <textarea
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder={hi ? 'अपना प्रश्न यहाँ लिखें... (जैसे: भारत में संघवाद पर निबंध लिखें)' : 'Enter your question here... (e.g., Write an essay on Federalism in India)'}
          rows={4}
          className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm resize-none focus:outline-none focus:border-rose-400 mb-3"
        />
        <button onClick={generate} disabled={!question.trim() || loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-2">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> {hi ? 'लिख रहा है...' : 'Writing...'}</> : <><Send className="w-4 h-4" /> {hi ? 'उत्तर लिखें' : 'Generate Answer'}</>}
        </button>
      </div>

      {result && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="font-bold text-sm text-rose-700 dark:text-rose-300 mb-3">{hi ? 'मॉडल उत्तर' : 'Model Answer'}</h3>
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{result}</div>
        </div>
      )}
    </div>
  );
}
