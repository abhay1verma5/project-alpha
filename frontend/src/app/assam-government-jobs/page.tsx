import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Assam Government Jobs 2026-27 — অসম চৰকাৰী চাকৰি | SarkariAlert',
  description:
    'Assam Government Jobs 2026-27: Latest Assam sarkari naukri for APSC, SLRC, Assam Police, Assam TET, DHS Assam & more. Apply online for Assam state government vacancies with eligibility, salary & last date.',
  keywords: [
    'assam government jobs 2026',
    'assam sarkari naukri',
    'apsc cce 2026',
    'slrc assam vacancy',
    'assam police constable bharti',
    'assam tet 2026',
    'dhs assam recruitment',
    'assam direct recruitment',
    'apsc junior engineer',
    'assam rifles vacancy',
    'assam panchayat secretary',
    'assam state government jobs',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/assam-government-jobs',
  },
  openGraph: {
    title: 'Assam Government Jobs 2026-27 — অসম চৰকাৰী চাকৰি',
    description:
      'Find Assam sarkari naukri 2026-27. APSC, SLRC, Assam Police & more vacancies in Assam.',
    url: 'https://sarkarialert.online/assam-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in Assam?',
    answer:
      'The major recruitment bodies in Assam are: APSC (Assam Public Service Commission) for CCE (Combined Competitive Exam), AE, JE, Research Officer, and other Group A/B posts. SLRC (State Level Recruitment Commission) for Grade III and Grade IV posts. Assam Police for Constable (AB/UB), SI, and other police posts. DHS (Directorate of Health Services) for medical staff. SEBA/AHSEC for teacher posts. DEE (Director of Elementary Education) for LP/UP teachers.',
  },
  {
    question: 'APSC CCE exam ka pattern kya hai?',
    answer:
      'APSC CCE (Combined Competitive Exam) teen charan mein hota hai: Prelims (2 papers — GS 200 marks + CSAT 200 marks, objective), Mains (8 papers including Essay, GS, Optional subjects — descriptive), aur Interview/Personality Test (275 marks). APSC CCE se ACS (Assam Civil Service), APS (Assam Police Service), AFS, allied services milte hain. It is the most prestigious state exam in Assam.',
  },
  {
    question: 'Assam SLRC Grade III/IV mein kya hota hai?',
    answer:
      'SLRC Assam se Grade III (Junior Assistant, Stenographer, Accountant, Lab Technician, Computer Operator, etc.) aur Grade IV (Peon, Chowkidar, Office Attendant) posts ki bharti hoti hai. Grade III: Graduate + computer knowledge required, written exam + computer test. Grade IV: Class 8/10 pass, written exam. SLRC combined exam multiple departments ke liye hota hai. Salary: Grade III Level 6-8 (Rs 22,000-40,000+), Grade IV Level 1-2 (Rs 14,000-20,000+).',
  },
  {
    question: 'Assam mein government jobs ke liye age limit kya hai?',
    answer:
      'Assam mein age limits: APSC CCE — 21-38 years (General), 41 years (OBC/MOBC), 43 years (SC/ST/PwD). Assam Police Constable — 18-25 years (General), 28 years (OBC), 30 years (SC/ST). SLRC Grade III — 18-38 years. SLRC Grade IV — 18-38 years. Assam TET/DEE Teachers — 18-38 years. Assam provides standard age relaxation as per Govt of Assam OM.',
  },
  {
    question: 'How to apply for Assam Police Constable?',
    answer:
      'Assam Police Constable ki bharti SLPRB (State Level Police Recruitment Board) ke through hoti hai. Process: 1) Visit slprbassam.in. 2) Register and apply online. 3) Pay fee (Rs 250 General, Rs 150 OBC/MOBC, free SC/ST). Selection: Written Test (OMR, 100 marks GK + Math + English + Assamese) + Physical Standard Test + Physical Efficiency Test + Document Verification. Minimum: HS pass (12th).',
  },
  {
    question: 'Assam mein upcoming government exams 2026 mein kaunse hain?',
    answer:
      'Assam ke upcoming exams 2026: APSC CCE Prelims & Mains, SLRC Grade III & Grade IV recruitment, Assam Police Constable (AB/UB) & SI bharti, Assam TET (LP & UP), DEE Teacher Recruitment, DHS Assam (Grade III/IV medical posts), APDCL (power sector), Assam Panchayat & Rural Development posts. APSC, SLRC aur SLPRB ki official websites regularly check karein.',
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
        name: 'Assam Government Jobs',
        item: 'https://sarkarialert.online/assam-government-jobs',
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
    data = await getJobs({ state: 'assam', page: '1' });
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
      filterParams={{ state: 'assam' }}
    />
  );
}

export default function AssamGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-lg shadow-red-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Assam Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              অসম চৰকাৰী চাকৰি 2026 — APSC, SLRC, Assam Police ভৰ্তি
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Assam sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>APSC</strong> (CCE, AE, JE, Research Officer), <strong>SLRC</strong> (Grade III, Grade IV),{' '}
            <strong>Assam Police</strong> (Constable AB/UB, SI), <strong>DEE</strong> (LP/UP Teachers),
            <strong> DHS</strong> (Medical Staff), and other departments. SLRC Grade III/IV conducts large-scale recruitment
            covering all government departments simultaneously.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            ইয়াত অসমৰ সকলো শেহতীয়া চৰকাৰী চাকৰি চাওক। APSC, SLRC, অসম আৰক্ষী,
            DEE আৰু আন সকলো বিভাগৰ নিযুক্তি জাননী এটা ঠাইতে।
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
          Frequently Asked Questions — Assam Government Jobs
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
