import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nursing & Healthcare Government Jobs 2026-27 — Staff Nurse Sarkari Naukri | SarkariAlert',
  description:
    'Nursing government jobs 2026-27: Browse latest sarkari naukri for GNM, ANM, B.Sc Nursing candidates. AIIMS, ESIC, Railway, State Hospital, PGIMER & Army nursing vacancies. Apply online with eligibility, salary & last date.',
  keywords: [
    'nursing government jobs 2026',
    'staff nurse sarkari naukri',
    'gnm anm government jobs',
    'bsc nursing sarkari naukri',
    'aiims staff nurse vacancy 2026',
    'nursing sarkari naukri 2026',
    'esic staff nurse bharti',
    'railway nursing jobs',
    'state hospital nurse vacancy',
    'army nursing jobs 2026',
    'pgimer nursing vacancy',
    'healthcare government jobs',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/nursing-jobs',
  },
  openGraph: {
    title: 'Nursing & Healthcare Government Jobs 2026-27 — Latest Staff Nurse Sarkari Naukri',
    description:
      'Find nursing sarkari naukri 2026-27. AIIMS, ESIC, Railway, State Hospital, Army & more vacancies for GNM, ANM, B.Sc Nursing candidates.',
    url: 'https://sarkarialert.online/nursing-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the eligibility criteria for nursing government jobs?',
    answer:
      'For nursing government jobs, you need GNM (General Nursing & Midwifery), ANM (Auxiliary Nurse Midwife), or B.Sc Nursing degree from a recognized institution. Registration with the State Nursing Council is mandatory. Some posts like Nursing Officer require B.Sc Nursing, while ANM posts accept the ANM diploma.',
  },
  {
    question: 'Nursing sarkari naukri ke liye kya yogyata chahiye?',
    answer:
      'Nursing sarkari naukri ke liye GNM (General Nursing & Midwifery), ANM (Auxiliary Nurse Midwife), ya B.Sc Nursing ki degree kisi manyata prapt sansthan se honi chahiye. State Nursing Council mein registration zaroori hai. Kuch padoon jaise Nursing Officer ke liye B.Sc Nursing zaroori hai.',
  },
  {
    question: 'What is the salary for government nursing jobs in India?',
    answer:
      'Government nursing jobs typically fall under Pay Level 5 to Level 6 (Rs 29,200 - Rs 34,800 basic pay). With allowances (DA, HRA, NPA), the gross salary ranges from Rs 45,000 to Rs 70,000 per month. AIIMS and central government hospitals offer higher pay scales compared to state hospitals.',
  },
  {
    question: 'How to apply for AIIMS Staff Nurse recruitment?',
    answer:
      'AIIMS Staff Nurse recruitment is conducted through online applications on aiimsexams.ac.in. Candidates need B.Sc Nursing (Post Basic or 4-year) with registration from State Nursing Council. The selection process includes a Computer-Based Test (CBT) followed by document verification.',
  },
  {
    question: 'Which are the top recruiting organizations for nursing government jobs?',
    answer:
      'The top recruiting organizations for nursing jobs include AIIMS (All India Institute of Medical Sciences), ESIC (Employees State Insurance Corporation), Railway hospitals, State Health Departments, PGIMER, JIPMER, Army Medical Corps, DRDO, and various Central/State Government hospitals.',
  },
  {
    question: 'Is CTET/NET required for nursing government jobs?',
    answer:
      'No, CTET or NET is not required for nursing government jobs. You need a valid nursing qualification (GNM/ANM/B.Sc Nursing) and State Nursing Council registration. Selection is typically through written exams conducted by the recruiting body (AIIMS, ESIC, State PSC, etc.) followed by skill tests or interviews.',
  },
];

function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function BreadcrumbSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sarkarialert.online/' },
      { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://sarkarialert.online/jobs' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Nursing Jobs',
        item: 'https://sarkarialert.online/nursing-jobs',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

async function JobsContent() {
  let data;
  try {
    data = await getJobs({ qualification: 'nursing', page: '1' });
  } catch {
    return (
      <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
        <Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
        <p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load jobs</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Backend server is not available. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <JobsLoadMore
      initialJobs={data.results}
      totalCount={data.count}
      nextUrl={data.next}
      filterParams={{ qualification: 'nursing' }}
    />
  );
}

export default function NursingJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Nursing & Healthcare Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              नर्सिंग सरकारी नौकरी 2026 — स्टाफ नर्स, ANM, GNM भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>nursing sarkari naukri 2026</strong> across all major government hospitals and health departments.
            Candidates with <strong>GNM</strong>, <strong>ANM</strong>, or <strong>B.Sc Nursing</strong> qualifications can apply for posts like{' '}
            <strong>Staff Nurse</strong>, <strong>Nursing Officer</strong>, <strong>ANM</strong>,{' '}
            <strong>Community Health Officer</strong>, and more at <strong>AIIMS</strong>, <strong>ESIC</strong>,{' '}
            <strong>Railway Hospitals</strong>, State Government Hospitals, and Defence Medical establishments.
            These jobs offer pay scale of Rs 29,200 - 34,800+ (Level 5-6) with government benefits like NPA, pension, medical, and job security.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां नर्सिंग उम्मीदवारों के लिए सभी नवीनतम सरकारी नौकरियां देखें। AIIMS, ESIC, रेलवे अस्पताल, राज्य
            स्वास्थ्य विभाग और सेना चिकित्सा सेवाओं की भर्ती अधिसूचनाएं एक जगह।
          </p>
        </div>
      </div>

      {/* Job list */}
      <Suspense fallback={<JobListSkeleton />}>
        <JobsContent />
      </Suspense>

      {/* FAQ Section */}
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions — Nursing Government Jobs
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, i) => (
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
