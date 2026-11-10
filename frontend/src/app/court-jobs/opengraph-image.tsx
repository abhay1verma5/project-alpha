import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Court Government Jobs 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Court Government Jobs 2026',
    subtitle: 'High Court, District Court — Peon, Clerk, Stenographer',
    badge: 'COURT JOBS',
    gradientFrom: '#2e2e1a',
    gradientVia: '#4a4a2a',
    gradientTo: '#6a6a3a',
  });
}
