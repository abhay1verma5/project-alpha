import { generateOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-image';

export const alt = 'Anganwadi Worker & Helper Jobs 2026';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return generateOgImage({
    title: 'Anganwadi Worker & Helper Jobs 2026',
    subtitle: 'आंगनवाड़ी भर्ती — Supervisor, Worker, Helper',
    badge: 'ANGANWADI',
    gradientFrom: '#2e1a2e',
    gradientVia: '#5a1a5a',
    gradientTo: '#8a1a8a',
  });
}
