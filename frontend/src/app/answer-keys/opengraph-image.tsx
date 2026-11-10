import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Answer Key 2026 — Check Your Score';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Answer Key 2026 — Check Your Score',
    subtitle: 'आंसर की — SSC, Railway, UPSC, Banking',
    badge: 'ANSWER KEYS',
    gradientFrom: '#37200d',
    gradientVia: '#5c4a1a',
    gradientTo: '#ebaf25',
  });
}
