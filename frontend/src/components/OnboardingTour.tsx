'use client';

import { useState, useEffect, useCallback } from 'react';
import { Briefcase, ScrollText, Sparkles, Brain, X, ChevronLeft, ChevronRight } from 'lucide-react';

const STORAGE_KEY = 'sarkarialert_onboarding_done';

interface TourStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  href: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: 'Government Jobs',
    description:
      'Browse the latest sarkari naukri notifications from SSC, UPSC, Railway, Banking, Defence, and State PSC. Filter by category, qualification, and state to find jobs that match your profile.',
    icon: <Briefcase className="w-8 h-8" />,
    color: 'text-[#ff6f00]',
    bgColor: 'bg-orange-50 dark:bg-orange-950/40',
    href: '/jobs',
  },
  {
    title: 'Previous Year Questions',
    description:
      'Practice PYQ papers from real government exams. Solve questions topic-wise with instant answers and detailed explanations to boost your exam preparation.',
    icon: <ScrollText className="w-8 h-8" />,
    color: 'text-[#1a3a5c]',
    bgColor: 'bg-blue-50 dark:bg-blue-950/40',
    href: '/pyq',
  },
  {
    title: 'AI-Powered Tools',
    description:
      'Use AI tools for eligibility checking, career guidance, smart search, and personalized study plans. Let AI simplify your exam preparation journey.',
    icon: <Sparkles className="w-8 h-8" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/40',
    href: '/tools',
  },
  {
    title: 'Daily Quiz & Current Affairs',
    description:
      'Stay sharp with daily quizzes and current affairs updates. Track your progress and compete with other aspirants to stay ahead in your preparation.',
    icon: <Brain className="w-8 h-8" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950/40',
    href: '/daily-quiz',
  },
];

export function OnboardingTour() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if the user has already seen the tour
    try {
      const done = localStorage.getItem(STORAGE_KEY);
      if (!done) {
        // Small delay so the page has time to render first
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage not available (SSR, private browsing, etc.)
    }
  }, []);

  const completeTour = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore storage errors
    }
    setIsVisible(false);
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      completeTour();
    }
  }, [currentStep, completeTour]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  const handleSkip = useCallback(() => {
    completeTour();
  }, [completeTour]);

  // Keyboard navigation
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleSkip();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, handleNext, handlePrev, handleSkip]);

  // Lock body scroll when tour is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const step = TOUR_STEPS[currentStep];
  const isLastStep = currentStep === TOUR_STEPS.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleSkip}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={handleSkip}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close tour"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Welcome header (only on first step) */}
        {isFirstStep && (
          <div className="bg-gradient-to-r from-[#1a3a5c] to-[#0f2b44] px-6 pt-6 pb-4 text-center">
            <h2 className="text-xl font-bold text-white">
              Welcome to Sarkari<span className="text-[#ff6f00]">Alert</span>!
            </h2>
            <p className="text-blue-200 text-sm mt-1">
              Let us show you around in a few quick steps
            </p>
          </div>
        )}

        {/* Step content */}
        <div className="px-6 pt-6 pb-4">
          <div className={`w-16 h-16 rounded-2xl ${step.bgColor} flex items-center justify-center mb-4 mx-auto`}>
            <span className={step.color}>{step.icon}</span>
          </div>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-2">
            {step.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 pb-4">
          {TOUR_STEPS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'w-6 bg-[#1a3a5c] dark:bg-blue-400'
                  : 'w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between px-6 pb-6">
          <button
            onClick={handleSkip}
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Skip tour
          </button>

          <div className="flex items-center gap-2">
            {!isFirstStep && (
              <button
                onClick={handlePrev}
                className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-white bg-[#1a3a5c] rounded-xl hover:bg-[#0f2b44] active:scale-95 transition-all shadow-md shadow-blue-900/20"
            >
              {isLastStep ? (
                'Get Started'
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
