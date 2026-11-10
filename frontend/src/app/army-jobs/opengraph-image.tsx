import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Indian Army Jobs 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Indian Army Jobs 2026',
    subtitle: 'भारतीय सेना भर्ती — Agniveer, Officer, JCO',
    badge: 'INDIAN ARMY',
    gradientFrom: '#1a2e1a',
    gradientVia: '#2a4a1a',
    gradientTo: '#3a6a1a',
    accentColor: '#2e7d32',
  });
}
