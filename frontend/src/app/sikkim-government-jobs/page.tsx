import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sikkim Government Jobs 2026-27 — सिक्किम सरकारी नौकरी | SarkariAlert',
  description:
    'Sikkim Government Jobs 2026-27: Latest Sikkim sarkari naukri for SPSC, Sikkim Police, HRDD & more. Apply online for Sikkim government vacancies.',
  keywords: [
    'sikkim government jobs 2026', 'sikkim sarkari naukri', 'spsc vacancy 2026', 'sikkim police bharti',
    'sikkim teacher recruitment', 'spsc combined exam', 'sikkim health department jobs',
  ],
  alternates: { canonical: 'https://sarkarialert.online/sikkim-government-jobs' },
  openGraph: {
    title: 'Sikkim Government Jobs 2026-27 — सिक्किम सरकारी नौकरी',
    description: 'Find Sikkim sarkari naukri 2026-27. SPSC, Sikkim Police & more.',
    url: 'https://sarkarialert.online/sikkim-government-jobs', type: 'website',
  },
};

const faqData = [
  { question: 'What are the major recruitment bodies in Sikkim?', answer: 'SPSC (Sikkim Public Service Commission) for SCS and Group A/B posts. Sikkim Police for constable, SI. HRDD (Human Resource Development Department) for teacher recruitment. Sikkim State Health Services for medical staff. District recruitment cells for Group C/D posts.' },
  { question: 'SPSC exam ka pattern kya hai?', answer: 'SPSC SCS (Sikkim Civil Services) exam: Prelims (GS + CSAT objective), Mains (descriptive with Sikkim-specific papers), Interview. Posts: SDM, BDO, Under Secretary. Sikkim history, geography, and culture are important components of the syllabus.' },
  { question: 'Sikkim Police mein kaise apply karein?', answer: 'Sikkim Police recruitment: sikkimpolice.nic.in. Written Exam + Physical Efficiency Test + Physical Standard Test + Medical + Interview. Sikkim Subject Certificate (SSC) or Certificate of Identification (COI) required. Reservation for Bhutia-Lepcha, Scheduled Castes, OBC.' },
  { question: 'Sikkim mein government jobs ke liye age limit kya hai?', answer: 'SPSC SCS: 21-32 years (General), relaxation for reserved categories. Sikkim Police: 18-25 years. Teaching: up to 40 years. Sikkim has special employment provisions — local candidates strongly preferred. Sikkim Subject Certificate mandatory.' },
  { question: 'Sikkim mein upcoming government exams kaunse hain?', answer: 'SPSC Combined Competitive Exam, Sikkim Police (Constable/SI/IRBn), HRDD Teacher Recruitment (Primary/TGT/PGT), Health Department (Medical Officer, Staff Nurse, Pharmacist), Forest Department, Tourism Department, and PWD engineering posts.' },
];

function FAQSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqData.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}
function BreadcrumbSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sarkarialert.online/' },
    { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://sarkarialert.online/jobs' },
    { '@type': 'ListItem', position: 3, name: 'Sikkim Government Jobs', item: 'https://sarkarialert.online/sikkim-government-jobs' },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}

async function JobsContent() {
  let data;
  try { data = await getJobs({ state: 'sikkim', page: '1' }); } catch {
    return (<div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"><Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" /><p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load jobs</p><p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p></div>);
  }
  return <JobsLoadMore initialJobs={data.results} totalCount={data.count} nextUrl={data.next} filterParams={{ state: 'sikkim' }} />;
}

export default function SikkimGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema /><BreadcrumbSchema />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/20"><MapPin className="w-5 h-5 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Sikkim Government Jobs 2026</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">सिक्किम सरकारी नौकरी 2026 — SPSC, Sikkim Police भर्ती</p>
          </div>
        </div>
        <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Sikkim sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>SPSC</strong> (Sikkim Civil Services), <strong>Sikkim Police</strong>,{' '}
            <strong>HRDD</strong> (Teaching posts), and Health Department. Sikkim offers low competition
            with Sikkim Subject Certificate (SSC) holders getting priority in recruitment.
          </p>
        </div>
      </div>
      <Suspense fallback={<JobListSkeleton />}><JobsContent /></Suspense>
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions — Sikkim Government Jobs</h2>
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
