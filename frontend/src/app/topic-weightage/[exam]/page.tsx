import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ChevronRight, FileText, Target } from 'lucide-react';
import { fetchExamDetail, fetchExamSlugs } from '../api';
import { ApproxNote, TwText } from '../TwText';
import { BASE_PATH } from '../types';
import { WeightageDetail } from './WeightageDetail';

export async function generateStaticParams() {
  const slugs = await fetchExamSlugs();
  return slugs.map((slug) => ({ exam: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ exam: string }> }): Promise<Metadata> {
  const { exam: slug } = await params;
  const result = await fetchExamDetail(slug);
  if (result.status !== 'ok') return { title: 'Exam Not Found' };
  const exam = result.exam;
  const url = `https://sarkarialert.online${BASE_PATH}/${slug}`;
  return {
    title: `${exam.exam} Topic-wise Weightage — ${exam.paper}`,
    description: `Detailed subject-wise and topic-wise weightage analysis for ${exam.exam} ${exam.paper}. Know high-scoring topics and prioritize your preparation.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${exam.exam} — Topic Weightage Analysis`,
      description: `${exam.total_questions} questions, ${exam.total_marks} marks, ${exam.subjects.length} subjects analyzed.`,
      url,
    },
  };
}

export default async function ExamWeightagePage({ params }: { params: Promise<{ exam: string }> }) {
  const { exam: slug } = await params;
  const result = await fetchExamDetail(slug);
  if (result.status === 'missing') notFound();

  const backLink = (
    <Link
      href={BASE_PATH}
      className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-indigo-200 transition-colors hover:text-white"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" /> <TwText id="tw.allExams" />
    </Link>
  );

  if (result.status === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <section className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">{backLink}</div>
        </section>
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm font-semibold text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
            <TwText id="tw.error" />
          </div>
        </div>
      </div>
    );
  }

  const exam = result.exam;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 py-6 sm:py-10">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute left-10 top-10 h-32 w-32 rounded-full border-2 border-white/30" />
          <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full border-2 border-white/20" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {backLink}
          <h1 className="mb-1 break-words text-2xl font-bold text-white sm:text-4xl">{exam.exam}</h1>
          <p className="break-words text-base text-indigo-200 sm:text-lg">{exam.paper}</p>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="rounded-lg bg-white/10 px-3 py-1.5 font-semibold text-white backdrop-blur-sm">
              {exam.total_questions} <TwText id="tw.questions" />
            </span>
            <span className="rounded-lg bg-white/10 px-3 py-1.5 font-semibold text-white backdrop-blur-sm">
              {exam.total_marks} <TwText id="tw.marks" />
            </span>
            <span className="rounded-lg bg-white/10 px-3 py-1.5 font-semibold text-white backdrop-blur-sm">{exam.duration}</span>
            {exam.negative_marking && (
              <span className="rounded-lg bg-red-500/20 px-3 py-1.5 font-semibold text-red-200 backdrop-blur-sm">
                <TwText id="tw.negative" />: {exam.negative_marking}
              </span>
            )}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-6 mb-16 sm:px-6 sm:py-8 md:mb-0 lg:px-8">
        <div className="mb-6">
          <ApproxNote asOf={exam.as_of} />
        </div>

        <WeightageDetail exam={exam} />

        {/* CTA */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            href="/pyq"
            className="group rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <FileText className="mb-3 h-8 w-8 text-blue-600" aria-hidden="true" />
            <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-700 dark:text-white">
              <TwText id="tw.cta.pyq" />
            </h3>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
              <TwText id="tw.cta.downloadPapers" /> <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
          <Link
            href="/practice?type=mock"
            className="group rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <Target className="mb-3 h-8 w-8 text-green-600" aria-hidden="true" />
            <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-green-700 dark:text-white">
              <TwText id="tw.cta.mock" />
            </h3>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-green-600">
              <TwText id="tw.cta.startPractice" /> <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
