import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Maharashtra Government Jobs 2026 — MPSC, TET Vacancies';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Maharashtra Government Jobs 2026',
    subtitle: 'महाराष्ट्र सरकारी नौकरी — MPSC, TET',
    badge: 'MAHARASHTRA',
    gradientFrom: '#2e1a00',
    gradientVia: '#5c3a1a',
    gradientTo: '#8b5e3a',
  });
}
