import { ImageResponse } from 'next/og';
import { getJob } from '@/lib/api';

export const alt = 'SarkariAlert Job Details';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let title = 'Government Job';
  let org = '';
  let vacancies = '';
  let lastDate = '';
  let category = '';

  try {
    const job = await getJob(slug);
    title = job.title || title;
    org = job.organization || '';
    vacancies = job.vacancies ? `${job.vacancies.toLocaleString('en-IN')} Posts` : '';
    lastDate = job.last_date ? `Last Date: ${new Date(job.last_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}` : '';
    category = job.category?.toUpperCase() || '';
  } catch {
    // Use defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0d2137 0%, #1a3a5c 50%, #2563eb 100%)',
          padding: '60px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
          <div style={{ background: '#ff6f00', color: 'white', padding: '8px 20px', borderRadius: '12px', fontSize: '22px', fontWeight: 700 }}>
            SarkariAlert
          </div>
          {category && (
            <div style={{ background: 'rgba(255,255,255,0.15)', color: 'white', padding: '8px 16px', borderRadius: '10px', fontSize: '18px', fontWeight: 600 }}>
              {category}
            </div>
          )}
        </div>
        <div style={{ fontSize: '48px', fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: '24px', display: 'flex', maxWidth: '1000px' }}>
          {title.length > 80 ? title.slice(0, 80) + '...' : title}
        </div>
        {org && (
          <div style={{ fontSize: '26px', color: 'rgba(255,255,255,0.8)', marginBottom: '16px', display: 'flex' }}>
            {org}
          </div>
        )}
        <div style={{ display: 'flex', gap: '24px', marginTop: 'auto' }}>
          {vacancies && (
            <div style={{ background: 'rgba(16,185,129,0.2)', color: '#6ee7b7', padding: '10px 24px', borderRadius: '12px', fontSize: '22px', fontWeight: 700, display: 'flex' }}>
              {vacancies}
            </div>
          )}
          {lastDate && (
            <div style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.9)', padding: '10px 24px', borderRadius: '12px', fontSize: '22px', fontWeight: 600, display: 'flex' }}>
              {lastDate}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', position: 'absolute', bottom: '30px', right: '60px', fontSize: '18px', color: 'rgba(255,255,255,0.5)' }}>
          sarkarialert.online
        </div>
      </div>
    ),
    { ...size }
  );
}
