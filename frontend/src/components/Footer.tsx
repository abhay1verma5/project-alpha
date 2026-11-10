'use client';

import Link from 'next/link';
import { Briefcase } from 'lucide-react';
import { CATEGORY_LABELS } from '@/lib/utils';
import { useLanguage } from './LanguageProvider';
import { tr } from '@/lib/translations';

export function Footer() {
  const { lang } = useLanguage();
  const categories = Object.entries(CATEGORY_LABELS).slice(0, 8);

  return (
    <footer aria-label="Site footer" className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-12 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                Sarkari<span className="text-blue-600 dark:text-blue-400">Alert</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {tr('footer.description', lang)}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wider">{tr('footer.quickLinks', lang)}</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/jobs', label: tr('footer.latestJobs', lang) },
                { href: '/results', label: tr('nav.results', lang) },
                { href: '/admit-cards', label: tr('nav.admitCards', lang) },
                { href: '/answer-keys', label: tr('nav.answerKeys', lang) },
                { href: '/apply-online', label: lang === 'hi' ? 'ऑनलाइन आवेदन' : 'Apply Online' },
                { href: '/saved-jobs', label: tr('nav.savedJobs', lang) },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wider">{tr('footer.categories', lang)}</h3>
            <ul className="space-y-2.5">
              {categories.map(([key, label]) => (
                <li key={key}>
                  <Link href={`/exam-hub/${key}`} className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Free Tools */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wider">{tr('footer.freeTools', lang)}</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/tools/photo-resizer', label: tr('footer.photoResizer', lang) },
                { href: '/tools/age-calculator', label: tr('footer.ageCalc', lang) },
                { href: '/tools/salary-calculator', label: tr('footer.salaryCalc', lang) },
                { href: '/tools/jpg-to-pdf', label: lang === 'hi' ? 'JPG से PDF' : 'JPG to PDF' },
                { href: '/tools/photo-signature', label: lang === 'hi' ? 'फोटो + हस्ताक्षर' : 'Photo + Signature' },
                { href: '/tools', label: tr('footer.allTools', lang) },
                { href: '/ai-tools', label: tr('footer.aiTools', lang) },
                { href: '/pyq', label: tr('footer.pyqPractice', lang) },
                { href: '/mock-tests', label: tr('footer.mockTests', lang) },
                { href: '/typing-test', label: lang === 'hi' ? 'टाइपिंग टेस्ट' : 'Typing Test' },
                { href: '/exam-countdown', label: lang === 'hi' ? 'परीक्षा काउंटडाउन' : 'Exam Countdown' },
                { href: '/fee-calculator', label: lang === 'hi' ? 'शुल्क कैलकुलेटर' : 'Fee Calculator' },
                { href: '/cutoff-tracker', label: lang === 'hi' ? 'कट-ऑफ ट्रैकर' : 'Cut-off Tracker' },
                { href: '/salary', label: lang === 'hi' ? 'वेतन विवरण' : 'Salary Details' },
                { href: '/age-limit', label: lang === 'hi' ? 'आयु सीमा' : 'Age Limit Database' },
                { href: '/exam-pattern', label: lang === 'hi' ? 'परीक्षा पैटर्न' : 'Exam Pattern & Weightage' },
                { href: '/blog', label: lang === 'hi' ? 'ब्लॉग' : 'Blog & Guides' },
                { href: '/10th-pass-jobs', label: lang === 'hi' ? '10वीं पास नौकरी' : '10th Pass Jobs' },
                { href: '/12th-pass-jobs', label: lang === 'hi' ? '12वीं पास नौकरी' : '12th Pass Jobs' },
                { href: '/graduate-jobs', label: lang === 'hi' ? 'ग्रेजुएट नौकरी' : 'Graduate Jobs' },
                { href: '/diploma-jobs', label: lang === 'hi' ? 'ITI/डिप्लोमा नौकरी' : 'ITI/Diploma Jobs' },
                { href: '/study-planner', label: lang === 'hi' ? 'स्टडी प्लानर' : 'Study Planner' },
                { href: '/handwriting', label: lang === 'hi' ? 'हस्तलेखन अभ्यास' : 'Handwriting Practice' },
                { href: '/photo-editor', label: lang === 'hi' ? 'फोटो एडिटर' : 'Photo Editor' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wider">
              {lang === 'hi' ? 'कंपनी' : 'Company'}
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: '/about', label: tr('footer.about', lang) },
                { href: '/contact', label: tr('footer.contact', lang) },
                { href: '/faq', label: tr('footer.faq', lang) },
                { href: '/privacy', label: tr('footer.privacy', lang) },
                { href: '/terms', label: tr('footer.terms', lang) },
                { href: '/disclaimer', label: tr('footer.disclaimer', lang) },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            &copy; {tr('footer.copyright', lang)}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {tr('footer.privacy', lang)}
            </Link>
            <Link href="/terms" className="text-xs text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {tr('footer.terms', lang)}
            </Link>
            <Link href="/disclaimer" className="text-xs text-gray-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {tr('footer.disclaimer', lang)}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
