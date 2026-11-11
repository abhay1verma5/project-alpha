'use client';

import { useState, useMemo } from 'react';
import { Calculator, RotateCcw, Info, BarChart3, TrendingUp, Lightbulb, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Exam presets                                                      */
/* ------------------------------------------------------------------ */

interface ExamPreset {
  label: string;
  totalMarks: number;
  type: 'ssc' | 'railway';
}

const EXAM_PRESETS: ExamPreset[] = [
  { label: 'SSC CGL', totalMarks: 200, type: 'ssc' },
  { label: 'SSC CHSL', totalMarks: 200, type: 'ssc' },
  { label: 'SSC MTS', totalMarks: 150, type: 'ssc' },
  { label: 'SSC GD', totalMarks: 160, type: 'ssc' },
  { label: 'SSC CPO', totalMarks: 200, type: 'ssc' },
  { label: 'RRB NTPC', totalMarks: 100, type: 'railway' },
  { label: 'RRB Group D', totalMarks: 100, type: 'railway' },
  { label: 'RRB ALP', totalMarks: 75, type: 'railway' },
  { label: 'Custom', totalMarks: 200, type: 'ssc' },
];

/* ------------------------------------------------------------------ */
/*  Result types                                                      */
/* ------------------------------------------------------------------ */

interface NormalizationResult {
  normalizedScore: number;
  rawScore: number;
  totalMarks: number;
  shiftMean: number;
  shiftSD: number;
  overallMean: number;
  overallSD: number;
  scoreDiff: number;
  scalingFactor: number;
  adjustedComponent: number;
  percentile: number;
  percentageRaw: number;
  percentageNormalized: number;
}

/* ------------------------------------------------------------------ */
/*  Helper: estimate percentile from z-score (approximation)          */
/* ------------------------------------------------------------------ */

function estimatePercentile(score: number, mean: number, sd: number): number {
  if (sd <= 0) return 50;
  const z = (score - mean) / sd;
  // Abramowitz and Stegun approximation for CDF
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  const sign = z < 0 ? -1 : 1;
  const x = Math.abs(z) / Math.sqrt(2);
  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  const cdf = 0.5 * (1.0 + sign * y);
  return Math.min(99.99, Math.max(0.01, Math.round(cdf * 10000) / 100));
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export function ScoreNormalizer() {
  const [selectedExam, setSelectedExam] = useState('SSC CGL');
  const [examType, setExamType] = useState<'ssc' | 'railway'>('ssc');
  const [rawScore, setRawScore] = useState('');
  const [totalMarks, setTotalMarks] = useState('200');
  const [shiftMean, setShiftMean] = useState('');
  const [shiftSD, setShiftSD] = useState('');
  const [overallMean, setOverallMean] = useState('');
  const [overallSD, setOverallSD] = useState('');
  const [result, setResult] = useState<NormalizationResult | null>(null);
  const [error, setError] = useState('');

  /* Apply preset */
  const applyPreset = (preset: ExamPreset) => {
    setSelectedExam(preset.label);
    setExamType(preset.type);
    setTotalMarks(String(preset.totalMarks));
    setResult(null);
    setError('');
  };

  /* Calculate */
  const calculate = () => {
    setError('');
    const rs = parseFloat(rawScore);
    const tm = parseFloat(totalMarks);
    const sm = parseFloat(shiftMean);
    const ssd = parseFloat(shiftSD);
    const om = parseFloat(overallMean);
    const osd = parseFloat(overallSD);

    if ([rs, tm, sm, ssd, om, osd].some(isNaN)) {
      setError('Please fill in all fields with valid numbers. / कृपया सभी फील्ड में सही नंबर भरें।');
      return;
    }
    if (ssd <= 0) {
      setError('Shift standard deviation must be greater than 0. / शिफ्ट SD शून्य से अधिक होना चाहिए।');
      return;
    }
    if (osd <= 0) {
      setError('Overall standard deviation must be greater than 0. / कुल SD शून्य से अधिक होना चाहिए।');
      return;
    }
    if (rs < 0 || rs > tm) {
      setError('Raw score must be between 0 and total marks. / रॉ स्कोर 0 और कुल अंकों के बीच होना चाहिए।');
      return;
    }

    // SSC / Railway Normalization Formula:
    // Normalized Score = Overall Mean + (Raw Score - Shift Mean) x (Overall SD / Shift SD)
    const scalingFactor = osd / ssd;
    const scoreDiff = rs - sm;
    const adjustedComponent = scoreDiff * scalingFactor;
    const normalizedScore = om + adjustedComponent;

    // Clamp to [0, totalMarks]
    const clampedScore = Math.max(0, Math.min(tm, normalizedScore));

    const percentile = estimatePercentile(clampedScore, om, osd);

    setResult({
      normalizedScore: Math.round(clampedScore * 100) / 100,
      rawScore: rs,
      totalMarks: tm,
      shiftMean: sm,
      shiftSD: ssd,
      overallMean: om,
      overallSD: osd,
      scoreDiff: Math.round(scoreDiff * 100) / 100,
      scalingFactor: Math.round(scalingFactor * 10000) / 10000,
      adjustedComponent: Math.round(adjustedComponent * 100) / 100,
      percentile,
      percentageRaw: Math.round((rs / tm) * 10000) / 100,
      percentageNormalized: Math.round((clampedScore / tm) * 10000) / 100,
    });
  };

  /* Reset */
  const reset = () => {
    setRawScore('');
    setShiftMean('');
    setShiftSD('');
    setOverallMean('');
    setOverallSD('');
    setResult(null);
    setError('');
  };

  /* Bar chart data for visual comparison */
  const chartData = useMemo(() => {
    if (!result) return null;
    const max = result.totalMarks;
    return [
      { label: 'Your Raw Score', value: result.rawScore, color: 'bg-blue-500 dark:bg-blue-400' },
      { label: 'Shift Average', value: result.shiftMean, color: 'bg-amber-500 dark:bg-amber-400' },
      { label: 'Overall Average', value: result.overallMean, color: 'bg-gray-400 dark:bg-gray-500' },
      { label: 'Normalized Score', value: result.normalizedScore, color: 'bg-emerald-500 dark:bg-emerald-400' },
    ].map((item) => ({
      ...item,
      percent: Math.max(0, Math.min(100, (item.value / max) * 100)),
    }));
  }, [result]);

  const inputClass =
    'w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base focus:border-[#1a3a5c] dark:focus:border-blue-500 focus:outline-none transition-colors';

  return (
    <div className="space-y-6">
      {/* ---- Exam presets ---- */}
      <div>
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
          Select Exam / परीक्षा चुनें
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {EXAM_PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => applyPreset(p)}
              className={cn(
                'px-3 py-2 rounded-xl text-sm font-bold transition-all active:scale-95',
                selectedExam === p.label
                  ? 'bg-[#1a3a5c] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* ---- Exam type badge ---- */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
            examType === 'ssc'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
          )}
        >
          {examType === 'ssc' ? 'SSC Normalization' : 'Railway CBT Normalization'}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Formula: Normalized = Mean_overall + (Score - Mean_shift) x (SD_overall / SD_shift)
        </span>
      </div>

      {/* ---- Input: Your Score & Total ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Your Raw Score / आपका स्कोर
          </label>
          <input
            type="number"
            value={rawScore}
            onChange={(e) => { setRawScore(e.target.value); setResult(null); }}
            placeholder="e.g. 142.5"
            step="0.01"
            min="0"
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Total Marks / कुल अंक
          </label>
          <input
            type="number"
            value={totalMarks}
            onChange={(e) => { setTotalMarks(e.target.value); setResult(null); }}
            placeholder="e.g. 200"
            step="1"
            min="1"
            className={inputClass}
          />
        </div>
      </div>

      {/* ---- Input: Shift stats ---- */}
      <div className="rounded-2xl border-2 border-amber-200 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-950/20 p-4 space-y-4">
        <p className="text-sm font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Your Shift Data / आपकी शिफ्ट का डेटा
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Shift Mean (Average) / शिफ्ट का औसत
            </label>
            <input
              type="number"
              value={shiftMean}
              onChange={(e) => { setShiftMean(e.target.value); setResult(null); }}
              placeholder="e.g. 98.5"
              step="0.01"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Shift Std Deviation (SD) / शिफ्ट SD
            </label>
            <input
              type="number"
              value={shiftSD}
              onChange={(e) => { setShiftSD(e.target.value); setResult(null); }}
              placeholder="e.g. 28.3"
              step="0.01"
              min="0.01"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* ---- Input: Overall stats ---- */}
      <div className="rounded-2xl border-2 border-blue-200 dark:border-blue-800/50 bg-blue-50/50 dark:bg-blue-950/20 p-4 space-y-4">
        <p className="text-sm font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Overall (All Shifts) Data / सभी शिफ्ट का डेटा
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Overall Mean (Average) / कुल औसत
            </label>
            <input
              type="number"
              value={overallMean}
              onChange={(e) => { setOverallMean(e.target.value); setResult(null); }}
              placeholder="e.g. 102.7"
              step="0.01"
              className={inputClass}
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Overall Std Deviation (SD) / कुल SD
            </label>
            <input
              type="number"
              value={overallSD}
              onChange={(e) => { setOverallSD(e.target.value); setResult(null); }}
              placeholder="e.g. 30.1"
              step="0.01"
              min="0.01"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* ---- Error ---- */}
      {error && (
        <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-300 dark:border-red-800 px-4 py-3 text-sm font-semibold text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {/* ---- Buttons ---- */}
      <div className="flex gap-3">
        <button
          onClick={calculate}
          className="flex-1 py-3.5 rounded-xl bg-[#1a3a5c] hover:bg-[#0d2137] text-white font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Calculator className="w-5 h-5" /> Calculate Normalized Score
        </button>
        <button
          onClick={reset}
          className="px-4 py-3.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold transition-all active:scale-95"
          aria-label="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* ---- Result ---- */}
      {result && (
        <div className="space-y-6">
          {/* Main result card */}
          <div className="rounded-2xl border-2 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 p-6">
            <div className="flex items-start gap-3 mb-5">
              <TrendingUp className="w-8 h-8 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300">
                  Normalized Score: {result.normalizedScore} / {result.totalMarks}
                </p>
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                  {selectedExam} — {examType === 'ssc' ? 'SSC' : 'Railway'} Normalization
                </p>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <StatCard label="Raw Score" value={result.rawScore} sub={`${result.percentageRaw}%`} color="text-blue-600" />
              <StatCard label="Normalized" value={result.normalizedScore} sub={`${result.percentageNormalized}%`} color="text-emerald-600" />
              <StatCard
                label="Change"
                value={`${result.normalizedScore - result.rawScore >= 0 ? '+' : ''}${(Math.round((result.normalizedScore - result.rawScore) * 100) / 100)}`}
                sub="marks"
                color={result.normalizedScore >= result.rawScore ? 'text-green-600' : 'text-red-600'}
              />
              <StatCard label="Est. Percentile" value={`${result.percentile}`} sub="percentile" color="text-purple-600" />
            </div>

            {/* Formula breakdown */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-2">
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Formula Breakdown / फॉर्मूला विवरण
              </p>
              <FormulaRow
                label="Step 1: Score - Shift Mean"
                formula={`${result.rawScore} - ${result.shiftMean}`}
                value={result.scoreDiff}
              />
              <FormulaRow
                label="Step 2: Scaling Factor (SD_all / SD_shift)"
                formula={`${result.overallSD} / ${result.shiftSD}`}
                value={result.scalingFactor}
              />
              <FormulaRow
                label="Step 3: Adjusted Component"
                formula={`${result.scoreDiff} x ${result.scalingFactor}`}
                value={result.adjustedComponent}
              />
              <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                <FormulaRow
                  label="Normalized Score = Mean_overall + Adjusted"
                  formula={`${result.overallMean} + ${result.adjustedComponent}`}
                  value={result.normalizedScore}
                  bold
                />
              </div>
            </div>
          </div>

          {/* Visual comparison chart */}
          {chartData && (
            <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6">
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> Visual Comparison / तुलना चार्ट
              </p>
              <div className="space-y-4">
                {chartData.map((bar) => (
                  <div key={bar.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">{bar.label}</span>
                      <span className="text-sm font-extrabold text-gray-900 dark:text-white">
                        {bar.value} / {result.totalMarks}
                      </span>
                    </div>
                    <div className="h-6 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={cn('h-full rounded-full transition-all duration-700 ease-out', bar.color)}
                        style={{ width: `${bar.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Percentile interpretation */}
          <div className="rounded-2xl border-2 border-purple-200 dark:border-purple-800/50 bg-purple-50/50 dark:bg-purple-950/20 p-6">
            <p className="text-sm font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wider mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Estimated Percentile / अनुमानित पर्सेंटाइल
            </p>
            <div className="flex items-center gap-4 mb-3">
              <div className="text-4xl font-extrabold text-purple-700 dark:text-purple-300">
                {result.percentile}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>
                  This means approximately <strong>{result.percentile}%</strong> of candidates scored below your normalized score.
                </p>
                <p className="mt-1 text-xs">
                  (यानी लगभग {result.percentile}% उम्मीदवारों से आपका स्कोर अधिक है।)
                </p>
              </div>
            </div>
            {/* Percentile bar */}
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-400 rounded-full transition-all duration-700"
                style={{ width: `${result.percentile}%` }}
              />
              <div
                className="absolute top-0 h-full w-0.5 bg-white dark:bg-gray-900"
                style={{ left: `${result.percentile}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      )}

      {/* ---- Tips section ---- */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 p-5 space-y-4">
        <p className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" /> Tips & How Normalization Works / नॉर्मलाइजेशन कैसे काम करता है
        </p>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <TipItem>
            <strong>Why normalization?</strong> When SSC/Railway exams are held in multiple shifts, each shift can have different difficulty. Normalization adjusts scores to make them comparable.
            <span className="block text-xs mt-0.5 text-gray-500 dark:text-gray-500">
              (जब परीक्षा कई शिफ्ट में होती है, तो हर शिफ्ट का पेपर अलग कठिनाई का हो सकता है। नॉर्मलाइजेशन इसे बराबर करता है।)
            </span>
          </TipItem>
          <TipItem>
            <strong>Where to find shift data?</strong> SSC publishes mean and SD for each shift in the official result notice (PDF). RRB also provides these statistics. Check the official website after results.
            <span className="block text-xs mt-0.5 text-gray-500 dark:text-gray-500">
              (शिफ्ट का डेटा SSC/RRB की ऑफिशियल रिजल्ट PDF में मिलता है।)
            </span>
          </TipItem>
          <TipItem>
            <strong>If your shift was tougher</strong> (lower mean, higher SD), your normalized score will likely increase. If easier (higher mean, lower SD), it may decrease. This is fair.
            <span className="block text-xs mt-0.5 text-gray-500 dark:text-gray-500">
              (कठिन शिफ्ट = स्कोर बढ़ेगा, आसान शिफ्ट = स्कोर घट सकता है।)
            </span>
          </TipItem>
          <TipItem>
            <strong>Percentile is estimated.</strong> The actual percentile depends on the full score distribution which is only available to the exam body. Our estimate uses a normal distribution approximation.
            <span className="block text-xs mt-0.5 text-gray-500 dark:text-gray-500">
              (पर्सेंटाइल अनुमानित है — असली पर्सेंटाइल केवल SSC/RRB के पास उपलब्ध होता है।)
            </span>
          </TipItem>
          <TipItem>
            <strong>Normalization does not change your rank.</strong> Among candidates in the same shift, your relative position remains the same. It only adjusts for cross-shift comparison.
            <span className="block text-xs mt-0.5 text-gray-500 dark:text-gray-500">
              (नॉर्मलाइजेशन से शिफ्ट के अंदर आपकी रैंक नहीं बदलती, बस शिफ्ट के बीच तुलना सही होती है।)
            </span>
          </TipItem>
        </div>
      </div>

      {/* ---- Formula info ---- */}
      <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Formula used:</strong> Normalized Score = M<sub>overall</sub> + (X<sub>i</sub> - M<sub>shift</sub>) x (SD<sub>overall</sub> / SD<sub>shift</sub>), where M = Mean, SD = Standard Deviation, X<sub>i</sub> = Your raw score. This is the official formula used by SSC and Railway recruitment boards for multi-shift CBT normalization.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: string | number;
  sub: string;
  color: string;
}) {
  return (
    <div className="text-center p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
      <p className={cn('text-2xl font-extrabold', color)}>{value}</p>
      <p className="text-xs font-bold text-gray-500 uppercase">{label}</p>
      <p className="text-xs text-gray-400">{sub}</p>
    </div>
  );
}

function FormulaRow({
  label,
  formula,
  value,
  bold,
}: {
  label: string;
  formula: string;
  value: number;
  bold?: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
      <span className={cn('text-xs', bold ? 'font-extrabold text-gray-900 dark:text-white' : 'font-semibold text-gray-500 dark:text-gray-400')}>
        {label}
      </span>
      <span className="text-xs text-gray-400 dark:text-gray-500 font-mono">{formula}</span>
      <span className={cn('text-sm font-extrabold', bold ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white')}>
        = {value}
      </span>
    </div>
  );
}

function TipItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5 rotate-[-90deg]" />
      <p>{children}</p>
    </div>
  );
}
