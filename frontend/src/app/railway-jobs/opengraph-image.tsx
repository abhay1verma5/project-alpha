import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Railway Government Jobs 2026 — RRB NTPC, Group D, ALP Railway Bharti';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Railway Government Jobs 2026',
    subtitle: 'RRB NTPC, Group D, ALP, JE — Railway Bharti',
    badge: 'RAILWAY',
    gradientFrom: '#2e1a00',
    gradientVia: '#5c3a1a',
    gradientTo: '#8b5e2b',
  });
}
