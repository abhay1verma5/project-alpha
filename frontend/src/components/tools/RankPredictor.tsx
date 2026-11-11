'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  TrendingUp,
  BarChart3,
  Target,
  Info,
  RotateCcw,
  ChevronDown,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

// ---------------------
// Types
// ---------------------
interface CutoffEntry {
  year: string;
  General: number;
  OBC: number;
  SC: number;
  ST: number;
  EWS: number;
  PH: number;
}

interface ExamConfig {
  label: string;
  totalMarks: number;
  totalCandidates: number; // approximate
  cutoffs: CutoffEntry[];
}

type CategoryKey = 'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'PH';

// ---------------------
// Exam Data
// ---------------------
const EXAMS: Record<string, ExamConfig> = {
  ssc_cgl: {
    label: 'SSC CGL (Tier 1)',
    totalMarks: 200,
    totalCandidates: 3000000,
    cutoffs: [
      { year: '2024', General: 142.50, OBC: 132.09, SC: 122.23, ST: 112.71, EWS: 137.50, PH: 90.00 },
      { year: '2023', General: 140.34, OBC: 130.17, SC: 120.87, ST: 110.42, EWS: 135.00, PH: 88.00 },
      { year: '2022', General: 144.00, OBC: 134.52, SC: 124.50, ST: 114.83, EWS: 139.00, PH: 92.00 },
    ],
  },
  ssc_chsl: {
    label: 'SSC CHSL (Tier 1)',
    totalMarks: 200,
    totalCandidates: 4000000,
    cutoffs: [
      { year: '2024', General: 197.51, OBC: 187.33, SC: 172.40, ST: 162.58, EWS: 192.00, PH: 140.00 },
      { year: '2023', General: 195.00, OBC: 185.67, SC: 170.50, ST: 160.25, EWS: 190.00, PH: 138.00 },
      { year: '2022', General: 199.25, OBC: 189.18, SC: 174.83, ST: 164.00, EWS: 194.00, PH: 142.00 },
    ],
  },
  ssc_mts: {
    label: 'SSC MTS',
    totalMarks: 200,
    totalCandidates: 5000000,
    cutoffs: [
      { year: '2024', General: 118.50, OBC: 108.00, SC: 97.50, ST: 87.00, EWS: 113.00, PH: 70.00 },
      { year: '2023', General: 116.83, OBC: 106.42, SC: 96.00, ST: 85.50, EWS: 111.00, PH: 68.00 },
      { year: '2022', General: 120.00, OBC: 110.25, SC: 99.00, ST: 89.00, EWS: 115.00, PH: 72.00 },
    ],
  },
  ssc_gd: {
    label: 'SSC GD Constable',
    totalMarks: 160,
    totalCandidates: 7000000,
    cutoffs: [
      { year: '2024', General: 102.50, OBC: 93.75, SC: 82.50, ST: 72.00, EWS: 97.00, PH: 60.00 },
      { year: '2023', General: 100.00, OBC: 91.50, SC: 80.00, ST: 70.50, EWS: 95.00, PH: 58.00 },
      { year: '2022', General: 105.00, OBC: 96.00, SC: 84.50, ST: 74.00, EWS: 99.00, PH: 62.00 },
    ],
  },
  upsc_prelims: {
    label: 'UPSC Prelims (GS Paper 1)',
    totalMarks: 200,
    totalCandidates: 1200000,
    cutoffs: [
      { year: '2024', General: 98.00, OBC: 92.00, SC: 80.00, ST: 73.00, EWS: 90.00, PH: 60.00 },
      { year: '2023', General: 95.33, OBC: 88.67, SC: 77.50, ST: 70.83, EWS: 87.00, PH: 58.00 },
      { year: '2022', General: 100.00, OBC: 94.50, SC: 82.00, ST: 75.00, EWS: 93.00, PH: 62.00 },
    ],
  },
  ibps_po: {
    label: 'IBPS PO (Prelims)',
    totalMarks: 100,
    totalCandidates: 1800000,
    cutoffs: [
      { year: '2024', General: 60.50, OBC: 52.75, SC: 42.50, ST: 36.00, EWS: 55.00, PH: 30.00 },
      { year: '2023', General: 58.33, OBC: 51.00, SC: 41.00, ST: 35.00, EWS: 53.00, PH: 28.00 },
      { year: '2022', General: 62.00, OBC: 54.50, SC: 44.00, ST: 38.00, EWS: 57.00, PH: 32.00 },
    ],
  },
  ibps_clerk: {
    label: 'IBPS Clerk (Prelims)',
    totalMarks: 100,
    totalCandidates: 2500000,
    cutoffs: [
      { year: '2024', General: 55.00, OBC: 47.25, SC: 38.00, ST: 32.00, EWS: 50.00, PH: 26.00 },
      { year: '2023', General: 53.50, OBC: 46.00, SC: 36.50, ST: 30.50, EWS: 48.00, PH: 24.00 },
      { year: '2022', General: 57.00, OBC: 49.50, SC: 40.00, ST: 34.00, EWS: 52.00, PH: 28.00 },
    ],
  },
  sbi_po: {
    label: 'SBI PO (Prelims)',
    totalMarks: 100,
    totalCandidates: 2000000,
    cutoffs: [
      { year: '2024', General: 62.00, OBC: 55.50, SC: 45.00, ST: 38.00, EWS: 57.00, PH: 32.00 },
      { year: '2023', General: 60.25, OBC: 53.75, SC: 43.50, ST: 36.50, EWS: 55.00, PH: 30.00 },
      { year: '2022', General: 64.00, OBC: 57.00, SC: 47.00, ST: 40.00, EWS: 59.00, PH: 34.00 },
    ],
  },
  sbi_clerk: {
    label: 'SBI Clerk (Prelims)',
    totalMarks: 100,
    totalCandidates: 2800000,
    cutoffs: [
      { year: '2024', General: 57.50, OBC: 50.00, SC: 40.50, ST: 34.00, EWS: 52.00, PH: 28.00 },
      { year: '2023', General: 55.75, OBC: 48.25, SC: 39.00, ST: 32.50, EWS: 50.00, PH: 26.00 },
      { year: '2022', General: 59.00, OBC: 52.00, SC: 42.00, ST: 36.00, EWS: 54.00, PH: 30.00 },
    ],
  },
  rrb_ntpc: {
    label: 'RRB NTPC (CBT 1)',
    totalMarks: 100,
    totalCandidates: 10000000,
    cutoffs: [
      { year: '2024', General: 68.00, OBC: 60.50, SC: 50.00, ST: 42.00, EWS: 63.00, PH: 35.00 },
      { year: '2023', General: 66.25, OBC: 58.75, SC: 48.50, ST: 40.50, EWS: 61.00, PH: 33.00 },
      { year: '2022', General: 70.00, OBC: 62.00, SC: 52.00, ST: 44.00, EWS: 65.00, PH: 37.00 },
    ],
  },
  rrb_group_d: {
    label: 'RRB Group D',
    totalMarks: 100,
    totalCandidates: 12000000,
    cutoffs: [
      { year: '2024', General: 62.00, OBC: 54.00, SC: 44.00, ST: 36.00, EWS: 57.00, PH: 30.00 },
      { year: '2023', General: 60.50, OBC: 52.50, SC: 42.50, ST: 34.50, EWS: 55.00, PH: 28.00 },
      { year: '2022', General: 64.00, OBC: 56.00, SC: 46.00, ST: 38.00, EWS: 59.00, PH: 32.00 },
    ],
  },
  ctet: {
    label: 'CTET',
    totalMarks: 150,
    totalCandidates: 3000000,
    cutoffs: [
      { year: '2024', General: 90.00, OBC: 82.50, SC: 75.00, ST: 75.00, EWS: 82.50, PH: 75.00 },
      { year: '2023', General: 90.00, OBC: 82.50, SC: 75.00, ST: 75.00, EWS: 82.50, PH: 75.00 },
      { year: '2022', General: 90.00, OBC: 82.50, SC: 75.00, ST: 75.00, EWS: 82.50, PH: 75.00 },
    ],
  },
  ugc_net: {
    label: 'UGC NET',
    totalMarks: 300,
    totalCandidates: 1500000,
    cutoffs: [
      { year: '2024', General: 192.00, OBC: 180.00, SC: 162.00, ST: 150.00, EWS: 185.00, PH: 132.00 },
      { year: '2023', General: 188.50, OBC: 176.50, SC: 159.00, ST: 147.00, EWS: 182.00, PH: 129.00 },
      { year: '2022', General: 195.00, OBC: 183.00, SC: 165.00, ST: 153.00, EWS: 188.00, PH: 135.00 },
    ],
  },
};

const CATEGORIES: { value: CategoryKey; label: string }[] = [
  { value: 'General', label: 'General' },
  { value: 'OBC', label: 'OBC' },
  { value: 'SC', label: 'SC' },
  { value: 'ST', label: 'ST' },
  { value: 'EWS', label: 'EWS' },
  { value: 'PH', label: 'PH (Divyang)' },
];

// ---------------------
// Prediction logic
// ---------------------
interface PredictionResult {
  rankMin: number;
  rankMax: number;
  selectionProbability: number;
  marksNeeded: number;
  cutoffs: CutoffEntry[];
  avgCutoff: number;
  maxCutoff: number;
  percentile: number;
}

function predictRank(
  examKey: string,
  marks: number,
  category: CategoryKey
): PredictionResult | null {
  const exam = EXAMS[examKey];
  if (!exam) return null;

  const cutoffs = exam.cutoffs;
  const categoryCutoffs = cutoffs.map((c) => c[category]);
  const avgCutoff = categoryCutoffs.reduce((a, b) => a + b, 0) / categoryCutoffs.length;
  const maxCutoff = Math.max(...categoryCutoffs);
  const minCutoff = Math.min(...categoryCutoffs);

  // Calculate percentile based on marks vs total marks
  const percentile = Math.min(99.99, Math.max(0.01, (marks / exam.totalMarks) * 100));

  // Estimate rank based on how marks compare to cutoff
  // If marks = avgCutoff, rank is roughly at the cutoff boundary (top 5-10% for most exams)
  const cutoffRatio = marks / avgCutoff;
  const totalApplicants = exam.totalCandidates;

  let rankEstimate: number;
  if (cutoffRatio >= 1.15) {
    // Well above cutoff - top performers
    const topFraction = Math.max(0.001, 0.05 * Math.pow(1.15 / cutoffRatio, 3));
    rankEstimate = Math.round(totalApplicants * topFraction);
  } else if (cutoffRatio >= 1.0) {
    // Above cutoff but within range
    const fraction = 0.05 + (1.15 - cutoffRatio) * 0.3;
    rankEstimate = Math.round(totalApplicants * fraction);
  } else if (cutoffRatio >= 0.85) {
    // Near cutoff
    const fraction = 0.10 + (1.0 - cutoffRatio) * 2.0;
    rankEstimate = Math.round(totalApplicants * fraction);
  } else {
    // Below cutoff
    const fraction = 0.40 + (0.85 - cutoffRatio) * 2.0;
    rankEstimate = Math.round(totalApplicants * Math.min(0.95, fraction));
  }

  rankEstimate = Math.max(1, rankEstimate);
  const rankMin = Math.max(1, Math.round(rankEstimate * 0.7));
  const rankMax = Math.round(rankEstimate * 1.3);

  // Selection probability
  let selectionProbability: number;
  const range = maxCutoff - minCutoff || 5;

  if (marks >= maxCutoff + range * 0.5) {
    selectionProbability = 95;
  } else if (marks >= maxCutoff) {
    selectionProbability = 80 + ((marks - maxCutoff) / (range * 0.5)) * 15;
  } else if (marks >= avgCutoff) {
    selectionProbability = 55 + ((marks - avgCutoff) / (maxCutoff - avgCutoff || 1)) * 25;
  } else if (marks >= minCutoff) {
    selectionProbability = 30 + ((marks - minCutoff) / (avgCutoff - minCutoff || 1)) * 25;
  } else if (marks >= minCutoff - range) {
    selectionProbability = 5 + ((marks - (minCutoff - range)) / range) * 25;
  } else {
    selectionProbability = Math.max(1, 5 * (marks / minCutoff));
  }

  selectionProbability = Math.min(98, Math.max(1, Math.round(selectionProbability)));

  // Marks needed to be safe (above max cutoff + 5% buffer)
  const safeMarks = maxCutoff + range * 0.3;
  const marksNeeded = Math.max(0, Math.round((safeMarks - marks) * 100) / 100);

  return {
    rankMin,
    rankMax,
    selectionProbability,
    marksNeeded,
    cutoffs,
    avgCutoff: Math.round(avgCutoff * 100) / 100,
    maxCutoff,
    percentile: Math.round(percentile * 100) / 100,
  };
}

// ---------------------
// Component
// ---------------------
export function RankPredictor() {
  const [examKey, setExamKey] = useState('ssc_cgl');
  const [marks, setMarks] = useState('');
  const [category, setCategory] = useState<CategoryKey>('General');
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState('');

  const exam = EXAMS[examKey];

  const handleExamChange = (key: string) => {
    setExamKey(key);
    setResult(null);
    setError('');
  };

  const handlePredict = () => {
    const m = parseFloat(marks);
    if (isNaN(m) || m < 0) {
      setError('Please enter valid marks / कृपया सही marks दर्ज करें');
      setResult(null);
      return;
    }
    if (m > exam.totalMarks) {
      setError(`Marks cannot exceed ${exam.totalMarks} / Marks ${exam.totalMarks} से ज़्यादा नहीं हो सकते`);
      setResult(null);
      return;
    }
    setError('');
    const prediction = predictRank(examKey, m, category);
    setResult(prediction);
  };

  const handleReset = () => {
    setMarks('');
    setResult(null);
    setError('');
  };

  const getProbabilityColor = (prob: number) => {
    if (prob >= 70) return { bg: 'bg-green-50 dark:bg-green-950/30', border: 'border-green-300 dark:border-green-800', text: 'text-green-700 dark:text-green-300', bar: 'bg-green-500' };
    if (prob >= 40) return { bg: 'bg-yellow-50 dark:bg-yellow-950/30', border: 'border-yellow-300 dark:border-yellow-800', text: 'text-yellow-700 dark:text-yellow-300', bar: 'bg-yellow-500' };
    return { bg: 'bg-red-50 dark:bg-red-950/30', border: 'border-red-300 dark:border-red-800', text: 'text-red-700 dark:text-red-300', bar: 'bg-red-500' };
  };

  const formatRank = (n: number) => n.toLocaleString('en-IN');

  return (
    <div className="space-y-6">
      {/* Exam Selection */}
      <div>
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
          Select Exam / परीक्षा चुनें
        </label>
        <div className="relative mt-1">
          <select
            value={examKey}
            onChange={(e) => handleExamChange(e.target.value)}
            className="w-full appearance-none px-4 py-3 pr-10 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
          >
            {Object.entries(EXAMS).map(([key, ex]) => (
              <option key={key} value={key}>
                {ex.label} (Total: {ex.totalMarks} marks)
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Marks and Total Marks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Marks Obtained / प्राप्त अंक
          </label>
          <input
            type="number"
            value={marks}
            onChange={(e) => { setMarks(e.target.value); setResult(null); setError(''); }}
            placeholder={`e.g. ${Math.round(exam.totalMarks * 0.65)}`}
            min="0"
            max={exam.totalMarks}
            step="0.01"
            className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-lg"
          />
        </div>
        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Total Marks / कुल अंक
          </label>
          <input
            type="number"
            value={exam.totalMarks}
            readOnly
            className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-bold text-lg cursor-not-allowed"
          />
        </div>
      </div>

      {/* Category Selection */}
      <div>
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
          Category / वर्ग
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => { setCategory(cat.value); setResult(null); }}
              className={cn(
                'px-3 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 text-center',
                category === cat.value
                  ? 'bg-[#1a3a5c] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-xl px-4 py-3 border border-red-200 dark:border-red-800">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handlePredict}
          disabled={!marks}
          className="flex-1 py-3.5 rounded-xl bg-[#1a3a5c] hover:bg-[#0d2137] text-white font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          <TrendingUp className="w-5 h-5" /> Predict Rank
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-3.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold transition-all active:scale-95"
          title="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-5">
          {/* Header Card */}
          <div className="rounded-2xl bg-[#1a3a5c] p-5 text-white">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="w-7 h-7" />
              <div>
                <h3 className="text-lg font-extrabold">{exam.label}</h3>
                <p className="text-sm opacity-80">{category} Category | Marks: {marks} / {exam.totalMarks}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-2xl sm:text-3xl font-extrabold">{formatRank(result.rankMin)} - {formatRank(result.rankMax)}</p>
                <p className="text-xs font-semibold opacity-80 mt-1">Estimated Rank Range</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="text-2xl sm:text-3xl font-extrabold">{result.selectionProbability}%</p>
                <p className="text-xs font-semibold opacity-80 mt-1">Selection Probability</p>
              </div>
            </div>
          </div>

          {/* Selection Probability Gauge */}
          <div className={cn(
            'rounded-2xl border-2 p-5',
            getProbabilityColor(result.selectionProbability).bg,
            getProbabilityColor(result.selectionProbability).border,
          )}>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5" />
              <h4 className={cn('font-extrabold text-base', getProbabilityColor(result.selectionProbability).text)}>
                Selection Probability / चयन संभावना
              </h4>
            </div>

            {/* Gauge bar */}
            <div className="relative h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-700 ease-out',
                  getProbabilityColor(result.selectionProbability).bar,
                )}
                style={{ width: `${result.selectionProbability}%` }}
              />
              {/* Markers */}
              <div className="absolute inset-0 flex items-center">
                <div className="absolute left-[40%] top-0 bottom-0 w-px bg-gray-400/50" />
                <div className="absolute left-[70%] top-0 bottom-0 w-px bg-gray-400/50" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-extrabold text-white drop-shadow-md">
                  {result.selectionProbability}%
                </span>
              </div>
            </div>
            <div className="flex justify-between text-xs font-semibold text-gray-500 dark:text-gray-400">
              <span>Low / कम</span>
              <span>Moderate / मध्यम</span>
              <span>High / अधिक</span>
            </div>

            {/* Status message */}
            <div className={cn(
              'mt-3 px-4 py-2.5 rounded-xl text-sm font-bold',
              result.selectionProbability >= 70
                ? 'bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200'
                : result.selectionProbability >= 40
                  ? 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200'
                  : 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200'
            )}>
              {result.selectionProbability >= 70 && (
                <span>Strong chances of selection! / चयन की बहुत अच्छी संभावना!</span>
              )}
              {result.selectionProbability >= 40 && result.selectionProbability < 70 && (
                <span>Moderate chances. Keep preparing for next stages. / मध्यम संभावना। अगले चरण की तैयारी जारी रखें।</span>
              )}
              {result.selectionProbability < 40 && (
                <span>Chances are low. Focus on improving weak areas. / संभावना कम है। कमज़ोर विषयों पर ध्यान दें।</span>
              )}
            </div>
          </div>

          {/* Marks Needed to be Safe */}
          <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-[#1a3a5c] dark:text-blue-400" />
              <h4 className="font-extrabold text-base text-gray-900 dark:text-white">
                Safe Zone Analysis
              </h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-2xl font-extrabold text-[#1a3a5c] dark:text-blue-400">{result.avgCutoff}</p>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mt-1">Avg Cutoff (3 yr)</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-2xl font-extrabold text-orange-600 dark:text-orange-400">{result.maxCutoff}</p>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mt-1">Highest Cutoff (3 yr)</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className={cn(
                  'text-2xl font-extrabold',
                  result.marksNeeded > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                )}>
                  {result.marksNeeded > 0 ? `+${result.marksNeeded}` : 'Safe!'}
                </p>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mt-1">
                  {result.marksNeeded > 0 ? 'Marks Needed' : 'Above Safe Zone'}
                </p>
              </div>
            </div>
            {result.marksNeeded > 0 && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                Safe zone mein aane ke liye aapko <strong className="text-red-600 dark:text-red-400">{result.marksNeeded} marks</strong> aur chahiye. Target: <strong>{Math.round((result.maxCutoff + (result.maxCutoff - result.avgCutoff) * 0.3) * 100) / 100}+</strong> marks.
              </p>
            )}
            {result.marksNeeded === 0 && (
              <p className="text-sm text-green-700 dark:text-green-400 mt-3 font-semibold">
                Aapke marks safe zone mein hain! Selection ke chances bahut ache hain.
              </p>
            )}
          </div>

          {/* Visual Position Gauge */}
          <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-[#1a3a5c] dark:text-blue-400" />
              <h4 className="font-extrabold text-base text-gray-900 dark:text-white">
                Your Position / आपकी स्थिति
              </h4>
            </div>

            {/* Position bar */}
            <div className="relative">
              <div className="h-8 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full relative overflow-visible">
                {/* Your marks indicator */}
                {(() => {
                  const position = Math.min(100, Math.max(0, (parseFloat(marks) / exam.totalMarks) * 100));
                  return (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                      style={{ left: `${position}%` }}
                    >
                      <div className="w-5 h-5 bg-white border-3 border-[#1a3a5c] rounded-full shadow-lg" />
                    </div>
                  );
                })()}

                {/* Cutoff marker */}
                {(() => {
                  const cutoffPos = Math.min(100, Math.max(0, (result.avgCutoff / exam.totalMarks) * 100));
                  return (
                    <div
                      className="absolute top-full mt-1 -translate-x-1/2 z-10"
                      style={{ left: `${cutoffPos}%` }}
                    >
                      <div className="w-0.5 h-3 bg-gray-700 dark:bg-gray-300 mx-auto" />
                      <p className="text-[10px] font-bold text-gray-600 dark:text-gray-400 whitespace-nowrap mt-0.5">
                        Cutoff: {result.avgCutoff}
                      </p>
                    </div>
                  );
                })()}
              </div>
              <div className="flex justify-between text-[10px] font-bold text-gray-500 dark:text-gray-400 mt-8 px-1">
                <span>0</span>
                <span>{Math.round(exam.totalMarks / 4)}</span>
                <span>{Math.round(exam.totalMarks / 2)}</span>
                <span>{Math.round(exam.totalMarks * 3 / 4)}</span>
                <span>{exam.totalMarks}</span>
              </div>
            </div>
          </div>

          {/* Historical Cutoff Table */}
          <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden">
            <div className="px-5 py-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <h4 className="font-extrabold text-base text-gray-900 dark:text-white">
                Historical Cutoff Comparison / पिछले 3 साल के कटऑफ
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {exam.label} — {category} Category — Your marks: {marks}
              </p>
            </div>

            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left px-5 py-3 font-bold text-gray-700 dark:text-gray-300 uppercase text-xs">Year</th>
                    <th className="text-center px-5 py-3 font-bold text-gray-700 dark:text-gray-300 uppercase text-xs">Cutoff ({category})</th>
                    <th className="text-center px-5 py-3 font-bold text-gray-700 dark:text-gray-300 uppercase text-xs">Your Marks</th>
                    <th className="text-center px-5 py-3 font-bold text-gray-700 dark:text-gray-300 uppercase text-xs">Difference</th>
                    <th className="text-center px-5 py-3 font-bold text-gray-700 dark:text-gray-300 uppercase text-xs">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {result.cutoffs.map((c) => {
                    const cutoff = c[category];
                    const m = parseFloat(marks);
                    const diff = Math.round((m - cutoff) * 100) / 100;
                    const above = diff >= 0;
                    return (
                      <tr key={c.year} className={above ? 'bg-green-50/50 dark:bg-green-950/10' : 'bg-red-50/50 dark:bg-red-950/10'}>
                        <td className="px-5 py-3 font-bold text-gray-900 dark:text-white">{c.year}</td>
                        <td className="px-5 py-3 text-center font-bold text-gray-700 dark:text-gray-300">{cutoff}</td>
                        <td className="px-5 py-3 text-center font-extrabold text-[#1a3a5c] dark:text-blue-400">{marks}</td>
                        <td className={cn('px-5 py-3 text-center font-extrabold', above ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400')}>
                          {above ? '+' : ''}{diff}
                        </td>
                        <td className="px-5 py-3 text-center">
                          <span className={cn(
                            'inline-block px-2 py-1 rounded-full text-xs font-bold',
                            above
                              ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                              : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
                          )}>
                            {above ? 'Above Cutoff' : 'Below Cutoff'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden divide-y divide-gray-100 dark:divide-gray-800">
              {result.cutoffs.map((c) => {
                const cutoff = c[category];
                const m = parseFloat(marks);
                const diff = Math.round((m - cutoff) * 100) / 100;
                const above = diff >= 0;
                return (
                  <div key={c.year} className={cn('px-5 py-4', above ? 'bg-green-50/50 dark:bg-green-950/10' : 'bg-red-50/50 dark:bg-red-950/10')}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-900 dark:text-white text-base">{c.year}</span>
                      <span className={cn(
                        'inline-block px-2 py-1 rounded-full text-xs font-bold',
                        above
                          ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300'
                          : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
                      )}>
                        {above ? 'Above' : 'Below'}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-lg font-extrabold text-gray-700 dark:text-gray-300">{cutoff}</p>
                        <p className="text-[10px] font-bold text-gray-500 uppercase">Cutoff</p>
                      </div>
                      <div>
                        <p className="text-lg font-extrabold text-[#1a3a5c] dark:text-blue-400">{marks}</p>
                        <p className="text-[10px] font-bold text-gray-500 uppercase">Your Marks</p>
                      </div>
                      <div>
                        <p className={cn('text-lg font-extrabold', above ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400')}>
                          {above ? '+' : ''}{diff}
                        </p>
                        <p className="text-[10px] font-bold text-gray-500 uppercase">Diff</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800 dark:text-amber-300">
              <p className="font-bold mb-1">Disclaimer / अस्वीकरण</p>
              <p>
                यह rank prediction historical cutoff data पर आधारित एक approximate estimate है। Actual rank paper difficulty,
                total applicants, normalization process, और vacancies पर निर्भर करती है। कृपया इसे reference tool के रूप में
                उपयोग करें। Official results के लिए commission/board की website देखें।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
