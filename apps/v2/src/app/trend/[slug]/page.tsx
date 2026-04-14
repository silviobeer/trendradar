import { notFound } from "next/navigation";
import {
  getAllTrends,
  getTrendBySlug,
  getHandlungsfelderByTrend,
  getMegatrendsByTrend,
  getBrancheById,
} from "@trendradar/shared";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import Tag from "@/components/ui/Tag";
import Card from "@/components/ui/Card";
import { ZeitbereichBadge } from "@/components/trends/ZeitbereichBadge";
import { ContentLayout, SectionDivider } from "@/components/layout/ContentLayout";

export async function generateStaticParams() {
  return getAllTrends().map((t) => ({ slug: t.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function TrendDetailPage({ params }: Props) {
  const { slug } = await params;
  const trend = getTrendBySlug(slug);
  if (!trend) notFound();

  const handlungsfelder = getHandlungsfelderByTrend(trend);
  const megatrends = getMegatrendsByTrend(trend);
  const firstHf = handlungsfelder[0];

  const breadcrumbItems = [
    { label: "Startseite", href: "/" },
    ...(firstHf
      ? [{ label: firstHf.name, href: `/handlungsfeld/${firstHf.slug}` }]
      : []),
    { label: trend.name },
  ];

  // Branchenspezifische texts — only non-empty, in order CURAVIVA, INSOS, YOUVITA
  const brancheOrder = ["curaviva", "insos", "youvita"];
  const branchenTextEntries = brancheOrder
    .filter((id) => trend.branchenTexte[id]?.trim())
    .map((id) => ({ branche: getBrancheById(id)!, text: trend.branchenTexte[id] }))
    .filter((e) => e.branche);

  return (
    <ContentLayout>
      <Breadcrumb items={breadcrumbItems} />

      {/* Title section */}
      <div className="mt-6 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="mr-auto">{trend.name}</h1>
          <ZeitbereichBadge zeitrahmen={trend.zeitrahmen} />
        </div>
        <div className="flex flex-wrap gap-2">
          {handlungsfelder.map((hf) => (
            <Tag key={hf.id} variant="handlungsfeld" href={`/handlungsfeld/${hf.slug}`}>
              {hf.name}
            </Tag>
          ))}
        </div>
      </div>

      {/* Beschreibung */}
      {trend.beschreibung && (
        <>
          <SectionDivider />
          <p>{trend.beschreibung}</p>
        </>
      )}

      {/* Reflexionsfragen */}
      {trend.fragen.length > 0 && (
        <>
          <SectionDivider />
          <section>
            <h2>Reflexionsfragen</h2>
            <ul className="mt-4 space-y-2 list-disc list-inside text-text-medium">
              {trend.fragen.map((frage, i) => (
                <li key={i}>{frage}</li>
              ))}
            </ul>
          </section>
        </>
      )}

      {/* Megatrend Tags */}
      {megatrends.length > 0 && (
        <>
          <SectionDivider />
          <section>
            <h2>Megatrends</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {megatrends.map((mt) => (
                <Tag key={mt.id} variant="megatrend" href={`/megatrend/${mt.slug}`}>
                  {mt.name}
                </Tag>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Branchenspezifische Karten */}
      {branchenTextEntries.length > 0 && (
        <>
          <SectionDivider />
          <section>
            <h2>Branchenspezifisch</h2>
            <div className="mt-4 space-y-4">
              {branchenTextEntries.map(({ branche, text }) => (
                <Card key={branche.id} brandColor={branche.farbe} className="p-6">
                  <h3 className="mb-2">{branche.organisation}</h3>
                  <p>{text}</p>
                </Card>
              ))}
            </div>
          </section>
        </>
      )}
    </ContentLayout>
  );
}
