import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Government Jobs for Women 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Government Jobs for Women 2026',
    subtitle: 'महिलाओं के लिए सरकारी नौकरी — All Departments',
    badge: 'WOMEN',
    gradientFrom: '#3a1a2e',
    gradientVia: '#6e2d5a',
    gradientTo: '#a34793',
  });
}
