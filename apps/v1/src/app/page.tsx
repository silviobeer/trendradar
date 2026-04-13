import { getAllTrends, getNeusteTrends, megatrends, handlungsfelder, branchen } from "@trendradar/shared";
import { TrendRadar } from "@/components/radar/TrendRadar";
import { BranchenFilter } from "@/components/filter/BranchenFilter";
import { MegatrendSidebar } from "@/components/sidebar/MegatrendSidebar";
import { NeusteEntwicklungen } from "@/components/sidebar/NeusteEntwicklungen";

export default function Home() {
  const trends = getAllTrends();
  const neusteTrends = getNeusteTrends(10);

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      {/* Top bar */}
      <header className="col-span-3 bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">ARTISET Trendradar</h1>
      </header>

      {/* Fullscreen 3-column, 3-row grid */}
      <main className="grid grid-rows-[auto_1fr_auto] grid-cols-[min-content_1fr_min-content] overflow-hidden h-[calc(100vh-57px)]">
        {/* Left column: Neueste Entwicklungen */}
        <div className="row-span-3 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <NeusteEntwicklungen trends={neusteTrends} />
        </div>

        {/* Center column: Radar */}
        <div className="flex items-center justify-center overflow-hidden p-4">
          <TrendRadar
            trends={trends}
            handlungsfelder={handlungsfelder}
            branchen={branchen}
          />
        </div>

        {/* Right column: Megatrend-Sidebar */}
        <div className="row-span-3 bg-white border-l border-gray-200 p-4 overflow-y-auto">
          <MegatrendSidebar megatrends={megatrends} />
        </div>

        {/* Bottom center: BranchenFilter */}
        <div className="bg-white border-t border-gray-200 p-4">
          <BranchenFilter branchen={branchen} />
        </div>
      </main>
    </div>
  );
}
