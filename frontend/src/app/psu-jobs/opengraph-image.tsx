import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'PSU Government Jobs 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'PSU Government Jobs 2026',
    subtitle: 'BHEL, NTPC, ONGC, IOCL, SAIL Bharti',
    badge: 'PSU JOBS',
    gradientFrom: '#1a1a2e',
    gradientVia: '#2a2a4e',
    gradientTo: '#3a3a6e',
  });
}
