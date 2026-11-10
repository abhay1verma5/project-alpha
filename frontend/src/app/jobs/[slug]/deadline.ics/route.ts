import { NextRequest, NextResponse } from 'next/server';
import { getJob } from '@/lib/api';

// Calendar file for a job's last date, with reminders 3 days and 1 day before.
// Works with Google Calendar, Samsung Calendar and iPhone without any account on our side.

function icsDate(iso: string): string {
  return iso.replace(/-/g, '');
}

function escapeIcs(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

export async function GET(_request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  let job;
  try {
    job = await getJob(slug);
  } catch {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }
  if (!job.last_date) {
    return NextResponse.json({ error: 'This notice has no last date yet' }, { status: 404 });
  }

  const url = `https://sarkarialert.online/jobs/${job.slug}`;
  const start = icsDate(job.last_date);
  // All-day event: DTEND is the next day in iCalendar.
  const endDate = new Date(job.last_date);
  endDate.setUTCDate(endDate.getUTCDate() + 1);
  const end = icsDate(endDate.toISOString().slice(0, 10));
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const description = [
    `Last date to apply: ${job.last_date}`,
    job.organization ? `Organisation: ${job.organization}` : '',
    job.apply_link ? `Apply: ${job.apply_link}` : '',
    `Details: ${url}`,
    'Pay fees only on the official website.',
  ]
    .filter(Boolean)
    .join('\n');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//SarkariAlert//Job Deadline//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${job.slug}@sarkarialert.online`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${escapeIcs(`Last date: ${job.title}`)}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    `URL:${url}`,
    'BEGIN:VALARM',
    'TRIGGER:-P3D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeIcs(`3 days left: ${job.title}`)}`,
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeIcs(`Tomorrow is the last date: ${job.title}`)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return new NextResponse(lines.join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${job.slug.slice(0, 60)}-deadline.ics"`,
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
