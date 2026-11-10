import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nagaland Government Jobs 2026-27 — नागालैंड सरकारी नौकरी | SarkariAlert',
  description:
    'Nagaland Government Jobs 2026-27: Latest Nagaland sarkari naukri for NPSC, Nagaland Police, Education Dept & more. Apply online for Nagaland government vacancies.',
  keywords: [
    'nagaland government jobs 2026', 'nagaland sarkari naukri', 'npsc nagaland vacancy', 'nagaland police bharti',
    'nagaland teacher recruitment', 'npsc combined exam 2026', 'nagaland health department jobs',
  ],
  alternates: { canonical: 'https://sarkarialert.online/nagaland-government-jobs' },
  openGraph: {
    title: 'Nagaland Government Jobs 2026-27 — नागालैंड सरकारी नौकरी',
    description: 'Find Nagaland sarkari naukri 2026-27. NPSC, Nagaland Police & more.',
    url: 'https://sarkarialert.online/nagaland-government-jobs', type: 'website',
  },
};

const faqData = [
  { question: 'What are the major recruitment bodies in Nagaland?', answer: 'NPSC (Nagaland Public Service Commission) for NCS (Nagaland Civil Services) and Group A/B posts. Nagaland Police for constable, SI, and armed police. Education Department for teacher recruitment. Health Department for medical staff. District-level recruitment for Group C/D posts.' },
  { question: 'NPSC exam ka pattern kya hai?', answer: 'NPSC NCS (Nagaland Civil Services) exam: Prelims (objective GS + CSAT), Mains (descriptive), Interview. Posts: Extra Assistant Commissioner, SDO(C), Superintendent of Excise, BDO. Nagaland history and culture are part of the syllabus.' },
  { question: 'Nagaland Police mein kaise apply karein?', answer: 'Nagaland Police recruitment notification nagapol.gov.in par aata hai. Written exam + Physical Test + Medical + Document verification. Naga tribe/indigenous inhabitant certificate required for most posts. Special reservation for different Naga tribes.' },
  { question: 'Nagaland mein government jobs ke liye age limit kya hai?', answer: 'NPSC NCS: 21-32 years (General), relaxation for ST. Nagaland Police: 18-27 years. Teaching posts: up to 40 years. Nagaland has special provisions — most posts reserved for Naga tribes and indigenous inhabitants.' },
  { question: 'Nagaland mein upcoming government exams 2026 mein kaunse hain?', answer: 'NPSC NCS/Combined exam, Nagaland Police (Constable/SI/Commando), Teacher recruitment (Primary/TGT/PGT), Health Department (ANM/GNM/Staff Nurse), Forest Department, PWD/Engineering posts, and Agriculture Department recruitment.' },
];

function FAQSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqData.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}
function BreadcrumbSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sarkarialert.online/' },
    { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://sarkarialert.online/jobs' },
    { '@type': 'ListItem', position: 3, name: 'Nagaland Government Jobs', item: 'https://sarkarialert.online/nagaland-government-jobs' },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}

async function JobsContent() {
  let data;
  try { data = await getJobs({ state: 'nagaland', page: '1' }); } catch {
    return (<div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"><Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" /><p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load jobs</p><p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p></div>);
  }
  return <JobsLoadMore initialJobs={data.results} totalCount={data.count} nextUrl={data.next} filterParams={{ state: 'nagaland' }} />;
}

export default function NagalandGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema /><BreadcrumbSchema />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center shadow-lg shadow-lime-500/20"><MapPin className="w-5 h-5 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Nagaland Government Jobs 2026</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">नागालैंड सरकारी नौकरी 2026 — NPSC, Nagaland Police भर्ती</p>
          </div>
        </div>
        <div className="bg-lime-50 dark:bg-lime-950/30 border border-lime-200 dark:border-lime-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Nagaland sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>NPSC</strong> (Nagaland Civil Services), <strong>Nagaland Police</strong>,{' '}
            <strong>Education</strong> & <strong>Health</strong> departments. Nagaland offers special provisions
            for Naga tribes with lower competition compared to mainland states.
          </p>
        </div>
      </div>
      <Suspense fallback={<JobListSkeleton />}><JobsContent /></Suspense>
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions — Nagaland Government Jobs</h2>
        <div className="space-y-4">
          {faqData.map((faq, i) => (
            <details key={i} className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50">{faq.question}<span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span></summary>
              <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
