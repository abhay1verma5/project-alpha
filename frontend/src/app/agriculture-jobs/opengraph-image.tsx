import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Agriculture Government Jobs 2026 — B.Sc Agriculture Sarkari Naukri';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Agriculture Government Jobs 2026',
    subtitle: 'B.Sc Agriculture, Horticulture Sarkari Naukri',
    badge: 'AGRICULTURE',
    gradientFrom: '#1a2e10',
    gradientVia: '#2a5f1a',
    gradientTo: '#3a8f2a',
  });
}
