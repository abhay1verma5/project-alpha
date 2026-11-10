import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'IT/Computer Government Jobs 2026 — BCA, MCA, B.Tech CS Sarkari Naukri';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'IT/Computer Government Jobs 2026',
    subtitle: 'BCA, MCA, B.Tech CS Sarkari Naukri',
    badge: 'IT/COMPUTER',
    gradientFrom: '#0d1f37',
    gradientVia: '#1a3a6c',
    gradientTo: '#2563eb',
  });
}
