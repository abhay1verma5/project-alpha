import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Uttarakhand Government Jobs 2026 — UKPSC, UKSSSC Vacancies';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Uttarakhand Government Jobs 2026',
    subtitle: 'उत्तराखंड सरकारी नौकरी — UKPSC, UKSSSC',
    badge: 'UTTARAKHAND',
    gradientFrom: '#1a2e2e',
    gradientVia: '#2a5a5e',
    gradientTo: '#3a8a8e',
  });
}
