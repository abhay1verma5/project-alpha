import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Maharashtra Government Jobs 2026-27 — महाराष्ट्र सरकारी नौकरी | SarkariAlert',
  description:
    'Maharashtra Government Jobs 2026-27: Latest Maharashtra sarkari naukri for MPSC, Maharashtra Police, Talathi, ZP Bharti, Mega Bharti & more. Apply online for Maharashtra state government vacancies with eligibility, salary & last date.',
  keywords: [
    'maharashtra government jobs 2026',
    'maharashtra sarkari naukri',
    'mpsc vacancy 2026',
    'maharashtra police bharti 2026',
    'talathi bharti 2026',
    'zp bharti maharashtra',
    'mpsc state service exam',
    'maharashtra mega bharti',
    'maharashtra teacher bharti',
    'maharashtra state government jobs',
    'mpsc rajyaseva 2026',
    'maharashtra arogya vibhag bharti',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/maharashtra-government-jobs',
  },
  openGraph: {
    title: 'Maharashtra Government Jobs 2026-27 — महाराष्ट्र सरकारी नौकरी',
    description:
      'Find Maharashtra sarkari naukri 2026-27. MPSC, Maharashtra Police, Talathi, ZP Bharti & more vacancies in Maharashtra.',
    url: 'https://sarkarialert.online/maharashtra-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in Maharashtra?',
    answer:
      'The major recruitment bodies in Maharashtra are: MPSC (Maharashtra Public Service Commission) for Rajyaseva (State Service), PSI, STI, ASO, and other Group A/B/C posts. Maharashtra Police for Constable, SI, and other police posts. Zilla Parishad (ZP) for Talathi, Gram Sevak, Health Worker, and other district-level posts. Maharashtra Arogya Vibhag (Health Department) for medical officers, nurses, and health workers. MAHA TET for teacher recruitment. Maharashtra Mega Bharti for mass recruitment drives.',
  },
  {
    question: 'MPSC Rajyaseva exam ka pattern kya hai?',
    answer:
      'MPSC Rajyaseva (State Service) exam teen charan mein hota hai: Prelims (2 papers — General Studies 200 marks + CSAT 200 marks, objective type), Mains (6 papers — Marathi & English qualifying, 4 GS papers + Essay, descriptive type), aur Interview (personality test, 100 marks). MPSC Rajyaseva se Deputy Collector, DSP, Tahsildar, BDO, Naib Tahsildar jaise Group A/B posts milte hain. MPSC combined exam se PSI, STI, ASO posts bhi milte hain.',
  },
  {
    question: 'How to apply for Maharashtra Talathi Bharti?',
    answer:
      'Maharashtra Talathi Bharti district-wise (Zilla Parishad) ke through nikalti hai. Apply process: 1) Visit the respective district ZP website or mahabhumi.gov.in when notification is released. 2) Register online. 3) Fill application form with personal and educational details. 4) Upload photo, signature, and required documents. 5) Pay application fee online. Eligibility: Graduation + Marathi typing knowledge + basic computer knowledge. Selection: Written Exam + Skill Test (Marathi Typing) + Document Verification.',
  },
  {
    question: 'What is Maharashtra Mega Bharti?',
    answer:
      'Maharashtra Mega Bharti is a large-scale mass recruitment drive conducted by the Maharashtra state government to fill thousands of vacancies across multiple departments simultaneously. Recent Mega Bhartis have been for Health Department (Group D staff, nurses, medical officers), Education Department (teachers, Shikshan Sevak), Revenue Department (Talathi, Clerk), and Police Department (Constable). These drives aim to fill backlogs and pending vacancies quickly. The process includes online application, written exam, and document verification.',
  },
  {
    question: 'Maharashtra Police bharti mein physical test kya hota hai?',
    answer:
      'Maharashtra Police bharti mein physical test: Males — 1600m running in 6 minutes 30 seconds, Long Jump 3.80m, Shot Put (7.26 kg) 5.60m, Pull-ups 6. Females — 800m running in 3 minutes 30 seconds, Long Jump 2.50m, Shot Put (4 kg) 3.50m. Height requirement: Male 165cm (Open), 163cm (Reserved), Female 155cm (Open), 153cm (Reserved). Chest (Male): 79cm (unexpanded), 84cm (expanded). Physical test ke baad written exam hota hai.',
  },
  {
    question: 'Maharashtra mein sarkari naukri ke liye kaunse important exams hain?',
    answer:
      'Maharashtra ke important sarkari exams: MPSC Rajyaseva (Deputy Collector, DSP), MPSC Combined (PSI, STI, ASO), MPSC Engineering Services, MAHA TET (Teacher Eligibility Test), Maharashtra Police Constable & SI bharti, Talathi Bharti (ZP), Maharashtra Arogya Vibhag bharti, MSRTC (Bus conductor/driver), PWD Junior Engineer, Maharashtra Forest Guard, aur various Mega Bharti drives. MPSC ki official website mahampsc.mahaonline.gov.in par regularly check karein.',
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
        name: 'Maharashtra Government Jobs',
        item: 'https://sarkarialert.online/maharashtra-government-jobs',
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
    data = await getJobs({ state: 'maharashtra', page: '1' });
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
      filterParams={{ state: 'maharashtra' }}
    />
  );
}

export default function MaharashtraGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Maharashtra Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              महाराष्ट्र सरकारी नौकरी 2026 — MPSC, Maharashtra Police, Talathi, ZP भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Maharashtra sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>MPSC</strong> (Rajyaseva, PSI/STI/ASO Combined), <strong>Maharashtra Police</strong> (Constable, SI),{' '}
            <strong>Talathi Bharti</strong> (Zilla Parishad), <strong>ZP Bharti</strong> (Gram Sevak, Health Worker),
            and <strong>Mega Bharti</strong> drives across health, education, and revenue departments.
            Maharashtra is one of the largest employers in the government sector with regular
            mass recruitment drives covering thousands of vacancies.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां महाराष्ट्र की सभी नवीनतम सरकारी नौकरियां देखें। MPSC, Maharashtra Police, तलाठी, ZP भर्ती,
            मेगा भर्ती और अन्य सभी विभागों की भर्ती अधिसूचनाएं एक जगह। राज्यसेवा, PSI, कांस्टेबल भर्ती अपडेट।
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
          Frequently Asked Questions — Maharashtra Government Jobs
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
