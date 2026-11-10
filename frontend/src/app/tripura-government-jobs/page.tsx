import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tripura Government Jobs 2026-27 — ত্রিপুরা সরকারি চাকরি | SarkariAlert',
  description:
    'Tripura Government Jobs 2026-27: Latest Tripura sarkari naukri for TPSC, Tripura Police, TET, TTPSC & more. Apply online for Tripura government vacancies.',
  keywords: [
    'tripura government jobs 2026', 'tripura sarkari naukri', 'tpsc vacancy 2026', 'tripura police bharti',
    'tripura tet 2026', 'tripura teacher recruitment', 'tpsc combined exam',
  ],
  alternates: { canonical: 'https://sarkarialert.online/tripura-government-jobs' },
  openGraph: {
    title: 'Tripura Government Jobs 2026-27 — ত্রিপুরা সরকারি চাকরি',
    description: 'Find Tripura sarkari naukri 2026-27. TPSC, Tripura Police & more.',
    url: 'https://sarkarialert.online/tripura-government-jobs', type: 'website',
  },
};

const faqData = [
  { question: 'What are the major recruitment bodies in Tripura?', answer: 'TPSC (Tripura Public Service Commission) for TCS, Group A/B posts. JRBT (Joint Recruitment Board Tripura) for Group C/D posts. Tripura Police for constable, SI recruitment. Tripura TET for teacher eligibility. Tripura Tribal Areas Autonomous District Council (TTAADC) for tribal area posts.' },
  { question: 'TPSC TCS exam ka pattern kya hai?', answer: 'TPSC Tripura Civil Services (TCS) mein Prelims (GS Paper I + CSAT Paper II), Mains (descriptive papers with Tripura-specific content), aur Interview hota hai. Posts: SDM, BDO, DSP, ADM. Regional language paper compulsory in Mains.' },
  { question: 'Tripura mein government jobs ke liye age limit kya hai?', answer: 'TPSC TCS: 21-40 years (General), +3 OBC, +5 SC/ST. Tripura Police: 18-27 years. JRBT posts: 18-40 years. Most Tripura posts require Permanent Resident of Tripura (PRC) certificate.' },
  { question: 'Tripura TET ke liye kya qualification chahiye?', answer: 'Tripura TET: Paper-I (Class 1-5) requires D.El.Ed/B.Ed. Paper-II (Class 6-8) requires B.Ed + graduation in relevant subject. Conducted by Tripura Board of Secondary Education. Bengali/Kokborok medium available.' },
  { question: 'JRBT kya hai aur kaunse posts aate hain?', answer: 'JRBT (Joint Recruitment Board Tripura) Group C/D posts ke liye bharti karta hai: LDA, UDA, Junior Accountant, DEO, Lab Attendant, Driver, Peon. Online exam + document verification. Tripura PRC mandatory.' },
];

function FAQSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqData.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}
function BreadcrumbSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sarkarialert.online/' },
    { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://sarkarialert.online/jobs' },
    { '@type': 'ListItem', position: 3, name: 'Tripura Government Jobs', item: 'https://sarkarialert.online/tripura-government-jobs' },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}

async function JobsContent() {
  let data;
  try { data = await getJobs({ state: 'tripura', page: '1' }); } catch {
    return (<div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"><Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" /><p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load jobs</p><p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p></div>);
  }
  return <JobsLoadMore initialJobs={data.results} totalCount={data.count} nextUrl={data.next} filterParams={{ state: 'tripura' }} />;
}

export default function TripuraGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema /><BreadcrumbSchema />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/20"><MapPin className="w-5 h-5 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Tripura Government Jobs 2026</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">ত্রিপুরা সরকারি চাকরি 2026 — TPSC, Tripura Police ভর্তি</p>
          </div>
        </div>
        <div className="bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Tripura sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>TPSC</strong> (Tripura Civil Services), <strong>JRBT</strong> (Group C/D posts),{' '}
            <strong>Tripura Police</strong> (Constable, SI), and teaching posts. NE state category benefits applicable.
          </p>
        </div>
      </div>
      <Suspense fallback={<JobListSkeleton />}><JobsContent /></Suspense>
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions — Tripura Government Jobs</h2>
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
