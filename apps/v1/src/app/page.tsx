import { getAllTrends } from "@trendradar/shared";

export default function Home() {
  const trendCount = getAllTrends().length;

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">
        Trendradar ARTISET — Prototyp ({trendCount} Trends)
      </h1>
    </main>
  );
}
