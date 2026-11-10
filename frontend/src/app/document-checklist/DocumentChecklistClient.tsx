'use client';

import { useState, useEffect } from 'react';
import { FileCheck, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';

const DOCS = [
  { id: 'photo', name: 'Photo (Passport Size)', hi: 'फोटो (पासपोर्ट साइज)' },
  { id: 'signature', name: 'Signature', hi: 'हस्ताक्षर' },
  { id: '10th', name: '10th Marksheet', hi: '10वीं मार्कशीट' },
  { id: '12th', name: '12th Marksheet', hi: '12वीं मार्कशीट' },
  { id: 'grad', name: 'Graduation Certificate', hi: 'स्नातक प्रमाणपत्र' },
  { id: 'caste', name: 'Caste Certificate (SC/ST/OBC)', hi: 'जाति प्रमाणपत्र' },
  { id: 'income', name: 'Income Certificate', hi: 'आय प्रमाणपत्र' },
  { id: 'domicile', name: 'Domicile Certificate', hi: 'मूल निवास प्रमाणपत्र' },
  { id: 'aadhar', name: 'Aadhar Card', hi: 'आधार कार्ड' },
  { id: 'pan', name: 'PAN Card', hi: 'पैन कार्ड' },
  { id: 'medical', name: 'Medical Certificate', hi: 'मेडिकल प्रमाणपत्र' },
  { id: 'character', name: 'Character Certificate', hi: 'चरित्र प्रमाणपत्र' },
  { id: 'noc', name: 'NOC (if employed)', hi: 'NOC (यदि कार्यरत)' },
  { id: 'exp', name: 'Experience Certificate', hi: 'अनुभव प्रमाणपत्र' },
];

const KEY = 'sarkari_doc_checklist';
function load(): Record<string, boolean> { try { const d = localStorage.getItem(KEY); return d ? JSON.parse(d) : {}; } catch { return {}; } }
function save(c: Record<string, boolean>) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch {} }

export function DocumentChecklistClient() {
  const { lang } = useLanguage();
  const isHi = lang === 'hi';
  const [mounted, setMounted] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => { setChecked(load()); setMounted(true); }, []);

  const toggle = (id: string) => { const u = { ...checked, [id]: !checked[id] }; setChecked(u); save(u); };
  const reset = () => { setChecked({}); save({}); };

  const ready = DOCS.filter(d => checked[d.id]).length;
  const pct = Math.round((ready / DOCS.length) * 100);

  if (!mounted) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-gray-200 border-t-cyan-600 rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
          <FileCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{isHi ? 'दस्तावेज़ चेकलिस्ट' : 'Document Checklist'}</h1>
          <p className="text-sm text-gray-500">{isHi ? 'सरकारी परीक्षा के लिए ज़रूरी दस्तावेज़' : 'Essential documents for government exams'}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-gray-900 dark:text-white">{ready} of {DOCS.length} {isHi ? 'तैयार' : 'ready'}</span>
          <span className="text-sm font-extrabold text-cyan-600">{pct}%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        {pct === 100 && <p className="text-xs font-bold text-green-600 mt-2">{isHi ? 'सभी दस्तावेज़ तैयार!' : 'All documents ready!'}</p>}
      </div>

      <div className="space-y-2 mb-4">
        {DOCS.map(doc => (
          <button key={doc.id} onClick={() => toggle(doc.id)} className={cn(
            'w-full flex items-center gap-3 p-3.5 rounded-xl border transition-all text-left',
            checked[doc.id] ? 'bg-cyan-50 dark:bg-cyan-900/10 border-cyan-300 dark:border-cyan-700' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
          )}>
            <div className={cn('w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0', checked[doc.id] ? 'bg-cyan-600 border-cyan-600' : 'border-gray-300 dark:border-gray-600')}>
              {checked[doc.id] && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
            </div>
            <span className={cn('text-sm font-semibold', checked[doc.id] ? 'text-cyan-700 dark:text-cyan-300 line-through' : 'text-gray-900 dark:text-white')}>
              {isHi ? doc.hi : doc.name}
            </span>
          </button>
        ))}
      </div>

      {ready > 0 && (
        <button onClick={reset} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 text-xs font-bold">
          <RotateCcw className="w-3 h-3" /> {isHi ? 'सभी रीसेट' : 'Reset All'}
        </button>
      )}
    </div>
  );
}
