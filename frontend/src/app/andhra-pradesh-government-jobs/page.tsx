import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Andhra Pradesh Government Jobs 2026-27 — AP సర్కారీ ఉద్యోగాలు | SarkariAlert',
  description:
    'Andhra Pradesh Government Jobs 2026-27: Latest AP sarkari naukri for APPSC, AP Police, AP TET, APGENCO, Grama Sachivalayam & more. Apply online for AP state government vacancies with eligibility, salary & last date.',
  keywords: [
    'andhra pradesh government jobs 2026',
    'ap sarkari naukri',
    'appsc group 1 2026',
    'appsc group 2 vacancy',
    'ap police constable bharti',
    'ap tet 2026',
    'grama sachivalayam jobs',
    'ap village secretariat jobs',
    'ap ward secretariat jobs',
    'apgenco recruitment',
    'ap dsc teacher recruitment',
    'ap government jobs latest',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/andhra-pradesh-government-jobs',
  },
  openGraph: {
    title: 'Andhra Pradesh Government Jobs 2026-27 — AP సర్కారీ ఉద్యోగాలు',
    description:
      'Find AP sarkari naukri 2026-27. APPSC, AP Police, AP TET, Grama Sachivalayam & more vacancies in Andhra Pradesh.',
    url: 'https://sarkarialert.online/andhra-pradesh-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in Andhra Pradesh?',
    answer:
      'The major recruitment bodies in AP are: APPSC (Andhra Pradesh Public Service Commission) for Group 1, 2, 3 services and other gazetted posts. AP Police Recruitment Board for Constable, SI and other police posts. AP DSC (District Selection Committee) for teacher recruitment. APGENCO/APTRANSCO for power sector jobs. Grama/Ward Sachivalayam for village/ward level posts. AP Medical & Health Department for medical staff recruitment.',
  },
  {
    question: 'APPSC Group 1 exam ka pattern kya hai?',
    answer:
      'APPSC Group 1 exam teen charan mein hota hai: Prelims (150 questions, 150 marks, General Studies & Mental Ability), Mains (descriptive papers including GS, Indian & AP History, Economy, Constitution), aur Interview. Group 1 se District Collector, SP, DSP, RDO, Deputy Commissioner jaise Class-A posts milte hain. Group 2 se MRO, Municipal Commissioner, Excise SI milte hain.',
  },
  {
    question: 'How to apply for AP Police Constable vacancy?',
    answer:
      'AP Police Constable vacancy AP State Level Police Recruitment Board (SLPRB) ke through nikalti hai. Process: 1) Visit slprb.ap.gov.in when notification is released. 2) Register and fill online application. 3) Pay fee (Rs 300 General, Rs 150 BC, free for SC/ST). Selection: Preliminary Written Test + Physical Measurement Test (PMT) + Physical Efficiency Test (PET) + Final Written Examination.',
  },
  {
    question: 'AP Grama Sachivalayam mein kaunse posts hote hain?',
    answer:
      'AP Grama Sachivalayam mein multiple posts hote hain: Village Revenue Officer (VRO), Village Surveyor, Panchayat Secretary (Grade V), Village Agriculture Assistant, Animal Husbandry Assistant, Village Fisheries Assistant, Village Horticulture Assistant, Engineering Assistant, Village Revenue Officer, Digital Assistant, Mahila Police, ANM/Health Assistant. Ward Sachivalayam mein bhi similar posts hote hain urban areas ke liye.',
  },
  {
    question: 'What is the age limit for AP government jobs?',
    answer:
      'Age limits for AP government jobs: APPSC Group 1 — 18-42 years (General), with standard relaxation of 5 years for SC/ST/BC, 10 years for PwD. AP Police Constable — 18-22 years (General). AP DSC Teachers — 18-44 years. Grama Sachivalayam — 18-42 years. AP generally provides one of the most generous age limits among Indian states, especially for Group services.',
  },
  {
    question: 'AP DSC teacher recruitment kaise hoti hai?',
    answer:
      'AP DSC (District Selection Committee) se teachers ki bharti hoti hai. Categories: SGT (School Assistant/Secondary Grade Teacher) for Class 1-5, SA (School Assistant) for Class 6-10, LP (Language Pandit), PET, craft teachers. Eligibility: B.Ed/D.El.Ed required. AP TET pass mandatory. Selection: Written exam (content + methodology). Salary: SGT Level 8 (Rs 28,940-78,910), SA Level 11 (Rs 37,100-91,450).',
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
        name: 'Andhra Pradesh Government Jobs',
        item: 'https://sarkarialert.online/andhra-pradesh-government-jobs',
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
    data = await getJobs({ state: 'andhra_pradesh', page: '1' });
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
      filterParams={{ state: 'andhra_pradesh' }}
    />
  );
}

export default function AndhraPradeshGovernmentJobsPage() {
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
              Andhra Pradesh Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              AP సర్కారీ ఉద్యోగాలు 2026 — APPSC, AP Police, Grama Sachivalayam భర్తీ
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Andhra Pradesh sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>APPSC</strong> (Group 1, 2, 3 Services), <strong>AP Police</strong> (Constable, SI),{' '}
            <strong>AP DSC</strong> (Teacher Recruitment), <strong>Grama Sachivalayam</strong> (Village Secretary, VRO),
            <strong> APGENCO/APTRANSCO</strong> (Power Sector), and other departments. AP offers generous age relaxation
            and regular large-scale recruitments through Grama/Ward Sachivalayam.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            ఇక్కడ ఆంధ్రప్రదేశ్ తాజా ప్రభుత్వ ఉద్యోగాలు చూడండి. APPSC, AP పోలీస్, AP DSC, గ్రామ సచివాలయం
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
          Frequently Asked Questions — AP Government Jobs
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
