'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { MockTestsClient } from '@/app/mock-tests/MockTestsClient';
import { DailyQuizClient } from '@/components/daily-quiz/DailyQuizClient';
import { QuizClient } from '@/components/ai-quiz/QuizClient';
import { cn } from '@/lib/utils';

const TABS = [
  { id: 'mock', label: 'Mock tests', hint: 'Timed tests with score' },
  { id: 'daily', label: 'Daily quiz', hint: '10 new GK questions daily' },
  { id: 'ai', label: 'AI quiz', hint: 'Make a quiz on any topic' },
] as const;
type TabId = (typeof TABS)[number]['id'];

/** One practice section; ?type= keeps old /mock-tests, /daily-quiz, /ai-quiz links working. */
export function PracticeTabs() {
  const params = useSearchParams();
  const router = useRouter();
  const raw = params.get('type');
  const tab: TabId = raw === 'daily' || raw === 'ai' ? raw : 'mock';

  const select = (id: TabId) => {
    const next = new URLSearchParams(params.toString());
    next.set('type', id);
    router.replace(`/practice?${next.toString()}`, { scroll: false });
  };

  return (
    <div>
      <div role="tablist" className="grid grid-cols-3 gap-2 mb-5">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => select(t.id)}
            className={cn(
              'rounded-xl border px-3 py-2.5 text-left transition-colors',
              tab === t.id
                ? 'border-gov-saffron bg-orange-50 dark:bg-orange-900/20'
                : 'border-border bg-surface hover:border-gov-saffron/60',
            )}
          >
            <span className="block text-sm font-bold text-foreground">{t.label}</span>
            <span className="block text-[11px] text-muted">{t.hint}</span>
          </button>
        ))}
      </div>
      {tab === 'mock' && <MockTestsClient />}
      {tab === 'daily' && <DailyQuizClient />}
      {tab === 'ai' && <QuizClient />}
    </div>
  );
}
