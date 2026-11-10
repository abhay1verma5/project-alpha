import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Home Guard Jobs 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Home Guard Jobs 2026',
    subtitle: 'होम गार्ड भर्ती — All States',
    badge: 'HOME GUARD',
    gradientFrom: '#1a1a2e',
    gradientVia: '#2a3a5e',
    gradientTo: '#3a5a8e',
  });
}
