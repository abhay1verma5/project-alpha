import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertCircle, BookOpen, ListChecks, BarChart3, FileQuestion } from 'lucide-react';
import { EXAM_PATTERNS, getPattern, sectionWeightage, LEVEL_LABELS } from '@/lib/exam-patterns';
import { getPYQMeta } from '@/lib/api';
import { Breadcrumbs } from '@/components/Breadcrumbs';

interface Props {
  params: Promise<{ exam: string }>;
}

export function generateStaticParams() {
  return EXAM_PATTERNS.map((p) => ({ exam: p.key }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { exam } = await params;
  const p = getPattern(exam);
  if (!p) return { title: 'Exam not found' };
  const first = p.stages[0];
  const q = first?.sections.reduce((s, x) => s + x.questions, 0);
  const m = first?.sections.reduce((s, x) => s + x.marks, 0);
  return {
    title: `${p.name} Exam Pattern 2026-27 — Sections, Marks, Weightage, Negative Marking`,
    description: `${p.name} (${p.body}) exam pattern: ${p.stages.length} stage${p.stages.length > 1 ? 's' : ''}${q ? `, ${q} questions` : ''}${m ? `, ${m} marks` : ''}, ${first?.duration}. Section-wise weightage, negative marking and previous year questions.`,
    alternates: { canonical: `https://sarkarialert.online/exam-pattern/${p.key}` },
  };
}

export default async function ExamPatternDetail({ params }: Props) {
  const { exam } = await params;
  const p = getPattern(exam);
  if (!p) notFound();

  let years: number[] = [];
  let subjects: string[] = [];
  try {
    const meta = await getPYQMeta(p.key);
    years = (meta as { years?: number[] }).years ?? [];
    subjects = (meta as { subjects?: string[] }).subjects ?? [];
  } catch {}

  const faq = [
    { q: `How many questions are there in ${p.name}?`, a: p.stages.map((s) => `${s.name}: ${s.sections.reduce((t, x) => t + x.questions, 0) || 'descriptive'} questions, ${s.sections.reduce((t, x) => t + x.marks, 0)} marks, ${s.duration}.`).join(' ') },
    { q: `Is there negative marking in ${p.name}?`, a: p.stages.map((s) => `${s.name}: ${s.negative}.`).join(' ') },
    { q: `Who can apply for ${p.name}?`, a: `${LEVEL_LABELS[p.level]}${p.ageLimit ? `, age ${p.ageLimit}` : ''}. Held ${p.frequency.toLowerCase()} by ${p.body}.` },
  ];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Exam pattern', href: '/exam-pattern' }, { label: p.name }]} />

      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{p.name} — exam pattern</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {p.body} · {LEVEL_LABELS[p.level]} · {p.frequency}{p.ageLimit ? ` · Age ${p.ageLimit}` : ''} · checked {p.checked}
        </p>
        {p.approx && (
          <p className="mt-2 text-xs text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4" /> Based on the most recent notification we could find; confirm counts in the official notification for your cycle.
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {years.length > 0 && (
          <Link href={`/pyq/${p.key}`} className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-blue-600 text-white">
            <FileQuestion className="w-4 h-4" /> Previous year questions ({years[years.length - 1]}–{years[0]})
          </Link>
        )}
        {p.weightageSlug && (
          <Link href={`/topic-weightage/${p.weightageSlug}`} className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700">
            <BarChart3 className="w-4 h-4" /> Topic-wise weightage
          </Link>
        )}
        <Link href={`/exam/${encodeURIComponent(p.name)}`} className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700">
          <ListChecks className="w-4 h-4" /> Notification · admit card · result timeline
        </Link>
        <Link href={`/mock-tests?exam=${p.key}`} className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700">
          <BookOpen className="w-4 h-4" /> Mock test
        </Link>
      </div>

      {p.stages.map((stage) => {
        const rows = sectionWeightage(stage);
        const totalQ = rows.reduce((s, x) => s + x.questions, 0);
        const totalM = rows.reduce((s, x) => s + x.marks, 0);
        return (
          <section key={stage.name} className="mb-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
              <h2 className="font-bold text-lg text-gray-900 dark:text-white">{stage.name}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {stage.mode} · {stage.duration} · Negative marking: {stage.negative}
                {totalQ ? ` · ${totalQ} questions` : ''}{totalM ? ` · ${totalM} marks` : ''}
              </p>
              {stage.note && <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{stage.note}</p>}
            </div>
            {rows.length > 0 && (
              <table className="w-full text-sm">
                <thead className="text-[11px] uppercase tracking-wide text-gray-500 bg-gray-50 dark:bg-gray-800/60">
                  <tr>
                    <th className="text-left px-5 py-2">Section</th>
                    <th className="text-right px-3 py-2">Questions</th>
                    <th className="text-right px-3 py-2">Marks</th>
                    <th className="text-left px-5 py-2 w-[38%]">Weightage</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.name} className="border-t border-gray-100 dark:border-gray-800">
                      <td className="px-5 py-2.5 text-gray-800 dark:text-gray-200">{r.name}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums">{r.questions || '—'}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums">{r.marks || '—'}</td>
                      <td className="px-5 py-2.5">
                        <div className="flex items-center gap-2">
                          <div className="h-2 flex-1 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${r.percent}%` }} />
                          </div>
                          <span className="text-xs tabular-nums w-11 text-right">{r.percent}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        );
      })}

      {subjects.length > 0 && (
        <section className="mb-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
          <h2 className="font-bold text-gray-900 dark:text-white mb-1">Subjects in our question bank</h2>
          <p className="text-xs text-gray-500 mb-3">Years available: {years.join(', ')}</p>
          <div className="flex flex-wrap gap-1.5">
            {subjects.map((s) => (
              <Link key={s} href={`/pyq/${p.key}?subject=${encodeURIComponent(s)}`} className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100">
                {s}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5">
        <h2 className="font-bold text-gray-900 dark:text-white mb-3">Frequently asked</h2>
        <dl className="space-y-3">
          {faq.map((f) => (
            <div key={f.q}>
              <dt className="font-semibold text-sm text-gray-900 dark:text-white">{f.q}</dt>
              <dd className="text-sm text-gray-600 dark:text-gray-300">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
