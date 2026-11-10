import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'RRB NTPC 2026 — Railway Jobs & Results';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'RRB NTPC 2026 — Railway Jobs & Results',
    subtitle: 'Non-Technical Popular Categories',
    badge: 'RRB NTPC',
    gradientFrom: '#2e1a00',
    gradientVia: '#5c3a1a',
    gradientTo: '#8b5e2b',
  });
}
