import { Suspense } from 'react';
import { Hero } from '@/components/Hero';
import { StatsBar } from '@/components/StatsBar';
import { ApplyTrackerBanner } from '@/components/ApplyTrackerBanner';
import { QuickFilters } from '@/components/QuickFilters';
import { HorizontalScroller } from '@/components/HorizontalScroller';
import { FeaturedCard } from '@/components/FeaturedCard';
import {
  getStats, getFeaturedJobs, getJobs, getResults, getAdmitCards,
  getAnswerKeys, getAdmissions, getSyllabus,
  type Job, type Stats,
} from '@/lib/api';
import Link from 'next/link';
import { ArrowRight, Sparkles, Newspaper, GraduationCap, FileText, ExternalLink, Wrench, Camera, FileImage, Combine, MapPin } from 'lucide-react';
import { STATES } from '@/lib/districts';

/* ---------- Async server components for streaming ---------- */

async function StatsSection() {
  const stats = await getStats().catch(() => null);
  if (!stats) return null;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-6 relative z-10">
      <StatsBar stats={stats} />
    </div>
  );
}

async function FeaturedSection() {
  const featured = await getFeaturedJobs().catch(() => []);
  if (!featured.length) return null;
  return (
    <div className="bg-gradient-to-b from-[#ff6f00]/5 to-white dark:from-orange-950/10 dark:to-gray-950 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#ff6f00] to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Featured Jobs</h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Top opportunities this week</p>
            </div>
          </div>
          <Link href="/jobs" className="flex items-center gap-1 text-sm font-semibold text-[#ff6f00] hover:text-orange-700 transition-colors">
            All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid gap-3">
          {featured.map((job, i) => (
            <FeaturedCard key={job.id} job={job} isFirst={i === 0} />
          ))}
        </div>
      </div>
    </div>
  );
}

async function LatestJobsSection() {
  const [jobs, results, admitCards, answerKeys, admissions, syllabus] = await Promise.all([
    getJobs({ page: '1' }).catch(() => ({ results: [] as Job[] })),
    getResults().catch(() => ({ results: [] as Job[] })),
    getAdmitCards().catch(() => ({ results: [] as Job[] })),
    getAnswerKeys().catch(() => ({ results: [] as Job[] })),
    getAdmissions().catch(() => ({ results: [] as Job[] })),
    getSyllabus().catch(() => ({ results: [] as Job[] })),
  ]);

  return (
    <>
      {(jobs.results?.length ?? 0) > 0 && (
        <div className="bg-gradient-to-b from-[#1a3a5c]/5 to-white dark:from-blue-950/10 dark:to-gray-950 py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HorizontalScroller title="Latest Job Notifications" subtitle="Newest government vacancies" iconName="Briefcase" iconBg="bg-gradient-to-br from-[#1a3a5c] to-[#0d2137] shadow-blue-900/20" jobs={jobs.results!.slice(0, 10)} viewAllHref="/jobs" viewAllColor="text-[#1a3a5c] dark:text-blue-400" />
          </div>
        </div>
      )}
      {(results.results?.length ?? 0) > 0 && (
        <div className="bg-gradient-to-b from-green-50/50 to-white dark:from-green-950/10 dark:to-gray-950 py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HorizontalScroller title="Latest Results" subtitle="Recently declared exam results" iconName="FileCheck" iconBg="bg-gradient-to-br from-green-600 to-green-700 shadow-green-500/20" jobs={results.results!.slice(0, 10)} viewAllHref="/results" viewAllColor="text-green-700 dark:text-green-400" cardBorder="border-green-200 dark:border-green-900/50" />
          </div>
        </div>
      )}
      {(admitCards.results?.length ?? 0) > 0 && (
        <div className="bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-950/10 dark:to-gray-950 py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HorizontalScroller title="Latest Admit Cards" subtitle="Download your hall ticket" iconName="CreditCard" iconBg="bg-gradient-to-br from-purple-600 to-purple-700 shadow-purple-500/20" jobs={admitCards.results!.slice(0, 10)} viewAllHref="/admit-cards" viewAllColor="text-purple-700 dark:text-purple-400" cardBorder="border-purple-200 dark:border-purple-900/50" />
          </div>
        </div>
      )}
      {(answerKeys.results?.length ?? 0) > 0 && (
        <div className="bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-950/10 dark:to-gray-950 py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HorizontalScroller title="Latest Answer Keys" subtitle="Check your exam answers" iconName="Key" iconBg="bg-gradient-to-br from-amber-600 to-amber-700 shadow-amber-500/20" jobs={answerKeys.results!.slice(0, 10)} viewAllHref="/answer-keys" viewAllColor="text-amber-700 dark:text-amber-400" cardBorder="border-amber-200 dark:border-amber-900/50" />
          </div>
        </div>
      )}
      {(admissions.results?.length ?? 0) > 0 && (
        <div className="bg-gradient-to-b from-cyan-50/50 to-white dark:from-cyan-950/10 dark:to-gray-950 py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HorizontalScroller title="Latest Admissions" subtitle="University & college admissions open" iconName="GraduationCap" iconBg="bg-gradient-to-br from-cyan-600 to-cyan-700 shadow-cyan-500/20" jobs={admissions.results!.slice(0, 10)} viewAllHref="/admissions" viewAllColor="text-cyan-700 dark:text-cyan-400" cardBorder="border-cyan-200 dark:border-cyan-900/50" />
          </div>
        </div>
      )}
      {(syllabus.results?.length ?? 0) > 0 && (
        <div className="bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950/10 dark:to-gray-950 py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HorizontalScroller title="Latest Syllabus" subtitle="Exam syllabus & pattern updates" iconName="BookOpen" iconBg="bg-gradient-to-br from-indigo-600 to-indigo-700 shadow-indigo-500/20" jobs={syllabus.results!.slice(0, 10)} viewAllHref="/syllabus" viewAllColor="text-indigo-700 dark:text-indigo-400" cardBorder="border-indigo-200 dark:border-indigo-900/50" />
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- Loading skeleton ---------- */
function SectionSkeleton() {
  return (
    <div className="py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg mb-4 animate-pulse" />
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex-shrink-0 w-72 h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function HomePage() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How to apply for government jobs in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Visit SarkariAlert.online to find latest government job notifications from SSC, UPSC, Railway, Banking, Defence, and State PSC. Click on any job to see eligibility, last date, and apply online link.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which are the best government jobs for 10th pass candidates?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Railway Group D, SSC MTS, Indian Army Agniveer, Police Constable, and various state government posts are available for 10th pass candidates. Check SarkariAlert for latest vacancies.',
        },
      },
      {
        '@type': 'Question',
        name: 'How to check sarkari result online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Visit the Results section on SarkariAlert to check latest government exam results for SSC, UPSC, Railway, Banking, State PSC and other exams. We provide direct links to official result pages.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the age limit for government jobs in India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Age limits vary by exam: SSC (18-27), UPSC (21-32), Railway (18-33), Banking (20-30), Defence (17.5-21 for Agniveer). SC/ST/OBC candidates get 3-5 years relaxation. Check individual job details on SarkariAlert.',
        },
      },
    ],
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* Instant — no API calls */}
      <Hero />

      {/* Stats — streams in independently */}
      <Suspense>
        <StatsSection />
      </Suspense>

      {/* Apply Tracker Banner — static */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6">
        <ApplyTrackerBanner />
      </div>

      {/* Quick Filters — static */}
      <div className="mt-8 sm:mt-12 bg-gradient-to-b from-white to-blue-50/50 dark:from-gray-950 dark:to-blue-950/10 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickFilters />
        </div>
      </div>

      {/* Featured — streams in */}
      <Suspense fallback={<SectionSkeleton />}>
        <FeaturedSection />
      </Suspense>

      {/* All job sections — streams in together */}
      <Suspense fallback={<><SectionSkeleton /><SectionSkeleton /></>}>
        <LatestJobsSection />
      </Suspense>

      {/* Browse by Qualification — static, renders instantly */}
      <div className="bg-gradient-to-b from-white to-purple-50/30 dark:from-gray-950 dark:to-purple-950/10 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Jobs by Qualification / योग्यता अनुसार नौकरी</h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Find jobs matching your education level</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { href: '/10th-pass-jobs', label: '10th Pass', hi: '10वीं पास', color: 'from-green-500 to-emerald-600', count: 'Railway, Army, Police' },
              { href: '/12th-pass-jobs', label: '12th Pass', hi: '12वीं पास', color: 'from-blue-500 to-indigo-600', count: 'SSC, Railway, Defence' },
              { href: '/graduate-jobs', label: 'Graduate', hi: 'ग्रेजुएट', color: 'from-purple-500 to-violet-600', count: 'UPSC, SSC CGL, Banking' },
              { href: '/diploma-jobs', label: 'ITI / Diploma', hi: 'ITI / डिप्लोमा', color: 'from-orange-500 to-amber-600', count: 'Railway, DRDO, PSU' },
            ].map((q) => (
              <Link key={q.href} href={q.href} className="group bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 p-4 sm:p-5 transition-all active:scale-[0.97]">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${q.color} flex items-center justify-center mb-3 shadow-lg`}>
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">{q.label}</h3>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{q.hi}</p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">{q.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Online + Tools CTA — static */}
      <div className="bg-gradient-to-b from-purple-50/30 to-white dark:from-purple-950/10 dark:to-gray-950 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link href="/apply-online" className="group bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 sm:p-6 text-white hover:shadow-xl hover:shadow-blue-500/20 transition-all active:scale-[0.98]">
              <ExternalLink className="w-8 h-8 mb-3 opacity-80" />
              <h3 className="font-bold text-lg">Apply Online / ऑनलाइन आवेदन</h3>
              <p className="text-blue-100 text-sm mt-1">All open forms sorted by deadline</p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-white/90 group-hover:gap-2 transition-all">Open Forms <ArrowRight className="w-4 h-4" /></span>
            </Link>
            <Link href="/tools/jpg-to-pdf" className="group bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl p-5 sm:p-6 text-white hover:shadow-xl hover:shadow-red-500/20 transition-all active:scale-[0.98]">
              <FileImage className="w-8 h-8 mb-3 opacity-80" />
              <h3 className="font-bold text-lg">JPG to PDF / फोटो से PDF</h3>
              <p className="text-red-100 text-sm mt-1">Convert images to PDF for uploads</p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-white/90 group-hover:gap-2 transition-all">Open Tool <ArrowRight className="w-4 h-4" /></span>
            </Link>
            <Link href="/tools/photo-signature" className="group bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl p-5 sm:p-6 text-white hover:shadow-xl hover:shadow-teal-500/20 transition-all active:scale-[0.98]">
              <Camera className="w-8 h-8 mb-3 opacity-80" />
              <h3 className="font-bold text-lg">Photo + Signature / फोटो + हस्ताक्षर</h3>
              <p className="text-teal-100 text-sm mt-1">Combine & resize for exam forms</p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-white/90 group-hover:gap-2 transition-all">Open Tool <ArrowRight className="w-4 h-4" /></span>
            </Link>
          </div>
        </div>
      </div>

      {/* Browse by State — static */}
      <div className="bg-gradient-to-b from-white to-blue-50/30 dark:from-gray-950 dark:to-blue-950/10 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Jobs by State / राज्य अनुसार नौकरी</h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Find district-wise government jobs near you</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
            {STATES.map((s) => (
              <Link key={s.slug} href={`/government-jobs/${s.slug}`} className="group flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-md">
                <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors truncate">{s.name}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">{s.districts.length} districts</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Free Tools — static */}
      <div className="bg-gradient-to-b from-blue-50/30 to-white dark:from-blue-950/10 dark:to-gray-950 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#ff6f00] flex items-center justify-center shadow-lg shadow-orange-500/20">
                <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Free Tools / मुफ्त टूल्स</h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Essential tools for exam preparation</p>
              </div>
            </div>
            <Link href="/tools" className="flex items-center gap-1 text-sm font-semibold text-[#ff6f00] hover:text-orange-700 transition-colors">
              All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { href: '/tools/exam-recommender', label: 'AI Exam Recommender', hi: 'परीक्षा सुझाव', desc: 'Find your ideal exam' },
              { href: '/tools/career-path', label: 'Career Path Finder', hi: 'करियर पथ', desc: 'All options by qualification' },
              { href: '/tools/rank-predictor', label: 'Rank Predictor', hi: 'रैंक प्रेडिक्टर', desc: 'Predict rank from marks' },
              { href: '/tools/exam-similarity', label: 'Exam Similarity', hi: 'परीक्षा समानता', desc: 'Overlap between exams' },
              { href: '/tools/score-normalizer', label: 'Score Normalizer', hi: 'स्कोर नॉर्मलाइज़र', desc: 'SSC/Railway normalization' },
              { href: '/tools/eligibility-checker', label: 'Eligibility Checker', hi: 'पात्रता जांच', desc: 'Check 60+ exams' },
              { href: '/tools/photo-resizer', label: 'Photo Resizer', hi: 'फोटो रिसाइज़र', desc: 'Resize for exam forms' },
              { href: '/tools/age-calculator', label: 'Age Calculator', hi: 'आयु कैलकुलेटर', desc: 'Check age eligibility' },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="group p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-[#ff6f00] dark:hover:border-[#ff6f00] transition-all hover:shadow-md">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-[#ff6f00] transition-colors">{t.label}</h3>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">{t.hi}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{t.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Job News CTA — static */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#1a3a5c] to-[#0f2b44] rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Want all updates in one feed?
            </h2>
            <p className="text-blue-100 mb-6 max-w-lg mx-auto">
              See every government job announcement, result, admit card and answer key in a single live news feed.
            </p>
            <Link
              href="/exam-calendar"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ff6f00] text-white font-semibold hover:bg-[#e65100] transition-colors shadow-lg shadow-orange-500/30"
            >
              <Newspaper className="w-4 h-4" />
              Go to Job News
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
