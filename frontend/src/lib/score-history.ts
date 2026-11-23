/**
 * Per-device score history shown on /leaderboard ("Score History" tab).
 * The leaderboard read 'sarkari_score_history' but nothing wrote it, so the tab
 * was always empty. Every finished mock test / PYQ session / quiz records here.
 */
export const SCORE_HISTORY_KEY = 'sarkari_score_history';
const MAX_RECORDS = 50;

export interface ScoreRecord {
  id: string;
  type: 'mock' | 'quiz';
  score: number;
  total: number;
  percentage: number;
  date: string;
}

export function recordScore(type: 'mock' | 'quiz', score: number, total: number): void {
  if (!total) return;
  try {
    const raw = localStorage.getItem(SCORE_HISTORY_KEY);
    const list: ScoreRecord[] = raw ? JSON.parse(raw) : [];
    list.unshift({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type,
      score,
      total,
      percentage: Math.round((score / total) * 100),
      date: new Date().toISOString(),
    });
    localStorage.setItem(SCORE_HISTORY_KEY, JSON.stringify(list.slice(0, MAX_RECORDS)));
  } catch {
    /* storage blocked: nothing to record */
  }
}
