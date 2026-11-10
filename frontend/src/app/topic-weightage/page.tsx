import type { Metadata } from 'next';
import Link from 'next/link';
import { BarChart3, ChevronRight, Target, FileText, Clock, HelpCircle, Award, AlertTriangle } from 'lucide-react';
import { EXAM_DATA } from './exam-data';

export const metadata: Metadata = {
  title: 'Topic-wise Weightage Analysis — SSC CGL, UPSC, Railway, Banking (10+ Years Data)',
  description:
    'Subject-wise and topic-wise weightage analysis for SSC CGL, CHSL, UPSC Prelims, RRB NTPC, IBPS PO based on last 10+ years of papers. Know high-scoring topics and prioritize your preparation.',
  alternates: { canonical: 'https://sarkarialert.online/topic-weightage' },
  openGraph: {
    title: 'Topic-wise Weightage — Government Exam Analysis',
    description: 'Data-driven analysis of which topics carry the most marks in SSC, UPSC, Railway, Banking exams.',
    url: 'https://sarkarialert.online/topic-weightage',
  },
};

export default function TopicWeightagePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 py-8 sm:py-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/30 rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-white/20 rounded-full" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-indigo-100 text-sm font-medium mb-4">
            <BarChart3 className="w-4 h-4" />
            Data-driven Analysis
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            Topic-wise Weightage
          </h1>
          <p className="text-base sm:text-lg text-indigo-100 max-w-2xl mx-auto">
            Click on any exam to see detailed chapter-wise weightage. Based on 10+ years of papers.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16 md:mb-0">
        {/* Exam Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {EXAM_DATA.map((exam) => {
            const totalSubjects = exam.subjects.length;
            const totalTopics = exam.subjects.reduce((sum, s) => sum + s.topics.length, 0);
            const highPriorityCount = exam.subjects.reduce(
              (sum, s) => sum + s.topics.filter((t) => t.trend === 'high').length,
              0
            );

            return (
              <Link
                key={exam.slug}
                href={`/topic-weightage/${exam.slug}`}
                className={`group bg-white dark:bg-gray-900 rounded-2xl border-2 ${exam.borderColor} border-l-4 ${exam.color} p-5 sm:p-6 hover:shadow-lg transition-all active:scale-[0.98]`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h2 className="text-xl font-extrabold text-gray-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
                      {exam.exam}
                    </h2>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mt-0.5">{exam.paper}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${exam.iconBg} flex items-center justify-center shadow-md`}>
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <HelpCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <span className="font-bold">{exam.totalQuestions}</span> Qs / <span className="font-bold">{exam.totalMarks}</span> Marks
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{exam.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <span className="font-bold">{totalSubjects}</span> Subjects, <span className="font-bold">{totalTopics}</span> Topics
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="font-semibold text-red-600 dark:text-red-400 text-xs">Neg: {exam.negativeMarking}</span>
                  </div>
                </div>

                {/* High priority topics preview */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-xs font-bold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2.5 py-1 rounded-lg">
                    {highPriorityCount} High Priority Topics
                  </span>
                  <span className="flex items-center gap-1 text-sm font-bold text-indigo-600 dark:text-indigo-400 group-hover:gap-2 transition-all">
                    View Weightage <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <Link
            href="/previous-papers"
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow group"
          >
            <FileText className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-700 transition-colors">Previous Year Papers</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Download year-wise PYQ PDFs from official sources</p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 mt-3">
              Download Papers <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
          <Link
            href="/mock-tests"
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-md transition-shadow group"
          >
            <Target className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-green-700 transition-colors">Free Mock Tests</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Practice with exam-pattern mock tests for all exams</p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-green-600 mt-3">
              Start Practice <ChevronRight className="w-4 h-4" />
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
            description: 'Subject-wise and topic-wise question distribution for SSC CGL, UPSC, RRB NTPC, IBPS PO based on 10+ years of data.',
            url: 'https://sarkarialert.online/topic-weightage',
          }),
        }}
      />
    </div>
  );
}
