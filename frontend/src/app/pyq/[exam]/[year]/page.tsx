import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findExamInfo } from '@/lib/pyq-types';
import { MathText } from '@/components/pyq/MathText';
import { ShareBar, QuestionLink } from '@/components/pyq/ShareBar';

const SITE = 'https://sarkarialert.online';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

type Props = {
  params: Promise<{ exam: string; year: string }>;
  searchParams: Promise<{ subject?: string; page?: string }>;
};

interface PaperQ {
  id: number; subject: string; chapter: string; question_text: string; options: string[];
  correct_answer: number; explanation: string; is_verified: boolean; source_url: string;
}
interface Paper {
  exam: string; year: number; subject: string | null; subjects: { subject: string; count: number }[];
  count: number; page: number; pages: number; results: PaperQ[];
}

async function getPaper(exam: string, year: string, subject?: string, page?: string): Promise<Paper | null> {
  const qs = new URLSearchParams({ exam, year, page_size: '25', page: page || '1' });
  if (subject) qs.set('subject', subject);
  try {
    const r = await fetch(`${API}/pyq/paper/?${qs}`, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(10000) });
    return r.ok ? r.json() : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { exam, year } = await params;
  const info = findExamInfo(exam);
  if (!info) return { title: 'Previous Year Paper' };
  const name = info.exam.label;
  return {
    title: `${name} ${year} Question Paper with Answers (PYQ)`,
    description: `${name} ${year} previous year questions with options, correct answers and explanations, subject-wise. Free.`,
    alternates: { canonical: `/pyq/${exam}/${year}` },
  };
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default async function PaperYearPage({ params, searchParams }: Props) {
  const { exam, year } = await params;
  const { subject, page } = await searchParams;
  const info = findExamInfo(exam);
  if (!info || !/^\d{4}$/.test(year)) notFound();
  const paper = await getPaper(exam, year, subject, page);
  const name = info.exam.label;
  const base = `/pyq/${exam}/${year}`;
  const link = (p: { subject?: string | null; page?: number }) => {
    const q = new URLSearchParams();
    if (p.subject) q.set('subject', p.subject);
    if (p.page && p.page > 1) q.set('page', String(p.page));
    const s = q.toString();
    return s ? `${base}?${s}` : base;
  };
  const startNo = paper ? (paper.page - 1) * 25 : 0;

  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <nav className="text-xs text-muted mb-2">
        <Link href="/pyq" className="underline">PYQ</Link> › <Link href={`/pyq/${exam}`} className="underline">{name}</Link> › {year}
      </nav>
      <h1 className="text-2xl font-bold mb-1">{name} {year} — Previous Year Questions</h1>
      <p className="text-sm text-muted mb-4">
        Real questions from the {year} paper with options and answers.
        {' '}<Link href={`/pyq/${exam}`} className="font-semibold underline print:hidden">Take a timed test →</Link>
      </p>
      <div className="mb-4">
        <ShareBar url={`${SITE}${link({ subject })}`} title={`${name} ${year} question paper with answers`} printable />
      </div>

      {!paper ? (
        <p className="rounded-xl border border-border p-4 text-sm">Could not load this paper right now. Please try again in a minute.</p>
      ) : paper.count === 0 && !subject ? (
        <p className="rounded-xl border border-border p-4 text-sm">
          No real {year} questions for {name} yet. <Link href={`/practice/${exam}`} className="font-semibold underline">Practice in this pattern →</Link>
        </p>
      ) : (
        <>
          {/* Subject tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            <Link href={link({})} className={`shrink-0 min-h-10 inline-flex items-center px-3 rounded-full border text-sm font-semibold ${!subject ? 'bg-gov-saffron text-white border-gov-saffron' : 'border-border text-foreground'}`}>
              All
            </Link>
            {paper.subjects.map((s) => (
              <Link key={s.subject} href={link({ subject: s.subject })}
                className={`shrink-0 min-h-10 inline-flex items-center px-3 rounded-full border text-sm font-semibold ${subject?.toLowerCase() === s.subject.toLowerCase() ? 'bg-gov-saffron text-white border-gov-saffron' : 'border-border text-foreground'}`}>
                {s.subject} ({s.count})
              </Link>
            ))}
          </div>
          <p className="text-xs text-muted mb-3">{paper.count} questions{paper.pages > 1 ? ` · page ${paper.page} of ${paper.pages}` : ''}</p>

          <ol className="space-y-4">
            {paper.results.map((q, i) => (
              <li key={q.id} id={`q-${q.id}`} className="rounded-xl border border-border bg-surface p-4 scroll-mt-20 break-inside-avoid">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="text-[11px] font-semibold text-muted">
                    Q{startNo + i + 1} · {q.subject}{q.chapter ? ` · ${q.chapter}` : ''}
                  </p>
                  <QuestionLink url={`${SITE}${link({ subject, page: paper.page })}#q-${q.id}`} />
                </div>
                <div className="text-sm sm:text-base font-semibold text-foreground mb-3 break-words"><MathText text={q.question_text} /></div>
                <ul className="space-y-2 mb-3">
                  {q.options.map((o, oi) => (
                    <li key={oi} className="flex gap-2 text-sm text-foreground break-words">
                      <span className="font-bold shrink-0">{LETTERS[oi] || oi + 1}.</span>
                      <span className="min-w-0"><MathText text={String(o)} /></span>
                    </li>
                  ))}
                </ul>
                <details className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2">
                  <summary className="cursor-pointer text-sm font-bold text-emerald-800 dark:text-emerald-200 min-h-8">Show answer / उत्तर देखें</summary>
                  <p className="mt-2 text-sm text-foreground">
                    <b>Answer: {LETTERS[q.correct_answer] || q.correct_answer + 1}</b>{' '}
                    {q.options[q.correct_answer] !== undefined && <MathText text={String(q.options[q.correct_answer])} />}
                  </p>
                  {q.explanation && <div className="mt-1 text-sm text-muted break-words"><MathText text={q.explanation} /></div>}
                </details>
              </li>
            ))}
          </ol>

          {paper.pages > 1 && (
            <div className="flex justify-between mt-6">
              {paper.page > 1 ? <Link href={link({ subject, page: paper.page - 1 })} className="min-h-10 inline-flex items-center px-4 rounded-xl border border-border font-semibold">← Previous</Link> : <span />}
              {paper.page < paper.pages ? <Link href={link({ subject, page: paper.page + 1 })} className="min-h-10 inline-flex items-center px-4 rounded-xl border border-border font-semibold">Next →</Link> : <span />}
            </div>
          )}
        </>
      )}
    </main>
  );
}
