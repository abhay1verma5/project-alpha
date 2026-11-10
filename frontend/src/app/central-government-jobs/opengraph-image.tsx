import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Central Government Jobs 2026 — केंद्र सरकार नौकरी All Ministries';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Central Government Jobs 2026',
    subtitle: 'केंद्र सरकार नौकरी — All Ministries',
    badge: 'CENTRAL GOVT',
    gradientFrom: '#0d2137',
    gradientVia: '#1a3a5c',
    gradientTo: '#2563eb',
  });
}
