import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Jammu & Kashmir Government Jobs 2026-27 — JK सरकारी नौकरी | SarkariAlert',
  description:
    'Jammu & Kashmir Government Jobs 2026-27: Latest JK sarkari naukri for JKPSC, JKSSB, JK Police, JK Bank & more. Apply online for J&K UT government vacancies.',
  keywords: [
    'jammu kashmir government jobs 2026', 'jk sarkari naukri', 'jkpsc kas 2026', 'jkssb vacancy 2026',
    'jk police constable bharti', 'jk bank recruitment 2026', 'jkpsc combined exam', 'jkssb class iv jobs',
    'jammu kashmir teacher recruitment', 'jk uts government jobs',
  ],
  alternates: { canonical: 'https://sarkarialert.online/jammu-kashmir-government-jobs' },
  openGraph: {
    title: 'Jammu & Kashmir Government Jobs 2026-27 — JK सरकारी नौकरी',
    description: 'Find J&K sarkari naukri 2026-27. JKPSC, JKSSB, JK Police & more.',
    url: 'https://sarkarialert.online/jammu-kashmir-government-jobs', type: 'website',
  },
};

const faqData = [
  { question: 'What are the major recruitment bodies in Jammu & Kashmir?', answer: 'JKPSC (J&K Public Service Commission) for KAS (Kashmir Administrative Service), Combined Competitive Exam, and Group A/B posts. JKSSB (J&K Services Selection Board) for Class IV, FAA, Jr Assistant, and other Group C posts. JK Police for Constable, SI, and SPO recruitment. JK Bank for PO, Clerk positions. DSEK/DSEJ for teacher recruitment.' },
  { question: 'JKPSC KAS exam ka pattern kya hai?', answer: 'JKPSC KAS (Combined Competitive Exam) teen charan mein hota hai: Prelims (2 papers — GS + CSAT, objective), Mains (descriptive papers), aur Interview. KAS se SDM, Tehsildar, BDO jaise posts milte hain. JKPSC pattern UPSC CSE ke similar hai but with J&K specific content in some papers.' },
  { question: 'JKSSB mein kaunse posts aate hain?', answer: 'JKSSB ke popular posts: Class IV (Peon, Watchman, Gardener), FAA (Finance Accounts Assistant), Junior Assistant, Patwari, Jr Scale Stenographer, Lab Assistant, Pharmacist, Jr Nurse. JKSSB CBT-based exam conduct karta hai. Large-scale Class IV recruitment (thousands of vacancies) regularly hota hai.' },
  { question: 'JK mein government jobs ke liye age limit kya hai?', answer: 'JKPSC KAS: 21-37 years (Gen), 40 years (RBA/SC/ST), 42 years (PwD). JKSSB posts: 18-40 years (General) with relaxation. JK Police Constable: 18-28 years. JK Bank: 18-30 years. After reorganization as UT, central govt age rules apply for many posts.' },
  { question: 'JK Police constable ke liye kaise apply karein?', answer: 'JK Police constable ki bharti JK Police Headquarters ke through hoti hai. Apply: jkpolice.gov.in. Written Test (objective) + Physical Endurance Test (PET) + Physical Standard Test (PST) + Document Verification. 12th pass required. Domicile certificate of J&K mandatory.' },
  { question: 'JK Bank mein jobs ke liye kya karna hoga?', answer: 'JK Bank PO/Clerk ki bharti IBPS ke through hoti hai (IBPS PO/Clerk score based) ya fir JK Bank apna separate exam bhi karata hai. JK Bank PO: Graduation required, 20-30 age. JK Bank is one of the most sought-after employers in J&K with good salary and posting within the UT.' },
];

function FAQSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqData.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}
function BreadcrumbSchema() {
  const s = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sarkarialert.online/' },
    { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://sarkarialert.online/jobs' },
    { '@type': 'ListItem', position: 3, name: 'J&K Government Jobs', item: 'https://sarkarialert.online/jammu-kashmir-government-jobs' },
  ] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />;
}

async function JobsContent() {
  let data;
  try { data = await getJobs({ state: 'jammu_kashmir', page: '1' }); } catch {
    return (<div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl"><Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" /><p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load jobs</p><p className="text-gray-500 dark:text-gray-400 text-sm">Backend server is not available. Please try again later.</p></div>);
  }
  return <JobsLoadMore initialJobs={data.results} totalCount={data.count} nextUrl={data.next} filterParams={{ state: 'jammu_kashmir' }} />;
}

export default function JKGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema /><BreadcrumbSchema />
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20"><MapPin className="w-5 h-5 text-white" /></div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">J&K Government Jobs 2026</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">जम्मू-कश्मीर सरकारी नौकरी 2026 — JKPSC, JKSSB, JK Police भर्ती</p>
          </div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>J&K sarkari naukri 2026</strong> across all UT government departments.
            Browse vacancies from <strong>JKPSC</strong> (KAS, Combined Competitive Exam), <strong>JKSSB</strong> (Class IV, FAA, Jr Assistant),{' '}
            <strong>JK Police</strong> (Constable, SI), <strong>JK Bank</strong>, and other departments.
            After reorganization as a Union Territory, J&K has seen increased central government job opportunities alongside state vacancies.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां जम्मू-कश्मीर की सभी नवीनतम सरकारी नौकरियां देखें। JKPSC, JKSSB, JK Police, JK Bank
            और अन्य सभी विभागों की भर्ती अधिसूचनाएं एक जगह।
          </p>
        </div>
      </div>
      <Suspense fallback={<JobListSkeleton />}><JobsContent /></Suspense>
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions — J&K Government Jobs</h2>
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
