import { notFound } from "next/navigation";
import {
  getAllTrends,
  getTrendBySlug,
  getHandlungsfelderByTrend,
  getMegatrendsByTrend,
  getBrancheById,
} from "@trendradar/shared";
import { PageHeader } from "@/components/navigation/PageHeader";
import { ReflexionsFragen } from "@/components/trends/ReflexionsFragen";
import { MetaTags } from "@/components/trends/MetaTags";

export async function generateStaticParams() {
  const trends = getAllTrends();
  return trends.map((trend) => ({ slug: trend.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

const zeitrahmenConfig = {
  handeln: {
    label: "Handeln",
    classes: "bg-red-100 text-red-800 border border-red-200",
  },
  vorbereiten: {
    label: "Vorbereiten",
    classes: "bg-yellow-100 text-yellow-800 border border-yellow-200",
  },
  beobachten: {
    label: "Beobachten",
    classes: "bg-blue-100 text-blue-800 border border-blue-200",
  },
} as const;

export default async function TrendDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const trend = getTrendBySlug(slug);

  if (!trend) {
    notFound();
  }

  const handlungsfelder = getHandlungsfelderByTrend(trend);
  const megatrends = getMegatrendsByTrend(trend);

  const firstHf = handlungsfelder[0];
  const backHref = firstHf ? `/handlungsfeld/${firstHf.slug}` : "/";

  const breadcrumbItems = [
    { label: "Startseite", href: "/" },
    ...(firstHf
      ? [
          {
            label: `Handlungsfeld: ${firstHf.name}`,
            href: `/handlungsfeld/${firstHf.slug}`,
          },
        ]
      : []),
    { label: `Trend: ${trend.name}`, href: `/trend/${trend.slug}` },
  ];

  const zeitrahmen = zeitrahmenConfig[trend.zeitrahmen];

  const handlungsfeldItems = handlungsfelder.map((hf) => ({
    label: hf.name,
    href: `/handlungsfeld/${hf.slug}`,
  }));

  const megatrendItems = megatrends.map((mt) => ({
    label: mt.name,
    href: `/megatrend/${mt.slug}`,
  }));

  // Build branchenspezifische entries — only non-empty text
  const branchenTextEntries = Object.entries(trend.branchenTexte).filter(
    ([, text]) => text.trim().length > 0
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <PageHeader breadcrumbItems={breadcrumbItems} backHref={backHref} />

      <main className="mt-6 space-y-8">
        {/* Title and zeitbereich badge */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Trend: {trend.name}
          </h1>
          <span
            className={`inline-flex items-center self-start rounded-full px-3 py-1 text-sm font-medium ${zeitrahmen.classes}`}
          >
            {zeitrahmen.label}
          </span>
        </div>

        {/* Beschreibung */}
        <section>
          <p className="leading-relaxed text-gray-700">{trend.beschreibung}</p>
        </section>

        {/* Handlungsfelder */}
        {handlungsfeldItems.length > 0 && (
          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              Handlungsfelder
            </h2>
            <MetaTags
              items={handlungsfeldItems}
              colorClass="bg-indigo-100 text-indigo-800 border-indigo-200"
            />
          </section>
        )}

        {/* Megatrends */}
        {megatrendItems.length > 0 && (
          <section>
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              Megatrends
            </h2>
            <MetaTags
              items={megatrendItems}
              colorClass="bg-purple-100 text-purple-800 border-purple-200"
            />
          </section>
        )}

        {/* Reflexionsfragen */}
        <ReflexionsFragen fragen={trend.fragen} />

        {/* Branchenspezifische Texte */}
        {branchenTextEntries.length > 0 && (
          <section>
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Branchenspezifische Informationen
            </h2>
            <div className="space-y-6">
              {branchenTextEntries.map(([brancheId, text]) => {
                const branche = getBrancheById(brancheId);
                if (!branche) return null;
                return (
                  <article
                    key={brancheId}
                    className="rounded-r-lg border-l-4 bg-gray-50 p-4"
                    style={{ borderLeftColor: branche.farbe }}
                  >
                    <h3 className="mb-2 font-semibold text-gray-900">
                      {branche.organisation}
                    </h3>
                    <p className="leading-relaxed text-gray-700">{text}</p>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
