import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Govt Jobs Without Exam 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Govt Jobs Without Exam 2026',
    subtitle: 'बिना परीक्षा सरकारी नौकरी — Direct Recruitment',
    badge: 'NO EXAM',
    gradientFrom: '#1a2e2e',
    gradientVia: '#1a5a5a',
    gradientTo: '#1a8a8a',
  });
}
