import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Dadra & Nagar Haveli and Daman & Diu Government Jobs 2026-27 — सरकारी नौकरी | SarkariAlert',
  description:
    'Dadra & Nagar Haveli and Daman & Diu Government Jobs 2026-27: Latest DNHDD UT sarkari naukri for Administration, Police, Education & more. Apply online.',
  keywords: [
    'dadra nagar haveli government jobs 2026', 'daman diu sarkari naukri', 'dnhdd government vacancy',
    'silvassa government jobs', 'daman diu police bharti', 'dnhdd teacher recruitment',
  ],
  alternates: { canonical: 'https://sarkarialert.online/dadra-nagar-haveli-government-jobs' },
  openGraph: {
    title: 'Dadra & Nagar Haveli & Daman Diu Government Jobs 2026-27',
    description: 'Find DNHDD UT sarkari naukri 2026-27. Administration, Police, Education & more.',
    url: 'https://sarkarialert.online/dadra-nagar-haveli-government-jobs', type: 'website',
  },
};

const faqData = [
  { question: 'What are the major recruitment bodies in Dadra & Nagar Haveli and Daman & Diu?', answer: 'DNHDD UT Administration (merged UT since Jan 2020) recruits for all government posts. SSC for central posts. Directorate of Education for teachers. Health Department for medical staff. Police Department for constable/SI. PWD and Electricity Department for technical posts.' },
  { question: 'DNHDD mein government jobs ke liye kaise apply karein?', answer: 'DNHDD Administration website (dyvat.gov.in) for UT posts. SSC for central posts. Most applications online. Domicile certificate from Silvassa/Daman/Diu needed. Since 2020 merger, both Dadra & Nagar Haveli and Daman & Diu are a single UT.' },
  { question: 'DNHDD mein government jobs ke liye age limit kya hai?', answer: 'UT Administration posts: 18-30 years (General), +3 OBC, +5 SC/ST. Police: 18-25 years. Central government age rules apply. ST reservation for Warli, Dhodia, Kokna tribes.' },
  { question: 'Dadra Nagar Haveli aur Daman Diu mein kaun se government departments hain?', answer: 'UT Administration (Revenue, PWD, Electricity), DNHDD Police, Education Department, Health Department, Tourism Department, Fisheries Department, Industries & Labour, Forest Department, and Social Welfare Department.' },
  { question: 'DNHDD mein upcoming government exams kaunse hain?', answer: 'DNHDD Police (Constable/SI), UT Administration (Clerk, JE, Peon), Education Department (TGT/PGT/PRT), Health Department (ANM/GNM/Pharmacist), PWD (JE Civil/Electrical), Forest Department (Forest Guard), and Revenue Department (Talati/Patwari).' },
];

function FAQSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqData.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}
function BreadcrumbSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sarkarialert.online/' },
    { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://sarkarialert.online/jobs' },
    { '@type': 'ListItem', position: 3, name: 'DNHDD Government Jobs', item: 'https://sarkarialert.online/dadra-nagar-haveli-government-jobs' },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}

async function JobsContent() {
  let data;
  try { data = await getJobs({ state: 'dadra-nagar-haveli', page: '1' }); } catch {
    return (<div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"><Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" /><p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load jobs</p><p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p></div>);
  }
  return <JobsLoadMore initialJobs={data.results} totalCount={data.count} nextUrl={data.next} filterParams={{ state: 'dadra-nagar-haveli' }} />;
}

export default function DadraNagarHaveliGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema /><BreadcrumbSchema />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20"><MapPin className="w-5 h-5 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Dadra & Nagar Haveli and Daman & Diu Government Jobs 2026</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">दादरा नगर हवेली और दमन दीव सरकारी नौकरी 2026 — DNHDD भर्ती</p>
          </div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Dadra & Nagar Haveli and Daman & Diu (DNHDD) sarkari naukri 2026</strong> across all departments.
            Browse vacancies from <strong>DNHDD UT Administration</strong>, <strong>Police</strong>,{' '}
            <strong>Education</strong>, and <strong>Health</strong> departments.
            This merged UT (since 2020) offers industrial-area benefits and coastal allowances.
          </p>
        </div>
      </div>
      <Suspense fallback={<JobListSkeleton />}><JobsContent /></Suspense>
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions — DNHDD Government Jobs</h2>
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
