import { notFound } from "next/navigation";
import {
  handlungsfelder,
  getHandlungsfeldBySlug,
  getTrendsByHandlungsfeld,
} from "@trendradar/shared";
import Breadcrumb from "@/components/navigation/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { BranchenFilter } from "@/components/filter/BranchenFilter";
import { TrendList } from "@/components/trends/TrendList";
import { ContentLayout, SectionDivider } from "@/components/layout/ContentLayout";

export async function generateStaticParams() {
  return handlungsfelder.map((h) => ({ slug: h.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function HandlungsfeldPage({ params }: Props) {
  const { slug } = await params;
  const hf = getHandlungsfeldBySlug(slug);
  if (!hf) notFound();
  const trends = getTrendsByHandlungsfeld(hf.id);

  return (
    <ContentLayout>
      <Breadcrumb
        items={[
          { label: "Startseite", href: "/" },
          { label: hf.name },
        ]}
      />
      <h1 className="mt-6">{hf.name}</h1>
      <p className="mt-4">{hf.beschreibung}</p>
      <div className="mt-8">
        <a href="#trendliste">
          <Button variant="primary">Trends anzeigen</Button>
        </a>
      </div>
      <div className="mt-8" id="trendliste">
        <BranchenFilter />
      </div>
      <SectionDivider />
      <TrendList trends={trends} />
    </ContentLayout>
  );
}
