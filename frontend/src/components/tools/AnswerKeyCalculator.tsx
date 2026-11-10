'use client';

import { useState } from 'react';
import { Calculator, RotateCcw, Info, FileCheck } from 'lucide-react';

interface ExamPreset {
  label: string;
  totalQuestions: number;
  marksPerCorrect: number;
  negativePerWrong: number;
}

const PRESETS: ExamPreset[] = [
  { label: 'SSC CGL', totalQuestions: 100, marksPerCorrect: 2, negativePerWrong: 0.5 },
  { label: 'UPSC Prelims', totalQuestions: 100, marksPerCorrect: 2, negativePerWrong: 0.66 },
  { label: 'SSC GD', totalQuestions: 80, marksPerCorrect: 2, negativePerWrong: 0.5 },
  { label: 'Railway NTPC', totalQuestions: 100, marksPerCorrect: 1, negativePerWrong: 0.33 },
  { label: 'IBPS PO', totalQuestions: 100, marksPerCorrect: 1, negativePerWrong: 0.25 },
  { label: 'SSC CHSL', totalQuestions: 100, marksPerCorrect: 2, negativePerWrong: 0.5 },
  { label: 'Custom', totalQuestions: 100, marksPerCorrect: 1, negativePerWrong: 0.25 },
];

export function AnswerKeyCalculator() {
  const [preset, setPreset] = useState('SSC CGL');
  const [totalQ, setTotalQ] = useState('100');
  const [correct, setCorrect] = useState('');
  const [wrong, setWrong] = useState('');
  const [marksCorrect, setMarksCorrect] = useState('2');
  const [negativeMarks, setNegativeMarks] = useState('0.5');
  const [result, setResult] = useState<{
    totalScore: number;
    maxPossible: number;
    percentage: number;
    marksFromCorrect: number;
    marksLostNegative: number;
    unanswered: number;
  } | null>(null);

  const applyPreset = (p: ExamPreset) => {
    setPreset(p.label);
    setTotalQ(String(p.totalQuestions));
    setMarksCorrect(String(p.marksPerCorrect));
    setNegativeMarks(String(p.negativePerWrong));
    setResult(null);
  };

  const calculate = () => {
    const tq = parseInt(totalQ);
    const c = parseInt(correct);
    const w = parseInt(wrong);
    const mc = parseFloat(marksCorrect);
    const nm = parseFloat(negativeMarks);

    if (isNaN(tq) || isNaN(c) || isNaN(w) || isNaN(mc) || isNaN(nm)) return;
    if (c < 0 || w < 0 || c + w > tq) return;

    const unanswered = tq - c - w;
    const marksFromCorrect = c * mc;
    const marksLostNegative = w * nm;
    const totalScore = marksFromCorrect - marksLostNegative;
    const maxPossible = tq * mc;
    const percentage = maxPossible > 0 ? (totalScore / maxPossible) * 100 : 0;

    setResult({
      totalScore: Math.round(totalScore * 100) / 100,
      maxPossible,
      percentage: Math.round(percentage * 100) / 100,
      marksFromCorrect,
      marksLostNegative: Math.round(marksLostNegative * 100) / 100,
      unanswered,
    });
  };

  const reset = () => {
    setCorrect('');
    setWrong('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      {/* Exam presets */}
      <div>
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Select Exam</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => applyPreset(p)}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                preset === p.label
                  ? 'bg-[#1a3a5c] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Exam config inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Total Questions</label>
          <input
            type="number"
            value={totalQ}
            onChange={(e) => setTotalQ(e.target.value)}
            min="1"
            className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
          />
        </div>
        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Marks per Correct</label>
          <input
            type="number"
            value={marksCorrect}
            onChange={(e) => setMarksCorrect(e.target.value)}
            step="0.01"
            min="0"
            className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
          />
        </div>
        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Negative per Wrong</label>
          <input
            type="number"
            value={negativeMarks}
            onChange={(e) => setNegativeMarks(e.target.value)}
            step="0.01"
            min="0"
            className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
          />
        </div>
      </div>

      {/* Answer inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Correct Answers</label>
          <input
            type="number"
            value={correct}
            onChange={(e) => setCorrect(e.target.value)}
            placeholder="e.g. 65"
            min="0"
            className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
          />
        </div>
        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Wrong Answers</label>
          <input
            type="number"
            value={wrong}
            onChange={(e) => setWrong(e.target.value)}
            placeholder="e.g. 20"
            min="0"
            className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
          />
        </div>
      </div>

      {/* Auto-calculated unanswered */}
      {correct && wrong && totalQ && (
        <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-xl px-4 py-2">
          Unanswered: <strong>{Math.max(0, parseInt(totalQ) - parseInt(correct) - parseInt(wrong))} questions</strong>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={calculate}
          disabled={!correct || !wrong}
          className="flex-1 py-3.5 rounded-xl bg-[#1a3a5c] hover:bg-[#0d2137] text-white font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          <Calculator className="w-5 h-5" /> Calculate Score
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
        <div className="rounded-2xl border-2 bg-indigo-50 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileCheck className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            <div>
              <p className="text-xl font-extrabold text-indigo-700 dark:text-indigo-300">
                Your Score: {result.totalScore} / {result.maxPossible}
              </p>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                {preset} — {result.percentage}%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="text-center p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <p className="text-2xl font-extrabold text-green-600">{result.totalScore}</p>
              <p className="text-xs font-bold text-gray-500 uppercase">Total Score</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <p className="text-2xl font-extrabold text-blue-600">{result.percentage}%</p>
              <p className="text-xs font-bold text-gray-500 uppercase">Percentage</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <p className="text-2xl font-extrabold text-red-600">-{result.marksLostNegative}</p>
              <p className="text-xs font-bold text-gray-500 uppercase">Negative Marks</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <p className="text-2xl font-extrabold text-gray-600 dark:text-gray-400">{result.unanswered}</p>
              <p className="text-xs font-bold text-gray-500 uppercase">Unanswered</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm px-1">
              <span className="text-gray-600 dark:text-gray-400">Marks from correct answers:</span>
              <span className="font-bold text-green-600">+{result.marksFromCorrect}</span>
            </div>
            <div className="flex justify-between text-sm px-1">
              <span className="text-gray-600 dark:text-gray-400">Marks lost to negative marking:</span>
              <span className="font-bold text-red-600">-{result.marksLostNegative}</span>
            </div>
            <div className="flex justify-between text-sm px-1 pt-2 border-t border-gray-200 dark:border-gray-700">
              <span className="font-bold text-gray-700 dark:text-gray-300">Net Score:</span>
              <span className="font-extrabold text-gray-900 dark:text-white">{result.totalScore} / {result.maxPossible}</span>
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>
          Scoring formula: <strong>Total = (Correct x Marks per Correct) - (Wrong x Negative Marks per Wrong)</strong>. Unanswered questions carry no marks. Select an exam preset for auto-filled marking scheme.
        </p>
      </div>
    </div>
  );
}
