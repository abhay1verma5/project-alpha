import { ImageResponse } from 'next/og';

export const alt = 'SarkariAlert — Government Jobs, Results & Admit Cards';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0d2137 0%, #1a3a5c 50%, #2563eb 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '30px' }}>
          <div style={{ background: '#ff6f00', color: 'white', padding: '12px 32px', borderRadius: '16px', fontSize: '42px', fontWeight: 800 }}>
            SarkariAlert
          </div>
        </div>
        <div style={{ fontSize: '36px', fontWeight: 700, color: 'white', textAlign: 'center', marginBottom: '16px', display: 'flex' }}>
          Latest Government Jobs, Results & Admit Cards
        </div>
        <div style={{ fontSize: '22px', color: 'rgba(255,255,255,0.7)', textAlign: 'center', display: 'flex' }}>
          SSC | UPSC | Railway | Banking | Defence | State PSC | Police
        </div>
        <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', color: 'white', padding: '10px 24px', borderRadius: '12px', fontSize: '20px', fontWeight: 600, display: 'flex' }}>
            800+ Active Jobs
          </div>
          <div style={{ background: 'rgba(16,185,129,0.2)', color: '#6ee7b7', padding: '10px 24px', borderRadius: '12px', fontSize: '20px', fontWeight: 600, display: 'flex' }}>
            3,00,000+ Vacancies
          </div>
          <div style={{ background: 'rgba(255,111,0,0.2)', color: '#ffb74d', padding: '10px 24px', borderRadius: '12px', fontSize: '20px', fontWeight: 600, display: 'flex' }}>
            AI-Powered Search
          </div>
        </div>
        <div style={{ display: 'flex', position: 'absolute', bottom: '30px', fontSize: '18px', color: 'rgba(255,255,255,0.4)' }}>
          sarkarialert.online
        </div>
      </div>
    ),
    { ...size }
  );
}