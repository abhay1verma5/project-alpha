import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bihar Government Jobs 2026-27 — बिहार सरकारी नौकरी | SarkariAlert',
  description:
    'Bihar Government Jobs 2026-27: Latest Bihar sarkari naukri for BPSC, BSSC, Bihar Police, Bihar Teacher TRE, CSBC & more. Apply online for Bihar state government vacancies with eligibility, salary & last date.',
  keywords: [
    'bihar government jobs 2026',
    'bihar sarkari naukri',
    'bpsc vacancy 2026',
    'bssc bharti 2026',
    'bihar police vacancy',
    'bihar teacher tre vacancy',
    'csbc bihar constable bharti',
    'bpsc teacher recruitment',
    'bihar daroga vacancy',
    'bihar state government jobs',
    'bpsc pcs 2026',
    'bihar anganwadi bharti',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/bihar-government-jobs',
  },
  openGraph: {
    title: 'Bihar Government Jobs 2026-27 — बिहार सरकारी नौकरी',
    description:
      'Find Bihar sarkari naukri 2026-27. BPSC, BSSC, Bihar Police, Bihar Teacher TRE & more vacancies in Bihar.',
    url: 'https://sarkarialert.online/bihar-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in Bihar?',
    answer:
      'The major recruitment bodies in Bihar are: BPSC (Bihar Public Service Commission) for PCS, judicial services, school teachers (TRE), and other Group A/B posts. BSSC (Bihar Staff Selection Commission) for Inter-level and Graduate-level posts like Stenographer, Revenue Staff, etc. CSBC (Central Selection Board of Constable) for Bihar Police Constable, Fireman, Home Guard. Bihar Police for Daroga (SI) and other police posts. BTSC (Bihar Technical Service Commission) for medical officers.',
  },
  {
    question: 'BPSC exam ka pattern kya hai?',
    answer:
      'BPSC PCS exam teen charan mein hota hai: Prelims (1 paper — General Studies, 150 marks, 2 hours, objective type), Mains (Hindi qualifying + 1 GS paper + 1 optional paper + Essay — descriptive type), aur Interview. BPSC se SDM, DSP, CO, BDO jaise posts milte hain. BPSC Teacher Recruitment Exam (TRE) alag se hota hai jismein primary, upper primary, aur secondary level ke teachers ki bharti hoti hai.',
  },
  {
    question: 'How to apply for Bihar Police Constable vacancy?',
    answer:
      'Bihar Police Constable vacancy CSBC (Central Selection Board of Constable) ke through nikalti hai. Apply process: 1) Visit csbc.bih.nic.in when notification is released. 2) Register with mobile number and email. 3) Fill application form with personal and educational details. 4) Upload photo, signature. 5) Pay application fee (Rs 450 for General, free for SC/ST of Bihar). Selection: Written Test (100 marks) + Physical Efficiency Test (PET) + Document Verification.',
  },
  {
    question: 'Bihar Teacher TRE mein kitni salary milti hai?',
    answer:
      'Bihar Teacher TRE (Teacher Recruitment Exam) se select hone par: Primary Teacher (Class 1-5) ko Pay Level 8 (Rs 25,000-30,000+ with DA), Upper Primary Teacher (Class 6-8) ko Rs 30,000-35,000+, Secondary Teacher (Class 9-10) ko Rs 35,000-45,000+, aur Higher Secondary Teacher (Class 11-12) ko Rs 40,000-50,000+ milta hai. 7th Pay Commission ke baad salary mein achcha increment hua hai. Yeh BPSC ke through bharti hoti hai.',
  },
  {
    question: 'What is the age limit for Bihar government jobs?',
    answer:
      'Age limits for Bihar government jobs: BPSC PCS — 20-37 years (General), 40 years (OBC/BC/Female), 42 years (SC/ST). Bihar Police Constable — 18-25 years (General), 28 years (OBC), 30 years (SC/ST). BPSC Teacher TRE — no upper age limit for Bihar domicile candidates (per Bihar government policy). BSSC posts — generally 18-37 years with relaxation. Bihar provides generous age relaxation compared to many other states.',
  },
  {
    question: 'Bihar mein kaunse upcoming government exams hain 2026 mein?',
    answer:
      'Bihar ke upcoming government exams 2026 mein: BPSC 70th/71st PCS Prelims & Mains, BPSC Teacher TRE (primary, upper primary, secondary levels), Bihar Police Constable (CSBC), Bihar Daroga (SI) bharti, BSSC Inter-level aur Graduate-level exam, BTSC Medical Officer, Bihar Anganwadi Sevika/Sahayika bharti, Bihar Panchayat Secretary, aur various district-level posts. BPSC aur CSBC ki official website par nazar rakhein.',
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
        name: 'Bihar Government Jobs',
        item: 'https://sarkarialert.online/bihar-government-jobs',
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
    data = await getJobs({ state: 'bihar', page: '1' });
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
      filterParams={{ state: 'bihar' }}
    />
  );
}

export default function BiharGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Bihar Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              बिहार सरकारी नौकरी 2026 — BPSC, BSSC, Bihar Police भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Bihar sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>BPSC</strong> (PCS, Teacher TRE, Judicial Services), <strong>BSSC</strong> (Inter-level, Graduate-level),{' '}
            <strong>Bihar Police</strong> (Constable, Daroga/SI via CSBC), <strong>Bihar Teacher TRE</strong> (primary, upper primary, secondary),
            and other departments. Bihar offers generous age relaxation and no upper age limit for teachers (Bihar domicile),
            making it one of the most aspirant-friendly states for government job seekers.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां बिहार की सभी नवीनतम सरकारी नौकरियां देखें। BPSC, BSSC, CSBC, Bihar Police, Bihar Teacher TRE
            और अन्य सभी विभागों की भर्ती अधिसूचनाएं एक जगह। बिहार PCS, दरोगा, कांस्टेबल भर्ती अपडेट।
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
          Frequently Asked Questions — Bihar Government Jobs
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
