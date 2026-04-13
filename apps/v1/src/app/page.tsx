import { getAllTrends, getNeusteTrends, megatrends, handlungsfelder, branchen } from "@trendradar/shared";
import { TrendRadar } from "@/components/radar/TrendRadar";
import { BranchenFilter } from "@/components/filter/BranchenFilter";
import { MegatrendSidebar } from "@/components/sidebar/MegatrendSidebar";
import { NeusteEntwicklungen } from "@/components/sidebar/NeusteEntwicklungen";

export default function Home() {
  const trends = getAllTrends();
  const neusteTrends = getNeusteTrends(10);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">ARTISET Trendradar</h1>
      </header>

      {/* 3-column layout */}
      <main className="grid grid-cols-[1fr_auto_1fr] gap-6 px-6 py-6 max-w-[1440px] mx-auto">
        {/* Left column: Neueste Entwicklungen */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 self-start">
          <NeusteEntwicklungen trends={neusteTrends} />
        </div>

        {/* Center column: Radar + BranchenFilter */}
        <div className="flex flex-col items-center gap-4">
          <TrendRadar
            trends={trends}
            handlungsfelder={handlungsfelder}
            branchen={branchen}
          />
          <div className="bg-white rounded-lg border border-gray-200 p-4 w-full">
            <BranchenFilter branchen={branchen} />
          </div>
        </div>

        {/* Right column: Megatrend-Sidebar */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 self-start">
          <MegatrendSidebar megatrends={megatrends} />
        </div>
      </main>
    </div>
  );
}
