import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gujarat Government Jobs 2026-27 — ગુજરાત સરકારી નોકરી | SarkariAlert',
  description:
    'Gujarat Government Jobs 2026-27: Latest Gujarat sarkari naukri for GPSC, GSSSB, Gujarat Police, Talati & more. Apply online for Gujarat state government vacancies with eligibility, salary & last date.',
  keywords: [
    'gujarat government jobs 2026',
    'gujarat sarkari naukri',
    'gpsc vacancy 2026',
    'gsssb bharti 2026',
    'gujarat police vacancy',
    'talati bharti 2026',
    'gpsc class 1 2 3 exam',
    'gsssb clerk vacancy',
    'gujarat sarkari naukri 2026',
    'gujarat state government jobs',
    'gpsc deputy collector 2026',
    'gujarat police constable bharti',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/gujarat-government-jobs',
  },
  openGraph: {
    title: 'Gujarat Government Jobs 2026-27 — ગુજરાત સરકારી નોકરી',
    description:
      'Find Gujarat sarkari naukri 2026-27. GPSC, GSSSB, Gujarat Police, Talati & more vacancies in Gujarat.',
    url: 'https://sarkarialert.online/gujarat-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in Gujarat?',
    answer:
      'The major recruitment bodies in Gujarat are: GPSC (Gujarat Public Service Commission) for Class 1, 2, and 3 posts including Deputy Collector, Deputy SP, Mamlatdar, and Section Officer. GSSSB (Gujarat Subordinate Service Selection Board) for Clerk, Talati, Head Clerk, and other Group C posts. Gujarat Police for Constable, SI, PSI (Lokrakshak) recruitment. Panchayat Service Selection Board for Talati cum Mantri and Junior Clerk posts.',
  },
  {
    question: 'GPSC Class 1/2/3 exam ka pattern kya hai?',
    answer:
      'GPSC Class 1/2 exam do stages mein hota hai: Prelims (2 papers — GS aur CSAT, objective type, 200-200 marks) aur Mains (descriptive papers including Gujarati, English, Essay, GS papers, aur optional subject). GPSC Class 3 ke liye ek hi exam hota hai — objective type. Class 1/2 se Deputy Collector, DSP, Mamlatdar milta hai. Class 3 se Section Officer, Inspector jaise posts milte hain. Gujarat GK bahut important hai.',
  },
  {
    question: 'How to prepare for Gujarat Police (Lokrakshak) bharti?',
    answer:
      'Gujarat Police Lokrakshak (Constable) bharti mein Written Test (100 marks — General Knowledge, Gujarat GK, Maths, Reasoning, Gujarati/Hindi/English), Physical Test (running, long jump, shot put), aur Document Verification hota hai. Physical standards: Height — 165 cm (male), 155 cm (female). Running — 1600m for males, 800m for females. Gujarat GK, current affairs, aur basic maths pe focus karein. 12th pass hona zaroori hai.',
  },
  {
    question: 'Talati cum Mantri exam kaisa hota hai aur salary kitni hai?',
    answer:
      'Talati cum Mantri ki bharti Panchayat Service Selection Board karti hai. Exam objective type hota hai — 100 marks (Gujarati, English, General Knowledge, Maths, Computer). Qualification: Graduate with CCC/CCC+ computer certificate. Salary Pay Level 2 (Rs 19,900 - Rs 63,200) ke saath allowances. Gross salary lagbhag Rs 25,000 - 35,000 per month hoti hai. Talati ka kaam panchayat level pe revenue aur administrative work hai.',
  },
  {
    question: 'Gujarat mein GSSSB Clerk ki bharti kab hoti hai?',
    answer:
      'GSSSB Clerk (Bin Sachivalay Clerk) ki bharti har 2-3 saal mein hoti hai. Exam mein Gujarati Language, English Language, General Knowledge, aur Computer Knowledge se questions aate hain (200 marks, 2 hours). Qualification: Graduate with CCC computer certificate. Salary Rs 19,900 basic pay se start hoti hai. Selection written exam marks ke basis pe hota hai. GSSSB ki official website ojas.gujarat.gov.in pe notifications check karein.',
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
        name: 'Gujarat Government Jobs',
        item: 'https://sarkarialert.online/gujarat-government-jobs',
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
    data = await getJobs({ state: 'gujarat', page: '1' });
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
      filterParams={{ state: 'gujarat' }}
    />
  );
}

export default function GujaratGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Gujarat Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              ગુજરાત સરકારી નોકરી 2026 — GPSC, GSSSB, Gujarat Police ભરતી
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Gujarat sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>GPSC</strong> (Class 1/2/3, Deputy Collector, DSP), <strong>GSSSB</strong> (Clerk, Head Clerk, Surveyor),{' '}
            <strong>Gujarat Police</strong> (Lokrakshak, PSI, ASI), and <strong>Talati</strong> cum Mantri recruitment.
            Gujarat offers numerous government job opportunities across education, police, revenue, health, and administrative departments.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            અહીં ગુજરાતની તમામ નવીનતમ સરકારી નોકરીઓ જુઓ। GPSC, GSSSB, Gujarat Police, Talati
            અને અન્ય તમામ વિભાગોની ભરતી સૂચનાઓ એક જગ્યાએ। GPSC Class 1/2/3, Gujarat Police, Bin Sachivalay Clerk ભરતી અપડેટ।
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
          Frequently Asked Questions — Gujarat Government Jobs
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
