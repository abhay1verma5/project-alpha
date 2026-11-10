const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const SITE_URL = 'https://sarkarialert.online';

export async function GET() {
  let jobs: any[] = [];
  try {
    const res = await fetch(`${API_BASE}/news/?page_size=50`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      jobs = data.results || [];
    }
  } catch {
    // Feed still works with no items
  }

  const escapeXml = (str: string) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

  const items = jobs
    .map(
      (job: any) => `
    <item>
      <title><![CDATA[${job.title}]]></title>
      <link>${SITE_URL}/jobs/${escapeXml(job.slug)}</link>
      <guid isPermaLink="true">${SITE_URL}/jobs/${escapeXml(job.slug)}</guid>
      <pubDate>${new Date(job.posted_date).toUTCString()}</pubDate>
      <description><![CDATA[${job.organization} — ${job.qualification || 'Various qualifications'}. ${job.vacancies ? job.vacancies + ' posts.' : ''} Last Date: ${job.last_date || 'See details'}]]></description>
      <category>${escapeXml(job.category)}</category>
    </item>`,
    )
    .join('');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SarkariAlert - Government Jobs</title>
    <link>${SITE_URL}</link>
    <description>Latest government job notifications, results, and admit cards from SSC, UPSC, Railway, Banking, Defence, Police and more.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=600',
    },
  });
}
