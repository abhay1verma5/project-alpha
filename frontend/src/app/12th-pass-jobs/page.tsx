import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: '12th Pass Sarkari Naukri 2026-27 — 12th Pass Government Jobs | SarkariAlert',
  description:
    '12th pass sarkari naukri 2026-27: Browse latest government jobs for 12th pass / Intermediate candidates. SSC CHSL, Railway, Banking Clerk, Defence, Police & more. Apply online with eligibility & last date.',
  keywords: [
    '12th pass sarkari naukri 2026',
    '12th pass government jobs',
    '12th pass sarkari job',
    'barahvin pass sarkari naukri',
    'ssc chsl vacancy 2026',
    '12th pass railway jobs',
    '12th pass banking jobs',
    '12th pass defence jobs',
    'intermediate pass govt jobs',
    '12th pass govt job apply online',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/12th-pass-jobs',
  },
  openGraph: {
    title: '12th Pass Government Jobs 2026-27 — Latest Sarkari Naukri for 12th Pass',
    description:
      'Find 12th pass sarkari naukri 2026-27. SSC CHSL, Railway, Banking Clerk, Police SI, Defence & more vacancies for 12th / Intermediate pass candidates.',
    url: 'https://sarkarialert.online/12th-pass-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Which government jobs can I get after 12th pass?',
    answer:
      'After 12th pass, you can apply for SSC CHSL (LDC, DEO, PA/SA), SSC GD Constable, Railway NTPC, Banking Clerk (IBPS Clerk), Police Sub-Inspector, Indian Army, Navy, Air Force, NDA, Postal Sorting Assistant, and many state-level clerical & technical posts.',
  },
  {
    question: '12th pass ke baad kaun si sarkari naukri mil sakti hai?',
    answer:
      '12th pass ke baad aap SSC CHSL (LDC, DEO, PA/SA), SSC GD, Railway NTPC, Banking Clerk, Police SI, Indian Army, Navy, Air Force, NDA, Postal Sorting Assistant aur kai rajya stariya lipikiya padoon ke liye aavedan kar sakte hain.',
  },
  {
    question: 'What is the salary for 12th pass government jobs?',
    answer:
      'The salary for 12th pass government jobs ranges from Rs 19,900 to Rs 35,000 per month (Pay Level 2-4). SSC CHSL posts offer Rs 25,500-81,100 (Level 4). With allowances, gross salary can be Rs 30,000 to Rs 50,000 per month depending on city and post.',
  },
  {
    question: 'What is the age limit for 12th pass government jobs?',
    answer:
      'For most 12th pass government jobs, the age limit is 18 to 27 years (general category). OBC gets 3 years relaxation, SC/ST gets 5 years relaxation. NDA has an age limit of 16.5 to 19.5 years. SSC CHSL allows up to 27 years.',
  },
  {
    question: 'Can I apply for banking jobs with 12th pass?',
    answer:
      'Yes, you can apply for certain banking jobs with 12th pass. IBPS and SBI conduct recruitment for clerical cadre where 12th pass is the minimum qualification. However, most banking exams now prefer graduates. Check individual notifications for exact eligibility.',
  },
  {
    question: 'What exams should I prepare for after 12th?',
    answer:
      'After 12th, prepare for SSC CHSL (Combined Higher Secondary Level), Railway NTPC, NDA (for defence), State Police SI exams, IBPS Clerk, and State PSC lower division clerk exams. SSC CHSL is the most popular exam for 12th pass candidates.',
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
        name: '12th Pass Jobs',
        item: 'https://sarkarialert.online/12th-pass-jobs',
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
    data = await getJobs({ qualification: '12th', page: '1' });
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
      filterParams={{ qualification: '12th' }}
    />
  );
}

export default function TwelfthPassJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              12th Pass Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              12वीं पास सरकारी नौकरी 2026 — बारहवीं पास के लिए सरकारी भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>12th pass sarkari naukri 2026</strong> across all major government departments.
            Candidates who have passed 12th (Intermediate / Higher Secondary) are eligible for posts like{' '}
            <strong>SSC CHSL</strong> (LDC, DEO, PA/SA), <strong>Railway NTPC</strong>,{' '}
            <strong>Banking Clerk</strong>, <strong>Police Sub-Inspector</strong>,{' '}
            <strong>NDA & Defence</strong> (Army, Navy, Air Force), Postal Department, and various state-level
            clerical posts. These jobs offer pay scale of Rs 19,900 - 35,000+ with full government benefits.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां 12वीं पास उम्मीदवारों के लिए सभी नवीनतम सरकारी नौकरियां देखें। SSC CHSL, रेलवे NTPC, बैंकिंग
            क्लर्क, पुलिस SI, NDA, सेना और अन्य सभी विभागों की भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — 12th Pass Sarkari Naukri
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
