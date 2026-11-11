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
                { href: '/tools/exam-similarity', label: lang === 'hi' ? 'परीक्षा समानता' : 'Exam Similarity Finder' },
                { href: '/tools/score-normalizer', label: lang === 'hi' ? 'स्कोर नॉर्मलाइज़र' : 'Score Normalizer' },
                { href: '/tools/rank-predictor', label: lang === 'hi' ? 'रैंक प्रेडिक्टर' : 'Rank Predictor' },
                { href: '/tools/career-path', label: lang === 'hi' ? 'करियर पथ' : 'Career Path Finder' },
                { href: '/tools/exam-recommender', label: lang === 'hi' ? 'परीक्षा सुझाव' : 'Exam Recommender' },
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

        {/* Join Us Section */}
        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {lang === 'hi' ? 'जुड़ें हमसे:' : 'Join Us:'}
            </span>
            <div className="flex items-center gap-3">
              <a href="https://whatsapp.com/channel/0029VaExample" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-bold hover:bg-green-700 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp
              </a>
              <a href="https://t.me/sarkarialert_official" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500 text-white text-xs font-bold hover:bg-blue-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                Telegram
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
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
      </div>
    </footer>
  );
}
