import { notFound } from "next/navigation";
import { megatrends, getMegatrendBySlug, getTrendsByMegatrend } from "@trendradar/shared";
import type { Trend } from "@trendradar/shared";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import { TrendList } from "@/components/trends/TrendList";
import { ContentLayout, SectionDivider } from "@/components/layout/ContentLayout";

const ZEITRAHMEN_ORDER: Record<string, number> = {
  handeln: 0,
  vorbereiten: 1,
  beobachten: 2,
};

export async function generateStaticParams() {
  return megatrends.map((m) => ({ slug: m.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function MegatrendPage({ params }: Props) {
  const { slug } = await params;
  const megatrend = getMegatrendBySlug(slug);
  if (!megatrend) notFound();

  const trends = getTrendsByMegatrend(megatrend.id).sort(
    (a: Trend, b: Trend) =>
      (ZEITRAHMEN_ORDER[a.zeitrahmen] ?? 99) - (ZEITRAHMEN_ORDER[b.zeitrahmen] ?? 99)
  );

  return (
    <ContentLayout>
      <Breadcrumb
        items={[
          { label: "Startseite", href: "/" },
          { label: megatrend.name },
        ]}
      />

      <h1 className="mt-6">{megatrend.name}</h1>
      <p className="mt-4">{megatrend.beschreibung}</p>

      <SectionDivider />

      <section>
        <h2>Beeinflusste Trends</h2>
        {trends.length === 0 ? (
          <p className="mt-4 text-text-light">Keine Trends zugeordnet</p>
        ) : (
          <TrendList trends={trends} />
        )}
      </section>
    </ContentLayout>
  );
}
