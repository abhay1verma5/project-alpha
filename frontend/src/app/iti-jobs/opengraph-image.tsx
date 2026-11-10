import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'ITI Government Jobs 2026 — ITI Pass Sarkari Naukri All Trades';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'ITI Government Jobs 2026',
    subtitle: 'ITI Pass Sarkari Naukri — All Trades',
    badge: 'ITI',
    gradientFrom: '#2e1a1a',
    gradientVia: '#5f1e1e',
    gradientTo: '#8f3e1e',
  });
}
