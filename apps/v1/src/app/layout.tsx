import type { Metadata } from "next";
import { BranchenFilterProvider } from "@/contexts/BranchenFilterContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trendradar ARTISET",
  description: "Trendradar ARTISET — Prototyp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <BranchenFilterProvider>{children}</BranchenFilterProvider>
      </body>
    </html>
  );
}
