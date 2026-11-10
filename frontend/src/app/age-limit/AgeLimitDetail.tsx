'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import type { ExamAgeLimit } from './age-limit-data';

export function AgeLimitDetail({ exam }: { exam: ExamAgeLimit }) {
  const { lang, t } = useLanguage();
  const isHi = lang === 'hi';
  const r = exam.relaxation;

  const rows = [
    { label: t('General (UR)', 'सामान्य (UR)'), min: exam.minAge, max: exam.maxAge },
    { label: 'EWS', min: exam.minAge, max: exam.maxAge },
    ...(r.obc > 0 ? [{ label: 'OBC', min: exam.minAge, max: exam.maxAge + r.obc }] : []),
    ...(r.sc_st > 0 ? [{ label: 'SC / ST', min: exam.minAge, max: exam.maxAge + r.sc_st }] : []),
    ...(r.pwdGen > 0 ? [{ label: t('PwD (General)', 'PwD (सामान्य)'), min: exam.minAge, max: exam.maxAge + r.pwdGen }] : []),
    ...(r.pwdObc > 0 ? [{ label: t('PwD (OBC)', 'PwD (OBC)'), min: exam.minAge, max: exam.maxAge + r.pwdObc }] : []),
    ...(r.pwdScSt > 0 ? [{ label: t('PwD (SC/ST)', 'PwD (SC/ST)'), min: exam.minAge, max: exam.maxAge + r.pwdScSt }] : []),
    ...(r.exServicemen > 0 ? [{ label: t('Ex-Servicemen', 'भूतपूर्व सैनिक'), min: exam.minAge, max: exam.maxAge + r.exServicemen }] : []),
    ...(r.female > 0 ? [{ label: t('Female', 'महिला'), min: exam.minAge, max: exam.maxAge + r.female }] : []),
  ];

  const fmtAttempts = (v: number | 'unlimited') => (v === 'unlimited' ? t('Unlimited', 'असीमित') : `${v}`);

  return (
    <div className="space-y-6">
      {/* Age limit table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600">
          <h2 className="font-bold text-sm text-white">{t('Category-wise Age Limit', 'श्रेणी-वार आयु सीमा')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-2.5 text-left text-xs font-bold text-gray-700 dark:text-gray-300">{t('Category', 'श्रेणी')}</th>
                <th className="px-4 py-2.5 text-center text-xs font-bold text-gray-700 dark:text-gray-300">{t('Min Age', 'न्यूनतम आयु')}</th>
                <th className="px-4 py-2.5 text-center text-xs font-bold text-gray-700 dark:text-gray-300">{t('Max Age', 'अधिकतम आयु')}</th>
                <th className="px-4 py-2.5 text-center text-xs font-bold text-gray-700 dark:text-gray-300">{t('Relaxation', 'छूट')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {rows.map((row) => (
                <tr key={row.label}>
                  <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{row.label}</td>
                  <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-300">{row.min} {t('years', 'वर्ष')}</td>
                  <td className="px-4 py-3 text-center font-bold text-blue-700 dark:text-blue-400">
                    {row.max >= 99 ? t('No limit', 'कोई सीमा नहीं') : `${row.max} ${t('years', 'वर्ष')}`}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-500">
                    {row.max - exam.maxAge > 0 ? `+${row.max - exam.maxAge} ${t('years', 'वर्ष')}` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Attempts allowed */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="font-bold text-gray-900 dark:text-white mb-3">{t('Attempts Allowed', 'प्रयास सीमा')}</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
            <p className="text-xs text-gray-500 font-semibold">General</p>
            <p className="text-lg font-extrabold text-green-700 dark:text-green-400">{fmtAttempts(exam.attempts.gen)}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <p className="text-xs text-gray-500 font-semibold">OBC</p>
            <p className="text-lg font-extrabold text-blue-700 dark:text-blue-400">{fmtAttempts(exam.attempts.obc)}</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
            <p className="text-xs text-gray-500 font-semibold">SC/ST</p>
            <p className="text-lg font-extrabold text-purple-700 dark:text-purple-400">{fmtAttempts(exam.attempts.sc_st)}</p>
          </div>
        </div>
      </div>

      {/* Important details */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-3">
        <h3 className="font-bold text-gray-900 dark:text-white">{t('Important Details', 'महत्वपूर्ण विवरण')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-gray-500 font-semibold">{t('Age Cutoff Date', 'आयु कटऑफ तिथि')}</p>
            <p className="font-bold text-gray-900 dark:text-white">{exam.cutoffDate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold">{t('Qualification', 'योग्यता')}</p>
            <p className="font-bold text-gray-900 dark:text-white">{exam.qualification}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs text-gray-500 font-semibold">{t('Organization', 'संगठन')}</p>
            <p className="font-bold text-gray-900 dark:text-white">{exam.organization}</p>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 p-4">
        <p className="text-xs text-yellow-800 dark:text-yellow-300 font-medium">
          {isHi ? exam.note_hi : exam.note}
        </p>
      </div>

      {/* Age calculator link */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-4 text-center">
        <p className="text-sm font-bold text-blue-900 dark:text-blue-200 mb-2">
          {t('Check if you\'re eligible for this exam', 'जांचें कि आप इस परीक्षा के लिए पात्र हैं')}
        </p>
        <Link
          href="/tools/age-calculator"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors"
        >
          {t('Open Age Calculator', 'आयु कैलकुलेटर खोलें')}
        </Link>
      </div>

      {/* Related links */}
      <div className="grid sm:grid-cols-3 gap-3">
        <Link href="/exam-pattern" className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:border-blue-400 transition-colors text-center">
          <p className="font-bold text-sm text-gray-900 dark:text-white">{t('Exam Patterns', 'परीक्षा पैटर्न')}</p>
          <p className="text-xs text-gray-500 mt-1">{t('View detailed patterns', 'विस्तृत पैटर्न देखें')}</p>
        </Link>
        <Link href="/cutoff-tracker" className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:border-green-400 transition-colors text-center">
          <p className="font-bold text-sm text-gray-900 dark:text-white">{t('Cut-off Marks', 'कट-ऑफ अंक')}</p>
          <p className="text-xs text-gray-500 mt-1">{t('Historical cutoffs', 'ऐतिहासिक कट-ऑफ')}</p>
        </Link>
        <Link href="/salary" className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:border-amber-400 transition-colors text-center">
          <p className="font-bold text-sm text-gray-900 dark:text-white">{t('Salary Details', 'सैलरी विवरण')}</p>
          <p className="text-xs text-gray-500 mt-1">{t('In-hand salary info', 'इन-हैंड सैलरी')}</p>
        </Link>
      </div>
    </div>
  );
}
