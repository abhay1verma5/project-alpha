import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Meghalaya Government Jobs 2026-27 — मेघालय सरकारी नौकरी | SarkariAlert',
  description:
    'Meghalaya Government Jobs 2026-27: Latest Meghalaya sarkari naukri for MPSC Meghalaya, Meghalaya Police, MBOSE & more. Apply online for Meghalaya government vacancies.',
  keywords: [
    'meghalaya government jobs 2026', 'meghalaya sarkari naukri', 'mpsc meghalaya vacancy', 'meghalaya police bharti',
    'meghalaya teacher recruitment 2026', 'mbose meghalaya', 'meghalaya health department jobs',
  ],
  alternates: { canonical: 'https://sarkarialert.online/meghalaya-government-jobs' },
  openGraph: {
    title: 'Meghalaya Government Jobs 2026-27 — মেঘালয় সরকারি চাকরি',
    description: 'Find Meghalaya sarkari naukri 2026-27. MPSC, Meghalaya Police & more.',
    url: 'https://sarkarialert.online/meghalaya-government-jobs', type: 'website',
  },
};

const faqData = [
  { question: 'What are the major recruitment bodies in Meghalaya?', answer: 'MPSC (Meghalaya Public Service Commission) for MCS (Meghalaya Civil Services) and Group A/B posts. Meghalaya Police for constable, SI, and MPRO (Meghalaya Police Radio Organisation). MBOSE for education-related posts. District-level recruitment for Group C/D posts.' },
  { question: 'MPSC Meghalaya exam ka pattern kya hai?', answer: 'MPSC MCS (Meghalaya Civil Services) exam: Prelims (GS + CSAT objective), Mains (descriptive with Meghalaya-specific content including Khasi/Garo/Jaintia Hills questions), Interview. Posts include SDO, EAC, BDO, and allied services.' },
  { question: 'Meghalaya Police mein kaise apply karein?', answer: 'Meghalaya Police recruitment: megpolice.gov.in par notification check karein. Written exam + Physical Efficiency Test + Physical Standard Test + Medical + Document Verification. Domicile/local resident certificate required. ST reservation applicable for Khasi, Garo, Jaintia tribes.' },
  { question: 'Meghalaya mein government jobs ke liye age limit kya hai?', answer: 'MPSC MCS: 21-32 years (General), +5 SC/ST. Meghalaya Police Constable: 18-27 years. Teaching posts: 18-40 years. Meghalaya has special provisions for Scheduled Tribes under Sixth Schedule of Constitution.' },
  { question: 'Meghalaya mein upcoming government exams kaunse hain?', answer: 'MPSC MCS Prelims/Mains, Meghalaya Police (Constable/SI/AB), Meghalaya TET, MBOSE recruitment, Health Department (ANM, Staff Nurse, CHO), Forest Department (Forest Guard, Range Officer), and PWD recruitment for engineers.' },
];

function FAQSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqData.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}
function BreadcrumbSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sarkarialert.online/' },
    { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://sarkarialert.online/jobs' },
    { '@type': 'ListItem', position: 3, name: 'Meghalaya Government Jobs', item: 'https://sarkarialert.online/meghalaya-government-jobs' },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}

async function JobsContent() {
  let data;
  try { data = await getJobs({ state: 'meghalaya', page: '1' }); } catch {
    return (<div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"><Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" /><p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load jobs</p><p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p></div>);
  }
  return <JobsLoadMore initialJobs={data.results} totalCount={data.count} nextUrl={data.next} filterParams={{ state: 'meghalaya' }} />;
}

export default function MeghalayaGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema /><BreadcrumbSchema />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20"><MapPin className="w-5 h-5 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Meghalaya Government Jobs 2026</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">মেঘালয় সরকারি চাকরি 2026 — MPSC, Meghalaya Police ভর্তি</p>
          </div>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Meghalaya sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>MPSC</strong> (Meghalaya Civil Services), <strong>Meghalaya Police</strong>,{' '}
            <strong>MBOSE</strong>, and Health/Education departments.
            Meghalaya has special provisions under the Sixth Schedule with ST reservation for Khasi, Garo, and Jaintia tribes.
          </p>
        </div>
      </div>
      <Suspense fallback={<JobListSkeleton />}><JobsContent /></Suspense>
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions — Meghalaya Government Jobs</h2>
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
