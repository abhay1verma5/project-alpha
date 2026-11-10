import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Karnataka Government Jobs 2026-27 — ಕರ್ನಾಟಕ ಸರ್ಕಾರಿ ಉದ್ಯೋಗ | SarkariAlert',
  description:
    'Karnataka Government Jobs 2026-27: Latest Karnataka sarkari naukri for KPSC, KSP, KEA & more. Apply online for Karnataka state government vacancies with eligibility, salary & last date.',
  keywords: [
    'karnataka government jobs 2026',
    'karnataka sarkari naukri',
    'kpsc vacancy 2026',
    'ksp police bharti 2026',
    'kea recruitment 2026',
    'kpsc kas exam',
    'karnataka fda sda exam',
    'ksp police constable vacancy',
    'karnataka sarkari naukri 2026',
    'karnataka state government jobs',
    'kpsc gazetted probationers 2026',
    'karnataka police si bharti',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/karnataka-government-jobs',
  },
  openGraph: {
    title: 'Karnataka Government Jobs 2026-27 — ಕರ್ನಾಟಕ ಸರ್ಕಾರಿ ಉದ್ಯೋಗ',
    description:
      'Find Karnataka sarkari naukri 2026-27. KPSC, KSP, KEA & more vacancies in Karnataka.',
    url: 'https://sarkarialert.online/karnataka-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in Karnataka?',
    answer:
      'The major recruitment bodies in Karnataka are: KPSC (Karnataka Public Service Commission) for KAS (Karnataka Administrative Service), Group A, B, and C posts including Gazetted Probationers, FDA, SDA, and other administrative posts. KSP (Karnataka State Police) for Constable, SI, PSI, and other police posts. KEA (Karnataka Examinations Authority) for engineering, medical, and other professional course admissions as well as some recruitment exams. Karnataka Education Department for teacher recruitment.',
  },
  {
    question: 'KPSC KAS exam ka pattern kya hota hai?',
    answer:
      'KPSC KAS (Karnataka Administrative Service) exam teen stages mein hoti hai: Prelims (2 papers — General Studies aur General Studies II/CSAT, objective type), Mains (descriptive papers including Kannada/English, Essay, 2 GS papers, aur 2 optional subject papers), aur Personality Test (Interview). KAS se Deputy Commissioner, Assistant Commissioner, Tahsildar, DSP jaise prestigious posts milte hain. Karnataka GK aur Kannada language knowledge bahut important hai.',
  },
  {
    question: 'How to prepare for Karnataka Police (KSP) recruitment?',
    answer:
      'Karnataka State Police (KSP) Constable/PSI bharti mein Written Exam (Objective type — General Knowledge, Current Affairs, Kannada/English, Maths, Science), Physical Standard Test (height/weight), Endurance Test (running, long jump, shot put), and Document Verification hota hai. For Civil Police Constable: 12th pass. For PSI: Degree required. Physical standards: Height — 168 cm (male), 157 cm (female). Focus on Karnataka GK, Indian History, Polity, and Kannada language.',
  },
  {
    question: 'Karnataka FDA/SDA exam kya hai aur salary kitni hai?',
    answer:
      'KPSC FDA (First Division Assistant) aur SDA (Second Division Assistant) exams clerical cadre posts ke liye hote hain. FDA ke liye Degree chahiye aur SDA ke liye 12th pass. Exam objective type hota hai — General Knowledge, English, Kannada, Maths, Computer. FDA salary Rs 27,650 basic pay se start hoti hai aur SDA salary Rs 21,400 basic pay se. Allowances ke saath FDA ki gross salary Rs 35,000-45,000 aur SDA ki Rs 28,000-35,000 per month hoti hai.',
  },
  {
    question: 'KEA through kaunsi government jobs milti hain?',
    answer:
      'KEA (Karnataka Examinations Authority) primarily engineering aur medical college admissions ke liye exams conduct karta hai (CET), lekin kuch government recruitment exams bhi conduct karta hai jaise Hyderabad-Karnataka Reservation posts, Junior Engineer, aur other technical posts. KEA ki official website kea.kar.nic.in pe regular updates check karein. Most Karnataka government jobs KPSC aur KSP ke through hi bharti hoti hain.',
  },
  {
    question: 'What are the upcoming Karnataka government exams in 2026?',
    answer:
      'Upcoming Karnataka government exams in 2026 include: KPSC KAS Prelims & Mains, KPSC Gazetted Probationers exam, KPSC FDA/SDA recruitment, KSP Civil Police Constable & PSI bharti, Karnataka TET for teacher recruitment, KEA CET, Karnataka Forest Department recruitment, KPSC Junior Engineer exam, and various departmental exams. Check KPSC official website kpsc.kar.nic.in and KSP website regularly for latest notifications.',
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
        name: 'Karnataka Government Jobs',
        item: 'https://sarkarialert.online/karnataka-government-jobs',
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
    data = await getJobs({ state: 'karnataka', page: '1' });
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
      filterParams={{ state: 'karnataka' }}
    />
  );
}

export default function KarnatakaGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center shadow-lg shadow-yellow-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Karnataka Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              ಕರ್ನಾಟಕ ಸರ್ಕಾರಿ ಉದ್ಯೋಗ 2026 — KPSC, KSP, KEA ನೇಮಕಾತಿ
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Karnataka sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>KPSC</strong> (KAS, Gazetted Probationers, FDA, SDA), <strong>KSP</strong> (Constable, PSI, SI),{' '}
            and <strong>KEA</strong> recruitment. Karnataka offers excellent government job opportunities across
            education, police, revenue, health, and administrative departments.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            ಇಲ್ಲಿ ಕರ್ನಾಟಕದ ಎಲ್ಲಾ ಇತ್ತೀಚಿನ ಸರ್ಕಾರಿ ಉದ್ಯೋಗಗಳನ್ನು ನೋಡಿ. KPSC, KSP, KEA
            ಮತ್ತು ಇತರ ಎಲ್ಲಾ ಇಲಾಖೆಗಳ ನೇಮಕಾತಿ ಅಧಿಸೂಚನೆಗಳು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ. KPSC KAS, Karnataka Police, FDA/SDA ನೇಮಕಾತಿ ಅಪ್‌ಡೇಟ್.
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
          Frequently Asked Questions — Karnataka Government Jobs
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
