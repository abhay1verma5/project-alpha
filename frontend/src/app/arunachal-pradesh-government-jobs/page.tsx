import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Arunachal Pradesh Government Jobs 2026-27 — अरुणाचल प्रदेश सरकारी नौकरी | SarkariAlert',
  description:
    'Arunachal Pradesh Government Jobs 2026-27: Latest AP sarkari naukri for APPSC, Arunachal Police, Education & Health Dept. Apply online for Arunachal Pradesh vacancies.',
  keywords: [
    'arunachal pradesh government jobs 2026', 'arunachal sarkari naukri', 'appsc arunachal vacancy',
    'arunachal police bharti', 'arunachal teacher recruitment', 'appsc combined exam 2026',
  ],
  alternates: { canonical: 'https://sarkarialert.online/arunachal-pradesh-government-jobs' },
  openGraph: {
    title: 'Arunachal Pradesh Government Jobs 2026-27 — अरुणाचल प्रदेश सरकारी नौकरी',
    description: 'Find Arunachal Pradesh sarkari naukri 2026-27. APPSC, Arunachal Police & more.',
    url: 'https://sarkarialert.online/arunachal-pradesh-government-jobs', type: 'website',
  },
};

const faqData = [
  { question: 'What are the major recruitment bodies in Arunachal Pradesh?', answer: 'APPSC (Arunachal Pradesh Public Service Commission) for APCS (Arunachal Pradesh Civil Services) and Group A/B posts. Arunachal Pradesh Police for constable, SI, and IRBn. Education Department (DISE/SSA) for teacher recruitment. Health Department for medical staff.' },
  { question: 'APPSC exam ka pattern kya hai?', answer: 'APPSC APCS exam: Prelims (GS + CSAT objective), Mains (descriptive papers including Arunachal Pradesh history/culture), Interview. Posts: Extra Assistant Commissioner, Circle Officer, BDO. Knowledge of local tribes and geography is tested.' },
  { question: 'Arunachal Pradesh Police mein kaise apply karein?', answer: 'Arunachal Pradesh Police recruitment: arunpol.nic.in. Written exam + Physical Test + Medical. APST (Arunachal Pradesh Scheduled Tribe) certificate required for ST reserved posts. Inner Line Permit area — special provisions for local candidates.' },
  { question: 'Arunachal Pradesh mein government jobs ke liye age limit kya hai?', answer: 'APPSC APCS: 21-32 years, +5 for APST candidates. AP Police: 18-25 years. Teaching: up to 38 years. Arunachal Pradesh is an ILP state. APST candidates get significant reservation and age relaxation in all government posts.' },
  { question: 'Arunachal Pradesh mein upcoming exams kaunse hain?', answer: 'APPSC APCS Combined Exam, AP Police (Constable/SI/IRBn), Teacher Recruitment (Primary/TGT/PGT), Health Department (ANM/GNM/Staff Nurse), Forest Department (Forest Guard/Range Officer), PWD/Engineering posts, and Panchayat Secretary recruitment.' },
];

function FAQSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqData.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}
function BreadcrumbSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sarkarialert.online/' },
    { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://sarkarialert.online/jobs' },
    { '@type': 'ListItem', position: 3, name: 'Arunachal Pradesh Government Jobs', item: 'https://sarkarialert.online/arunachal-pradesh-government-jobs' },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}

async function JobsContent() {
  let data;
  try { data = await getJobs({ state: 'arunachal_pradesh', page: '1' }); } catch {
    return (<div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"><Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" /><p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load jobs</p><p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p></div>);
  }
  return <JobsLoadMore initialJobs={data.results} totalCount={data.count} nextUrl={data.next} filterParams={{ state: 'arunachal_pradesh' }} />;
}

export default function ArunachalPradeshGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema /><BreadcrumbSchema />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20"><MapPin className="w-5 h-5 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Arunachal Pradesh Government Jobs 2026</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">अरुणाचल प्रदेश सरकारी नौकरी 2026 — APPSC, Arunachal Police भर्ती</p>
          </div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Arunachal Pradesh sarkari naukri 2026</strong> across all state departments.
            Browse vacancies from <strong>APPSC</strong> (APCS Civil Services), <strong>Arunachal Police</strong>,{' '}
            <strong>Education</strong> & <strong>Health</strong> departments. Arunachal Pradesh offers unique NE state
            benefits with APST reservation and ILP provisions.
          </p>
        </div>
      </div>
      <Suspense fallback={<JobListSkeleton />}><JobsContent /></Suspense>
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions — Arunachal Pradesh Government Jobs</h2>
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
