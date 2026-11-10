import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ladakh Government Jobs 2026-27 — लद्दाख सरकारी नौकरी | SarkariAlert',
  description:
    'Ladakh Government Jobs 2026-27: Latest Ladakh UT sarkari naukri for LAHDC, Ladakh Police, Army, BRO & more. Apply online for Ladakh UT government vacancies.',
  keywords: [
    'ladakh government jobs 2026', 'ladakh sarkari naukri', 'lahdc leh vacancy', 'ladakh police bharti',
    'ladakh teacher recruitment', 'bro ladakh jobs', 'ladakh ut government jobs',
  ],
  alternates: { canonical: 'https://sarkarialert.online/ladakh-government-jobs' },
  openGraph: {
    title: 'Ladakh Government Jobs 2026-27 — लद्दाख सरकारी नौकरी',
    description: 'Find Ladakh UT sarkari naukri 2026-27. LAHDC, Ladakh Police, Army & more.',
    url: 'https://sarkarialert.online/ladakh-government-jobs', type: 'website',
  },
};

const faqData = [
  { question: 'What are the major recruitment bodies in Ladakh?', answer: 'Ladakh UT Administration for all government posts. LAHDC Leh (Ladakh Autonomous Hill Development Council) for district-level posts. LAHDC Kargil for Kargil district posts. Ladakh Police for constable, SI. BRO (Border Roads Organisation) for technical and labour posts. Army/ITBP for border-area recruitment.' },
  { question: 'Ladakh UT mein government jobs ke liye kaise apply karein?', answer: 'Ladakh became a Union Territory on 31 October 2019. Recruitment is through Ladakh UT Administration (ladakh.gov.in), SSC for central posts, LAHDC Leh/Kargil for district posts. Online applications through ladakh.gov.in. Local domicile certificate required.' },
  { question: 'Ladakh mein government jobs ke liye age limit kya hai?', answer: 'Ladakh UT posts: 18-37 years (General), +3 OBC, +5 SC/ST. Ladakh Police: 18-28 years. As a UT, central government age rules apply. ST reservation for Ladakhi Scheduled Tribes (Bhoti, Changpa, etc.).' },
  { question: 'Ladakh Police mein kaise apply karein?', answer: 'Ladakh Police separate from J&K Police since 2019. Recruitment through Ladakh UT Administration. Written Test + Physical Efficiency Test + Physical Standard Test + Medical. Domicile of Ladakh required. Preference for local candidates from Leh and Kargil districts.' },
  { question: 'Ladakh mein kaunse upcoming government exams hain?', answer: 'Ladakh UT Administration (Clerk, JE, Teacher), Ladakh Police (Constable/SI), LAHDC Leh & Kargil (Various Group C/D), BRO (JE, Supervisor, Labour), Army recruitment rally (Leh/Kargil), ITBP (Constable/HC), and Health Department (ANM/GNM/Pharmacist).' },
];

function FAQSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqData.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}
function BreadcrumbSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sarkarialert.online/' },
    { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://sarkarialert.online/jobs' },
    { '@type': 'ListItem', position: 3, name: 'Ladakh Government Jobs', item: 'https://sarkarialert.online/ladakh-government-jobs' },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}

async function JobsContent() {
  let data;
  try { data = await getJobs({ state: 'ladakh', page: '1' }); } catch {
    return (<div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"><Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" /><p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load jobs</p><p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p></div>);
  }
  return <JobsLoadMore initialJobs={data.results} totalCount={data.count} nextUrl={data.next} filterParams={{ state: 'ladakh' }} />;
}

export default function LadakhGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema /><BreadcrumbSchema />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20"><MapPin className="w-5 h-5 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Ladakh Government Jobs 2026</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">लद्दाख सरकारी नौकरी 2026 — LAHDC, Ladakh Police, BRO भर्ती</p>
          </div>
        </div>
        <div className="bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Ladakh UT sarkari naukri 2026</strong> across all government departments.
            Browse vacancies from <strong>Ladakh UT Administration</strong>, <strong>LAHDC Leh/Kargil</strong>,{' '}
            <strong>Ladakh Police</strong>, <strong>BRO</strong>, and Defence establishments.
            Ladakh, India&apos;s newest UT (since 2019), offers unique border-area benefits and hardship allowances.
          </p>
        </div>
      </div>
      <Suspense fallback={<JobListSkeleton />}><JobsContent /></Suspense>
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions — Ladakh Government Jobs</h2>
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
