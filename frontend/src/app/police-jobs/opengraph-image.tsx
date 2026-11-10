import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Police Government Jobs 2026 — Constable, SI, ASI Police Bharti';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Police Government Jobs 2026',
    subtitle: 'Constable, SI, ASI — Police Bharti',
    badge: 'POLICE',
    gradientFrom: '#1a1a2e',
    gradientVia: '#1e3a5f',
    gradientTo: '#1e5f8f',
  });
}
