import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Briefcase,
  Award,
  CreditCard,
  FileCheck,
  BookOpen,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  Clock,
} from 'lucide-react';
import { getJobs } from '@/lib/api';
import type { Job } from '@/lib/api';
import { JobCard } from '@/components/JobCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CATEGORY_LABELS, CATEGORY_ICONS, CATEGORY_COLORS } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Static params — pre-generate pages for major exam bodies          */
/* ------------------------------------------------------------------ */

const HUB_CATEGORIES = [
  'ssc',
  'upsc',
  'railway',
  'banking',
  'defence',
  'police',
  'teaching',
  'state_psc',
  'health',
  'engineering',
  'medical',
  'university',
  'gramin',
  'other',
] as const;

type HubCategory = (typeof HUB_CATEGORIES)[number];

export function generateStaticParams() {
  return HUB_CATEGORIES.map((category) => ({ category }));
}

/* ------------------------------------------------------------------ */
/*  Category descriptions for SEO                                     */
/* ------------------------------------------------------------------ */

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  ssc: 'Staff Selection Commission (SSC) conducts exams like CGL, CHSL, MTS, GD Constable, CPO and Stenographer for recruitment to various Central Government posts. Stay updated with the latest SSC notifications, exam results, admit cards, answer keys and syllabus.',
  upsc: 'Union Public Service Commission (UPSC) conducts Civil Services (IAS/IPS/IFS), NDA, CDS, CAPF, EPFO, IES/ISS and other national-level examinations. Get all UPSC recruitment updates, results, admit cards and exam resources in one place.',
  railway: 'Indian Railways through RRB and RRC conducts recruitment for Group D, NTPC, ALP/Technician, JE, RPF and other railway posts. Track all Railway recruitment 2026 notifications, results and admit cards here.',
  banking: 'Banking sector recruitment through IBPS, SBI, RBI and other banks for PO, Clerk, SO and other officer-level posts. Find the latest banking job notifications, exam results, admit cards, and preparation resources.',
  defence: 'Indian Defence forces — Army, Navy, Air Force, Coast Guard — along with DRDO, BEL, HAL and other defence organizations conduct regular recruitment. Stay updated with defence job vacancies, results and admit cards.',
  police: 'State and Central Police recruitment including SSC GD Constable, CRPF, BSF, CISF, ITBP, SSB, State Police SI/Constable and other law enforcement positions. All police recruitment updates at one place.',
  teaching: 'Teaching jobs from CTET, state TET, KVS, NVS, DSSSB, UPHESC, university lecturer and other teaching positions. Find the latest teaching job notifications, exam results and admit cards.',
  state_psc: 'State Public Service Commissions (BPSC, UPPSC, MPPSC, RPSC, HPSC, WBPSC, KPSC, etc.) conduct civil services and other state-level exams. Track all State PSC recruitment, results and admit cards.',
  health: 'Healthcare recruitment for AIIMS, ESIC, CGHS, NHM, State Health departments — Doctors, Nurses, Pharmacists, Lab Technicians and other medical staff positions.',
  engineering: 'Engineering jobs from PSUs (BHEL, NTPC, ONGC, IOCL), State PWD, CPWD, Railways and other technical departments. B.Tech, Diploma and ITI-based engineering vacancies.',
  medical: 'Medical and nursing recruitment — AIIMS, ESIC, Army Medical Corps, State hospitals, nursing officer posts, pharmacist and paramedical staff vacancies.',
  university: 'University and college recruitment — Professor, Associate Professor, Assistant Professor, Lab Assistant, Librarian, Non-teaching staff positions at Central and State universities.',
  gramin: 'Rural and Gram Panchayat level recruitment — Gramin Dak Sevak (GDS), Anganwadi Worker/Helper, Gram Rozgar Sahayak, VDO and other village-level positions.',
  other: 'Miscellaneous government job notifications that do not fall under a specific category. Includes autonomous bodies, research organizations, statutory commissions and other government agencies.',
};

/* ------------------------------------------------------------------ */
/*  Quick-link targets for each category                              */
/* ------------------------------------------------------------------ */

const CATEGORY_EXAMS: Record<string, string[]> = {
  ssc: ['SSC CGL', 'SSC CHSL', 'SSC MTS', 'SSC GD', 'SSC CPO', 'SSC Stenographer'],
  upsc: ['UPSC CSE', 'UPSC NDA', 'UPSC CDS', 'UPSC CAPF', 'UPSC EPFO', 'UPSC IES'],
  railway: ['RRB NTPC', 'RRB Group D', 'RRB ALP', 'RRB JE', 'RPF Constable', 'RPF SI'],
  banking: ['IBPS PO', 'IBPS Clerk', 'SBI PO', 'SBI Clerk', 'RBI Grade B', 'IBPS SO'],
  defence: ['NDA', 'CDS', 'AFCAT', 'Indian Army', 'Indian Navy', 'Indian Air Force'],
  police: ['SSC GD', 'Delhi Police', 'UP Police', 'CRPF', 'BSF', 'CISF'],
  teaching: ['CTET', 'Super TET', 'KVS', 'NVS', 'DSSSB TGT/PGT', 'UGC NET'],
  state_psc: ['BPSC', 'UPPSC', 'MPPSC', 'RPSC', 'WBPSC', 'HPSC'],
  health: ['AIIMS', 'ESIC', 'NHM', 'CGHS', 'ANM/GNM', 'Pharmacist'],
  engineering: ['BHEL', 'NTPC', 'ONGC', 'IOCL', 'SAIL', 'GAIL'],
  medical: ['AIIMS Nursing', 'ESIC MO', 'Army MNS', 'NRHM', 'PHC Doctor', 'Staff Nurse'],
  university: ['UGC NET', 'Delhi University', 'BHU', 'AMU', 'JNU', 'IGNOU'],
  gramin: ['GDS', 'Anganwadi', 'VDO', 'Gram Sevak', 'Panchayat Secretary', 'Lekhpal'],
  other: [],
};

/* ------------------------------------------------------------------ */
/*  Content type metadata                                             */
/* ------------------------------------------------------------------ */

interface SectionConfig {
  key: string;
  contentType: string;
  label: string;
  icon: typeof Briefcase;
  color: string;
  bgColor: string;
  limit: number;
  viewAllPath: (category: string) => string;
  viewAllLabel: string;
}

const SECTIONS: SectionConfig[] = [
  {
    key: 'jobs',
    contentType: 'job',
    label: 'Latest Jobs',
    icon: Briefcase,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'from-blue-500 to-blue-600',
    limit: 6,
    viewAllPath: (cat) => `/category/${cat}`,
    viewAllLabel: 'View All Jobs',
  },
  {
    key: 'results',
    contentType: 'result',
    label: 'Latest Results',
    icon: Award,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'from-green-500 to-green-600',
    limit: 3,
    viewAllPath: () => `/results`,
    viewAllLabel: 'View All Results',
  },
  {
    key: 'admitCards',
    contentType: 'admit_card',
    label: 'Admit Cards',
    icon: CreditCard,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'from-amber-500 to-amber-600',
    limit: 3,
    viewAllPath: () => `/admit-cards`,
    viewAllLabel: 'View All Admit Cards',
  },
  {
    key: 'answerKeys',
    contentType: 'answer_key',
    label: 'Answer Keys',
    icon: FileCheck,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'from-purple-500 to-purple-600',
    limit: 3,
    viewAllPath: () => `/answer-keys`,
    viewAllLabel: 'View All Answer Keys',
  },
  {
    key: 'syllabus',
    contentType: 'syllabus',
    label: 'Syllabus',
    icon: BookOpen,
    color: 'text-rose-600 dark:text-rose-400',
    bgColor: 'from-rose-500 to-rose-600',
    limit: 3,
    viewAllPath: () => `/syllabus`,
    viewAllLabel: 'View All Syllabus',
  },
];

/* ------------------------------------------------------------------ */
/*  Dynamic SEO metadata                                              */
/* ------------------------------------------------------------------ */

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = CATEGORY_LABELS[category];
  if (!label) return {};

  const year = new Date().getFullYear();

  return {
    title: `${label} Recruitment ${year} — Jobs, Results, Admit Cards, Answer Keys`,
    description: `${label} recruitment ${year} — Latest government job notifications, exam results, admit cards, answer keys & syllabus. Apply online for ${label} vacancies with eligibility, salary & last date details.`,
    keywords: [
      `${label} jobs ${year}`,
      `${label} recruitment`,
      `${label} result`,
      `${label} admit card`,
      `${label} answer key`,
      `${label} syllabus`,
      `${label} vacancy`,
      `sarkari naukri ${label}`,
    ],
    alternates: {
      canonical: `https://sarkarialert.online/exam-hub/${category}`,
    },
    openGraph: {
      title: `${label} Recruitment ${year} — Jobs, Results, Admit Cards | SarkariAlert`,
      description: `Complete ${label} recruitment hub — latest jobs, results, admit cards, answer keys and syllabus for all ${label} exams ${year}.`,
      url: `https://sarkarialert.online/exam-hub/${category}`,
      type: 'website',
      siteName: 'SarkariAlert',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${label} Recruitment ${year} | SarkariAlert`,
      description: `Latest ${label} jobs, results, admit cards, answer keys & syllabus ${year}.`,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Data fetching helper                                              */
/* ------------------------------------------------------------------ */

async function fetchSectionData(
  category: string,
  contentType: string,
  limit: number
): Promise<Job[]> {
  try {
    const data = await getJobs({
      category,
      content_type: contentType,
      ordering: '-posted_date',
      page_size: String(limit),
    });
    return data.results;
  } catch {
    return [];
  }
}

/* ------------------------------------------------------------------ */
/*  Section component — renders one content-type block                */
/* ------------------------------------------------------------------ */

function ContentSection({
  config,
  items,
  category,
}: {
  config: SectionConfig;
  items: Job[];
  category: string;
}) {
  const Icon = config.icon;
  if (items.length === 0) return null;

  return (
    <section className="mb-10">
      {/* Section header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${config.bgColor} flex items-center justify-center shadow-lg`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {config.label}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {items.length} latest update{items.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <Link
          href={config.viewAllPath(category)}
          className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          {config.viewAllLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Cards grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      {/* Mobile "View All" link */}
      <Link
        href={config.viewAllPath(category)}
        className="mt-4 flex sm:hidden items-center justify-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 py-2.5 rounded-xl border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
      >
        {config.viewAllLabel}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page component (server-side rendered)                        */
/* ------------------------------------------------------------------ */

export default async function ExamHubPage({ params }: Props) {
  const { category } = await params;

  // Validate category
  if (!HUB_CATEGORIES.includes(category as HubCategory)) {
    notFound();
  }

  const label = CATEGORY_LABELS[category] || category;
  const icon = CATEGORY_ICONS[category] || '';
  const description = CATEGORY_DESCRIPTIONS[category] || '';
  const relatedExams = CATEGORY_EXAMS[category] || [];
  const year = new Date().getFullYear();

  // Fetch all content types in parallel
  const sectionResults = await Promise.all(
    SECTIONS.map((section) =>
      fetchSectionData(category, section.contentType, section.limit)
    )
  );

  // Build section data map
  const sectionData: Record<string, Job[]> = {};
  SECTIONS.forEach((section, index) => {
    sectionData[section.key] = sectionResults[index];
  });

  // Total counts for stats
  const totalJobs = sectionData.jobs.length;
  const totalResults = sectionData.results.length;
  const totalAdmitCards = sectionData.admitCards.length;
  const totalAnswerKeys = sectionData.answerKeys.length;
  const totalSyllabus = sectionData.syllabus.length;
  const totalItems = totalJobs + totalResults + totalAdmitCards + totalAnswerKeys + totalSyllabus;

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${label} Recruitment ${year}`,
    description: `Complete ${label} recruitment hub with jobs, results, admit cards, answer keys and syllabus.`,
    url: `https://sarkarialert.online/exam-hub/${category}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'SarkariAlert',
      url: 'https://sarkarialert.online',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: totalItems,
      itemListElement: sectionData.jobs.slice(0, 5).map((job, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://sarkarialert.online/jobs/${job.slug}`,
        name: job.title,
      })),
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Exam Hub', href: '/exam-hub' },
          { label: `${label} Recruitment` },
        ]}
      />

      {/* ── Hero Header ── */}
      <div className="relative mb-8 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 sm:p-8 lg:p-10">
        {/* Decorative background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-500 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-purple-500 blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-start sm:items-center gap-4 mb-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-3xl sm:text-4xl flex-shrink-0 border border-white/20">
              {icon}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                {label} Recruitment {year}
              </h1>
              <p className="text-sm sm:text-base text-gray-300 mt-1">
                Jobs, Results, Admit Cards, Answer Keys &amp; Syllabus
              </p>
            </div>
          </div>

          {/* Description for SEO */}
          {description && (
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-3xl">
              {description}
            </p>
          )}

          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { label: 'Jobs', count: totalJobs, icon: Briefcase, color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
              { label: 'Results', count: totalResults, icon: Award, color: 'bg-green-500/20 text-green-300 border-green-500/30' },
              { label: 'Admit Cards', count: totalAdmitCards, icon: CreditCard, color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
              { label: 'Answer Keys', count: totalAnswerKeys, icon: FileCheck, color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
              { label: 'Syllabus', count: totalSyllabus, icon: BookOpen, color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
            ].map((stat) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${stat.color}`}
                >
                  <StatIcon className="w-4 h-4 flex-shrink-0" />
                  <div>
                    <p className="text-lg font-bold leading-tight">{stat.count}</p>
                    <p className="text-[10px] uppercase tracking-wider opacity-80">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Related Exams Quick Links ── */}
      {relatedExams.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Popular {label} Exams
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedExams.map((exam) => (
              <Link
                key={exam}
                href={`/search?q=${encodeURIComponent(exam)}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-semibold rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400 border border-gray-200 dark:border-gray-700 transition-colors"
              >
                {exam}
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── Content Sections ── */}
      {totalItems === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
          <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4 text-3xl">
            {icon}
          </div>
          <p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">
            No updates available yet
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mx-auto">
            We are tracking {label} recruitment updates. Check back soon for the latest
            jobs, results, admit cards and more.
          </p>
        </div>
      ) : (
        SECTIONS.map((section, index) => (
          <ContentSection
            key={section.key}
            config={section}
            items={sectionData[section.key]}
            category={category}
          />
        ))
      )}

      {/* ── Quick Navigation / Resources ── */}
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* PYQ Practice */}
        <Link
          href="/pyq"
          className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 border border-indigo-200/60 dark:border-indigo-800/40 hover:shadow-lg hover:shadow-indigo-500/10 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
              PYQ Practice
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Previous year questions for {label} exams
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 ml-auto transition-colors" />
        </Link>

        {/* Full Category Page */}
        <Link
          href={`/category/${category}`}
          className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border border-emerald-200/60 dark:border-emerald-800/40 hover:shadow-lg hover:shadow-emerald-500/10 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
              All {label} Jobs
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Browse complete {label} job listing
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 ml-auto transition-colors" />
        </Link>

        {/* Exam Calendar */}
        <Link
          href="/exam-calendar"
          className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200/60 dark:border-amber-800/40 hover:shadow-lg hover:shadow-amber-500/10 transition-all"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
              Exam Calendar
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Upcoming exam dates &amp; deadlines
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 ml-auto transition-colors" />
        </Link>
      </div>

      {/* ── SEO FAQ Section (hidden structured data for Google) ── */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {[
            {
              q: `How to apply for ${label} jobs ${year}?`,
              a: `Visit the official ${label} website or check SarkariAlert for the latest ${label} recruitment notifications. Click on "Apply Online" to go directly to the application page. Make sure to check eligibility, age limit, and last date before applying.`,
            },
            {
              q: `What is the qualification required for ${label} exams?`,
              a: `Qualification requirements vary by post. ${label} recruitment includes posts for 10th pass, 12th pass, graduates, and post-graduates. Check the specific notification for detailed eligibility criteria.`,
            },
            {
              q: `How to check ${label} exam results?`,
              a: `${label} exam results are published on the official website. You can also check the Results section on SarkariAlert for direct links to ${label} result PDFs and merit lists.`,
            },
            {
              q: `Where to download ${label} admit card?`,
              a: `${label} admit cards can be downloaded from the official website using your registration number. Check the Admit Cards section on SarkariAlert for direct download links.`,
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                  {faq.q}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        {/* FAQ JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: `How to apply for ${label} jobs ${year}?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `Visit the official ${label} website or check SarkariAlert for the latest ${label} recruitment notifications. Click on "Apply Online" to go directly to the application page.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `What is the qualification required for ${label} exams?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `Qualification requirements vary by post. ${label} recruitment includes posts for 10th pass, 12th pass, graduates, and post-graduates. Check the specific notification for detailed eligibility criteria.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `How to check ${label} exam results?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `${label} exam results are published on the official website. You can also check the Results section on SarkariAlert for direct links to result PDFs and merit lists.`,
                  },
                },
                {
                  '@type': 'Question',
                  name: `Where to download ${label} admit card?`,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: `${label} admit cards can be downloaded from the official website using your registration number. Check the Admit Cards section on SarkariAlert for direct download links.`,
                  },
                },
              ],
            }),
          }}
        />
      </div>

      {/* ── Other Exam Bodies ── */}
      <div className="mt-12 mb-4">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
          Explore Other Categories
        </h2>
        <div className="flex flex-wrap gap-2">
          {HUB_CATEGORIES.filter((cat) => cat !== category).map((cat) => {
            const catLabel = CATEGORY_LABELS[cat] || cat;
            const catIcon = CATEGORY_ICONS[cat] || '';
            return (
              <Link
                key={cat}
                href={`/exam-hub/${cat}`}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg border transition-colors ${CATEGORY_COLORS[cat] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'} border-transparent hover:border-gray-300 dark:hover:border-gray-600`}
              >
                <span>{catIcon}</span>
                <span>{catLabel}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
