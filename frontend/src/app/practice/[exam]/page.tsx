import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PYQClient } from '@/components/pyq/PYQClient';
import { ShareBar } from '@/components/pyq/ShareBar';
import { EXAM_CATEGORIES, findExamInfo } from '@/lib/pyq-types';

type Props = { params: Promise<{ exam: string }> };

// One page per exam, e.g. /practice/gate_ece (Engineering → GATE ECE).
export function generateStaticParams() {
  return EXAM_CATEGORIES.flatMap((cat) => cat.exams.map((e) => ({ exam: e.value })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { exam } = await params;
  const info = findExamInfo(exam);
  if (!info) return { title: 'Practice' };
  const name = info.exam.label;
  return {
    title: `${name} Practice Questions & Mock Test`,
    description: `Free ${name} practice questions and timed mock tests in the ${name} exam pattern (${info.category.label}). Real previous-year questions are marked separately.`,
    alternates: { canonical: `/practice/${exam}` },
  };
}

export default async function PracticeExamPage({ params }: Props) {
  const { exam } = await params;
  const info = findExamInfo(exam);
  if (!info) notFound();
  const name = info.exam.label;
  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <nav className="text-xs text-muted mb-2">
        <Link href="/practice" className="underline">Practice</Link> › {info.category.label} › {name}
      </nav>
      <h1 className="text-2xl font-bold mb-1">{name} — Practice &amp; Mock Test</h1>
      <p className="text-sm text-muted mb-4">
        Practice questions follow the {name} pattern; ones marked “Practice (AI)” are written by AI, ones marked
        “Previous year” are from real papers.
      </p>
      <div className="mb-4"><ShareBar url={`https://sarkarialert.online/practice/${exam}`} title={`${name} free practice questions & mock test`} /></div>
      <PYQClient initialExam={exam} />
    </main>
  );
}
