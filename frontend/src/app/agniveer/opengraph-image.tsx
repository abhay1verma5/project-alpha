import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Agniveer Bharti 2026 — Army, Navy, Air Force';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Agniveer Bharti 2026 — Army, Navy, Air Force',
    subtitle: 'अग्निवीर भर्ती — All Branches',
    badge: 'AGNIVEER',
    gradientFrom: '#1a2e1a',
    gradientVia: '#2a4a1a',
    gradientTo: '#3a6a1a',
    accentColor: '#2e7d32',
  });
}
