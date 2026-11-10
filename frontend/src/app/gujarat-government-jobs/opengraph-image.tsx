import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Gujarat Government Jobs 2026 — GPSC, GSSSB Vacancies';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Gujarat Government Jobs 2026',
    subtitle: 'गुजरात सरकारी नौकरी — GPSC, GSSSB',
    badge: 'GUJARAT',
    gradientFrom: '#1a1a2e',
    gradientVia: '#2a3a5e',
    gradientTo: '#3a5a8e',
  });
}
