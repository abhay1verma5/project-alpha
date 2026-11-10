/**
 * Dynamic imports for heavy client components.
 *
 * These wrappers use next/dynamic to code-split large client components out of
 * the initial bundle.  Each component is loaded only when the route that uses
 * it is visited, keeping the main JS payload lean.
 *
 * Usage (in a server page):
 *   import { DynamicMockTestsClient } from '@/lib/dynamic-imports';
 *   export default function Page() { return <DynamicMockTestsClient />; }
 *
 * Bundle-size notes
 * -----------------
 * - lucide-react: already tree-shaken via named imports (e.g.
 *   `import { Search } from 'lucide-react'`). No barrel re-export detected.
 * - framer-motion (~40 kB gzipped): used only in StatsBar, CategoryGrid.
 *   Those are leaf components that are already client-only, so they only load
 *   on pages that render them. Consider replacing with CSS animations if the
 *   savings matter.
 * - katex (~90 kB gzipped): only imported by MathText (PYQ pages). Already
 *   scoped to PYQ; dynamically imported below for extra safety.
 */

import dynamic from 'next/dynamic';

// ---------------------------------------------------------------------------
// Shared loading spinner used as the fallback for all dynamic imports
// ---------------------------------------------------------------------------
function LoadingSpinner() {
  return (
    <div className="flex justify-center py-20">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// AI-powered tools (each pulls in its own Gemini/fetch logic + large prompts)
// ---------------------------------------------------------------------------

/** AI Resume Builder — generates gov-optimized resumes */
export const DynamicAIResumeClient = dynamic(
  () => import('@/app/ai-resume/AIResumeClient').then((m) => m.AIResumeClient),
  { loading: LoadingSpinner, ssr: false },
);

/** AI Mock Interview — generates role-specific interview questions */
export const DynamicAIInterviewClient = dynamic(
  () => import('@/app/ai-interview/AIInterviewClient').then((m) => m.AIInterviewClient),
  { loading: LoadingSpinner, ssr: false },
);

/** AI Career Guidance chat */
export const DynamicCareerClient = dynamic(
  () => import('@/components/ai-career/CareerClient').then((m) => m.CareerClient),
  { loading: LoadingSpinner, ssr: false },
);

/** AI Eligibility Checker */
export const DynamicEligibilityClient = dynamic(
  () => import('@/components/ai-eligibility/EligibilityClient').then((m) => m.EligibilityClient),
  { loading: LoadingSpinner, ssr: false },
);

/** AI Quiz — full quiz engine with scoring */
export const DynamicQuizClient = dynamic(
  () => import('@/components/ai-quiz/QuizClient').then((m) => m.QuizClient),
  { loading: LoadingSpinner, ssr: false },
);

/** AI Doubt Solver */
export const DynamicAIDoubtClient = dynamic(
  () => import('@/app/ai-doubt/AIDoubtClient').then((m) => m.AIDoubtClient),
  { loading: LoadingSpinner, ssr: false },
);

/** AI Answer Writer */
export const DynamicAIAnswerWriterClient = dynamic(
  () => import('@/app/ai-answer-writer/AIAnswerWriterClient').then((m) => m.AIAnswerWriterClient),
  { loading: LoadingSpinner, ssr: false },
);

/** AI Math Solver */
export const DynamicAIMathClient = dynamic(
  () => import('@/app/ai-math/AIMathClient').then((m) => m.AIMathClient),
  { loading: LoadingSpinner, ssr: false },
);

/** AI Vocabulary Builder */
export const DynamicAIVocabularyClient = dynamic(
  () => import('@/app/ai-vocabulary/AIVocabularyClient').then((m) => m.AIVocabularyClient),
  { loading: LoadingSpinner, ssr: false },
);

/** AI Syllabus Generator */
export const DynamicAISyllabusClient = dynamic(
  () => import('@/app/ai-syllabus/AISyllabusClient').then((m) => m.AISyllabusClient),
  { loading: LoadingSpinner, ssr: false },
);

// ---------------------------------------------------------------------------
// Heavy tool / interactive components
// ---------------------------------------------------------------------------

/** Mock Tests — large client with timer, scoring, question bank */
export const DynamicMockTestsClient = dynamic(
  () => import('@/app/mock-tests/MockTestsClient').then((m) => m.MockTestsClient),
  { loading: LoadingSpinner, ssr: false },
);

/** PYQ Practice — pulls in KaTeX (~90 kB) for math rendering */
export const DynamicPYQClient = dynamic(
  () => import('@/components/pyq/PYQClient').then((m) => m.PYQClient),
  { loading: LoadingSpinner, ssr: false },
);

/** MathText — KaTeX renderer, only needed on PYQ/math pages */
export const DynamicMathText = dynamic(
  () => import('@/components/pyq/MathText').then((m) => m.MathText),
  { ssr: false },
);

/** Photo Editor — canvas-based image manipulation */
export const DynamicPhotoEditorClient = dynamic(
  () => import('@/app/photo-editor/PhotoEditorClient').then((m) => m.PhotoEditorClient),
  { loading: LoadingSpinner, ssr: false },
);

/** Photo Resizer tool */
export const DynamicPhotoResizer = dynamic(
  () => import('@/components/tools/PhotoResizer').then((m) => m.PhotoResizer),
  { loading: LoadingSpinner, ssr: false },
);

/** Handwriting Practice — canvas-based drawing */
export const DynamicHandwritingClient = dynamic(
  () => import('@/app/handwriting/HandwritingClient').then((m) => m.HandwritingClient),
  { loading: LoadingSpinner, ssr: false },
);

/** Typing Test — real-time WPM tracker */
export const DynamicTypingTestClient = dynamic(
  () => import('@/app/typing-test/TypingTestClient').then((m) => m.TypingTestClient),
  { loading: LoadingSpinner, ssr: false },
);

/** Vacancy Trends — chart-like visualisations */
export const DynamicVacancyTrendsClient = dynamic(
  () => import('@/app/vacancy-trends/VacancyTrendsClient').then((m) => m.VacancyTrendsClient),
  { loading: LoadingSpinner, ssr: false },
);

/** Daily Quiz — gamified quiz with streaks */
export const DynamicDailyQuizClient = dynamic(
  () => import('@/components/daily-quiz/DailyQuizClient').then((m) => m.DailyQuizClient),
  { loading: LoadingSpinner, ssr: false },
);

/** Current Affairs — news feed with category filters */
export const DynamicCurrentAffairsClient = dynamic(
  () => import('@/components/current-affairs/CurrentAffairsClient').then((m) => m.CurrentAffairsClient),
  { loading: LoadingSpinner, ssr: false },
);

/** Flashcards — swipeable study cards */
export const DynamicFlashcardsClient = dynamic(
  () => import('@/app/flashcards/FlashcardsClient').then((m) => m.FlashcardsClient),
  { loading: LoadingSpinner, ssr: false },
);

/** Compare — side-by-side job comparison */
export const DynamicCompareClient = dynamic(
  () => import('@/app/compare/CompareClient').then((m) => m.CompareClient),
  { loading: LoadingSpinner, ssr: false },
);

/** Form Assistant — guided form-fill helper */
export const DynamicFormAssistantClient = dynamic(
  () => import('@/app/form-assistant/FormAssistantClient').then((m) => m.FormAssistantClient),
  { loading: LoadingSpinner, ssr: false },
);

// ---------------------------------------------------------------------------
// Tracker / planner components (localStorage-heavy, no SSR needed)
// ---------------------------------------------------------------------------

/** Application Tracker */
export const DynamicApplyTrackerClient = dynamic(
  () => import('@/app/apply-tracker/ApplyTrackerClient').then((m) => m.ApplyTrackerClient),
  { loading: LoadingSpinner, ssr: false },
);

/** Study Planner */
export const DynamicStudyPlannerClient = dynamic(
  () => import('@/app/study-planner/StudyPlannerClient').then((m) => m.StudyPlannerClient),
  { loading: LoadingSpinner, ssr: false },
);

/** Exam Countdown */
export const DynamicExamCountdownClient = dynamic(
  () => import('@/app/exam-countdown/ExamCountdownClient').then((m) => m.ExamCountdownClient),
  { loading: LoadingSpinner, ssr: false },
);

/** Admit Card Tracker */
export const DynamicAdmitCardTrackerClient = dynamic(
  () => import('@/app/admit-card-tracker/AdmitCardTrackerClient').then((m) => m.AdmitCardTrackerClient),
  { loading: LoadingSpinner, ssr: false },
);

/** Cutoff Tracker */
export const DynamicCutoffTrackerClient = dynamic(
  () => import('@/app/cutoff-tracker/CutoffTrackerClient').then((m) => m.CutoffTrackerClient),
  { loading: LoadingSpinner, ssr: false },
);

/** Revision Scheduler */
export const DynamicRevisionClient = dynamic(
  () => import('@/app/revision/RevisionClient').then((m) => m.RevisionClient),
  { loading: LoadingSpinner, ssr: false },
);

/** Document Checklist */
export const DynamicDocumentChecklistClient = dynamic(
  () => import('@/app/document-checklist/DocumentChecklistClient').then((m) => m.DocumentChecklistClient),
  { loading: LoadingSpinner, ssr: false },
);

/** Leaderboard */
export const DynamicLeaderboardClient = dynamic(
  () => import('@/app/leaderboard/LeaderboardClient').then((m) => m.LeaderboardClient),
  { loading: LoadingSpinner, ssr: false },
);
