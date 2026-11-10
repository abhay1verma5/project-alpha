'use client';

import { useState } from 'react';
import { Calculator, CreditCard, Smartphone, Building2 } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';

type Cat = 'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'PH' | 'Female';

const FEES: Record<string, Record<Cat, number>> = {
  'SSC CGL': { General: 100, OBC: 100, SC: 0, ST: 0, EWS: 100, PH: 0, Female: 0 },
  'SSC CHSL': { General: 100, OBC: 100, SC: 0, ST: 0, EWS: 100, PH: 0, Female: 0 },
  'UPSC CSE': { General: 100, OBC: 100, SC: 0, ST: 0, EWS: 100, PH: 0, Female: 0 },
  'IBPS PO': { General: 850, OBC: 850, SC: 175, ST: 175, EWS: 850, PH: 0, Female: 850 },
  'IBPS Clerk': { General: 750, OBC: 750, SC: 175, ST: 175, EWS: 750, PH: 0, Female: 750 },
  'RRB NTPC': { General: 500, OBC: 500, SC: 250, ST: 250, EWS: 500, PH: 250, Female: 250 },
  'CTET': { General: 1000, OBC: 500, SC: 500, ST: 500, EWS: 1000, PH: 500, Female: 1000 },
  'NDA': { General: 100, OBC: 100, SC: 0, ST: 0, EWS: 100, PH: 0, Female: 100 },
};

const EXAMS = Object.keys(FEES);
const CATS: Cat[] = ['General', 'OBC', 'SC', 'ST', 'EWS', 'PH', 'Female'];

export function FeeCalculatorClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';
  const [exam, setExam] = useState('');
  const [cat, setCat] = useState<Cat | ''>('');

  const fee = exam && cat ? FEES[exam]?.[cat as Cat] : undefined;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-600 to-yellow-600 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{hi ? 'परीक्षा शुल्क कैलकुलेटर' : 'Exam Fee Calculator'}</h1>
          <p className="text-sm text-gray-500">{hi ? 'श्रेणी के अनुसार शुल्क जानें' : 'Know application fees by category'}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">{hi ? 'परीक्षा चुनें' : 'Select Exam'}</label>
        <select value={exam} onChange={e => setExam(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-semibold focus:outline-none focus:border-amber-400">
          <option value="">{hi ? '-- परीक्षा चुनें --' : '-- Choose exam --'}</option>
          {EXAMS.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">{hi ? 'श्रेणी चुनें' : 'Select Category'}</label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {CATS.map(c => (
            <button key={c} onClick={() => setCat(c)} className={cn('py-2.5 rounded-lg text-xs font-bold transition-all', cat === c ? 'bg-amber-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300')}>{c}</button>
          ))}
        </div>
      </div>

      {exam && cat && fee !== undefined && (
        <div className="bg-gradient-to-br from-amber-600 to-yellow-600 rounded-2xl p-6 text-center text-white mb-6 shadow-xl">
          <p className="text-sm font-semibold text-amber-100 mb-1">{exam} — {cat}</p>
          <p className="text-4xl font-extrabold">{fee === 0 ? (hi ? 'निःशुल्क' : 'FREE') : `₹${fee}`}</p>
          <p className="text-xs text-amber-100 mt-2">{hi ? 'आवेदन शुल्क (अनुमानित)' : 'Application Fee (approximate)'}</p>
        </div>
      )}

      {exam && (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-4">
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">{exam} — {hi ? 'सभी श्रेणियाँ' : 'All Categories'}</h3>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {CATS.map(c => { const f = FEES[exam]?.[c]; return (
              <div key={c} className={cn('flex items-center justify-between px-4 py-2.5', cat === c && 'bg-amber-50 dark:bg-amber-900/10')}>
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{c}</span>
                <span className={cn('text-sm font-extrabold', f === 0 ? 'text-green-600' : 'text-gray-900 dark:text-white')}>{f === 0 ? (hi ? 'निःशुल्क' : 'Free') : `₹${f}`}</span>
              </div>
            ); })}
          </div>
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-4">
        <h3 className="font-semibold text-sm text-blue-800 dark:text-blue-300 mb-3">{hi ? 'भुगतान के तरीके' : 'Payment Methods'}</h3>
        <div className="space-y-2">
          {[
            { icon: Building2, label: 'SBI Collect', desc: hi ? 'SBI की भुगतान पोर्टल' : 'Official SBI payment portal' },
            { icon: CreditCard, label: hi ? 'ऑनलाइन बैंकिंग' : 'Online Banking', desc: 'Net Banking / Debit / Credit Card' },
            { icon: Smartphone, label: 'UPI', desc: 'GPay, PhonePe, Paytm' },
          ].map(m => (
            <div key={m.label} className="flex items-center gap-3">
              <m.icon className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-blue-800 dark:text-blue-300">{m.label}</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
