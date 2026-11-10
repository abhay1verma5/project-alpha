import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'B.Sc Government Jobs 2026 — Science Graduate Sarkari Naukri';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'B.Sc Government Jobs 2026',
    subtitle: 'Science Graduate Sarkari Naukri',
    badge: 'B.SC',
    gradientFrom: '#1b2a3a',
    gradientVia: '#2d4a6e',
    gradientTo: '#4a7aa3',
  });
}
