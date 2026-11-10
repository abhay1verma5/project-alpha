import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Chhattisgarh Government Jobs 2026-27 — छत्तीसगढ़ सरकारी नौकरी | SarkariAlert',
  description:
    'Chhattisgarh Government Jobs 2026-27: Latest CG sarkari naukri for CGPSC, CG Vyapam (CGPEB), CG Police & more. Apply online for Chhattisgarh state government vacancies with eligibility, salary & last date.',
  keywords: [
    'chhattisgarh government jobs 2026',
    'cg sarkari naukri',
    'cgpsc vacancy 2026',
    'cg vyapam bharti 2026',
    'cg police vacancy',
    'cgpsc state service exam',
    'cgpeb recruitment 2026',
    'cg police constable bharti',
    'chhattisgarh sarkari naukri 2026',
    'chhattisgarh state government jobs',
    'cgpsc civil services 2026',
    'cg vyapam patwari bharti',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/chhattisgarh-government-jobs',
  },
  openGraph: {
    title: 'Chhattisgarh Government Jobs 2026-27 — छत्तीसगढ़ सरकारी नौकरी',
    description:
      'Find Chhattisgarh sarkari naukri 2026-27. CGPSC, CG Vyapam (CGPEB), CG Police & more vacancies in Chhattisgarh.',
    url: 'https://sarkarialert.online/chhattisgarh-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in Chhattisgarh?',
    answer:
      'The major recruitment bodies in Chhattisgarh are: CGPSC (Chhattisgarh Public Service Commission) for State Service Exam (Deputy Collector, DSP, and other Group A/B posts), Assistant Professor, and other gazetted posts. CG Vyapam / CGPEB (Chhattisgarh Professional Examination Board) for Patwari, RI (Revenue Inspector), TET, Sub Engineer, Food Inspector, and other Group C posts. CG Police for Constable, SI, and other police positions. CG Education Department for teacher recruitment.',
  },
  {
    question: 'CGPSC State Service exam ka pattern kya hai?',
    answer:
      'CGPSC State Service exam teen stages mein hoti hai: Prelims (2 papers — General Studies aur Aptitude Test, objective type, 200-200 marks), Mains (7 descriptive papers including Hindi, English, Essay, CG History/Geography/Culture, Indian Constitution, Indian Economy, Science & Tech, Philosophy/Sociology), aur Interview (75 marks). CGPSC se Deputy Collector, DSP, Naib Tehsildar, BDO jaise prestigious posts milte hain. CG ka state-specific GK bahut important hai.',
  },
  {
    question: 'CG Vyapam (CGPEB) se kaunsi government jobs milti hain?',
    answer:
      'CG Vyapam (ab CGPEB — Chhattisgarh Professional Examination Board) bahut saari Group C posts ke liye exam conduct karta hai: Patwari, Revenue Inspector (RI), Sub Engineer, Food Inspector, Assistant Grade III, DEO (Data Entry Operator), Lab Technician, Staff Nurse, Pharmacist, Forest Guard, TET (Teacher Eligibility Test), B.Ed entrance, aur other posts. CGPEB ki website vyapam.cgstate.gov.in pe regular notifications aate hain.',
  },
  {
    question: 'CG Police bharti ka process kya hai?',
    answer:
      'CG Police Constable bharti mein Written Exam (100 marks — GK, Hindi, CG GK, Maths, Reasoning, Computer), Physical Standard Test (Height — 168 cm male, 158 cm female for general), Physical Efficiency Test (running — 1600m in 5 min for males, 800m in 3 min for females, long jump, high jump, shot put), aur Document Verification hota hai. 12th pass hona zaroori hai. Salary Rs 19,500 basic pay se start hoti hai. CG GK aur tribal culture pe focus karein.',
  },
  {
    question: 'CG Vyapam Patwari ki salary aur exam kaisa hota hai?',
    answer:
      'CG Vyapam (CGPEB) Patwari exam objective type hota hai — General Knowledge, Hindi, Maths, Computer, aur CG GK se questions aate hain (150 marks, 3 hours). Qualification: 12th pass with computer knowledge. Patwari ki salary Pay Level 5 (Rs 28,700 basic pay) se start hoti hai. DA, HRA allowances ke saath gross salary Rs 33,000-42,000 per month hoti hai. Patwari ka kaam land records maintain karna aur revenue collection mein help karna hai.',
  },
  {
    question: 'What are the upcoming Chhattisgarh government exams in 2026?',
    answer:
      'Upcoming Chhattisgarh government exams in 2026 include: CGPSC State Service Prelims & Mains, CGPEB Patwari & Revenue Inspector, CGPEB Sub Engineer, CG Police Constable & SI bharti, CG TET for teacher recruitment, CGPSC Assistant Professor, CGPEB Food Inspector, CGPEB Assistant Grade III, CG Forest Guard, CGPEB Lab Technician & Staff Nurse, and various departmental exams. Check CGPSC (psc.cg.gov.in) and CGPEB (vyapam.cgstate.gov.in) regularly.',
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
        name: 'Chhattisgarh Government Jobs',
        item: 'https://sarkarialert.online/chhattisgarh-government-jobs',
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
    data = await getJobs({ state: 'chhattisgarh', page: '1' });
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
      filterParams={{ state: 'chhattisgarh' }}
    />
  );
}

export default function ChhattisgarhGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Chhattisgarh Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              छत्तीसगढ़ सरकारी नौकरी 2026 — CGPSC, CG Vyapam, CG Police भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Chhattisgarh sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>CGPSC</strong> (State Service, Assistant Professor), <strong>CG Vyapam (CGPEB)</strong> (Patwari, RI, Sub Engineer, Food Inspector),{' '}
            <strong>CG Police</strong> (Constable, SI), and teacher recruitment through CG TET.
            Chhattisgarh offers government job opportunities across education, police, mining, forest, health, and administrative departments.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां छत्तीसगढ़ की सभी नवीनतम सरकारी नौकरियां देखें। CGPSC, CG Vyapam (CGPEB), CG Police
            और अन्य सभी विभागों की भर्ती अधिसूचनाएं एक जगह। CGPSC State Service, CG Vyapam Patwari, CG Police भर्ती अपडेट।
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
          Frequently Asked Questions — Chhattisgarh Government Jobs
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
