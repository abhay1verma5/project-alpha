import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Himachal Pradesh Government Jobs 2026-27 — HP सरकारी नौकरी | SarkariAlert',
  description:
    'Himachal Pradesh Government Jobs 2026-27: Latest HP sarkari naukri for HPPSC, HPSSC, HP Police, HP TET & more. Apply online for Himachal Pradesh state government vacancies with eligibility, salary & last date.',
  keywords: [
    'himachal pradesh government jobs 2026',
    'hp sarkari naukri',
    'hppsc hpas 2026',
    'hpssc vacancy 2026',
    'hp police constable bharti',
    'hp tet 2026',
    'hppsc naib tehsildar',
    'hpssc joa it',
    'hp patwari vacancy',
    'hppsc allied services',
    'himachal pradesh teacher recruitment',
    'hp state government jobs',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/himachal-pradesh-government-jobs',
  },
  openGraph: {
    title: 'Himachal Pradesh Government Jobs 2026-27 — HP सरकारी नौकरी',
    description:
      'Find HP sarkari naukri 2026-27. HPPSC, HPSSC, HP Police & more vacancies in Himachal Pradesh.',
    url: 'https://sarkarialert.online/himachal-pradesh-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in Himachal Pradesh?',
    answer:
      'The major recruitment bodies in HP are: HPPSC (Himachal Pradesh Public Service Commission) for HPAS (HP Administrative Service), Naib Tehsildar, Block Development Officer, Allied Services, and other Group A/B posts. HPSSC (HP Staff Selection Commission) for JOA IT, Clerk, Steno, JE, Lab Assistant, and other Group C posts. HP Police for Constable and SI recruitment. HP Board of School Education for HP TET (teacher eligibility).',
  },
  {
    question: 'HPPSC HPAS exam ka pattern kya hai?',
    answer:
      'HPPSC HPAS (Administrative Service) exam teen charan mein hota hai: Prelims (2 papers — GS 200 marks + Aptitude 200 marks, objective), Mains (6 papers including Hindi, English, Essay, GS, Optional — descriptive, total 1400 marks), aur Interview (100 marks). HPAS se SDM, BDO, Tehsildar jaise posts milte hain. Naib Tehsildar alag se HPPSC ka popular exam hai with Prelims + Mains pattern.',
  },
  {
    question: 'HPSSC mein kaunse popular posts hain?',
    answer:
      'HPSSC ke popular posts: JOA IT (Junior Office Assistant - Information Technology), Clerk, Steno Typist, Junior Engineer (Civil/Electrical), Lab Assistant, Forest Guard, Patwari, Panchayat Secretary, Conductor, TGT/JBT Teacher, Fireman, Multi-Task Worker. HPSSC hamirpur se operate hota hai. CET (Common Eligibility Test) based selection kai posts ke liye hota hai.',
  },
  {
    question: 'HP mein government jobs ke liye age limit kya hai?',
    answer:
      'Himachal Pradesh mein age limits: HPPSC HPAS — 21-35 years (General), 38 years (OBC), 40 years (SC/ST). HP Police Constable — 18-25 years (General). HPSSC posts — 18-45 years (General) with HP domicile benefit. HP TET Teachers — per recruitment rules. HP provides one of the most generous upper age limits (45 years for HPSSC) among all states, especially for HP bonafide candidates.',
  },
  {
    question: 'How to apply for HP Police Constable?',
    answer:
      'HP Police Constable ki bharti HP Police Recruitment Board ke through hoti hai. Steps: 1) Visit hppolice.gov.in. 2) Apply online when notification is released. 3) Pay fee. Selection: Written Test (OMR based — GK, Hindi, English, Math, Reasoning) + Physical Measurement + Physical Efficiency Test + Document Verification. 12th pass required. HP bonafide certificate mandatory.',
  },
  {
    question: 'HPSSC JOA IT exam kaise hota hai?',
    answer:
      'HPSSC JOA IT (Junior Office Assistant - Information Technology) HP ka sabse popular Group C post hai. Eligibility: 12th pass + 1 year Computer Diploma from recognized institute. Written exam: 85 marks (GK, Hindi, English, Math, Computer Knowledge), Interview/Evaluation: 15 marks. Salary: Level 5 (Rs 20,200-64,000 + DA/HRA). JOA IT se data entry aur computer-related office work hota hai.',
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
        name: 'Himachal Pradesh Government Jobs',
        item: 'https://sarkarialert.online/himachal-pradesh-government-jobs',
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
    data = await getJobs({ state: 'himachal_pradesh', page: '1' });
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
      filterParams={{ state: 'himachal_pradesh' }}
    />
  );
}

export default function HimachalPradeshGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Himachal Pradesh Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              HP सरकारी नौकरी 2026 — HPPSC, HPSSC, HP Police भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Himachal Pradesh sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>HPPSC</strong> (HPAS, Naib Tehsildar, Allied Services), <strong>HPSSC</strong> (JOA IT, Clerk, JE, Lab Assistant),{' '}
            <strong>HP Police</strong> (Constable, SI), <strong>HP Board</strong> (HP TET Teachers),
            and other departments. HPSSC provides generous age relaxation up to 45 years for HP bonafide candidates,
            making it one of the most aspirant-friendly states for government job seekers.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां हिमाचल प्रदेश की सभी नवीनतम सरकारी नौकरियां देखें। HPPSC, HPSSC, HP Police,
            HP TET और अन्य सभी विभागों की भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — Himachal Pradesh Government Jobs
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
