'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';
import type { PostSalary } from './salary-data';

function fmt(n: number) {
  return n.toLocaleString('en-IN');
}

export function SalaryDetail({ post }: { post: PostSalary }) {
  const { lang, t } = useLanguage();
  const isHi = lang === 'hi';

  const daAmt = Math.round(post.basicPay * post.da / 100);
  const npsAmt = Math.round(post.basicPay * post.nps / 100);

  const cities = [
    { label: t('Metro (X)', 'मेट्रो (X)'), hra: post.hra.x, gross: post.grossSalary.metro, inHand: post.inHandSalary.metro },
    { label: t('Tier-2 (Y)', 'टियर-2 (Y)'), hra: post.hra.y, gross: post.grossSalary.tier2, inHand: post.inHandSalary.tier2 },
    { label: t('Other (Z)', 'अन्य (Z)'), hra: post.hra.z, gross: post.grossSalary.other, inHand: post.inHandSalary.other },
  ];

  const promoSteps = (isHi ? post.promotionPath_hi : post.promotionPath).split(' → ');

  return (
    <div className="space-y-6">
      {/* Salary breakdown table */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-600">
          <h2 className="font-bold text-sm text-white">{t('Salary Breakdown', 'सैलरी विवरण')}</h2>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{t('Basic Pay', 'मूल वेतन')}</span>
            <span className="font-bold text-gray-900 dark:text-white">₹{fmt(post.basicPay)}</span>
          </div>
          {post.gradePay && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">{t('Grade Pay', 'ग्रेड पे')}</span>
              <span className="font-bold text-gray-900 dark:text-white">₹{fmt(post.gradePay)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">DA ({post.da}%)</span>
            <span className="font-bold text-gray-900 dark:text-white">₹{fmt(daAmt)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">{t('Transport Allowance', 'परिवहन भत्ता')}</span>
            <span className="font-bold text-gray-900 dark:text-white">₹{fmt(post.ta)}</span>
          </div>
          {post.nps > 0 && (
            <div className="flex justify-between text-sm border-t border-dashed border-gray-200 dark:border-gray-700 pt-3">
              <span className="text-red-600 dark:text-red-400">NPS {t('Deduction', 'कटौती')} ({post.nps}%)</span>
              <span className="font-bold text-red-600 dark:text-red-400">-₹{fmt(npsAmt)}</span>
            </div>
          )}
        </div>
      </div>

      {/* 3-city comparison */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-600">
          <h2 className="font-bold text-sm text-white">{t('City-wise Salary Comparison', 'शहर-वार सैलरी तुलना')}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-2.5 text-left text-xs font-bold text-gray-700 dark:text-gray-300">{t('Component', 'घटक')}</th>
                {cities.map((c) => (
                  <th key={c.label} className="px-4 py-2.5 text-center text-xs font-bold text-gray-700 dark:text-gray-300">{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <tr>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-400">HRA</td>
                {cities.map((c) => (
                  <td key={c.label} className="px-4 py-3 text-center font-bold text-gray-900 dark:text-white">
                    {c.hra}% (₹{fmt(Math.round(post.basicPay * c.hra / 100))})
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold text-gray-700 dark:text-gray-300">{t('Gross Salary', 'कुल वेतन')}</td>
                {cities.map((c) => (
                  <td key={c.label} className="px-4 py-3 text-center font-bold text-gray-900 dark:text-white">₹{fmt(c.gross)}</td>
                ))}
              </tr>
              <tr className="bg-amber-50 dark:bg-amber-900/20">
                <td className="px-4 py-3 font-extrabold text-amber-800 dark:text-amber-300">{t('In-hand Salary', 'इन-हैंड सैलरी')}</td>
                {cities.map((c) => (
                  <td key={c.label} className="px-4 py-3 text-center font-extrabold text-amber-700 dark:text-amber-400">₹{fmt(c.inHand)}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Perks */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="font-bold text-gray-900 dark:text-white mb-3">{t('Perks & Allowances', 'भत्ते एवं सुविधाएं')}</h3>
        <div className="flex flex-wrap gap-2">
          {post.perks.map((perk) => (
            <span key={perk} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
              {perk}
            </span>
          ))}
        </div>
      </div>

      {/* Promotion path */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="font-bold text-gray-900 dark:text-white mb-3">{t('Promotion Path', 'पदोन्नति पथ')}</h3>
        <div className="flex flex-wrap items-center gap-1">
          {promoSteps.map((step, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className={`text-sm font-bold px-2.5 py-1 rounded-lg ${i === 0 ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>
                {step}
              </span>
              {i < promoSteps.length - 1 && <span className="text-gray-400">→</span>}
            </span>
          ))}
        </div>
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
        <Link href="/age-limit" className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 hover:border-blue-400 transition-colors text-center">
          <p className="font-bold text-sm text-gray-900 dark:text-white">{t('Age Limits', 'आयु सीमा')}</p>
          <p className="text-xs text-gray-500 mt-1">{t('Category-wise limits', 'श्रेणी-वार सीमा')}</p>
        </Link>
      </div>
    </div>
  );
}
