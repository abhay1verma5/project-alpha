import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface Years { years: { year: number; questions: number; subjects: { subject: string; count: number }[] }[] }

/** Year-wise past papers for an exam (server component): links to /pyq/<exam>/<year>. */
export async function YearPapers({ exam, name }: { exam: string; name: string }) {
  let data: Years | null = null;
  try {
    const r = await fetch(`${API}/pyq/papers/?exam=${encodeURIComponent(exam)}`, {
      next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000),
    });
    if (r.ok) data = await r.json();
  } catch { /* render nothing */ }
  if (!data || data.years.length === 0) return null;
  return (
    <section className="mb-6">
      <h2 className="text-lg font-bold mb-2">{name} question papers by year / वर्षवार प्रश्नपत्र</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {data.years.map((y) => (
          <Link key={y.year} href={`/pyq/${exam}/${y.year}`}
            className="rounded-xl border border-border bg-surface px-3 py-3 min-h-10 hover:border-emerald-500">
            <span className="block text-base font-bold text-foreground">{name} {y.year}</span>
            <span className="block text-xs text-emerald-700 dark:text-emerald-300 font-semibold">
              {y.questions} questions · {y.subjects.length} subjects
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
