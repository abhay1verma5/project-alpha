'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { twTr } from './i18n';

/** Renders a localised string inside server components. */
export function TwText({ id, vars }: { id: string; vars?: Record<string, string | number> }) {
  const { lang } = useLanguage();
  return <>{twTr(id, lang, vars)}</>;
}

/** Required disclaimer shown on every card and table. */
export function ApproxNote({ asOf }: { asOf: string }) {
  const { lang } = useLanguage();
  return (
    <div className="rounded-lg bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
      <p className="font-bold">{twTr('tw.approx', lang)}</p>
      <p className="mt-0.5 text-amber-800 dark:text-amber-300">{twTr('tw.asOf', lang, { date: asOf })}</p>
    </div>
  );
}
