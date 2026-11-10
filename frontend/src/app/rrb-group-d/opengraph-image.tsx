import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'RRB Group D 2026 — Railway Jobs & Results';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'RRB Group D 2026 — Railway Jobs & Results',
    subtitle: 'Level 1 — Track Maintainer, Helper, Porter',
    badge: 'RRB GROUP D',
    gradientFrom: '#2e2a1a',
    gradientVia: '#5c4a2a',
    gradientTo: '#8b6e3b',
  });
}
