'use client';

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'ta' | 'te' | 'bn';

export const SUPPORTED_LANGUAGES: { code: Language; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা' },
];

const VALID_LANGS = new Set<string>(SUPPORTED_LANGUAGES.map((l) => l.code));

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  /** Legacy toggle: cycles en -> hi -> ta -> te -> bn -> en */
  toggleLang: () => void;
  /** Bilingual helper — picks Hindi string when lang is 'hi', else English. For regional languages, falls back to English. */
  t: (en: string, hi: string | null | undefined) => string;
}

const LANG_KEY = 'sarkari_lang';

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
  t: (en) => en,
});

const LANG_ORDER: Language[] = ['en', 'hi', 'ta', 'te', 'bn'];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  // Load saved language preference on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved && VALID_LANGS.has(saved)) {
        setLangState(saved as Language);
      }
    } catch {}
    setMounted(true);
  }, []);

  // Keep <html lang> in sync so screen readers and search engines see the real language.
  useEffect(() => {
    try { document.documentElement.lang = lang === 'en' ? 'en-IN' : lang; } catch {}
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try { localStorage.setItem(LANG_KEY, next); } catch {}
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const idx = LANG_ORDER.indexOf(prev);
      const next = LANG_ORDER[(idx + 1) % LANG_ORDER.length];
      try { localStorage.setItem(LANG_KEY, next); } catch {}
      return next;
    });
  }, []);

  const t = useCallback(
    (en: string, hi: string | null | undefined) => {
      if (lang === 'hi' && hi && hi !== 'None' && hi.trim() !== '') return hi;
      return en;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
