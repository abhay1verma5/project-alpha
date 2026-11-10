'use client';

import { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

/**
 * Renders text with inline LaTeX math ($...$) and display math ($$...$$).
 * Falls back to plain text if KaTeX fails to parse.
 */
export function MathText({ text, className }: { text: string; className?: string }) {
  const html = useMemo(() => renderMath(text), [text]);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function renderMath(input: string): string {
  if (!input) return '';

  // No $ signs at all — return as-is (fast path)
  if (!input.includes('$')) return escapeHtml(input);

  const parts: string[] = [];
  let i = 0;

  while (i < input.length) {
    // Display math: $$...$$
    if (input[i] === '$' && input[i + 1] === '$') {
      const end = input.indexOf('$$', i + 2);
      if (end !== -1) {
        const latex = input.slice(i + 2, end);
        parts.push(renderKatex(latex, true));
        i = end + 2;
        continue;
      }
    }

    // Inline math: $...$
    if (input[i] === '$') {
      const end = input.indexOf('$', i + 1);
      if (end !== -1 && end > i + 1) {
        const latex = input.slice(i + 1, end);
        parts.push(renderKatex(latex, false));
        i = end + 1;
        continue;
      }
    }

    // Regular text — collect until next $
    const next = input.indexOf('$', i);
    if (next === -1) {
      parts.push(escapeHtml(input.slice(i)));
      break;
    } else {
      parts.push(escapeHtml(input.slice(i, next)));
      i = next;
    }
  }

  return parts.join('');
}

function renderKatex(latex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      trust: true,
    });
  } catch {
    // If KaTeX fails, show the raw LaTeX
    return `<code>${escapeHtml(latex)}</code>`;
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
