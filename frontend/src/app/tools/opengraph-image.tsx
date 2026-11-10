import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Free Exam Tools & Calculators';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Free Exam Tools & Calculators',
    subtitle: 'Percentage, CGPA, BMI, Answer Key Calculator',
    badge: 'TOOLS',
    gradientFrom: '#1a2e2e',
    gradientVia: '#2a5a5a',
    gradientTo: '#3a8a8a',
  });
}
