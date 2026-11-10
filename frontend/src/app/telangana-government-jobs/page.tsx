import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Telangana Government Jobs 2026-27 — తెలంగాణ సర్కారీ ఉద్యోగాలు | SarkariAlert',
  description:
    'Telangana Government Jobs 2026-27: Latest TS sarkari naukri for TSPSC, TS Police, TS TET/DSC, TSSPDCL, TSNPDCL & more. Apply online for Telangana state government vacancies with eligibility, salary & last date.',
  keywords: [
    'telangana government jobs 2026',
    'ts sarkari naukri',
    'tspsc group 1 2026',
    'tspsc group 2 vacancy',
    'ts police constable bharti',
    'ts tet dsc 2026',
    'telangana teacher recruitment',
    'tsspdcl recruitment',
    'ts vro vra jobs',
    'tspsc group 4 vacancy',
    'telangana state government jobs',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/telangana-government-jobs',
  },
  openGraph: {
    title: 'Telangana Government Jobs 2026-27 — తెలంగాణ సర్కారీ ఉద్యోగాలు',
    description:
      'Find Telangana sarkari naukri 2026-27. TSPSC, TS Police, TS TET/DSC & more vacancies in Telangana.',
    url: 'https://sarkarialert.online/telangana-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in Telangana?',
    answer:
      'The major recruitment bodies in Telangana are: TSPSC (Telangana State Public Service Commission) for Group 1, 2, 3, 4 services. TS Police Recruitment Board (TSLPRB) for Constable, SI, ASI posts. TS DSC (District Selection Committee) for teacher recruitment. TSSPDCL/TSNPDCL for power sector jobs. TSGENCO for power generation posts. Mission Bhagiratha, Kaleshwaram, and other state projects also recruit regularly.',
  },
  {
    question: 'TSPSC Group 1 exam ka pattern kya hai?',
    answer:
      'TSPSC Group 1 exam teen charan mein hota hai: Prelims (150 questions, 150 marks, General Studies & Mental Ability), Mains (6 descriptive papers including GS, History, Polity, Economy, Telangana Movement & State Formation), aur Interview. Group 1 se District Collector, SP, DSP, RDO, Municipal Commissioner jaise Class-A posts milte hain. Yeh Telangana ka sabse prestigious state exam hai.',
  },
  {
    question: 'How to apply for TS Police Constable vacancy?',
    answer:
      'TS Police Constable vacancy TSLPRB (Telangana State Level Police Recruitment Board) ke through nikalti hai. Process: 1) Visit tslprb.in when notification is out. 2) Register with mobile/email. 3) Fill application with personal/educational details. 4) Upload photo & signature. 5) Pay fee online. Selection: Preliminary Written Test (200 marks) + Physical Measurement Test + Physical Efficiency Test + Final Written Test.',
  },
  {
    question: 'Telangana mein government jobs ke liye age limit kya hai?',
    answer:
      'Telangana mein age limits: TSPSC Group 1 — 18-44 years (General), with 5 years relaxation for SC/ST/BC. TS Police Constable — 18-22 years (General), 23 years (BC), 25 years (SC/ST). TSPSC Group 2/3 — 18-44 years. TS DSC Teachers — 18-44 years. Group 4 — 18-44 years. Telangana provides one of the highest upper age limits for Group services in India.',
  },
  {
    question: 'TS DSC teacher recruitment kaise hoti hai?',
    answer:
      'TS DSC se Telangana mein teachers ki bharti hoti hai. Posts: SGT (Secondary Grade Teacher), SA (School Assistant), LP (Language Pandit), PET, Special Education teachers. TS TET pass hona mandatory hai. Written exam + certificate verification. SGT salary Level 7 (Rs 28,940+), SA salary Level 11 (Rs 37,100+). TS DSC notifications Telangana DSC official website par aati hain.',
  },
  {
    question: 'TSPSC Group 4 mein kaunse posts aate hain?',
    answer:
      'TSPSC Group 4 mein entry-level posts aate hain: Junior Assistant, Typist, Steno, Bill Collector, Field Assistant, Lab Attendant, Forest Beat Officer. Minimum qualification 10th/Inter/Degree (post-wise). Age: 18-44 years. Written exam based selection. Salary: Level 1-6 (Rs 15,000-35,000+ with allowances). Group 4 ka exam bahut competitive hota hai kyunki vacancies zyada hoti hain.',
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
        name: 'Telangana Government Jobs',
        item: 'https://sarkarialert.online/telangana-government-jobs',
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
    data = await getJobs({ state: 'telangana', page: '1' });
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
      filterParams={{ state: 'telangana' }}
    />
  );
}

export default function TelanganaGovernmentJobsPage() {
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
              Telangana Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              తెలంగాణ సర్కారీ ఉద్యోగాలు 2026 — TSPSC, TS Police, TS DSC భర్తీ
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Telangana sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>TSPSC</strong> (Group 1, 2, 3, 4 Services), <strong>TS Police</strong> (Constable, SI),{' '}
            <strong>TS DSC</strong> (Teacher Recruitment), <strong>TSSPDCL/TSNPDCL</strong> (Power Sector),
            and other departments. Telangana offers one of the highest upper age limits (44 years) for Group services,
            making it aspirant-friendly for experienced candidates.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            ఇక్కడ తెలంగాణ తాజా ప్రభుత్వ ఉద్యోగాలు చూడండి. TSPSC, TS పోలీస్, TS DSC, TSSPDCL
            మరియు అన్ని విభాగాల నియామక నోటిఫికేషన్లు ఒకే చోట.
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
          Frequently Asked Questions — Telangana Government Jobs
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
