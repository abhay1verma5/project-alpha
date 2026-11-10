import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Diploma Government Jobs 2026 — Polytechnic Diploma Sarkari Naukri';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Diploma Government Jobs 2026',
    subtitle: 'Polytechnic Diploma Sarkari Naukri',
    badge: 'DIPLOMA',
    gradientFrom: '#1a2e1a',
    gradientVia: '#1e5f1e',
    gradientTo: '#3e8f1e',
  });
}
