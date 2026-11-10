import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Haryana Government Jobs 2026-27 — हरियाणा सरकारी नौकरी | SarkariAlert',
  description:
    'Haryana Government Jobs 2026-27: Latest Haryana sarkari naukri for HSSC, HPSC, Haryana Police, Haryana Patwari, CET & more. Apply online for Haryana state government vacancies with eligibility, salary & last date.',
  keywords: [
    'haryana government jobs 2026',
    'haryana sarkari naukri',
    'hssc vacancy 2026',
    'hpsc bharti 2026',
    'haryana police vacancy',
    'haryana patwari bharti',
    'hssc cet vacancy',
    'haryana teacher bharti',
    'haryana constable vacancy',
    'haryana state government jobs',
    'hpsc hcs 2026',
    'hssc group d bharti',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/haryana-government-jobs',
  },
  openGraph: {
    title: 'Haryana Government Jobs 2026-27 — हरियाणा सरकारी नौकरी',
    description:
      'Find Haryana sarkari naukri 2026-27. HSSC, HPSC, Haryana Police, Haryana Patwari & more vacancies in Haryana.',
    url: 'https://sarkarialert.online/haryana-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in Haryana?',
    answer:
      'The major recruitment bodies in Haryana are: HSSC (Haryana Staff Selection Commission) for Group C & D posts like Clerk, Patwari, Canal Patwari, Gram Sachiv, and various technical posts through CET. HPSC (Haryana Public Service Commission) for HCS (Haryana Civil Service), HCS Judicial, DSP, ETO, Tehsildar, Naib Tehsildar, and other Group A/B posts. Haryana Police for Constable, SI, and other police posts. Haryana Education Department for TGT/PGT teacher recruitment.',
  },
  {
    question: 'HSSC CET kya hai aur kaise apply karein?',
    answer:
      'HSSC CET (Common Eligibility Test) Haryana mein Group C aur D posts ke liye ek common qualifying exam hai. CET do levels mein hota hai: Graduate Level CET aur 10+2 Level CET. CET qualify karne ke baad specific posts ke liye alag se apply karna hota hai. Apply process: hssc.gov.in par jaayein, register karein, form bharein, photo/signature upload karein, aur fee pay karein. CET score 3 saal tak valid rehta hai. CET mein GK, Reasoning, Math, Hindi, English, aur Computer Knowledge ke questions aate hain.',
  },
  {
    question: 'How to prepare for HPSC HCS exam?',
    answer:
      'HPSC HCS (Haryana Civil Service) exam has three stages: Prelims (2 papers — General Studies 100 questions + CSAT 100 questions, objective type), Mains (7 papers including Hindi, English, Essay, 4 GS papers — descriptive), and Interview (275 marks). For preparation: Focus on Haryana GK (history, geography, culture, current affairs), Indian polity, economy, and general science. NCERT books for basics, standard reference books for advanced topics. Previous year papers are crucial. HCS provides posts like SDM, DETC, DSP, BDO, Tehsildar.',
  },
  {
    question: 'What is the salary for Haryana Police Constable?',
    answer:
      'Haryana Police Constable gets Pay Level 3 (Rs 21,700 - Rs 69,100 basic pay) as per 7th Pay Commission. With allowances (DA, HRA, uniform, risk allowance, etc.), the gross salary is approximately Rs 30,000 - 40,000 per month. Haryana offers one of the better salary packages for constables among Indian states. Haryana Police SI (Sub Inspector) gets Pay Level 6 (Rs 35,400 - Rs 1,12,400 basic), with gross salary of Rs 50,000 - 60,000 per month.',
  },
  {
    question: 'Haryana mein Patwari ki bharti kaise hoti hai?',
    answer:
      'Haryana Patwari bharti HSSC ke through hoti hai. Pehle HSSC CET (Graduate Level) qualify karna zaroori hai. Uske baad Patwari post ke liye alag se apply karna hota hai. Eligibility: Graduation + Revenue Patwari ka basic computer knowledge. Selection: CET score + CBT (Computer Based Test specific to Patwari) + Document Verification. Patwari ki salary Rs 25,000-35,000 per month hoti hai. Kaam land records maintain karna, revenue collection mein sahayata, aur field survey hota hai.',
  },
  {
    question: 'What are the upcoming Haryana government exams in 2026?',
    answer:
      'Upcoming Haryana government exams in 2026: HSSC CET (Graduate Level & 10+2 Level), HPSC HCS Prelims & Mains, Haryana Police Constable & SI recruitment, HSSC Patwari, HSSC Canal Patwari, HSSC Gram Sachiv, Haryana TGT/PGT teacher recruitment, HSSC Clerk, HSSC Group D, HPSC Civil Judge, and various departmental exams. Check hssc.gov.in and hpsc.gov.in regularly for latest notifications and exam dates.',
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
        name: 'Haryana Government Jobs',
        item: 'https://sarkarialert.online/haryana-government-jobs',
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
    data = await getJobs({ state: 'haryana', page: '1' });
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
      filterParams={{ state: 'haryana' }}
    />
  );
}

export default function HaryanaGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Haryana Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              हरियाणा सरकारी नौकरी 2026 — HSSC, HPSC, Haryana Police भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Haryana sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>HSSC</strong> (CET-based recruitment for Patwari, Clerk, Canal Patwari, Gram Sachiv), <strong>HPSC</strong> (HCS, DSP, Tehsildar, Naib Tehsildar),{' '}
            <strong>Haryana Police</strong> (Constable, SI), <strong>Haryana Patwari</strong>,
            and <strong>Haryana TGT/PGT</strong> teacher recruitment. Haryana has adopted the CET (Common Eligibility Test)
            system through HSSC for streamlined Group C & D recruitment.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां हरियाणा की सभी नवीनतम सरकारी नौकरियां देखें। HSSC, HPSC, Haryana Police, पटवारी
            और अन्य सभी विभागों की भर्ती अधिसूचनाएं एक जगह। HCS, कांस्टेबल, शिक्षक भर्ती अपडेट।
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
          Frequently Asked Questions — Haryana Government Jobs
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
