import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Karnataka Government Jobs 2026 — KPSC, KEA Vacancies';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Karnataka Government Jobs 2026',
    subtitle: 'कर्नाटक सरकारी नौकरी — KPSC, KEA',
    badge: 'KARNATAKA',
    gradientFrom: '#2e2e1a',
    gradientVia: '#5a5a2a',
    gradientTo: '#8a8a4a',
  });
}
