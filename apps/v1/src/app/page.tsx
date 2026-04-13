import { getAllTrends, getNeusteTrends, megatrends, handlungsfelder, branchen } from "@trendradar/shared";
import { TrendRadar } from "@/components/radar/TrendRadar";
import { BranchenFilter } from "@/components/filter/BranchenFilter";
import { MegatrendSidebar } from "@/components/sidebar/MegatrendSidebar";
import { NeusteEntwicklungen } from "@/components/sidebar/NeusteEntwicklungen";

export default function Home() {
  const trends = getAllTrends();
  const neusteTrends = getNeusteTrends(10);

  return (
    <div className="h-screen overflow-hidden bg-gray-50 grid grid-rows-[auto_1fr_auto] grid-cols-[min-content_1fr_min-content]">
      {/* Row 1: Header — spans all 3 columns */}
      <header className="col-span-3 bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">ARTISET Trendradar</h1>
      </header>

      {/* Row 2, Col 1: Left sidebar — Neueste Entwicklungen */}
      <aside className="w-[140px] max-w-[160px] overflow-y-auto border-r border-gray-200 bg-white p-2">
        <NeusteEntwicklungen trends={neusteTrends} />
      </aside>

      {/* Row 2, Col 2: Radar center */}
      <div className="flex items-center justify-center overflow-hidden p-4">
        <TrendRadar
          trends={trends}
          handlungsfelder={handlungsfelder}
          branchen={branchen}
        />
      </div>

      {/* Row 2, Col 3: Right sidebar — Megatrends */}
      <aside className="w-[140px] max-w-[160px] overflow-y-auto border-l border-gray-200 bg-white p-2">
        <MegatrendSidebar megatrends={megatrends} />
      </aside>

      {/* Row 3: BranchenFilter — spans all 3 columns */}
      <div className="col-span-3 border-t border-gray-200 bg-white px-4 py-2 flex justify-center items-center">
        <BranchenFilter branchen={branchen} />
      </div>
    </div>
  );
}
