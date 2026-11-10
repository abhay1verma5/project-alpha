import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'BA Government Jobs 2026 — Arts Graduate Sarkari Naukri';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'BA Government Jobs 2026',
    subtitle: 'Arts Graduate Sarkari Naukri',
    badge: 'BA/ARTS',
    gradientFrom: '#3a1b2a',
    gradientVia: '#5e2d4a',
    gradientTo: '#8e4a6a',
  });
}
