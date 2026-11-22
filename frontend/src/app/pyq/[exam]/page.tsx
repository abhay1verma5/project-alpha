import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PYQClient } from '@/components/pyq/PYQClient';
import { YearPapers } from './YearPapers';
import { EXAM_CATEGORIES, findExamInfo } from '@/lib/pyq-types';

type Props = { params: Promise<{ exam: string }> };

// Generate all exam pages at build time for SEO
export function generateStaticParams() {
  const params: { exam: string }[] = [];
  for (const cat of EXAM_CATEGORIES) {
    for (const exam of cat.exams) {
      params.push({ exam: exam.value });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { exam } = await params;
  const info = findExamInfo(exam);
  if (!info) return { title: 'PYQ Practice' };

  const name = info.exam.label;
  return {
    // The root layout's title template already appends " | SarkariAlert".
    title: `${name} PYQ — Previous Year Questions with Solutions`,
    alternates: { canonical: `/pyq/${exam}` },
    description: `Practice ${name} questions with answers: real previous-year questions where available, plus practice MCQs in the ${name} exam pattern. Year-wise, subject-wise, with mock test mode. Free.`,
    keywords: [
      `${name} PYQ`, `${name} previous year questions`, `${name} solved papers`,
      `${name} question bank`, `${name} mock test`, `${name} practice questions`,
      `${name} answers with solutions`, `${name} exam preparation`,
    ],
    openGraph: {
      title: `${name} PYQ — Previous Year Questions | SarkariAlert`,
      description: `Free ${name} PYQ practice with solutions. Year-wise MCQ practice for ${info.category.label} exams.`,
      type: 'website',
    },
  };
}

export default async function ExamPYQPage({ params }: Props) {
  const { exam } = await params;
  const info = findExamInfo(exam);
  if (!info) notFound();

  const name = info.exam.label;
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${name} Previous Year Questions`,
    description: `Practice questions for ${name}: real previous-year questions where available plus exam-pattern practice MCQs.`,
    provider: { '@type': 'Organization', name: 'SarkariAlert', sameAs: 'https://sarkarialert.online' },
    educationalLevel: 'Competitive Exam',
    isAccessibleForFree: true,
    inLanguage: ['en', 'hi'],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">{name} Previous Year Questions (PYQ) with Solutions</h1>
        <YearPapers exam={exam} name={name} />
        <h2 className="text-lg font-bold mb-2">Practice or take a timed test / अभ्यास या टेस्ट</h2>
        <PYQClient initialExam={exam} realOnlyMode />
      </main>
    </>
  );
}
