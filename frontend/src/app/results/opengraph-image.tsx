import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Sarkari Result 2026 — Latest Exam Results';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Sarkari Result 2026 — Latest Exam Results',
    subtitle: 'सरकारी रिजल्ट — SSC, Railway, Banking, UPSC',
    badge: 'RESULTS',
    gradientFrom: '#0d3720',
    gradientVia: '#1a5c3a',
    gradientTo: '#25eb63',
    accentColor: '#1b5e20',
  });
}
