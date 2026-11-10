'use client';

import { useState } from 'react';
import { Languages, Loader2, Search, Shuffle } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export function AIVocabularyClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';
  const [word, setWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const lookup = async (query?: string) => {
    const q = query || word.trim();
    if (!q && !query) return;
    setLoading(true); setResult('');
    try {
      const prompt = query
        ? 'Give me 10 important English vocabulary words useful for competitive exams. For each: word, meaning, Hindi meaning, part of speech, example sentence, one synonym.'
        : `Word: "${q}". Give meaning, Hindi meaning, part of speech, 2 example sentences, 3 synonyms, 2 antonyms, and origin if interesting.`;
      const res = await fetch('/api/ai-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool: 'vocabulary', prompt, lang }),
      });
      const data = await res.json();
      setResult(data.reply || data.error || 'No response.');
    } catch { setResult('Error. Please try again.'); }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center">
          <Languages className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{hi ? 'AI शब्दावली बिल्डर' : 'AI Vocabulary Builder'}</h1>
          <p className="text-sm text-gray-500">{hi ? 'शब्द खोजें या रैंडम शब्द पाएं' : 'Search a word or get random vocabulary'}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={word}
            onChange={e => setWord(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && lookup()}
            placeholder={hi ? 'शब्द टाइप करें...' : 'Type a word...'}
            className="flex-1 px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:border-emerald-400"
          />
          <button onClick={() => lookup()} disabled={!word.trim() || loading} className="px-4 py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-sm disabled:opacity-50">
            <Search className="w-4 h-4" />
          </button>
        </div>
        <button onClick={() => lookup('random')} disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-2">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> {hi ? 'खोज रहा है...' : 'Loading...'}</> : <><Shuffle className="w-4 h-4" /> {hi ? 'रैंडम 10 शब्द' : 'Random 10 Words'}</>}
        </button>
      </div>

      {result && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="font-bold text-sm text-emerald-700 dark:text-emerald-300 mb-3">{hi ? 'परिणाम' : 'Result'}</h3>
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{result}</div>
        </div>
      )}
    </div>
  );
}
