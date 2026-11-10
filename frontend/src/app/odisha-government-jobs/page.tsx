import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Odisha Government Jobs 2026-27 — ଓଡ଼ିଶା ସରକାରୀ ଚାକିରୀ | SarkariAlert',
  description:
    'Odisha Government Jobs 2026-27: Latest Odisha sarkari naukri for OPSC, OSSSC, Odisha Police, OTET, OAVS & more. Apply online for Odisha state government vacancies with eligibility, salary & last date.',
  keywords: [
    'odisha government jobs 2026',
    'odisha sarkari naukri',
    'opsc oas 2026',
    'osssc vacancy 2026',
    'odisha police constable bharti',
    'otet 2026',
    'odisha teacher recruitment',
    'opsc aso vacancy',
    'osssc ri ari amin',
    'odisha anganwadi bharti',
    'opsc civil services',
    'odisha state government jobs',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/odisha-government-jobs',
  },
  openGraph: {
    title: 'Odisha Government Jobs 2026-27 — ଓଡ଼ିଶା ସରକାରୀ ଚାକିରୀ',
    description:
      'Find Odisha sarkari naukri 2026-27. OPSC, OSSSC, Odisha Police & more vacancies in Odisha.',
    url: 'https://sarkarialert.online/odisha-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in Odisha?',
    answer:
      'The major recruitment bodies in Odisha are: OPSC (Odisha Public Service Commission) for OAS (Odisha Administrative Service), OFS, OPS, ASO and other Group A/B posts. OSSSC (Odisha Sub-ordinate Staff Selection Commission) for RI, ARI, Amin, Forest Guard, Excise Constable, and other Group C posts. Odisha Police for Constable, SI recruitment. OAVS for Adarsha Vidyalaya teachers. DSSSB Odisha for district-level posts.',
  },
  {
    question: 'OPSC OAS exam ka pattern kya hai?',
    answer:
      'OPSC OAS (Odisha Administrative Service) exam teen charan mein hota hai: Prelims (2 papers — GS + CSAT, 200+200 marks, objective), Mains (written exam with Essay, GS papers, Optional), aur Interview (175 marks). OAS se Collector, SP, ADM, Sub-Collector jaise prestigious posts milte hain. OPSC ASO (Assistant Section Officer) exam alag hota hai with Prelims + Mains + Computer Skill Test.',
  },
  {
    question: 'OSSSC mein kaunse posts aate hain?',
    answer:
      'OSSSC ke major posts: RI (Revenue Inspector), ARI (Assistant Revenue Inspector), Amin (Revenue Field Surveyor), Forest Guard, Excise Constable, Lab Technician, Statistical Field Surveyor, Junior Clerk, Junior Assistant, Livestock Inspector. OSSSC CRE (Combined Recruitment Exam) ke through multiple posts ki bharti hoti hai. Minimum qualification 10th/12th/Graduation post-wise.',
  },
  {
    question: 'Odisha mein government jobs ke liye age limit kya hai?',
    answer:
      'Odisha mein age limits: OPSC OAS — 21-32 years (General), 35 years (OBC/SEBC), 37 years (SC/ST), 42 years (PwD). Odisha Police Constable — 18-23 years (General). OSSSC posts — 18-32 years (General) with relaxation. OTET Teachers — no specific upper limit for TET, but DSE recruitment has age limits. Odisha provides 3 years OBC and 5 years SC/ST relaxation for most posts.',
  },
  {
    question: 'How to apply for Odisha Police Constable?',
    answer:
      'Odisha Police Constable ki bharti Odisha Police Recruitment Board ke through hoti hai. Steps: 1) Visit odishapolice.gov.in. 2) Apply online when notification is out. 3) Pay fee. Selection: Written Test (OMR based, 100 marks) + Physical Measurement + Physical Efficiency Test + Document Verification. Minimum qualification: 12th pass (Higher Secondary). Good physical fitness is essential.',
  },
  {
    question: 'Odisha mein upcoming government exams kaunse hain 2026 mein?',
    answer:
      'Odisha ke upcoming exams 2026: OPSC OAS Prelims & Mains, OPSC ASO (Assistant Section Officer), OSSSC CRE (Combined Recruitment Exam for RI, ARI, Amin, Forest Guard), Odisha Police Constable & SI, OTET (Odisha Teacher Eligibility Test), OAVS Teacher Recruitment, Odisha Anganwadi Worker/Helper, Various district-level posts. OPSC aur OSSSC ki official websites par nazar rakhein.',
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
        name: 'Odisha Government Jobs',
        item: 'https://sarkarialert.online/odisha-government-jobs',
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
    data = await getJobs({ state: 'odisha', page: '1' });
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
      filterParams={{ state: 'odisha' }}
    />
  );
}

export default function OdishaGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Odisha Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              ଓଡ଼ିଶା ସରକାରୀ ଚାକିରୀ 2026 — OPSC, OSSSC, Odisha Police ଭର୍ତ୍ତି
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Odisha sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>OPSC</strong> (OAS, ASO, Civil Judge, Medical Officer), <strong>OSSSC</strong> (RI, ARI, Amin, Forest Guard),{' '}
            <strong>Odisha Police</strong> (Constable, SI), <strong>OAVS</strong> (Adarsha Vidyalaya Teachers),
            and other departments. OSSSC conducts one of the largest combined recruitment exams in India
            with thousands of vacancies in each cycle.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            ଏଠାରେ ଓଡ଼ିଶାର ସମସ୍ତ ନୂଆ ସରକାରୀ ଚାକିରୀ ଦେଖନ୍ତୁ। OPSC, OSSSC, ଓଡ଼ିଶା ପୋଲିସ,
            OAVS ଏବଂ ଅନ୍ୟ ସମସ୍ତ ବିଭାଗର ନିଯୁକ୍ତି ବିଜ୍ଞପ୍ତି ଏକ ଜାଗାରେ।
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
          Frequently Asked Questions — Odisha Government Jobs
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
