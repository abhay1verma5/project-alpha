'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Mic, MicOff, Sparkles } from 'lucide-react';

export function SearchBar({ defaultValue = '', variant = 'hero' }: { defaultValue?: string; variant?: 'hero' | 'inline' }) {
  const [query, setQuery] = useState(defaultValue);
  const [isListening, setIsListening] = useState(false);
  const [mode, setMode] = useState<'normal' | 'ai'>('normal');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const router = useRouter();

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
            router.push(`/search?q=${encodeURIComponent(t)}&mode=ai`);
          }
        };
        r.onend = () => setIsListening(false);
        r.onerror = () => setIsListening(false);
        recognitionRef.current = r;
      }
    }
  }, [router]);

  const toggleVoice = () => {
    if (!recognitionRef.current) return;
    if (isListening) { recognitionRef.current.stop(); setIsListening(false); }
    else { recognitionRef.current.start(); setIsListening(true); }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}&mode=${mode}`);
    }
  };

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search jobs, exams, organizations..."
          className="w-full pl-12 pr-24 py-3.5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-[#1a3a5c] text-base font-medium"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1a3a5c] text-white text-sm font-bold rounded-xl active:scale-95 transition-all"
        >
          Search
        </button>
      </form>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2 sm:px-0">
      {/* Mode toggle */}
      <div className="flex justify-center gap-2 mb-3">
        <button
          type="button"
          onClick={() => setMode('normal')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            mode === 'normal'
              ? 'bg-white text-[#1a3a5c] shadow-md'
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          <Search className="w-3 h-3" /> Normal
        </button>
        <button
          type="button"
          onClick={() => setMode('ai')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            mode === 'ai'
              ? 'bg-[#ff6f00] text-white shadow-md'
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          <Sparkles className="w-3 h-3" /> AI Search
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ff6f00] via-white/30 to-[#1b5e20] rounded-2xl opacity-20 blur hidden sm:block" />
          <div className="relative flex items-center bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-800">
            <Search className="absolute left-4 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isListening ? 'Listening... बोलिए' : mode === 'ai' ? "Hindi/English — '10th pass railway job UP'" : 'SSC, Railway, UPSC, Bank jobs...'}
              className="w-full pl-12 pr-28 sm:pr-36 py-3.5 sm:py-4 rounded-2xl bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none text-sm sm:text-base font-medium"
            />
            <div className="absolute right-2 flex items-center gap-1.5">
              <button
                type="button"
                onClick={toggleVoice}
                className={`p-2.5 rounded-xl transition-all ${
                  isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 hover:bg-gray-200'
                }`}
                title="Voice search — Hindi / English"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <button
                type="submit"
                className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 text-white text-sm font-bold rounded-xl transition-all shadow-lg active:scale-95 ${
                  mode === 'ai'
                    ? 'bg-gradient-to-r from-[#ff6f00] to-amber-500 shadow-orange-500/25'
                    : 'bg-[#1a3a5c] shadow-blue-900/25'
                }`}
              >
                {mode === 'ai' ? <Sparkles className="w-4 h-4" /> : <Search className="w-4 h-4" />}
                <span className="hidden sm:inline">{mode === 'ai' ? 'AI Search' : 'Search'}</span>
                <span className="sm:hidden">Go</span>
              </button>
            </div>
          </div>
        </div>
      </form>
      {isListening && (
        <p className="text-center text-sm text-red-300 font-semibold mt-3 animate-pulse">
          🎤 Listening... Hindi या English में बोलिए
        </p>
      )}
    </div>
  );
}
