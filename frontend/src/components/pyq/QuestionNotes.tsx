'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { StickyNote, X, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

const STORAGE_PREFIX = 'pyq-notes-';

function getNoteKey(questionId: string) {
  return `${STORAGE_PREFIX}${questionId}`;
}

function loadNote(questionId: string): string {
  try {
    return localStorage.getItem(getNoteKey(questionId)) || '';
  } catch {
    return '';
  }
}

function saveNote(questionId: string, text: string) {
  try {
    if (text.trim()) {
      localStorage.setItem(getNoteKey(questionId), text);
    } else {
      localStorage.removeItem(getNoteKey(questionId));
    }
  } catch {}
}

/** Returns total count of all PYQ notes in localStorage. */
function getNoteCount(): number {
  try {
    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) {
        const val = localStorage.getItem(key);
        if (val && val.trim()) count++;
      }
    }
    return count;
  } catch {
    return 0;
  }
}

interface QuestionNotesProps {
  questionId: string;
}

export function QuestionNotes({ questionId }: QuestionNotesProps) {
  const [expanded, setExpanded] = useState(false);
  const [note, setNote] = useState('');
  const [noteCount, setNoteCount] = useState(0);
  const [hasNote, setHasNote] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load note on mount or when questionId changes
  useEffect(() => {
    const saved = loadNote(questionId);
    setNote(saved);
    setHasNote(saved.trim().length > 0);
    setNoteCount(getNoteCount());
  }, [questionId]);

  // Auto-focus textarea when expanded
  useEffect(() => {
    if (expanded && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [expanded]);

  const handleSave = useCallback(() => {
    saveNote(questionId, note);
    setHasNote(note.trim().length > 0);
    setNoteCount(getNoteCount());
  }, [questionId, note]);

  const handleBlur = useCallback(() => {
    handleSave();
  }, [handleSave]);

  const handleToggle = useCallback(() => {
    if (expanded) {
      // Closing: save first
      handleSave();
    }
    setExpanded(prev => !prev);
  }, [expanded, handleSave]);

  const handleClear = useCallback(() => {
    setNote('');
    saveNote(questionId, '');
    setHasNote(false);
    setNoteCount(getNoteCount());
    setExpanded(false);
  }, [questionId]);

  if (!expanded) {
    return (
      <button
        onClick={handleToggle}
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all active:scale-95',
          hasNote
            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
            : 'bg-surface-hover text-muted hover:text-foreground border border-border'
        )}
        title={hasNote ? 'Edit note' : 'Add note'}
      >
        <StickyNote className="w-3.5 h-3.5" />
        {hasNote ? 'Note' : 'Add Note'}
        {noteCount > 0 && (
          <span className="ml-0.5 bg-amber-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {noteCount > 99 ? '99+' : noteCount}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="mt-2 bg-amber-50 dark:bg-amber-900/15 rounded-xl border border-amber-200 dark:border-amber-800 p-3 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <StickyNote className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300">Your Note</span>
          {noteCount > 0 && (
            <span className="bg-amber-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {noteCount > 99 ? '99+' : noteCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {hasNote && (
            <button
              onClick={handleClear}
              className="p-1 rounded-md text-red-400 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              title="Delete note"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={handleToggle}
            className="p-1 rounded-md text-amber-500 hover:text-amber-700 hover:bg-amber-100 dark:hover:bg-amber-800/30 transition-colors"
            title="Close"
          >
            <Save className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <textarea
        ref={textareaRef}
        value={note}
        onChange={e => setNote(e.target.value)}
        onBlur={handleBlur}
        placeholder="Type your note for this question..."
        rows={3}
        className="w-full bg-white dark:bg-neutral-900 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-600 transition-all"
      />
      <p className="text-[10px] text-amber-600/60 dark:text-amber-400/60 mt-1">
        Auto-saved on close
      </p>
    </div>
  );
}
