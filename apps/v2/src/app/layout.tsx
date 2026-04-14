import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
