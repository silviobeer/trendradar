import { notFound } from "next/navigation";
import Link from "next/link";
import { megatrends, getMegatrendBySlug, getTrendsByMegatrend } from "@trendradar/shared";
import type { Trend } from "@trendradar/shared";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import { ZeitbereichBadge } from "@/components/trends/ZeitbereichBadge";
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
          <div className="mt-4 divide-y divide-primary-60/20">
            {trends.map((trend) => (
              <div key={trend.id} className="py-3 flex items-center gap-3">
                <Link
                  href={`/trend/${trend.slug}`}
                  className="flex-1 text-primary hover:underline font-normal"
                >
                  {trend.name}
                </Link>
                <ZeitbereichBadge zeitrahmen={trend.zeitrahmen} />
              </div>
            ))}
          </div>
        )}
      </section>
    </ContentLayout>
  );
}
