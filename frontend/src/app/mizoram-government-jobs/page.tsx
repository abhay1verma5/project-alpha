import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mizoram Government Jobs 2026-27 — मिज़ोरम सरकारी नौकरी | SarkariAlert',
  description:
    'Mizoram Government Jobs 2026-27: Latest Mizoram sarkari naukri for MPSC Mizoram, Mizoram Police, Education Dept & more. Apply online for Mizoram government vacancies.',
  keywords: [
    'mizoram government jobs 2026', 'mizoram sarkari naukri', 'mpsc mizoram vacancy', 'mizoram police bharti',
    'mizoram teacher recruitment 2026', 'mizoram health department jobs', 'mizoram civil services',
  ],
  alternates: { canonical: 'https://sarkarialert.online/mizoram-government-jobs' },
  openGraph: {
    title: 'Mizoram Government Jobs 2026-27 — मिज़ोरम सरकारी नौकरी',
    description: 'Find Mizoram sarkari naukri 2026-27. MPSC Mizoram, Mizoram Police & more.',
    url: 'https://sarkarialert.online/mizoram-government-jobs', type: 'website',
  },
};

const faqData = [
  { question: 'What are the major recruitment bodies in Mizoram?', answer: 'MPSC (Mizoram Public Service Commission) for MCS and Group A/B posts. Mizoram SSB (Staff Selection Board) for Group C/D posts. Mizoram Police for constable, SI, and armed police. Education Department for teacher posts. Health Department for medical recruitment.' },
  { question: 'MPSC Mizoram exam ka pattern kya hai?', answer: 'MPSC MCS (Mizoram Civil Services) exam: Prelims (objective), Mains (descriptive with Mizo history/culture paper), Interview. Posts include SDO, EAC, BDO. Mizo language paper is compulsory in Mains. Competition is relatively lower.' },
  { question: 'Mizoram Police mein kaise apply karein?', answer: 'Mizoram Police recruitment: mizorampolice.nic.in par notification. Written exam + Physical Test + Medical. Inner Line Permit (ILP) area — non-residents need ILP. Most posts reserved for Scheduled Tribes (Mizo, Lai, Mara, Chakma).' },
  { question: 'Mizoram mein government jobs ke liye age limit kya hai?', answer: 'MPSC MCS: 21-35 years (General). Mizoram Police: 18-25 years. Teaching: up to 38 years. Most government posts in Mizoram are reserved for ST candidates. Mizoram is an ILP state with special employment provisions.' },
  { question: 'Mizoram SSB kya hai?', answer: 'Mizoram Staff Selection Board (SSB) Group C/D posts ke liye exam conduct karta hai: LDA, UDA, Data Entry Operator, Lab Technician, Driver, Peon. Written exam (objective) + Document Verification. Mizo ST certificate required for most posts.' },
];

function FAQSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqData.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}
function BreadcrumbSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sarkarialert.online/' },
    { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://sarkarialert.online/jobs' },
    { '@type': 'ListItem', position: 3, name: 'Mizoram Government Jobs', item: 'https://sarkarialert.online/mizoram-government-jobs' },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}

async function JobsContent() {
  let data;
  try { data = await getJobs({ state: 'mizoram', page: '1' }); } catch {
    return (<div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"><Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" /><p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load jobs</p><p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p></div>);
  }
  return <JobsLoadMore initialJobs={data.results} totalCount={data.count} nextUrl={data.next} filterParams={{ state: 'mizoram' }} />;
}

export default function MizoramGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema /><BreadcrumbSchema />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20"><MapPin className="w-5 h-5 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Mizoram Government Jobs 2026</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">मिज़ोरम सरकारी नौकरी 2026 — MPSC, Mizoram Police भर्ती</p>
          </div>
        </div>
        <div className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Mizoram sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>MPSC</strong> (Mizoram Civil Services), <strong>Mizoram SSB</strong> (Group C/D),{' '}
            <strong>Mizoram Police</strong>, and Education/Health departments. Mizoram is an ILP state with
            special employment provisions and lower competition.
          </p>
        </div>
      </div>
      <Suspense fallback={<JobListSkeleton />}><JobsContent /></Suspense>
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions — Mizoram Government Jobs</h2>
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
