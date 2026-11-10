import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getAnswerKeys } from '@/lib/api';
import { JobList } from '@/components/JobList';
import { Pagination } from '@/components/Pagination';
import { JobFilters } from '@/components/JobFilters';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Key } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Answer Key 2026-27 — Government Exam Answer Keys',
  description: 'Download latest answer keys 2026-27 for SSC, UPSC, Railway, NDA, CTET and other government exams. Check official answer keys and calculate your expected score.',
  keywords: ['answer key 2026', 'answer key 2027', 'SSC answer key', 'UPSC answer key', 'Railway answer key', 'exam answer key', 'official answer key'],
  alternates: {
    canonical: 'https://sarkarialert.online/answer-keys',
  },
};

interface Props {
  searchParams: Promise<Record<string, string>>;
}

async function AnswerKeysContent({ searchParams }: Props) {
  const params = await searchParams;
  const apiParams: Record<string, string> = { page: params.page || '1' };
  if (params.category) apiParams.category = params.category;
  if (params.state) apiParams.state = params.state;
  if (params.qualification) apiParams.qualification = params.qualification;
  if (params.ordering) apiParams.ordering = params.ordering;

  let data;
  try {
    data = await getAnswerKeys(apiParams);
  } catch {
    return (
      <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
        <Key className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
        <p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load answer keys</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p>
      </div>
    );
  }

  const page = parseInt(params.page || '1', 10);
  const totalPages = Math.ceil(data.count / 20);

  const filterParams: Record<string, string> = {};
  if (params.category) filterParams.category = params.category;
  if (params.state) filterParams.state = params.state;
  if (params.qualification) filterParams.qualification = params.qualification;
  if (params.ordering) filterParams.ordering = params.ordering;

  return (
    <>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{data.count} answer keys released</p>
      <JobList jobs={data.results} emptyMessage="No answer keys available yet." />
      <Pagination currentPage={page} totalPages={totalPages} basePath="/answer-keys" queryParams={filterParams} />
    </>
  );
}

const answerKeyFaqData = [
  {
    question: 'What is an answer key and why is it important?',
    answer:
      'An answer key is the official set of correct answers released by the exam conducting body after the exam. It helps candidates estimate their score, decide whether to file objections, and plan for the next stage of selection.',
  },
  {
    question: 'Answer key kaise check karein?',
    answer:
      'SarkariAlert par apne exam ki answer key dhundhein aur official link par click karein. Official website par apna login karein (registration number + DOB se), apna response sheet download karein aur answer key se match karein. Agar koi galat answer lagta hai to objection file karein.',
  },
  {
    question: 'How to raise objections against an answer key?',
    answer:
      'Most exam bodies provide a window (usually 3-7 days) to challenge answers. Log in to the official portal, select the question you want to challenge, provide supporting evidence (textbook reference, official source), and pay the objection fee (usually Rs 100-200 per question, refunded if accepted).',
  },
  {
    question: 'What is the difference between provisional and final answer key?',
    answer:
      'A provisional answer key is released first for candidates to verify and raise objections. After reviewing objections from subject experts, the final answer key is released. Your score is calculated based on the final answer key, not the provisional one.',
  },
  {
    question: 'How to calculate expected score from answer key?',
    answer:
      'Match your responses with the answer key. For each correct answer, add the marks allotted. For each wrong answer, subtract the negative marking penalty. Unanswered questions get zero marks. For SSC: +2 correct, -0.5 wrong. For UPSC Prelims: +2 correct, -0.66 wrong.',
  },
  {
    question: 'Response sheet kaise download karein?',
    answer:
      'Response sheet (apke answers ka record) official website se download hoti hai. Login karein registration number aur password se, "Response Sheet" section mein jaayein aur PDF download karein. Ise answer key se match karke apna score calculate karein. Usually exam ke 3-7 din baad available hoti hai.',
  },
  {
    question: 'What happens if my objection is accepted?',
    answer:
      'If your objection is accepted by the expert panel, the question may be: 1) Deleted (marks given to all), 2) Answer changed (marks adjusted), or 3) Multiple answers accepted. Your objection fee (Rs 100-200) is refunded. The final answer key reflects all accepted changes.',
  },
  {
    question: 'How long is the answer key available for download?',
    answer:
      'Answer keys are usually available on the official website for 30-90 days after release. After that, they may be removed. Always download and save both the answer key and your response sheet as soon as they are released. SarkariAlert provides direct download links.',
  },
];

function AnswerKeyFAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: answerKeyFaqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default async function AnswerKeysPage(props: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <AnswerKeyFAQSchema />
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
          <Key className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Answer Keys</h1>
      </div>

      <Suspense fallback={null}>
        <JobFilters basePath="/answer-keys" hideContentType />
      </Suspense>

      <Suspense fallback={<JobListSkeleton />}>
        <AnswerKeysContent searchParams={props.searchParams} />
      </Suspense>

      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions — Answer Keys
        </h2>
        <div className="space-y-4">
          {answerKeyFaqData.map((faq, i) => (
            <details
              key={i}
              className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50">
                {faq.question}
                <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
