'use client';

import { useState, useEffect, useCallback } from 'react';
import { Volume2, Square } from 'lucide-react';

interface ReadAloudButtonProps {
  text: string;
}

export function ReadAloudButton({ text }: ReadAloudButtonProps) {
  const [speaking, setSpeaking] = useState(false);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, []);

  useEffect(() => {
    return () => { stop(); };
  }, [stop]);

  const toggle = () => {
    if (speaking) {
      stop();
      return;
    }
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 0.9;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  };

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 transition-all"
    >
      {speaking ? (
        <><Square className="w-3.5 h-3.5" /> Stop Reading</>
      ) : (
        <><Volume2 className="w-3.5 h-3.5" /> Read Aloud</>
      )}
    </button>
  );
}
