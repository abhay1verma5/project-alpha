import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Panchayat Government Jobs 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Panchayat Government Jobs 2026',
    subtitle: 'ग्राम पंचायत भर्ती — Secretary, Rozgar Sevak',
    badge: 'PANCHAYAT',
    gradientFrom: '#1a2e1a',
    gradientVia: '#2a5a2a',
    gradientTo: '#3a8a3a',
  });
}
