import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Indian Navy Jobs 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Indian Navy Jobs 2026',
    subtitle: 'भारतीय नौसेना भर्ती — Agniveer, Officer',
    badge: 'INDIAN NAVY',
    gradientFrom: '#0d1a37',
    gradientVia: '#1a2a5c',
    gradientTo: '#2545ab',
    accentColor: '#1565c0',
  });
}
