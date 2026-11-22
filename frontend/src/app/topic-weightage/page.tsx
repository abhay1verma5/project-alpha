import type { Metadata } from 'next';
import Link from 'next/link';
import { BarChart3, ChevronRight, FileText, Target } from 'lucide-react';
import { fetchExamList } from './api';
import { ExamCard } from './ExamCard';
import { TopicFilters } from './TopicFilters';
import { TwText } from './TwText';
import { BASE_PATH, readFilterValues, toApiParams } from './types';

export const metadata: Metadata = {
  title: 'Topic-wise Weightage Analysis — SSC CGL, UPSC, Railway, Banking (10+ Years Data)',
  description:
    'Subject-wise and topic-wise weightage analysis for SSC CGL, CHSL, UPSC Prelims, RRB NTPC, IBPS PO based on last 10+ years of papers. Know high-scoring topics and prioritize your preparation.',
  alternates: { canonical: `https://sarkarialert.online${BASE_PATH}` },
  openGraph: {
    title: 'Topic-wise Weightage — Government Exam Analysis',
    description: 'Data-driven analysis of which topics carry the most marks in SSC, UPSC, Railway, Banking exams.',
    url: `https://sarkarialert.online${BASE_PATH}`,
  },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TopicWeightagePage({ searchParams }: PageProps) {
  const values = readFilterValues(await searchParams);
  const data = await fetchExamList(toApiParams(values));
  const results = data?.results ?? [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 py-8 sm:py-12">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute left-10 top-10 h-32 w-32 rounded-full border-2 border-white/30" />
          <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full border-2 border-white/20" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-indigo-100 backdrop-blur-sm">
            <BarChart3 className="h-4 w-4" aria-hidden="true" />
            <TwText id="tw.badge" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            <TwText id="tw.title" />
          </h1>
          <p className="mx-auto max-w-2xl text-base text-indigo-100 sm:text-lg">
            <TwText id="tw.subtitle" />
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8 mb-16 sm:px-6 md:mb-0 lg:px-8">
        <TopicFilters filters={data?.filters ?? null} values={values} />

        {data ? (
          <>
            <p className="mt-6 text-sm font-semibold text-gray-600 dark:text-gray-400" aria-live="polite">
              <TwText id="tw.count" vars={{ n: data.count }} />
            </p>

            {results.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 text-center dark:border-gray-800 dark:bg-gray-900">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  <TwText id="tw.empty.title" />
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <TwText id="tw.empty.body" />
                </p>
                <Link
                  href={BASE_PATH}
                  scroll={false}
                  className="mt-4 inline-flex min-h-[44px] items-center rounded-xl bg-indigo-600 px-4 text-sm font-bold text-white hover:bg-indigo-700"
                >
                  <TwText id="tw.reset" />
                </Link>
              </div>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {results.map((exam) => (
                  <ExamCard key={exam.slug} exam={exam} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm font-semibold text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
            <TwText id="tw.error" />
          </div>
        )}

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
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              <TwText id="tw.cta.pyqDesc" />
            </p>
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
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              <TwText id="tw.cta.mockDesc" />
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-green-600">
              <TwText id="tw.cta.startPractice" /> <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Topic-wise Weightage Analysis for Government Exams',
            description:
              'Subject-wise and topic-wise question distribution for SSC CGL, UPSC, RRB NTPC, IBPS PO based on 10+ years of data.',
            url: `https://sarkarialert.online${BASE_PATH}`,
          }),
        }}
      />
    </div>
  );
}
