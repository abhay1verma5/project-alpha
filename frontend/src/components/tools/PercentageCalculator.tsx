'use client';

import { useState } from 'react';
import { Calculator, RotateCcw, Info } from 'lucide-react';

const TOTAL_PRESETS = [100, 200, 300, 400, 500, 600, 720];

function getGrade(pct: number): { grade: string; color: string } {
  if (pct >= 90) return { grade: 'A+', color: 'text-green-600 dark:text-green-400' };
  if (pct >= 80) return { grade: 'A', color: 'text-green-600 dark:text-green-400' };
  if (pct >= 70) return { grade: 'B+', color: 'text-blue-600 dark:text-blue-400' };
  if (pct >= 60) return { grade: 'B', color: 'text-blue-600 dark:text-blue-400' };
  if (pct >= 50) return { grade: 'C', color: 'text-yellow-600 dark:text-yellow-400' };
  if (pct >= 33) return { grade: 'D', color: 'text-orange-600 dark:text-orange-400' };
  return { grade: 'F', color: 'text-red-600 dark:text-red-400' };
}

export function PercentageCalculator() {
  const [mode, setMode] = useState<'marks-to-pct' | 'pct-to-marks'>('marks-to-pct');
  const [obtained, setObtained] = useState('');
  const [total, setTotal] = useState('');
  const [targetPct, setTargetPct] = useState('');
  const [result, setResult] = useState<{
    percentage?: number;
    marksNeeded?: number;
    grade: string;
    gradeColor: string;
  } | null>(null);

  const calculate = () => {
    if (mode === 'marks-to-pct') {
      const ob = parseFloat(obtained);
      const tot = parseFloat(total);
      if (isNaN(ob) || isNaN(tot) || tot <= 0 || ob < 0) return;
      const pct = (ob / tot) * 100;
      const { grade, color } = getGrade(pct);
      setResult({ percentage: Math.round(pct * 100) / 100, grade, gradeColor: color });
    } else {
      const pct = parseFloat(targetPct);
      const tot = parseFloat(total);
      if (isNaN(pct) || isNaN(tot) || tot <= 0 || pct < 0 || pct > 100) return;
      const marks = (pct / 100) * tot;
      const { grade, color } = getGrade(pct);
      setResult({ marksNeeded: Math.ceil(marks * 100) / 100, grade, gradeColor: color, percentage: pct });
    }
  };

  const reset = () => {
    setObtained('');
    setTotal('');
    setTargetPct('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => { setMode('marks-to-pct'); reset(); }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
            mode === 'marks-to-pct'
              ? 'bg-[#1a3a5c] text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          Marks → Percentage
        </button>
        <button
          onClick={() => { setMode('pct-to-marks'); reset(); }}
          className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
            mode === 'pct-to-marks'
              ? 'bg-[#1a3a5c] text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          Percentage → Marks
        </button>
      </div>

      {/* Quick presets */}
      <div>
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Quick Total Marks</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {TOTAL_PRESETS.map((t) => (
            <button
              key={t}
              onClick={() => setTotal(String(t))}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                total === String(t)
                  ? 'bg-[#1a3a5c] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mode === 'marks-to-pct' ? (
          <div>
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Obtained Marks</label>
            <input
              type="number"
              value={obtained}
              onChange={(e) => setObtained(e.target.value)}
              placeholder="e.g. 425"
              min="0"
              className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
            />
          </div>
        ) : (
          <div>
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Target Percentage (%)</label>
            <input
              type="number"
              value={targetPct}
              onChange={(e) => setTargetPct(e.target.value)}
              placeholder="e.g. 75"
              min="0"
              max="100"
              className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
            />
          </div>
        )}
        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Total Marks</label>
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            placeholder="e.g. 500"
            min="1"
            className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={calculate}
          className="flex-1 py-3.5 rounded-xl bg-[#1a3a5c] hover:bg-[#0d2137] text-white font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Calculator className="w-5 h-5" /> Calculate
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
        <div className="rounded-2xl border-2 bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800 p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            {result.percentage !== undefined && (
              <div className="text-center p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{result.percentage}%</p>
                <p className="text-xs font-bold text-gray-500 uppercase mt-1">Percentage</p>
              </div>
            )}
            {result.marksNeeded !== undefined && (
              <div className="text-center p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{result.marksNeeded}</p>
                <p className="text-xs font-bold text-gray-500 uppercase mt-1">Marks Needed</p>
              </div>
            )}
            <div className="text-center p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <p className={`text-3xl font-extrabold ${result.gradeColor}`}>{result.grade}</p>
              <p className="text-xs font-bold text-gray-500 uppercase mt-1">Grade</p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              {mode === 'marks-to-pct'
                ? `You scored ${obtained} out of ${total} marks, which is ${result.percentage}% (Grade: ${result.grade}).`
                : `To get ${targetPct}% in a paper of ${total} marks, you need at least ${result.marksNeeded} marks.`}
            </p>
          </div>
        </div>
      )}

      {/* Grade Reference */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3">
          <p className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase">Grade Reference</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left px-4 py-2 font-bold text-gray-600 dark:text-gray-400">Percentage</th>
                <th className="text-left px-4 py-2 font-bold text-gray-600 dark:text-gray-400">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {[
                { range: '90% – 100%', grade: 'A+' },
                { range: '80% – 89%', grade: 'A' },
                { range: '70% – 79%', grade: 'B+' },
                { range: '60% – 69%', grade: 'B' },
                { range: '50% – 59%', grade: 'C' },
                { range: '33% – 49%', grade: 'D' },
                { range: 'Below 33%', grade: 'F' },
              ].map((row) => (
                <tr key={row.grade}>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{row.range}</td>
                  <td className="px-4 py-2 font-bold text-gray-900 dark:text-white">{row.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
