'use client';

import { useState } from 'react';
import { IndianRupee } from 'lucide-react';

const PAY_LEVELS: Record<string, { range: string; examples: string }> = {
  '1': { range: '18,000 – 56,900', examples: 'MTS, Group D, Peon' },
  '2': { range: '19,900 – 63,200', examples: 'LDC, SSC CHSL (SA/DEO)' },
  '3': { range: '21,700 – 69,100', examples: 'UDC, Stenographer' },
  '4': { range: '25,500 – 81,100', examples: 'SSC CGL (Auditor, Tax Asst)' },
  '5': { range: '29,200 – 92,300', examples: 'Inspector, ASI' },
  '6': { range: '35,400 – 1,12,400', examples: 'Section Officer, SO' },
  '7': { range: '44,900 – 1,42,400', examples: 'Assistant Professor, Under Secy' },
  '8': { range: '47,600 – 1,51,100', examples: 'UPSC Group B' },
  '9': { range: '53,100 – 1,67,800', examples: 'Deputy Director' },
  '10': { range: '56,100 – 1,77,500', examples: 'IAS/IPS Entry, Joint Director' },
  '11': { range: '67,700 – 2,08,700', examples: 'Director' },
  '12': { range: '78,800 – 2,09,200', examples: 'Additional Secretary' },
  '13': { range: '1,23,100 – 2,15,900', examples: 'Secretary level' },
  '14': { range: '1,44,200 – 2,18,200', examples: 'Secretary to GOI' },
};

const HRA_RATES = [
  { label: 'X (Metro: Delhi, Mumbai, etc.)', rate: 0.27 },
  { label: 'Y (Tier 2 cities)', rate: 0.18 },
  { label: 'Z (Other cities)', rate: 0.09 },
];

const DA_RATE = 0.56; // Current DA as of Jul 2026

export function SalaryCalculator() {
  const [level, setLevel] = useState('4');
  const [basicPay, setBasicPay] = useState(25500);
  const [hraCity, setHraCity] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const calculate = () => setShowResult(true);

  const da = Math.round(basicPay * DA_RATE);
  const hra = Math.round(basicPay * HRA_RATES[hraCity].rate);
  const ta = level <= '5' ? 3600 : 7200; // Transport Allowance
  const gross = basicPay + da + hra + ta;
  const nps = Math.round(basicPay * 0.10); // 10% NPS deduction
  const inHand = gross - nps;

  const fmt = (n: number) => '₹' + n.toLocaleString('en-IN');

  return (
    <div className="space-y-6">
      {/* Pay Level */}
      <div>
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Pay Level</label>
        <select
          value={level}
          onChange={(e) => {
            setLevel(e.target.value);
            const range = PAY_LEVELS[e.target.value].range;
            const minPay = parseInt(range.replace(/[^0-9]/g, ''));
            setBasicPay(minPay);
            setShowResult(false);
          }}
          className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
        >
          {Object.entries(PAY_LEVELS).map(([l, info]) => (
            <option key={l} value={l}>
              Level {l} — ₹{info.range} ({info.examples})
            </option>
          ))}
        </select>
      </div>

      {/* Basic Pay */}
      <div>
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
          Basic Pay (₹) — Level {level} range: ₹{PAY_LEVELS[level].range}
        </label>
        <input
          type="number"
          value={basicPay}
          onChange={(e) => { setBasicPay(+e.target.value); setShowResult(false); }}
          className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-lg"
        />
      </div>

      {/* City type for HRA */}
      <div>
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">City Type (for HRA)</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
          {HRA_RATES.map((h, i) => (
            <button
              key={i}
              onClick={() => { setHraCity(i); setShowResult(false); }}
              className={`px-4 py-3 rounded-xl text-sm font-bold transition-all active:scale-95 text-left ${
                hraCity === i
                  ? 'bg-[#1a3a5c] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {h.label} ({Math.round(h.rate * 100)}% HRA)
            </button>
          ))}
        </div>
      </div>

      {/* Calculate */}
      <button
        onClick={calculate}
        className="w-full py-3.5 rounded-xl bg-[#1a3a5c] hover:bg-[#0d2137] text-white font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
      >
        <IndianRupee className="w-5 h-5" /> Calculate Salary
      </button>

      {/* Result */}
      {showResult && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-[#1a3a5c]/20 dark:border-gray-700 overflow-hidden">
          <div className="bg-[#1a3a5c] px-6 py-4">
            <p className="text-sm font-semibold text-blue-200">Level {level} — {PAY_LEVELS[level].examples}</p>
            <p className="text-3xl font-extrabold text-white mt-1">
              In-hand: {fmt(inHand)}/month
            </p>
          </div>

          <div className="p-6 space-y-3">
            <Row label="Basic Pay" amount={basicPay} />
            <Row label={`DA (${Math.round(DA_RATE * 100)}%)`} amount={da} color="text-green-600" />
            <Row label={`HRA (${Math.round(HRA_RATES[hraCity].rate * 100)}% — ${HRA_RATES[hraCity].label.split('(')[0].trim()})`} amount={hra} color="text-blue-600" />
            <Row label="Transport Allowance" amount={ta} color="text-purple-600" />
            <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-3">
              <Row label="Gross Salary" amount={gross} bold />
            </div>
            <Row label="NPS Deduction (10%)" amount={-nps} color="text-red-600" />
            <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-3">
              <Row label="In-Hand Salary" amount={inHand} bold highlight />
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
              * Approximate. Actual salary may vary. DA rate: 56% (as of Jul 2026). Does not include income tax deduction.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, amount, bold, color, highlight }: {
  label: string; amount: number; bold?: boolean; color?: string; highlight?: boolean;
}) {
  const fmt = (n: number) => (n < 0 ? '- ₹' : '₹') + Math.abs(n).toLocaleString('en-IN');
  return (
    <div className={`flex items-center justify-between ${highlight ? 'bg-green-50 dark:bg-green-950/30 -mx-6 px-6 py-2 rounded-lg' : ''}`}>
      <span className={`text-sm ${bold ? 'font-extrabold text-gray-900 dark:text-white' : 'font-semibold text-gray-600 dark:text-gray-400'}`}>
        {label}
      </span>
      <span className={`text-sm font-extrabold ${color || (bold ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white')}`}>
        {fmt(amount)}
      </span>
    </div>
  );
}
