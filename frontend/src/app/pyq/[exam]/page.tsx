import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PYQClient } from '@/components/pyq/PYQClient';
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
  if (!info) return { title: 'PYQ Practice | SarkariAlert' };

  const name = info.exam.label;
  return {
    title: `${name} PYQ — Previous Year Questions with Solutions | SarkariAlert`,
    description: `Practice ${name} Previous Year Questions (PYQ) with detailed solutions. Year-wise, subject-wise MCQ practice with instant answers and mock test mode. Free ${name} question bank.`,
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
    description: `Practice previous year questions for ${name}. Free PYQ with solutions.`,
    provider: { '@type': 'Organization', name: 'SarkariAlert', sameAs: 'https://sarkarialert.online' },
    educationalLevel: 'Competitive Exam',
    isAccessibleForFree: true,
    inLanguage: ['en', 'hi'],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <main className="max-w-3xl mx-auto px-4 py-6">
        <PYQClient initialExam={exam} />
      </main>
    </>
  );
}
