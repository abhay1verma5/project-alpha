import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Clerk Jobs 2026-27 — Government Clerk, LDC, UDC Vacancy | SarkariAlert',
  description:
    'Clerk jobs 2026-27: Latest government clerk, LDC (Lower Division Clerk), UDC (Upper Division Clerk) vacancy across SSC CHSL, court, bank, railway & state government departments. Check eligibility, salary, typing test & apply online for clerk sarkari naukri.',
  keywords: [
    'clerk vacancy 2026',
    'LDC recruitment',
    'UDC vacancy',
    'SSC CHSL clerk',
    'court clerk',
    'government clerk salary',
    'bank clerk vacancy',
    'railway clerk recruitment',
    'sarkari clerk bharti',
    'clerk typing test',
    'government LDC vacancy 2026',
    'clerk sarkari naukri',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/clerk-jobs',
  },
  openGraph: {
    title: 'Clerk Jobs 2026-27 — Government Clerk, LDC, UDC Vacancy',
    description:
      'Find latest clerk recruitment 2026-27. SSC CHSL, court, bank, railway & state government LDC/UDC vacancies with eligibility, salary & apply links.',
    url: 'https://sarkarialert.online/clerk-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the different types of government clerk jobs available?',
    answer:
      'Government clerk jobs include: LDC (Lower Division Clerk) through SSC CHSL in central government ministries, UDC (Upper Division Clerk) through departmental promotion or direct recruitment, Court Clerk in High Courts and District Courts, Bank Clerk (IBPS Clerk, SBI Clerk), Railway Clerk through RRB NTPC, State Government Clerk through state-level exams (like UPPSC, MPPSC, RPSC), Postal Assistant/Sorting Assistant, and Account Clerk in various departments.',
  },
  {
    question: 'Sarkari clerk ki naukri ke liye kya yogyata chahiye aur typing speed kitni honi chahiye?',
    answer:
      'Sarkari clerk (LDC) ke liye 12th pass (SSC CHSL ke through) ya graduation (court clerk ke liye) chahiye. Typing speed: Hindi mein 25-30 WPM (words per minute) aur English mein 35-40 WPM chahiye. SSC CHSL mein typing test qualifying nature ka hota hai. Bank clerk ke liye graduation zaroori hai. Age limit 18-27 saal hai (relaxation applicable). Computer knowledge bhi zaroori hai jyadatar posts mein.',
  },
  {
    question: 'What is the salary of a government clerk (LDC/UDC)?',
    answer:
      'Government clerk salary: LDC gets Pay Level 2 (Rs 19,900 - Rs 63,200 basic pay) under 7th Pay Commission. UDC gets Pay Level 4 (Rs 25,500 - Rs 81,100). With allowances (DA at 50%+, HRA 8-24% depending on city, TA), gross salary is approximately Rs 30,000-35,000/month for LDC and Rs 38,000-45,000/month for UDC. Bank clerk salary starts at Rs 28,000-32,000/month. After promotion to UDC/Accountant, salary increases significantly.',
  },
  {
    question: 'What is the selection process for SSC CHSL clerk recruitment?',
    answer:
      'SSC CHSL selection process: (1) Tier-I - Computer Based Test (CBT) with 200 marks covering General Intelligence, English, Quantitative Aptitude, and General Awareness (60 minutes), (2) Tier-II - CBT with Session-I (Mathematical Abilities + Reasoning) and Session-II (English + General Awareness) plus Typing/Skill test. Typing test requires 35 WPM in English or 30 WPM in Hindi on computer. Final merit is based on Tier-I + Tier-II marks.',
  },
  {
    question: 'What is the career growth for government clerks?',
    answer:
      'Government clerk career growth: LDC (Level 2) can be promoted to UDC (Level 4) after 3-5 years, then to Head Clerk/Accountant (Level 5-6) after 5-8 years, and further to Section Officer/Administrative Officer (Level 7-8) through departmental exams. In courts, clerk can become Senior Clerk, Head Clerk, and then Superintendent. Bank clerks can appear for internal officer exams. Total career span of 30+ years with regular pay commission benefits.',
  },
  {
    question: 'How to prepare for government clerk exams?',
    answer:
      'To prepare for clerk exams: (1) Focus on English grammar, vocabulary, and comprehension, (2) Practice Quantitative Aptitude - percentage, ratio, profit-loss, SI/CI, (3) Study Reasoning - coding-decoding, series, puzzles, syllogisms, (4) Current Affairs - last 6 months news, government schemes, awards, (5) Practice typing daily - use online typing tutors to reach 35 WPM English / 30 WPM Hindi, (6) Solve previous year papers of SSC CHSL, IBPS Clerk, and state-level exams. Mock tests are essential for time management.',
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
        name: 'Clerk Jobs',
        item: 'https://sarkarialert.online/clerk-jobs',
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
    data = await getJobs({ qualification: 'graduation', page: '1' });
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
      filterParams={{ qualification: 'graduation' }}
    />
  );
}

export default function ClerkJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Clerk Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              क्लर्क भर्ती 2026 — LDC, UDC सरकारी क्लर्क वैकेंसी
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>clerk vacancy 2026</strong> across all central and state government departments.
            Apply for <strong>LDC (Lower Division Clerk)</strong> through SSC CHSL, <strong>UDC (Upper Division Clerk)</strong>,{' '}
            <strong>Court Clerk</strong>, <strong>Bank Clerk</strong> through IBPS, <strong>Railway Clerk</strong>, and{' '}
            <strong>Postal Assistant</strong> posts. Government clerk salary ranges from Rs 19,900 - Rs 81,100 (Level 2-4)
            with DA, HRA, pension, medical, and excellent job security.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां सरकारी क्लर्क की सभी नवीनतम भर्ती अधिसूचनाएं देखें। SSC CHSL, कोर्ट, बैंक, रेलवे और
            राज्य सरकार में LDC/UDC पदों के लिए पात्रता, वेतन, टाइपिंग टेस्ट और आवेदन की पूरी जानकारी।
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
          Frequently Asked Questions — Clerk Jobs
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
