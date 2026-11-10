import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Jharkhand Government Jobs 2026-27 — झारखंड सरकारी नौकरी | SarkariAlert',
  description:
    'Jharkhand Government Jobs 2026-27: Latest Jharkhand sarkari naukri for JPSC, JSSC, Jharkhand Police & more. Apply online for Jharkhand state government vacancies with eligibility, salary & last date.',
  keywords: [
    'jharkhand government jobs 2026',
    'jharkhand sarkari naukri',
    'jpsc vacancy 2026',
    'jssc bharti 2026',
    'jharkhand police vacancy',
    'jpsc combined exam',
    'jssc cgl exam 2026',
    'jharkhand police constable bharti',
    'jharkhand sarkari naukri 2026',
    'jharkhand state government jobs',
    'jpsc civil services 2026',
    'jssc clerk vacancy',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/jharkhand-government-jobs',
  },
  openGraph: {
    title: 'Jharkhand Government Jobs 2026-27 — झारखंड सरकारी नौकरी',
    description:
      'Find Jharkhand sarkari naukri 2026-27. JPSC, JSSC, Jharkhand Police & more vacancies in Jharkhand.',
    url: 'https://sarkarialert.online/jharkhand-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in Jharkhand?',
    answer:
      'The major recruitment bodies in Jharkhand are: JPSC (Jharkhand Public Service Commission) for Combined Civil Service exam (Deputy Collector, DSP, and other Group A/B posts), Assistant Professor, and other gazetted posts. JSSC (Jharkhand Staff Selection Commission) for CGL (Combined Graduate Level), Clerk, Stenographer, and other Group C posts. Jharkhand Police for Constable, SI, and other police posts. Jharkhand Education Department for teacher recruitment through JTET.',
  },
  {
    question: 'JPSC Combined Civil Service exam ka pattern kya hai?',
    answer:
      'JPSC Combined Civil Service exam teen stages mein hoti hai: Prelims (2 papers — General Studies I aur General Studies II/CSAT, objective type, 200-200 marks), Mains (6 papers — Hindi, English, Language, 3 GS papers — descriptive type), aur Interview. JPSC se Deputy Collector, DSP, District Education Officer, Planning Officer jaise prestigious posts milte hain. Jharkhand GK, tribal culture, aur state-specific questions bahut important hain.',
  },
  {
    question: 'JSSC CGL exam mein kya aata hai aur eligibility kya hai?',
    answer:
      'JSSC CGL (Combined Graduate Level) exam mein Paper 1 (General Studies — 120 questions, 360 marks) aur Paper 2 (concerned subject based on post) hota hai. General Studies mein Jharkhand GK, Indian History, Geography, Polity, Science, Current Affairs, Maths, aur Reasoning aate hain. Qualification: Graduation from recognized university. Age: 18-35 years (relaxation as per rules). JSSC CGL se Accountant, Auditor, Upper Division Clerk jaise posts milte hain.',
  },
  {
    question: 'Jharkhand Police bharti ka process kya hai?',
    answer:
      'Jharkhand Police Constable bharti mein Written Test (100 marks — GK, Hindi, Jharkhand GK, Maths, Reasoning), Physical Standard Test (height/chest — Height 160 cm male, 150 cm female), Physical Efficiency Test (running — 1600m in 6 min for males, 800m in 3 min 30 sec for females), aur Document Verification hota hai. 12th pass hona zaroori hai. Salary Rs 21,700 basic pay se start hoti hai. Jharkhand GK aur tribal knowledge pe special focus karein.',
  },
  {
    question: 'Jharkhand mein teacher ki naukri kaise milti hai?',
    answer:
      'Jharkhand mein teacher ki naukri ke liye JTET (Jharkhand Teacher Eligibility Test) qualify karna zaroori hai. Primary level (Class 1-5) ke liye JTET Paper 1 aur Upper Primary (Class 6-8) ke liye Paper 2 pass karna hota hai. JTET ke baad merit-based counseling hoti hai. Salary Rs 25,500 basic pay se start hoti hai. B.Ed/D.El.Ed qualification zaroori hai. JSSC bhi sometimes teacher recruitment conduct karta hai.',
  },
  {
    question: 'What are the upcoming Jharkhand government exams in 2026?',
    answer:
      'Upcoming Jharkhand government exams in 2026 include: JPSC Combined Civil Service Prelims & Mains, JSSC CGL, JSSC Clerk & Stenographer, Jharkhand Police Constable & SI bharti, JTET for teacher recruitment, JPSC Assistant Professor, Jharkhand Forest Guard, JSSC Excise Constable, Jharkhand JE recruitment, and various district-level vacancies. Check JPSC (jpsc.gov.in) and JSSC (jssc.nic.in) official websites regularly.',
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
        name: 'Jharkhand Government Jobs',
        item: 'https://sarkarialert.online/jharkhand-government-jobs',
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
    data = await getJobs({ state: 'jharkhand', page: '1' });
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
      filterParams={{ state: 'jharkhand' }}
    />
  );
}

export default function JharkhandGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Jharkhand Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              झारखंड सरकारी नौकरी 2026 — JPSC, JSSC, Jharkhand Police भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Jharkhand sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>JPSC</strong> (Combined Civil Service, Assistant Professor), <strong>JSSC</strong> (CGL, Clerk, Stenographer),{' '}
            <strong>Jharkhand Police</strong> (Constable, SI), and teacher recruitment through JTET.
            Jharkhand offers government job opportunities across education, police, revenue, mining, health, and administrative departments.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां झारखंड की सभी नवीनतम सरकारी नौकरियां देखें। JPSC, JSSC, Jharkhand Police
            और अन्य सभी विभागों की भर्ती अधिसूचनाएं एक जगह। JPSC Combined Exam, JSSC CGL, Jharkhand Police भर्ती अपडेट।
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
          Frequently Asked Questions — Jharkhand Government Jobs
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
