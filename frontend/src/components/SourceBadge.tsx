import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  isOfficial?: boolean;
  sourceHost?: string;
  sourceUrl?: string | null;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Tells the reader where a notice came from. Official = read from the recruiting
 * body's own site. Anything else came via an aggregator and should be checked
 * against the official notification before paying a fee.
 */
export function SourceBadge({ isOfficial, sourceHost, sourceUrl, size = 'sm', className }: Props) {
  if (isOfficial === undefined) return null;
  const base = cn(
    'inline-flex items-center gap-1 rounded-lg font-bold',
    size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1',
    className,
  );
  if (isOfficial) {
    const inner = (
      <>
        <ShieldCheck className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
        Official: {sourceHost}
      </>
    );
    const cls = cn(base, 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200');
    return sourceUrl ? (
      <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className={cls} title="Read on the official website">
        {inner}
      </a>
    ) : (
      <span className={cls}>{inner}</span>
    );
  }
  return (
    <span
      className={cn(base, 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200')}
      title="Collected from a job aggregator. Verify on the official website before applying."
    >
      <ShieldAlert className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      Unverified source
    </span>
  );
}
