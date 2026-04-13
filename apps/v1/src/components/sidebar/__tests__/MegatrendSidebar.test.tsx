import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MegatrendSidebar } from "../MegatrendSidebar";
import type { Megatrend } from "@trendradar/shared";

const mockMegatrends: Megatrend[] = [
  { id: "demografischer-wandel", name: "Demografischer Wandel", slug: "demografischer-wandel", beschreibung: "" },
  { id: "wertewandel", name: "Wertewandel", slug: "wertewandel", beschreibung: "" },
  { id: "health-shift", name: "Health Shift", slug: "health-shift", beschreibung: "" },
  { id: "technologisierung", name: "Technologisierung", slug: "technologisierung", beschreibung: "" },
  { id: "oekonomisierung", name: "Ökonomisierung", slug: "oekonomisierung", beschreibung: "" },
  { id: "oekologisierung", name: "Ökologisierung", slug: "oekologisierung", beschreibung: "" },
];

describe("MegatrendSidebar", () => {
  it("AC-2: renders all 6 megatrends", () => {
    render(<MegatrendSidebar megatrends={mockMegatrends} />);

    for (const megatrend of mockMegatrends) {
      expect(screen.getByText(megatrend.name)).toBeInTheDocument();
    }
  });

  it("AC-3: each megatrend links to /megatrend/[slug]", () => {
    render(<MegatrendSidebar megatrends={mockMegatrends} />);

    for (const megatrend of mockMegatrends) {
      const link = screen.getByRole("link", { name: megatrend.name });
      expect(link).toHaveAttribute("href", `/megatrend/${megatrend.slug}`);
    }
  });

  it("renders an empty list when no megatrends are passed", () => {
    const { container } = render(<MegatrendSidebar megatrends={[]} />);
    const links = container.querySelectorAll("a");
    expect(links).toHaveLength(0);
  });
});
