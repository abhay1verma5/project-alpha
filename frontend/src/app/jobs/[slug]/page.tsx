import type { Metadata } from 'next';
import { getJob } from '@/lib/api';
import { notFound } from 'next/navigation';
import {
  Calendar, MapPin, Users, GraduationCap, IndianRupee, Clock,
  ExternalLink, FileText, Building2, Shield, BookOpen,
  CheckCircle2, AlertTriangle, Globe, Share2
} from 'lucide-react';
import { CATEGORY_LABELS, CATEGORY_COLORS, STATE_LABELS, formatDate, formatNumber, cn } from '@/lib/utils';
import Link from 'next/link';
import { VacancyBreakdown, FeeDetails } from '@/components/ExpandableDetails';
import { ShareButtons } from '@/components/ShareButtons';
import { StickyApplyBar } from '@/components/StickyApplyBar';
import { ReadAloudButton } from '@/components/ReadAloudButton';
import { DownloadPDF } from '@/components/DownloadPDF';
import RelatedJobs from '@/components/RelatedJobs';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SourceBadge } from '@/components/SourceBadge';
import { ScamWarning } from '@/components/ScamWarning';
import { CalendarPlus, ListChecks, BookMarked, ClipboardList, Layers, UserCheck, Wallet } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const job = await getJob(slug);
    const desc = `${job.organization} — ${job.qualification || 'Various qualifications'}. ${job.vacancies ? formatNumber(job.vacancies) + ' vacancies.' : ''} Apply before ${formatDate(job.last_date)}.`;
    const stateLabel = STATE_LABELS[job.state] || job.state;
    const categoryLabel = CATEGORY_LABELS[job.category] || job.category;
    const url = `https://sarkarialert.online/jobs/${slug}`;
    return {
      title: job.title,
      description: desc,
      keywords: [
        job.title,
        job.organization,
        categoryLabel,
        stateLabel,
        job.qualification || '',
        'sarkari naukri 2026',
        'government jobs',
      ].filter(Boolean),
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: job.title,
        description: desc,
        type: 'article',
        url,
        images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
      },
      twitter: {
        card: 'summary_large_image',
        title: job.title,
        description: desc,
        images: ['/opengraph-image'],
      },
    };
  } catch {
    return { title: 'Job Not Found' };
  }
}

const EXAM_RESOURCES: Record<string, { label: string; url: string }[]> = {
  ssc: [
    { label: 'SSC Official Site', url: 'https://ssc.gov.in' },
    { label: 'SSC Exam Calendar & Notices', url: 'https://ssc.gov.in/portal/EximNotice' },
  ],
  upsc: [
    { label: 'UPSC Official Site', url: 'https://upsc.gov.in' },
    { label: 'UPSC Syllabus', url: 'https://upsc.gov.in/examinations/syllabus' },
    { label: 'Previous Year Papers', url: 'https://upsc.gov.in/examinations/question-papers' },
  ],
  railway: [
    { label: 'RRB Official Site', url: 'https://www.rrbcdg.gov.in' },
    { label: 'Indian Railways Recruitment', url: 'https://indianrailways.gov.in' },
  ],
  banking: [
    { label: 'IBPS Official Site', url: 'https://www.ibps.in' },
    { label: 'SBI Careers', url: 'https://www.sbi.co.in/web/careers' },
    { label: 'RBI Recruitment', url: 'https://www.rbi.org.in' },
  ],
  defence: [
    { label: 'Join Indian Army', url: 'https://joinindianarmy.nic.in' },
    { label: 'Join Indian Navy', url: 'https://www.joinindiannavy.gov.in' },
    { label: 'Indian Air Force', url: 'https://indianairforce.nic.in' },
  ],
  police: [
    { label: 'SSC CPO', url: 'https://ssc.gov.in' },
  ],
  teaching: [
    { label: 'CTET Official', url: 'https://ctet.nic.in' },
    { label: 'KVS Official', url: 'https://www.kvs.gov.in' },
    { label: 'NVS Official', url: 'https://www.nvs.gov.in' },
  ],
  state_psc: [
    { label: 'UPPSC', url: 'https://uppsc.up.nic.in' },
    { label: 'BPSC', url: 'https://www.bpsc.bih.nic.in' },
    { label: 'MPPSC', url: 'https://www.mppsc.mp.gov.in' },
  ],
  health: [
    { label: 'NTA NEET', url: 'https://neet.nta.nic.in' },
    { label: 'AIIMS', url: 'https://www.aiims.edu' },
  ],
  engineering: [
    { label: 'NTA JEE', url: 'https://jeemain.nta.nic.in' },
    { label: 'DRDO', url: 'https://www.drdo.gov.in' },
    { label: 'ISRO Careers', url: 'https://www.isro.gov.in/career-opportunities' },
  ],
};

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  let job;
  try {
    job = await getJob(slug);
  } catch {
    notFound();
  }

  const categoryLabel = CATEGORY_LABELS[job.category] || job.category;
  const categoryColor = CATEGORY_COLORS[job.category] || CATEGORY_COLORS.other;
  const stateLabel = STATE_LABELS[job.state] || job.state;
  const resources = EXAM_RESOURCES[job.category] || [];

  // Map category to PYQ exam slug for linking
  const PYQ_EXAM_MAP: Record<string, string> = {
    ssc: 'SSC CGL', upsc: 'UPSC', railway: 'RRB NTPC', banking: 'IBPS PO',
    defence: 'NDA', police: 'SSC CPO', teaching: 'CTET', state_psc: 'State PSC',
    health: 'NEET', engineering: 'GATE',
  };
  const pyqExam = PYQ_EXAM_MAP[job.category];

  const details = [
    { icon: Building2, label: 'Organization / संगठन', value: job.organization },
    { icon: Users, label: 'Total Vacancies / कुल रिक्तियाँ', value: job.vacancies ? formatNumber(job.vacancies) + ' posts' : 'Various Posts / विभिन्न पद' },
    { icon: Calendar, label: 'Last Date / अंतिम तिथि', value: job.last_date ? formatDate(job.last_date) : 'See notification / नोटिफिकेशन देखें', highlight: !job.is_expired && job.days_left !== null && job.days_left <= 7 },
    { icon: Calendar, label: 'Posted On / पोस्ट तिथि', value: formatDate(job.posted_date) },
    { icon: GraduationCap, label: 'Qualification / योग्यता', value: job.qualification || 'See notification / नोटिफिकेशन देखें' },
    { icon: IndianRupee, label: 'Salary / वेतन', value: job.salary || 'See notification / नोटिफिकेशन देखें' },
    { icon: MapPin, label: 'Location / स्थान', value: stateLabel },
    { icon: UserCheck, label: 'Age Limit / आयु सीमा', value: job.age_limit || 'See notification / नोटिफिकेशन देखें' },
  ] as { icon: typeof Building2; label: string; value: string; highlight?: boolean }[];

  // JobPosting JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description || job.title,
    datePosted: job.posted_date,
    validThrough: job.last_date || undefined,
    employmentType: 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: job.organization || 'Government of India',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
        addressRegion: stateLabel,
      },
    },
    ...(job.salary && { baseSalary: { '@type': 'MonetaryAmount', currency: 'INR', value: { '@type': 'QuantitativeValue', value: job.salary } } }),
    ...(job.qualification && { qualifications: job.qualification }),
    ...(job.vacancies && { totalJobOpenings: job.vacancies }),
  };

  // FAQ rich result: the questions people actually search for a notice.
  const faq = [
    job.last_date && { q: `What is the last date to apply for ${job.title}?`, a: `The last date is ${formatDate(job.last_date)}. Apply only on the official website.` },
    job.qualification && { q: `What is the qualification for ${job.title}?`, a: job.qualification },
    job.age_limit && { q: `What is the age limit for ${job.title}?`, a: job.age_limit },
    job.vacancies && { q: `How many vacancies are there in ${job.title}?`, a: `${formatNumber(job.vacancies)} posts.` },
    job.salary && { q: `What is the salary for ${job.title}?`, a: job.salary },
    { q: `Is ${job.title} notification genuine?`, a: job.is_official ? `Yes. This notice was read from the official website ${job.source_host}. Never pay anyone to apply.` : `This notice was collected from a job aggregator. Verify it on the official website before paying any fee.` },
  ].filter(Boolean) as { q: string; a: string }[];
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <div id="job-detail-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      {/* Breadcrumbs with JSON-LD */}
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Jobs', href: '/jobs' },
          { label: job.title },
        ]}
      />

      {/* Main Card */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden mb-6">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-[#0d2137] to-[#1a3a5c] dark:from-[#0a1628] dark:to-[#132d47] px-6 sm:px-8 py-6">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={cn('text-[11px] font-bold px-3 py-1 rounded-lg bg-white/20 text-white backdrop-blur-sm')}>
              {categoryLabel}
            </span>
            {job.content_type !== 'job' && (
              <span className="text-[11px] font-bold px-3 py-1 rounded-lg bg-white/20 text-white backdrop-blur-sm">
                {job.content_type === 'result' ? 'Result' : job.content_type === 'admit_card' ? 'Admit Card' : job.content_type === 'answer_key' ? 'Answer Key' : job.content_type === 'admission' ? 'Admission' : 'Syllabus'}
              </span>
            )}
            {job.is_featured && (
              <span className="text-[11px] font-bold px-3 py-1 rounded-lg bg-amber-400/20 text-amber-200 backdrop-blur-sm">
                ★ Featured
              </span>
            )}
            <SourceBadge isOfficial={job.is_official} sourceHost={job.source_host} sourceUrl={job.source_url} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
            {job.title}
          </h1>

          {job.title_hi && (
            <p className="text-blue-100/80 text-base">{job.title_hi}</p>
          )}

          {/* Status badge */}
          <div className="mt-4 flex flex-wrap gap-3">
            {job.days_left !== null && job.days_left >= 0 && (
              <div className={cn(
                'inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-xl',
                job.days_left <= 3
                  ? 'bg-red-500/20 text-red-200'
                  : job.days_left <= 7
                    ? 'bg-amber-500/20 text-amber-200'
                    : 'bg-emerald-500/20 text-emerald-200'
              )}>
                <Clock className="w-4 h-4" />
                {job.days_left === 0 ? 'Last Day to Apply!' : `${job.days_left} days remaining`}
              </div>
            )}
            {job.is_expired && (
              <div className="inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-xl bg-gray-500/20 text-gray-300">
                <AlertTriangle className="w-4 h-4" /> Application Closed
              </div>
            )}
          </div>
        </div>

        {/* Action buttons - full width on mobile */}
        <div className="px-4 sm:px-8 py-4 sm:py-5 border-b border-gray-100 dark:border-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {job.apply_link && (
            <a
              href={job.apply_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] text-sm"
            >
              <ExternalLink className="w-4 h-4" /> {job.content_type === 'result' ? 'See Result' : job.content_type === 'admit_card' ? 'Download Admit Card' : job.content_type === 'answer_key' ? 'Download Answer Key' : job.content_type === 'admission' ? 'Apply for Admission' : 'Apply Online'}
            </a>
          )}
          {job.notification_pdf && (
            <a
              href={job.notification_pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3.5 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition-all hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-[0.98] text-sm"
            >
              <FileText className="w-4 h-4" /> Download Notification
            </a>
          )}
        </div>

        {/* Share & Save */}
        <div className="px-4 sm:px-8 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <Share2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <ShareButtons title={job.title} slug={slug} />
          <ReadAloudButton text={`${job.title}. Organization: ${job.organization || 'Not specified'}. ${job.qualification ? `Qualification: ${job.qualification}.` : ''} ${job.salary ? `Salary: ${job.salary}.` : ''} ${job.last_date ? `Last date to apply: ${job.last_date}.` : ''}`} />
          <DownloadPDF title={job.title} contentId="job-detail-content" />
          {job.last_date && !job.is_expired && (
            <a
              href={`/jobs/${slug}/deadline.ics`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold whitespace-nowrap hover:bg-blue-100 dark:hover:bg-blue-900/40 active:scale-95 transition-all"
              title="Adds the last date to your phone calendar with reminders 3 days and 1 day before"
            >
              <CalendarPlus className="w-4 h-4" /> Remind me
            </a>
          )}
          <Link
            href={`/exam/${encodeURIComponent(job.organization || job.title.split(' ').slice(0, 3).join(' '))}`}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-bold whitespace-nowrap hover:bg-purple-100 dark:hover:bg-purple-900/40 active:scale-95 transition-all"
            title="Notification, admit card, answer key and result for this exam in one timeline"
          >
            <ListChecks className="w-4 h-4" /> Track exam
          </Link>
        </div>

        {/* Scam warning: shown on every notice */}
        <div className="px-4 sm:px-8 pt-4">
          <ScamWarning officialHost={job.is_official ? job.source_host : undefined} />
        </div>

        {/* Expandable Vacancy + Fee */}
        <div className="px-6 sm:px-8 py-4 space-y-3">
          <VacancyBreakdown total={job.vacancies} details={job.vacancy_details} />
          <FeeDetails fee={job.fee} />
        </div>

        {/* Days Left bar — prominent countdown */}
        {!job.is_expired && job.days_left !== null && job.days_left > 0 && (
          <div className="px-6 sm:px-8 pt-4">
            <div className={cn(
              'flex items-center gap-3 p-3 rounded-xl border',
              job.days_left <= 3 ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800' :
              job.days_left <= 7 ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800' :
              'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
            )}>
              <Clock className={cn('w-5 h-5 flex-shrink-0',
                job.days_left <= 3 ? 'text-red-500' : job.days_left <= 7 ? 'text-amber-500' : 'text-emerald-500'
              )} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className={cn('text-sm font-bold',
                    job.days_left <= 3 ? 'text-red-700 dark:text-red-300' : job.days_left <= 7 ? 'text-amber-700 dark:text-amber-300' : 'text-emerald-700 dark:text-emerald-300'
                  )}>
                    {job.days_left} days left / {job.days_left} दिन शेष
                  </span>
                  <span className="text-xs text-gray-500">Last Date: {formatDate(job.last_date)}</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all',
                      job.days_left <= 3 ? 'bg-red-500' : job.days_left <= 7 ? 'bg-amber-500' : job.days_left <= 15 ? 'bg-yellow-400' : 'bg-emerald-500'
                    )}
                    style={{ width: `${Math.max(5, Math.min(100, (1 - job.days_left / 60) * 100))}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Eligibility & Details grid */}
        <div className="px-6 sm:px-8 py-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" /> Eligibility & Details / पात्रता और विवरण
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {details.map((d) => (
              <div key={d.label} className={cn(
                "flex items-start gap-3.5 p-4 rounded-xl border",
                d.highlight
                  ? "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
                  : "bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800"
              )}>
                <div className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
                  d.highlight ? "bg-red-100 dark:bg-red-900/30" : "bg-blue-100 dark:bg-blue-900/30"
                )}>
                  <d.icon className={cn("w-[18px] h-[18px]", d.highlight ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400")} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{d.label}</p>
                  <p className={cn("text-sm font-semibold mt-0.5", d.highlight ? "text-red-700 dark:text-red-300" : "text-gray-900 dark:text-white")}>{d.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Prepare — PYQ, Syllabus, Category, Exam Timeline links */}
        <div className="px-6 sm:px-8 pb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-indigo-500" /> Prepare for This Exam / तैयारी करें
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {pyqExam && (
              <Link
                href={`/pyq/${encodeURIComponent(pyqExam)}`}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-800/40 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors text-center"
              >
                <ClipboardList className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-bold text-indigo-800 dark:text-indigo-200">PYQ Practice</span>
                <span className="text-[10px] text-indigo-600/70 dark:text-indigo-400/70">पिछले प्रश्नपत्र</span>
              </Link>
            )}
            <Link
              href={`/syllabus?category=${job.category}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-800/40 hover:border-purple-400 dark:hover:border-purple-600 transition-colors text-center"
            >
              <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-bold text-purple-800 dark:text-purple-200">Syllabus</span>
              <span className="text-[10px] text-purple-600/70 dark:text-purple-400/70">पाठ्यक्रम</span>
            </Link>
            <Link
              href={`/category/${job.category}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-800/40 hover:border-blue-400 dark:hover:border-blue-600 transition-colors text-center"
            >
              <Layers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-bold text-blue-800 dark:text-blue-200">{categoryLabel} Jobs</span>
              <span className="text-[10px] text-blue-600/70 dark:text-blue-400/70">और नौकरियाँ देखें</span>
            </Link>
            <Link
              href={`/exam/${encodeURIComponent(job.organization || job.title.split(' ').slice(0, 3).join(' '))}`}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors text-center"
            >
              <ListChecks className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-200">Exam Timeline</span>
              <span className="text-[10px] text-emerald-600/70 dark:text-emerald-400/70">परीक्षा टाइमलाइन</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Description */}
      {job.description && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-500" /> Full Description
          </h2>
          <div className="prose dark:prose-invert max-w-none text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {job.description}
          </div>
        </div>
      )}

      {/* Preparation Resources */}
      {resources.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-500" /> Official Resources & Preparation
          </h2>
          <div className="grid gap-3">
            {resources.map((r) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {r.label}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </a>
            ))}
          </div>
          <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            All links point to official government websites only
          </p>
        </div>
      )}

      {/* Related Jobs */}
      <RelatedJobs category={job.category} state={job.state} currentSlug={slug} />

      {/* Source */}
      {job.source_url && (
        <div className="text-center py-4">
          <a
            href={job.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-1 transition-colors"
          >
            View original notification <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Print-only branding footer */}
      <div data-print-footer className="hidden">
        Downloaded from SarkariAlert.online — India&apos;s Government Job Portal
      </div>

      {/* Sticky Apply button for mobile */}
      {job.apply_link && (
        <StickyApplyBar
          applyLink={job.apply_link}
          label={job.content_type === 'result' ? 'See Result' : job.content_type === 'admit_card' ? 'Download Admit Card' : job.content_type === 'answer_key' ? 'Download Answer Key' : job.content_type === 'admission' ? 'Apply for Admission' : 'Apply Online'}
        />
      )}
    </div>
  );
}
