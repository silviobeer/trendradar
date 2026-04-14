import { getAllTrends, getNeusteTrends, megatrends, handlungsfelder, branchen } from "@trendradar/shared";
import { HomeLayout } from "@/components/layout/HomeLayout";

export default function Home() {
  const trends = getAllTrends();
  const neusteTrends = getNeusteTrends(10);
  return (
    <HomeLayout
      trends={trends}
      neusteTrends={neusteTrends}
      handlungsfelder={handlungsfelder}
      branchen={branchen}
      megatrends={megatrends}
    />
  );
}
