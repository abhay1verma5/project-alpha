import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getAdmissions } from '@/lib/api';
import { JobList } from '@/components/JobList';
import { Pagination } from '@/components/Pagination';
import { JobFilters } from '@/components/JobFilters';
import { GraduationCap } from 'lucide-react';
import { CATEGORY_LABELS, STATE_LABELS } from '@/lib/utils';
import { JobListSkeleton } from '@/components/JobCardSkeleton';

export const metadata: Metadata = {
  title: 'Admissions 2026-27 — College, University & Government Institute Admissions',
  description: 'Latest admission notifications 2026-27 — Polytechnic, Nursing, ITI, University, Engineering, Medical college admissions. Counseling dates, eligibility & apply online links.',
  alternates: {
    canonical: 'https://sarkarialert.online/admissions',
  },
};

interface Props {
  searchParams: Promise<Record<string, string>>;
}

async function AdmissionsContent({ searchParams }: Props) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const apiParams: Record<string, string> = { page: String(page) };
  if (params.category) apiParams.category = params.category;
  if (params.state) apiParams.state = params.state;
  if (params.qualification) apiParams.qualification = params.qualification;
  if (params.ordering) apiParams.ordering = params.ordering;

  let data;
  try {
    data = await getAdmissions(apiParams);
  } catch {
    return (
      <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
        <GraduationCap className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
        <p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load admissions</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(data.count / 20);

  const title = params.category
    ? `${CATEGORY_LABELS[params.category] || params.category} Admissions`
    : params.state
      ? `Admissions in ${STATE_LABELS[params.state] || params.state}`
      : 'All Admissions';

  return (
    <>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Showing {data.results.length} of {data.count} {title.toLowerCase()}
      </p>
      <JobList jobs={data.results} emptyMessage="No admissions available yet." />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath="/admissions"
        queryParams={Object.fromEntries(
          Object.entries(params).filter(([k]) => k !== 'page')
        )}
      />
    </>
  );
}

export default async function AdmissionsPage(props: Props) {
  const params = await props.searchParams;

  const title = params.category
    ? `${CATEGORY_LABELS[params.category] || params.category} Admissions`
    : params.state
      ? `Admissions in ${STATE_LABELS[params.state] || params.state}`
      : 'Admissions';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">College, University & Government Institute Admissions</p>
        </div>
      </div>

      {/* Filters */}
      <Suspense fallback={null}>
        <JobFilters basePath="/admissions" hideContentType />
      </Suspense>

      {/* Admission list */}
      <Suspense fallback={<JobListSkeleton />}>
        <AdmissionsContent searchParams={props.searchParams} />
      </Suspense>

      {/* FAQ Section */}
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions — Admissions
        </h2>
        <div className="space-y-4">
          {admissionFaqData.map((faq, i) => (
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

      <AdmissionFAQSchema />
    </div>
  );
}

const admissionFaqData = [
  {
    question: 'How to check admission notifications on SarkariAlert?',
    answer: 'Browse this page to see all latest admission notifications for colleges, universities, and government institutes. Use the category and state filters to find admissions relevant to you. Each listing has direct links to the official admission portal.',
  },
  {
    question: 'Admission ke liye kya documents chahiye?',
    answer: 'Admission ke liye generally ye documents chahiye: 10th/12th marksheet, entrance exam scorecard, category certificate (OBC/SC/ST), domicile certificate, Aadhaar card, passport photos, migration certificate, aur income certificate (scholarship ke liye).',
  },
  {
    question: 'What is the difference between merit-based and entrance-based admission?',
    answer: 'Merit-based admission is given based on marks in qualifying exam (10th/12th/graduation). Entrance-based requires clearing an entrance test (JEE, NEET, CUET, state CET). Some institutes use both — entrance exam marks + qualifying exam marks combined.',
  },
  {
    question: 'When do government college admissions start?',
    answer: 'Most government college admissions start after board results in May-June. Engineering (JoSAA): July-August. Medical (NEET): August-October. Central Universities (CUET): July-September. Polytechnic/ITI: June-August. State universities follow their own schedules.',
  },
  {
    question: 'Is there reservation in college admissions?',
    answer: 'Yes, government colleges follow reservation: SC 15%, ST 7.5%, OBC 27%, EWS 10%, PwD 5% (horizontal). State colleges may have additional reservations for domicile, females, etc. Private colleges under govt quota also follow reservation rules.',
  },
  {
    question: 'How does counseling work for admissions?',
    answer: 'Counseling involves: 1) Registration and choice filling (list preferred colleges/branches). 2) Seat allotment based on rank + preference + category. 3) Document verification at allotted college. 4) Fee payment and admission confirmation. Multiple rounds are conducted to fill vacant seats.',
  },
  {
    question: 'Can I apply for multiple admissions simultaneously?',
    answer: 'Yes, you can apply for multiple entrance exams and counseling processes simultaneously. However, once you accept a seat and pay the fee, withdrawing may involve forfeiting part of the fee. Always check the specific counseling rules before locking choices.',
  },
  {
    question: 'What scholarships are available for government college students?',
    answer: 'Major scholarships: National Scholarship Portal (NSP) for SC/ST/OBC/Minority, Merit-cum-Means (MCM), Post-Matric Scholarship, AICTE Pragati (girls), PM Vidyalakshmi (education loan), State-level scholarships. Apply through the official scholarship portals before the deadline.',
  },
];

function AdmissionFAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: admissionFaqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}