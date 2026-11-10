import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = '12th Pass Government Jobs 2026 — Latest Sarkari Naukri for 12th Pass';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: '12th Pass Government Jobs 2026',
    subtitle: '12वीं पास सरकारी नौकरी — Latest Vacancies',
    badge: '12TH PASS',
    gradientFrom: '#1a1a2e',
    gradientVia: '#16213e',
    gradientTo: '#0f3460',
  });
}
