'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage, SUPPORTED_LANGUAGES } from './LanguageProvider';
import type { Language } from './LanguageProvider';

/** Short labels shown in the compact header button */
const SHORT_LABELS: Record<Language, string> = {
  en: 'EN',
  hi: 'हि',
  ta: 'த',
  te: 'తె',
  bn: 'বা',
};

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-0.5 p-2 rounded-xl hover:bg-white/10 transition-colors text-blue-100 hover:text-white text-xs font-bold"
        aria-label="Change language"
        aria-expanded={open}
        aria-haspopup="listbox"
        title="Change language"
      >
        <span className="w-5 h-5 flex items-center justify-center">
          {SHORT_LABELS[lang]}
        </span>
        <ChevronDown className="w-3 h-3 opacity-60" />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {SUPPORTED_LANGUAGES.map((l) => (
            <button
              key={l.code}
              role="option"
              aria-selected={lang === l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                lang === l.code
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-[#1a3a5c] dark:text-blue-200 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className="w-6 text-center font-bold text-xs opacity-70">
                {SHORT_LABELS[l.code]}
              </span>
              <span>{l.nativeLabel}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">
                {l.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
