import { getAllTrends } from "@trendradar/shared";

export default function HomePage() {
  const trends = getAllTrends();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Trendradar ARTISET</h1>
      <p className="mt-4 text-lg">{trends.length} Trends</p>
    </main>
  );
}
