import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getMegatrendBySlug,
  getTrendsByMegatrend,
  getHandlungsfelderByTrend,
  megatrends,
} from "@trendradar/shared";
import type { Trend } from "@trendradar/shared";
import { PageHeader } from "@/components/navigation/PageHeader";

interface Props {
  params: Promise<{ slug: string }>;
}

const ZEITRAHMEN_ORDER: Record<string, number> = {
  handeln: 0,
  vorbereiten: 1,
  beobachten: 2,
};

const ZEITRAHMEN_LABELS: Record<string, string> = {
  handeln: "Handeln",
  vorbereiten: "Vorbereiten",
  beobachten: "Beobachten",
};

const ZEITRAHMEN_COLORS: Record<string, string> = {
  handeln: "bg-red-100 text-red-800",
  vorbereiten: "bg-yellow-100 text-yellow-800",
  beobachten: "bg-blue-100 text-blue-800",
};

export async function generateStaticParams() {
  return megatrends.map((m) => ({ slug: m.slug }));
}

export default async function MegatrendPage({ params }: Props) {
  const { slug } = await params;
  const megatrend = getMegatrendBySlug(slug);

  if (!megatrend) {
    notFound();
  }

  const trends = getTrendsByMegatrend(megatrend.id).sort(
    (a: Trend, b: Trend) =>
      (ZEITRAHMEN_ORDER[a.zeitrahmen] ?? 99) -
      (ZEITRAHMEN_ORDER[b.zeitrahmen] ?? 99)
  );

  const breadcrumbItems = [
    { label: "Startseite", href: "/" },
    { label: `Megatrend: ${megatrend.name}`, href: `/megatrend/${megatrend.slug}` },
  ];

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <PageHeader breadcrumbItems={breadcrumbItems} backHref="/" />

      <article>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">
          Megatrend: {megatrend.name}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray-700">
          {megatrend.beschreibung}
        </p>
      </article>

      <section aria-labelledby="trends-heading" className="mt-10">
        <h2
          id="trends-heading"
          className="mb-4 text-xl font-semibold text-gray-800"
        >
          Beeinflusste Trends
        </h2>

        {trends.length === 0 ? (
          <p className="text-gray-500">Keine Trends zugeordnet</p>
        ) : (
          <ul className="divide-y divide-gray-200 rounded-lg border border-gray-200">
            {trends.map((trend) => {
              const handlungsfelder = getHandlungsfelderByTrend(trend);
              return (
                <li key={trend.id} className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
                  <Link
                    href={`/trend/${trend.slug}`}
                    className="flex-1 font-medium text-gray-900 hover:text-blue-700 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
                  >
                    {trend.name}
                  </Link>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${ZEITRAHMEN_COLORS[trend.zeitrahmen]}`}
                  >
                    {ZEITRAHMEN_LABELS[trend.zeitrahmen]}
                  </span>
                  {handlungsfelder.length > 0 && (
                    <span className="text-xs text-gray-500">
                      {handlungsfelder.map((h) => h.name).join(", ")}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
