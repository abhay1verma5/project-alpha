import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Exam Preparation Tips & Guides 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Exam Preparation Tips & Guides 2026',
    subtitle: 'परीक्षा तैयारी — Expert Strategies',
    badge: 'BLOG',
    gradientFrom: '#2e1a2e',
    gradientVia: '#5a2a5a',
    gradientTo: '#8a4a8a',
  });
}
