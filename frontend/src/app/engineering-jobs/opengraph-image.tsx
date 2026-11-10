import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Engineering Government Jobs 2026 — BE/B.Tech Sarkari Naukri';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Engineering Government Jobs 2026',
    subtitle: 'BE/B.Tech/ME/M.Tech Sarkari Naukri',
    badge: 'ENGINEERING',
    gradientFrom: '#1b1b3a',
    gradientVia: '#2d2d6e',
    gradientTo: '#4a47a3',
  });
}
