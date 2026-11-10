import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase, Users, Target, Zap, BookOpen, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About SarkariAlert — India\'s most comprehensive government job portal with AI-powered tools.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1a3a5c] to-[#0f2b44] rounded-2xl p-6 sm:p-10 text-white mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#ff6f00] flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">About SarkariAlert</h1>
            <p className="text-blue-200 text-sm">India&apos;s Government Job Portal</p>
          </div>
        </div>
        <p className="text-blue-100 leading-relaxed">
          SarkariAlert is India&apos;s most comprehensive government job portal, designed to help millions of aspirants find their dream sarkari naukri. We aggregate job notifications, results, admit cards, and answer keys from all major government organizations across India.
        </p>
      </div>

      {/* Mission */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Target, title: 'Our Mission', desc: 'To make government job information accessible to every Indian, in their preferred language, with zero cost.', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300' },
          { icon: Users, title: 'Who We Serve', desc: 'Students, graduates, and working professionals across India preparing for SSC, UPSC, Railway, Banking, Defence, State PSC, and more.', color: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-300' },
          { icon: Zap, title: 'AI-Powered', desc: 'We use artificial intelligence to power smart job search, quiz generation, eligibility checking, and career guidance — all for free.', color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-300' },
        ].map((item) => (
          <div key={item.title} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-3`}>
              <item.icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* What We Offer */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#ff6f00]" /> What We Offer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            'Latest Government Job Notifications',
            'Exam Results & Merit Lists',
            'Admit Card Downloads',
            'Answer Keys & Cut-off Marks',
            'Previous Year Question Papers (PYQ)',
            'AI-Powered Mock Tests',
            'Daily Current Affairs & Quiz',
            'AI Career Guidance & Eligibility Checker',
            'Photo & Signature Resizer',
            'Age Calculator with Relaxation',
            'Salary Calculator (7th CPC)',
            'Bilingual Support (English & Hindi)',
            'Topic Weightage Analysis',
            'Exam Calendar & News',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6f00] flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Trust */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-600" /> Trust & Transparency
        </h2>
        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">&#10003;</span>
            <span>All data is sourced from official government websites</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">&#10003;</span>
            <span>We are <strong>not affiliated</strong> with any government body</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">&#10003;</span>
            <span>100% free — no hidden charges, no premium plans</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">&#10003;</span>
            <span>Updated daily with the latest notifications</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">&#10003;</span>
            <span>Always verify information from official sources before applying</span>
          </li>
        </ul>
      </div>

      <div className="text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
          Have questions or suggestions? We&apos;d love to hear from you.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff6f00] text-white font-bold rounded-xl hover:bg-orange-600 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
