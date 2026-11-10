import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Teaching Government Jobs 2026-27 — TGT, PGT, PRT Vacancies | SarkariAlert',
  description:
    'Teaching government jobs 2026-27: Browse latest sarkari naukri for teachers. TGT, PGT, PRT, CTET, KVS, NVS, Army School, State TET & DSSSB teacher vacancies. Apply online with eligibility, salary & last date.',
  keywords: [
    'teaching government jobs 2026',
    'teacher sarkari naukri',
    'tgt pgt vacancy 2026',
    'kvs teacher recruitment 2026',
    'nvs teacher vacancy',
    'ctet qualified teacher jobs',
    'prt teacher sarkari naukri',
    'dsssb teacher bharti',
    'state tet teacher jobs',
    'bed teacher government jobs',
    'army school teacher vacancy',
    'super tet vacancy 2026',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/teacher-jobs',
  },
  openGraph: {
    title: 'Teaching Government Jobs 2026-27 — TGT, PGT, PRT Vacancies | Sarkari Naukri',
    description:
      'Find teaching sarkari naukri 2026-27. KVS, NVS, DSSSB, State TET, Army School & more vacancies for TGT, PGT, PRT teachers.',
    url: 'https://sarkarialert.online/teacher-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What qualifications are required for government teaching jobs?',
    answer:
      'For PRT (Primary Teacher), you need graduation + B.Ed/D.El.Ed + CTET/State TET Paper-I. For TGT (Trained Graduate Teacher), you need graduation in the relevant subject + B.Ed + CTET/State TET Paper-II. For PGT (Post Graduate Teacher), you need post-graduation in the relevant subject + B.Ed. CTET or State TET qualification is mandatory for most teaching posts.',
  },
  {
    question: 'Teacher sarkari naukri ke liye CTET zaroori hai kya?',
    answer:
      'Haan, jyadatar sarkari teacher jobs ke liye CTET (Central Teacher Eligibility Test) ya State TET paas hona zaroori hai. KVS, NVS, DSSSB aur rajya sarkar ki teacher bharti mein CTET/TET qualify hona ek anivarya yogyata hai. CTET certificate ab lifetime valid hai.',
  },
  {
    question: 'What is the salary for KVS and NVS teachers?',
    answer:
      'KVS/NVS PRT teachers get Pay Level 6 (Rs 35,400 basic). TGT teachers get Pay Level 7 (Rs 44,900 basic). PGT teachers get Pay Level 8 (Rs 47,600 basic). With allowances (DA, HRA, etc.), the gross salary for PRT is approximately Rs 50,000-55,000, TGT is Rs 60,000-65,000, and PGT is Rs 65,000-70,000 per month.',
  },
  {
    question: 'How to apply for KVS teacher recruitment?',
    answer:
      'KVS teacher recruitment notification is released on kvsangathan.nic.in. Candidates need to register online, fill the application form with personal/educational details, upload documents (photo, signature, certificates), pay the application fee, and submit. Selection is through CBT (Computer Based Test) + Demo Teaching + Interview.',
  },
  {
    question: 'Is B.Ed mandatory for all government teaching jobs?',
    answer:
      'B.Ed is mandatory for TGT and PGT posts. For PRT posts, either B.Ed or D.El.Ed (Diploma in Elementary Education) is accepted. For some posts like NTT (Nursery Teacher Training) and special education teachers, specific diplomas are required. Physical education teacher posts require B.P.Ed.',
  },
  {
    question: 'What is the difference between CTET, State TET, and Super TET?',
    answer:
      'CTET (Central Teacher Eligibility Test) is conducted by CBSE and is valid for central government schools (KVS, NVS, etc.) and many state governments. State TET is conducted by individual states for state government school recruitment. Super TET is an additional exam conducted by some states (like UP) for final selection of teachers after qualifying CTET/State TET.',
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
        name: 'Teacher Jobs',
        item: 'https://sarkarialert.online/teacher-jobs',
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
    data = await getJobs({ qualification: 'teacher', page: '1' });
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
      filterParams={{ qualification: 'teacher' }}
    />
  );
}

export default function TeacherJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Teaching Government Jobs 2026 — TGT, PGT, PRT Vacancies
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              शिक्षक सरकारी नौकरी 2026 — TGT, PGT, PRT शिक्षक भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>teaching sarkari naukri 2026</strong> across all major government schools and education departments.
            Candidates with <strong>B.Ed</strong>, <strong>D.El.Ed</strong>, <strong>CTET</strong>, or <strong>State TET</strong> qualification can apply for posts like{' '}
            <strong>PRT (Primary Teacher)</strong>, <strong>TGT (Trained Graduate Teacher)</strong>, <strong>PGT (Post Graduate Teacher)</strong>{' '}
            at <strong>KVS</strong>, <strong>NVS</strong>, <strong>DSSSB</strong>, <strong>Army Public Schools</strong>, and State Government Schools.
            These jobs offer pay scale of Rs 35,400 - 47,600+ (Level 6-8) with government benefits like pension, medical, summer vacations, and job security.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां शिक्षक उम्मीदवारों के लिए सभी नवीनतम सरकारी नौकरियां देखें। KVS, NVS, DSSSB, राज्य TET,
            सुपर TET और आर्मी स्कूल की शिक्षक भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — Teaching Government Jobs
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
