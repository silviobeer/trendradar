import { notFound } from "next/navigation";
import {
  handlungsfelder,
  getHandlungsfeldBySlug,
  getTrendsByHandlungsfeld,
  branchen,
} from "@trendradar/shared";
import { PageHeader } from "@/components/navigation/PageHeader";
import { BranchenFilter } from "@/components/filter/BranchenFilter";
import { TrendList } from "@/components/trends/TrendList";

interface HandlungsfeldPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return handlungsfelder.map((h) => ({ slug: h.slug }));
}

export default async function HandlungsfeldPage({ params }: HandlungsfeldPageProps) {
  const { slug } = await params;
  const handlungsfeld = getHandlungsfeldBySlug(slug);

  if (!handlungsfeld) {
    notFound();
  }

  const trends = getTrendsByHandlungsfeld(handlungsfeld.id);
  const pageTitle = `Handlungsfeld: ${handlungsfeld.name}`;

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <PageHeader
        breadcrumbItems={[
          { label: "Startseite", href: "/" },
          { label: pageTitle, href: `/handlungsfeld/${slug}` },
        ]}
        backHref="/"
      />

      <article className="mt-6">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{pageTitle}</h1>

        <p className="mt-4 text-base leading-relaxed text-gray-700">
          {handlungsfeld.beschreibung}
        </p>

        <section className="mt-8" aria-label="Branchenfilter">
          <BranchenFilter branchen={branchen} />
        </section>

        <section className="mt-6" aria-label="Trends">
          <TrendList handlungsfeldName={handlungsfeld.name} trends={trends} />
        </section>
      </article>
    </main>
  );
}
