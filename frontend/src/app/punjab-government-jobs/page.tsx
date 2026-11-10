import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Punjab Government Jobs 2026-27 — ਪੰਜਾਬ ਸਰਕਾਰੀ ਨੌਕਰੀ | SarkariAlert',
  description:
    'Punjab Government Jobs 2026-27: Latest Punjab sarkari naukri for PPSC, PSSSB, Punjab Police, Punjab Patwari & more. Apply online for Punjab state government vacancies with eligibility, salary & last date.',
  keywords: [
    'punjab government jobs 2026',
    'punjab sarkari naukri',
    'ppsc vacancy 2026',
    'psssb bharti 2026',
    'punjab police vacancy',
    'punjab patwari bharti',
    'ppsc exam 2026',
    'psssb clerk vacancy',
    'punjab sarkari naukri 2026',
    'punjab state government jobs',
    'ppsc civil services 2026',
    'punjab police constable bharti',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/punjab-government-jobs',
  },
  openGraph: {
    title: 'Punjab Government Jobs 2026-27 — ਪੰਜਾਬ ਸਰਕਾਰੀ ਨੌਕਰੀ',
    description:
      'Find Punjab sarkari naukri 2026-27. PPSC, PSSSB, Punjab Police, Punjab Patwari & more vacancies in Punjab.',
    url: 'https://sarkarialert.online/punjab-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in Punjab?',
    answer:
      'The major recruitment bodies in Punjab are: PPSC (Punjab Public Service Commission) for Civil Services, HCS, Tehsildar, and other Group A/B posts. PSSSB (Punjab Subordinate Services Selection Board) for Clerk, Patwari, and other Group C posts. Punjab Police for Constable, SI, and other police posts. Punjab Education Department for teacher recruitment through ETT, Master Cadre, and other teaching posts.',
  },
  {
    question: 'PPSC exam ka pattern kya hota hai?',
    answer:
      'PPSC Civil Services exam teen stages mein hoti hai: Prelims (Objective type — General Studies aur Punjab GK), Mains (Descriptive papers including Punjabi, English, Essay, GS papers), aur Interview. PPSC se HCS (Executive Branch), Tehsildar, DSP, ETO, BDO jaise prestigious posts milti hain. Prelims qualify karne ke baad hi Mains de sakte hain. Punjab GK aur current affairs pe focus karna bahut zaroori hai.',
  },
  {
    question: 'How to apply for PSSSB Clerk recruitment?',
    answer:
      'PSSSB Clerk recruitment ke liye PSSSB ki official website psssb.punjab.gov.in par online apply karna hota hai. Eligibility: 10+2 pass with typing speed (Hindi/Punjabi/English). Written exam mein General Knowledge, Mathematics, Reasoning, English/Punjabi, and Computer Knowledge se questions aate hain. Salary Pay Level 2 (Rs 19,900 - Rs 63,200) ke saath allowances milte hain.',
  },
  {
    question: 'Punjab Police bharti ka process kya hai?',
    answer:
      'Punjab Police Constable bharti mein Written Test (100 marks — GK, Maths, Reasoning, Punjabi/Hindi/English), Physical Measurement Test (height/chest), Physical Screening Test (running — 1600m in 6 min for males, 800m in 3 min 30 sec for females), aur Document Verification hota hai. Punjab GK, current affairs, aur basic math pe focus karein. 10+2 pass hona zaroori hai. Salary Rs 21,700 basic pay se start hoti hai.',
  },
  {
    question: 'Punjab Patwari ki salary kitni hai aur exam kaisa hota hai?',
    answer:
      'Punjab Patwari ko Pay Level 4 (Rs 25,500 - Rs 81,100 basic pay) milti hai. Allowances ke saath gross salary lagbhag Rs 30,000 - 40,000 per month hoti hai. Exam mein General Knowledge, Mental Ability, Maths, Punjabi, English, aur IT Knowledge se questions aate hain. Patwari ka kaam land records maintain karna, revenue collection, aur agricultural data record karna hota hai. Graduation pass hona zaroori hai.',
  },
  {
    question: 'What are the upcoming Punjab government exams in 2026?',
    answer:
      'Upcoming Punjab government exams in 2026 include: PPSC Civil Services Prelims & Mains, PSSSB Clerk & Patwari recruitment, Punjab Police Constable & SI bharti, Punjab ETT Teacher recruitment, Punjab Master Cadre Teacher, PPSC Tehsildar exam, Punjab Forest Guard, Punjab JE recruitment, and various district-level vacancies. Check PPSC and PSSSB official websites regularly for latest notifications.',
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
        name: 'Punjab Government Jobs',
        item: 'https://sarkarialert.online/punjab-government-jobs',
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
    data = await getJobs({ state: 'punjab', page: '1' });
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
      filterParams={{ state: 'punjab' }}
    />
  );
}

export default function PunjabGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Punjab Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              ਪੰਜਾਬ ਸਰਕਾਰੀ ਨੌਕਰੀ 2026 — PPSC, PSSSB, Punjab Police ਭਰਤੀ
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Punjab sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>PPSC</strong> (Civil Services, HCS, Tehsildar), <strong>PSSSB</strong> (Clerk, Patwari, Steno Typist),{' '}
            <strong>Punjab Police</strong> (Constable, SI), and <strong>Punjab Patwari</strong> recruitment.
            Punjab offers excellent government job opportunities across education, police, revenue, health, and administrative departments.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            ਇੱਥੇ ਪੰਜਾਬ ਦੀਆਂ ਸਾਰੀਆਂ ਨਵੀਨਤਮ ਸਰਕਾਰੀ ਨੌਕਰੀਆਂ ਦੇਖੋ। PPSC, PSSSB, Punjab Police, Punjab Patwari
            ਅਤੇ ਹੋਰ ਸਾਰੇ ਵਿਭਾਗਾਂ ਦੀ ਭਰਤੀ ਸੂਚਨਾਵਾਂ ਇੱਕ ਥਾਂ ਤੇ। Punjab HCS, Punjab SI, Punjab Constable ਭਰਤੀ ਅੱਪਡੇਟ।
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
          Frequently Asked Questions — Punjab Government Jobs
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
