import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Rajasthan Government Jobs 2026-27 — राजस्थान सरकारी नौकरी | SarkariAlert',
  description:
    'Rajasthan Government Jobs 2026-27: Latest Rajasthan sarkari naukri for RPSC, RSMSSB, Rajasthan Police, Rajasthan Patwari, RAS & more. Apply online for Rajasthan state government vacancies with eligibility, salary & last date.',
  keywords: [
    'rajasthan government jobs 2026',
    'rajasthan sarkari naukri',
    'rpsc vacancy 2026',
    'rsmssb bharti 2026',
    'rajasthan police vacancy',
    'rajasthan patwari bharti',
    'rpsc ras vacancy',
    'rajasthan teacher bharti',
    'rajasthan constable vacancy',
    'rajasthan state government jobs',
    'rpsc 2nd grade teacher',
    'rsmssb lab assistant',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/rajasthan-government-jobs',
  },
  openGraph: {
    title: 'Rajasthan Government Jobs 2026-27 — राजस्थान सरकारी नौकरी',
    description:
      'Find Rajasthan sarkari naukri 2026-27. RPSC, RSMSSB, Rajasthan Police, Patwari & more vacancies in Rajasthan.',
    url: 'https://sarkarialert.online/rajasthan-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in Rajasthan?',
    answer:
      'The major recruitment bodies in Rajasthan are: RPSC (Rajasthan Public Service Commission) for RAS/RTS, School Lecturer, 1st Grade Teacher, and other Group A/B posts. RSMSSB (Rajasthan Subordinate and Ministerial Services Selection Board) for Patwari, Junior Accountant, Lab Assistant, Pharmacist, and other Group C posts. Rajasthan Police for Constable and SI recruitment. Rajasthan PTET for B.Ed. admissions. Rajasthan BSTC for D.El.Ed. admissions.',
  },
  {
    question: 'RPSC RAS exam ka pattern kya hai?',
    answer:
      'RPSC RAS exam teen charan mein hota hai: Prelims (1 paper — General Knowledge & General Science, 200 marks, 3 hours, objective type), Mains (4 papers — GK & GS Paper I, II, III + Hindi & English, descriptive type, 200 marks each), aur Interview (personality test). RAS se SDM, DSP, Block Development Officer, Tehsildar jaise posts milte hain. Prelims mein negative marking 1/3 hoti hai.',
  },
  {
    question: 'How to apply for Rajasthan Patwari vacancy?',
    answer:
      'Rajasthan Patwari vacancy RSMSSB ke through nikalti hai. Apply process: 1) Visit rsmssb.rajasthan.gov.in when notification is released. 2) Register using SSO ID (Single Sign-On Rajasthan). 3) Fill application form with personal and educational details. 4) Upload photo, signature. 5) Pay application fee online. Eligibility: Graduation + Computer Certificate (RSCIT/O-Level). Selection: Written Exam (300 marks) + Document Verification. Patwari salary: Rs 20,800 - 66,000 (Pay Matrix Level 5).',
  },
  {
    question: 'What is the salary for Rajasthan Police Constable?',
    answer:
      'Rajasthan Police Constable gets Pay Matrix Level 5 (Rs 20,800 - Rs 66,000 basic pay) as per 7th Pay Commission. With all allowances (DA, HRA, uniform allowance, etc.), the gross salary is approximately Rs 28,000 - 35,000 per month for freshers. Rajasthan Police SI (Sub Inspector) gets Pay Matrix Level 10 (Rs 33,800 - Rs 1,07,200 basic), with gross salary of Rs 45,000 - 55,000 per month.',
  },
  {
    question: 'Rajasthan mein teacher bharti kaise hoti hai?',
    answer:
      'Rajasthan mein teacher bharti teen level par hoti hai: 3rd Grade Teacher (Level 1 & 2) — REET (Rajasthan Eligibility Examination for Teachers) qualify karna zaroori hai, uske baad merit se selection. 2nd Grade Teacher — RPSC 2nd Grade exam (Senior Teacher). 1st Grade Teacher (School Lecturer) — RPSC 1st Grade exam. REET Level 1 primary teacher (Class 1-5) ke liye aur Level 2 upper primary (Class 6-8) ke liye hota hai. B.Ed./D.El.Ed. zaroori hai.',
  },
  {
    question: 'What are the upcoming Rajasthan government exams in 2026?',
    answer:
      'Upcoming Rajasthan government exams in 2026: RPSC RAS Prelims & Mains, REET (Rajasthan Teacher Eligibility Test), RPSC 1st Grade Teacher (School Lecturer), RPSC 2nd Grade Teacher (Senior Teacher), RSMSSB Patwari, Rajasthan Police Constable & SI, RSMSSB Lab Assistant, RSMSSB Junior Accountant, RSMSSB Pharmacist, RPSC APO (Assistant Prosecution Officer). Check rpsc.rajasthan.gov.in and rsmssb.rajasthan.gov.in for notifications.',
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
        name: 'Rajasthan Government Jobs',
        item: 'https://sarkarialert.online/rajasthan-government-jobs',
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
    data = await getJobs({ state: 'rajasthan', page: '1' });
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
      filterParams={{ state: 'rajasthan' }}
    />
  );
}

export default function RajasthanGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Rajasthan Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              राजस्थान सरकारी नौकरी 2026 — RPSC, RSMSSB, Rajasthan Police भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Rajasthan sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>RPSC</strong> (RAS, 1st/2nd Grade Teacher, School Lecturer), <strong>RSMSSB</strong> (Patwari, Lab Assistant, Junior Accountant),{' '}
            <strong>Rajasthan Police</strong> (Constable, SI), <strong>Rajasthan Patwari</strong>,
            and <strong>REET</strong> teacher recruitment. Rajasthan regularly releases large-scale recruitment
            notifications with thousands of vacancies across education, police, revenue, and health departments.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां राजस्थान की सभी नवीनतम सरकारी नौकरियां देखें। RPSC, RSMSSB, Rajasthan Police, पटवारी, REET
            और अन्य सभी विभागों की भर्ती अधिसूचनाएं एक जगह। RAS, कांस्टेबल, शिक्षक भर्ती अपडेट।
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
          Frequently Asked Questions — Rajasthan Government Jobs
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
