'use client';

import { useState } from 'react';
import { Calculator, RotateCcw, Info, GraduationCap } from 'lucide-react';

const FORMULAS: Record<string, { label: string; toPercentage: (cgpa: number) => number; toCgpa: (pct: number) => number; formula: string }> = {
  cbse: {
    label: 'CBSE',
    toPercentage: (cgpa) => cgpa * 9.5,
    toCgpa: (pct) => pct / 9.5,
    formula: 'Percentage = CGPA × 9.5',
  },
  vtu: {
    label: 'VTU',
    toPercentage: (cgpa) => cgpa * 10 - 7.5,
    toCgpa: (pct) => (pct + 7.5) / 10,
    formula: 'Percentage = CGPA × 10 − 7.5',
  },
  mumbai: {
    label: 'Mumbai University',
    toPercentage: (cgpa) => (cgpa - 0.75) * 10,
    toCgpa: (pct) => pct / 10 + 0.75,
    formula: 'Percentage = (CGPA − 0.75) × 10',
  },
  anna: {
    label: 'Anna University',
    toPercentage: (cgpa) => cgpa * 10,
    toCgpa: (pct) => pct / 10,
    formula: 'Percentage = CGPA × 10',
  },
  ktu: {
    label: 'KTU (APJ Abdul Kalam)',
    toPercentage: (cgpa) => cgpa * 10 - 5,
    toCgpa: (pct) => (pct + 5) / 10,
    formula: 'Percentage = CGPA × 10 − 5',
  },
  generic: {
    label: 'Generic / Custom Multiplier',
    toPercentage: (cgpa) => cgpa * 10,
    toCgpa: (pct) => pct / 10,
    formula: 'Percentage = CGPA × Multiplier',
  },
};

export function CgpaConverter() {
  const [mode, setMode] = useState<'cgpa-to-pct' | 'pct-to-cgpa'>('cgpa-to-pct');
  const [university, setUniversity] = useState('cbse');
  const [cgpa, setCgpa] = useState('');
  const [percentage, setPercentage] = useState('');
  const [customMultiplier, setCustomMultiplier] = useState('10');
  const [result, setResult] = useState<{ value: number; formula: string } | null>(null);

  const calculate = () => {
    const formula = FORMULAS[university];
    if (!formula) return;

    if (mode === 'cgpa-to-pct') {
      const val = parseFloat(cgpa);
      if (isNaN(val) || val < 0 || val > 10) return;
      let pct: number;
      if (university === 'generic') {
        const mult = parseFloat(customMultiplier);
        if (isNaN(mult) || mult <= 0) return;
        pct = val * mult;
      } else {
        pct = formula.toPercentage(val);
      }
      setResult({ value: Math.round(pct * 100) / 100, formula: formula.formula });
    } else {
      const val = parseFloat(percentage);
      if (isNaN(val) || val < 0 || val > 100) return;
      let cgpaVal: number;
      if (university === 'generic') {
        const mult = parseFloat(customMultiplier);
        if (isNaN(mult) || mult <= 0) return;
        cgpaVal = val / mult;
      } else {
        cgpaVal = formula.toCgpa(val);
      }
      setResult({ value: Math.round(cgpaVal * 100) / 100, formula: formula.formula });
    }
  };

  const reset = () => {
    setCgpa('');
    setPercentage('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => { setMode('cgpa-to-pct'); reset(); }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
            mode === 'cgpa-to-pct'
              ? 'bg-[#1a3a5c] text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          CGPA → Percentage
        </button>
        <button
          onClick={() => { setMode('pct-to-cgpa'); reset(); }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
            mode === 'pct-to-cgpa'
              ? 'bg-[#1a3a5c] text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          Percentage → CGPA
        </button>
      </div>

      {/* University / Board selector */}
      <div>
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Select University / Board</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {Object.entries(FORMULAS).map(([key, f]) => (
            <button
              key={key}
              onClick={() => { setUniversity(key); setResult(null); }}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                university === key
                  ? 'bg-[#1a3a5c] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom multiplier */}
      {university === 'generic' && (
        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Multiplier</label>
          <input
            type="number"
            value={customMultiplier}
            onChange={(e) => setCustomMultiplier(e.target.value)}
            placeholder="e.g. 9.5"
            step="0.1"
            min="0.1"
            className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
          />
        </div>
      )}

      {/* Input */}
      <div>
        {mode === 'cgpa-to-pct' ? (
          <div>
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Enter CGPA (0 – 10)</label>
            <input
              type="number"
              value={cgpa}
              onChange={(e) => setCgpa(e.target.value)}
              placeholder="e.g. 8.5"
              min="0"
              max="10"
              step="0.01"
              className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
            />
          </div>
        ) : (
          <div>
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Enter Percentage (0 – 100)</label>
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              placeholder="e.g. 80.75"
              min="0"
              max="100"
              step="0.01"
              className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
            />
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={calculate}
          className="flex-1 py-3.5 rounded-xl bg-[#1a3a5c] hover:bg-[#0d2137] text-white font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Calculator className="w-5 h-5" /> Convert
        </button>
        <button
          onClick={reset}
          className="px-4 py-3.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold transition-all active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className="rounded-2xl border-2 bg-purple-50 dark:bg-purple-950/30 border-purple-300 dark:border-purple-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <div>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                {mode === 'cgpa-to-pct' ? `CGPA ${cgpa} equals` : `${percentage}% equals`}
              </p>
            </div>
          </div>

          <div className="text-center p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 mb-4">
            <p className="text-4xl font-extrabold text-gray-900 dark:text-white">
              {result.value}{mode === 'cgpa-to-pct' ? '%' : ' CGPA'}
            </p>
            <p className="text-xs font-bold text-gray-500 uppercase mt-2">
              {mode === 'cgpa-to-pct' ? 'Percentage' : 'CGPA'}
            </p>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              Formula used ({FORMULAS[university].label}): <strong>{result.formula}</strong>
            </p>
          </div>
        </div>
      )}

      {/* Formula reference table */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3">
          <p className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase">Conversion Formulas</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left px-4 py-2 font-bold text-gray-600 dark:text-gray-400">University / Board</th>
                <th className="text-left px-4 py-2 font-bold text-gray-600 dark:text-gray-400">Formula</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {Object.entries(FORMULAS).filter(([k]) => k !== 'generic').map(([key, f]) => (
                <tr key={key}>
                  <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">{f.label}</td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{f.formula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
