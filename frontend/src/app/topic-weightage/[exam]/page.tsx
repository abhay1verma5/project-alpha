import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Target, FileText } from 'lucide-react';
import { EXAM_DATA, getExamBySlug } from '../exam-data';
import { notFound } from 'next/navigation';
import { WeightageDetail } from './WeightageDetail';

export function generateStaticParams() {
  return EXAM_DATA.map((e) => ({ exam: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ exam: string }> }): Promise<Metadata> {
  const { exam: slug } = await params;
  const exam = getExamBySlug(slug);
  if (!exam) return { title: 'Exam Not Found' };
  return {
    title: `${exam.exam} Topic-wise Weightage — ${exam.paper} | SarkariAlert`,
    description: `Detailed subject-wise and topic-wise weightage analysis for ${exam.exam} ${exam.paper}. Know high-scoring topics and prioritize your preparation.`,
    alternates: { canonical: `https://sarkarialert.online/topic-weightage/${slug}` },
    openGraph: {
      title: `${exam.exam} — Topic Weightage Analysis`,
      description: `${exam.totalQuestions} questions, ${exam.totalMarks} marks, ${exam.subjects.length} subjects analyzed.`,
      url: `https://sarkarialert.online/topic-weightage/${slug}`,
    },
  };
}

export default async function ExamWeightagePage({ params }: { params: Promise<{ exam: string }> }) {
  const { exam: slug } = await params;
  const exam = getExamBySlug(slug);
  if (!exam) notFound();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 py-6 sm:py-10`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/30 rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-white/20 rounded-full" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/topic-weightage"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-200 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> All Exams
          </Link>
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-1">{exam.exam}</h1>
          <p className="text-base sm:text-lg text-indigo-200">{exam.paper}</p>

          {/* Quick stats row */}
          <div className="flex flex-wrap gap-3 mt-4 text-sm">
            <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white font-semibold">
              {exam.totalQuestions} Questions
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white font-semibold">
              {exam.totalMarks} Marks
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white font-semibold">
              {exam.duration}
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-red-500/20 backdrop-blur-sm text-red-200 font-semibold">
              Negative: {exam.negativeMarking}
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mb-16 md:mb-0">
        {/* Interactive subject selector + weightage */}
        <WeightageDetail exam={exam} />

        {/* CTA */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <Link
            href="/previous-papers"
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow group"
          >
            <FileText className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-700 transition-colors">
              {exam.exam} Previous Papers
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Download year-wise PYQ PDFs</p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 mt-3">
              Download <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
          <Link
            href="/ai-quiz"
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow group"
          >
            <Target className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-green-700 transition-colors">
              Practice {exam.exam} Quiz
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">AI-generated MCQs for {exam.exam}</p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-600 mt-3">
              Start Quiz <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
