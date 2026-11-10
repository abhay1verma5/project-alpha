'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, Mic, MicOff, Loader2, Filter, AlertCircle } from 'lucide-react';
import { JobCard } from './JobCard';
import { type Job, searchJobs } from '@/lib/api';
import { CATEGORY_LABELS, STATE_LABELS } from '@/lib/utils';
import { useLanguage } from './LanguageProvider';
import { tr } from '@/lib/translations';

interface AiResponse {
  results: Job[];
  summary: string;
  filters: Record<string, string | null>;
  ai_powered: boolean;
  error?: string;
}

export function SearchPageClient({ initialQuery, initialMode }: { initialQuery: string; initialMode: string }) {
  const { lang } = useLanguage();
  const [query, setQuery] = useState(initialQuery);
  const [mode, setMode] = useState<'normal' | 'ai'>(initialMode === 'ai' ? 'ai' : 'normal');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Job[]>([]);
  const [aiSummary, setAiSummary] = useState('');
  const [aiFilters, setAiFilters] = useState<Record<string, string | null>>({});
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const router = useRouter();

  // Voice setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SR) {
        const r = new SR();
        r.lang = 'hi-IN';
        r.continuous = false;
        r.interimResults = true;
        r.onresult = (e: SpeechRecognitionEvent) => {
          const t = Array.from(e.results).map(res => res[0].transcript).join('');
          setQuery(t);
          if (e.results[0].isFinal) {
            setIsListening(false);
            doSearch(t, 'ai');
          }
        };
        r.onend = () => setIsListening(false);
        r.onerror = () => setIsListening(false);
        recognitionRef.current = r;
      }
    }
  }, []);

  // Auto-search on load if query present
  useEffect(() => {
    if (initialQuery && initialQuery.length >= 2) {
      doSearch(initialQuery, initialMode === 'ai' ? 'ai' : 'normal');
    }
  }, []);

  const doSearch = async (q: string, searchMode: 'normal' | 'ai') => {
    if (!q || q.length < 2) return;
    setLoading(true);
    setError('');
    setSearched(true);
    setMode(searchMode);

    const params = new URLSearchParams({ q, mode: searchMode });
    router.replace(`/search?${params.toString()}`, { scroll: false });

    try {
      if (searchMode === 'ai') {
        const res = await fetch('/api/ai-search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: q }),
        });
        const data: AiResponse = await res.json();
        if (data.error) {
          setError(data.error as string);
        } else {
          setResults(data.results || []);
          setAiSummary(data.summary || '');
          setAiFilters(data.filters || {});
        }
      } else {
        const data = await searchJobs(q);
        setResults(data.results || []);
        setAiSummary('');
        setAiFilters({});
      }
    } catch {
      setError(tr('common.error', lang));
    }
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch(query.trim(), mode);
  };

  const toggleVoice = () => {
    if (!recognitionRef.current) return;
    if (isListening) { recognitionRef.current.stop(); setIsListening(false); }
    else { recognitionRef.current.start(); setIsListening(true); }
  };

  const activeAiFilters = Object.entries(aiFilters).filter(([, v]) => v);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">{tr('search.heading', lang)}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{tr('search.subtitle', lang)}</p>
      </div>

      {/* Mode toggle tabs */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => { setMode('normal'); if (query.length >= 2 && searched) doSearch(query, 'normal'); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
            mode === 'normal'
              ? 'bg-[#1a3a5c] text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          <Search className="w-4 h-4" /> {tr('search.normalSearch', lang)}
        </button>
        <button
          onClick={() => { setMode('ai'); if (query.length >= 2 && searched) doSearch(query, 'ai'); }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
            mode === 'ai'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          <Sparkles className="w-4 h-4" /> {tr('search.aiSearch', lang)}
        </button>
      </div>

      {/* Search input */}
      <form onSubmit={handleSubmit} className="relative w-full max-w-2xl mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={mode === 'ai' ? tr('search.placeholderAi', lang) : tr('search.placeholderNormal', lang)}
          className="w-full pl-12 pr-28 py-3.5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-[#1a3a5c] text-base font-medium"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {mode === 'ai' && (
            <button
              type="button"
              onClick={toggleVoice}
              className={`p-2 rounded-xl transition-all ${
                isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 dark:bg-gray-800 text-gray-600'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center gap-1.5 px-4 py-2 text-white text-sm font-bold rounded-xl transition-all active:scale-95 ${
              mode === 'ai'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600'
                : 'bg-[#1a3a5c] hover:bg-[#0d2137]'
            }`}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : mode === 'ai' ? <Sparkles className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            {tr('search.searchBtn', lang)}
          </button>
        </div>
      </form>

      {isListening && (
        <p className="text-sm text-red-500 font-semibold mb-4 animate-pulse">
          🎤 {tr('search.listening', lang)}
        </p>
      )}

      {/* Quick suggestions */}
      {!searched && (
        <div className="mb-8">
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-3">{tr('search.popularSearches', lang)}</p>
          <div className="flex flex-wrap gap-2">
            {['SSC CGL 2026', 'Railway Group D', '10th pass job', 'UP police', 'UPSC result', 'GNM nursing', 'Gram panchayat', 'B.Tech job Delhi', 'polytechnic admission', 'IBPS PO', 'Army Agniveer', 'teacher vacancy'].map((s) => (
              <button
                key={s}
                onClick={() => { setQuery(s); doSearch(s, mode); }}
                className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-700 transition-colors active:scale-95"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-16">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
            <span className="text-blue-800 dark:text-blue-200 font-bold">
              {mode === 'ai' ? `AI is searching: "${query}"` : `Searching: "${query}"`}
            </span>
          </div>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="text-center py-16">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800 dark:text-red-200 font-semibold">{error}</span>
          </div>
        </div>
      )}

      {/* Results */}
      {!loading && !error && searched && (
        <div>
          {/* AI Summary */}
          {mode === 'ai' && aiSummary && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border border-purple-200 dark:border-purple-800">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900 dark:text-white">{aiSummary}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{tr('search.aiPowered', lang)}</p>
                </div>
              </div>
              {activeAiFilters.length > 0 && (
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <Filter className="w-3.5 h-3.5 text-gray-400" />
                  {activeAiFilters.map(([key, value]) => (
                    <span key={key} className="px-2.5 py-1 rounded-lg bg-white dark:bg-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                      {key === 'category' ? CATEGORY_LABELS[value!] || value :
                       key === 'state' ? STATE_LABELS[value!] || value : value}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Result count */}
          <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-4">
            {results.length} {results.length === 1 ? tr('search.resultFound', lang) : tr('search.resultsFound', lang)}
            {mode === 'normal' && <span className="font-normal"> {tr('common.for', lang)} &ldquo;{query}&rdquo;</span>}
          </p>

          {/* Job cards */}
          {results.length > 0 ? (
            <div className="grid gap-3">
              {results.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
              <Search className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
              <p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">{tr('search.noResults', lang)}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                {tr('search.tryDifferent', lang)} {mode === 'normal' ? tr('search.aiSearch', lang) : tr('search.normalSearch', lang)}
              </p>
              <button
                onClick={() => doSearch(query, mode === 'normal' ? 'ai' : 'normal')}
                className="px-5 py-2.5 rounded-xl bg-[#1a3a5c] text-white font-bold text-sm active:scale-95 transition-all"
              >
                {mode === 'normal' ? tr('search.aiSearch', lang) : tr('search.normalSearch', lang)}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!searched && !loading && (
        <div className="text-center py-16">
          <Search className="w-16 h-16 text-gray-200 dark:text-gray-800 mx-auto mb-4" />
          <p className="text-gray-900 dark:text-gray-100 text-xl font-bold mb-2">{tr('search.searchGovtJobs', lang)}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
            <strong>{tr('search.normalSearch', lang)}</strong>: keyword match.
            <br />
            <strong>{tr('search.aiSearch', lang)}</strong>: {lang === 'hi' ? 'प्राकृतिक भाषा समझता है' : 'understands natural language like'}
            {lang !== 'hi' && <> &ldquo;10th pass railway job UP&rdquo;</>}
          </p>
        </div>
      )}
    </div>
  );
}
