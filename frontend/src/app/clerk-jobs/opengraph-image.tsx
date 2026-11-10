import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Clerk Government Jobs 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Clerk Government Jobs 2026',
    subtitle: 'LDC, UDC, DEO — Clerk Bharti',
    badge: 'CLERK',
    gradientFrom: '#1a2e2e',
    gradientVia: '#2a4a4a',
    gradientTo: '#3a6a6a',
  });
}
