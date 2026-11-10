import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'MP Government Jobs 2026-27 — मध्य प्रदेश सरकारी नौकरी | SarkariAlert',
  description:
    'MP Government Jobs 2026-27: Latest Madhya Pradesh sarkari naukri for MPPSC, MP Vyapam (MPPEB), MP Police, MP Patwari & more. Apply online for MP state government vacancies with eligibility, salary & last date.',
  keywords: [
    'mp government jobs 2026',
    'madhya pradesh sarkari naukri',
    'mppsc vacancy 2026',
    'mp vyapam bharti 2026',
    'mppeb recruitment 2026',
    'mp police vacancy',
    'mp patwari bharti',
    'mppsc state service',
    'mp teacher varg 1 2 3',
    'mp constable vacancy',
    'mp state government jobs',
    'mp forest guard bharti',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/mp-government-jobs',
  },
  openGraph: {
    title: 'MP Government Jobs 2026-27 — मध्य प्रदेश सरकारी नौकरी',
    description:
      'Find MP sarkari naukri 2026-27. MPPSC, MP Vyapam, MP Police, MP Patwari & more vacancies in Madhya Pradesh.',
    url: 'https://sarkarialert.online/mp-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in Madhya Pradesh?',
    answer:
      'The major recruitment bodies in MP are: MPPSC (Madhya Pradesh Public Service Commission) for State Service Exam (SSE), State Forest Service, Medical Officer, and other Group A/B posts. MPPEB/MP Vyapam (Madhya Pradesh Professional Examination Board) for Patwari, Sub Engineer, Group 2/3/4 posts, TET, PHT, B.Ed., and various competitive exams. MP Police for Constable, SI, and other police posts. MP Education Department for Varg 1, 2, 3 teacher recruitment.',
  },
  {
    question: 'MPPSC State Service Exam ka pattern kya hai?',
    answer:
      'MPPSC State Service Exam (SSE) teen charan mein hota hai: Prelims (2 papers — General Studies 200 marks + General Aptitude Test 200 marks, objective type), Mains (6 papers — Hindi Essay, Hindi Precis, GS-I to GS-IV, descriptive type, 300 marks each), aur Interview (personality test, 175 marks). MPPSC SSE se Deputy Collector, DSP, Naib Tehsildar, BDO jaise posts milte hain. Prelims mein negative marking 1/3 hoti hai.',
  },
  {
    question: 'How to apply for MP Patwari exam?',
    answer:
      'MP Patwari exam MPPEB (MP Vyapam) ke through conduct hota hai. Apply process: 1) Visit peb.mp.gov.in when notification is released. 2) Register on the portal. 3) Fill application form with personal, educational, and preference details. 4) Upload photo, signature, and documents. 5) Pay application fee online. Eligibility: Graduation + CPCT certification. Selection: Written Exam (200 marks) covering General Knowledge, Quantitative Aptitude, Hindi, Computer, Rural Economy & Panchayati Raj.',
  },
  {
    question: 'What is CPCT and is it required for MP government jobs?',
    answer:
      'CPCT (Computer Proficiency Certification Test) is a computer typing test conducted by MPPEB for Madhya Pradesh government jobs. It tests Hindi and English typing speed (minimum 30 WPM Hindi, 40 WPM English) and computer knowledge. CPCT is mandatory for many MP government posts including Patwari, DEO (Data Entry Operator), Assistant Grade-3, Computer Operator, etc. CPCT score is valid for 2 years. Candidates can appear multiple times to improve their score.',
  },
  {
    question: 'MP mein teacher bharti kaise hoti hai?',
    answer:
      'MP mein teacher bharti MPPEB ke through hoti hai: Varg 3 (Primary Teacher, Class 1-5) — MP TET + merit se selection, D.El.Ed./B.Ed. zaroori. Varg 2 (TGT, Class 6-10) — MPPEB exam, B.Ed. zaroori. Varg 1 (PGT/Lecturer, Class 11-12) — MPPSC ke through, Post Graduation + B.Ed. zaroori. Samvida Shala Shikshak ke roop mein contract par niyukti hoti hai, baad mein regularization hota hai. MP TET qualify karna zaroori hai.',
  },
  {
    question: 'What is the salary for MP Police Constable and SI?',
    answer:
      'MP Police Constable gets Pay Matrix Level 4 (Rs 19,500 - Rs 62,000 basic pay). With allowances (DA, HRA, uniform, etc.), gross salary is approximately Rs 28,000 - 35,000 per month. MP Police SI (Sub Inspector) gets Pay Matrix Level 8 (Rs 33,800 - Rs 1,07,200 basic), with gross salary of Rs 45,000 - 55,000 per month. ASI gets Pay Matrix Level 5. Selection for Constable: Written + Physical + Medical. For SI: Written + Physical + Interview.',
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
        name: 'MP Government Jobs',
        item: 'https://sarkarialert.online/mp-government-jobs',
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
    data = await getJobs({ state: 'madhya_pradesh', page: '1' });
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
      filterParams={{ state: 'madhya_pradesh' }}
    />
  );
}

export default function MPGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              MP Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              मध्य प्रदेश सरकारी नौकरी 2026 — MPPSC, MP Vyapam, MP Police भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Madhya Pradesh sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>MPPSC</strong> (State Service Exam, Forest Service, Medical Officer), <strong>MPPEB/MP Vyapam</strong> (Patwari, Sub Engineer, Group 2/3/4),{' '}
            <strong>MP Police</strong> (Constable, SI), <strong>MP Patwari</strong>,
            and <strong>MP Teacher</strong> (Varg 1, 2, 3) recruitment. MP is one of the largest states with
            extensive government job opportunities across education, police, forest, revenue, and health departments.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां मध्य प्रदेश की सभी नवीनतम सरकारी नौकरियां देखें। MPPSC, MP व्यापम, MP Police, पटवारी
            और अन्य सभी विभागों की भर्ती अधिसूचनाएं एक जगह। SSE, कांस्टेबल, शिक्षक भर्ती अपडेट।
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
          Frequently Asked Questions — MP Government Jobs
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
