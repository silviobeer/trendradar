import type { Metadata } from "next";
import "./globals.css";
import { roboto, robotoSlab } from "@/lib/fonts";
import { BranchenFilterProvider } from "@/contexts/BranchenFilterContext";

export const metadata: Metadata = {
  title: "Trendradar ARTISET",
  description: "Interaktive Visualisierung gesellschaftlicher Trends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${roboto.variable} ${robotoSlab.variable}`}>
      <body className="bg-bg-warm-light text-text-medium font-sans font-light">
        <BranchenFilterProvider>{children}</BranchenFilterProvider>
      </body>
    </html>
  );
}
