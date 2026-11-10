import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Indian Air Force Jobs 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Indian Air Force Jobs 2026',
    subtitle: 'भारतीय वायुसेना भर्ती — Agniveer, AFCAT',
    badge: 'AIR FORCE',
    gradientFrom: '#1a2a3a',
    gradientVia: '#2a4a6a',
    gradientTo: '#3a6a9a',
    accentColor: '#0277bd',
  });
}
