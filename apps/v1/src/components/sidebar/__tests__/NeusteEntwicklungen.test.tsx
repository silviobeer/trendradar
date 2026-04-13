import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NeusteEntwicklungen } from "../NeusteEntwicklungen";
import type { Trend } from "@trendradar/shared";

function makeTrend(overrides: Partial<Trend> & { id: string; slug: string; name: string; erstellungsdatum: string }): Trend {
  return {
    beschreibung: "",
    zeitrahmen: "beobachten",
    handlungsfeldIds: [],
    megatrendIds: [],
    branchenIds: [],
    fragen: [],
    branchenTexte: {},
    ...overrides,
  };
}

const mockTrends: Trend[] = [
  makeTrend({ id: "t1", name: "Trend Neu", slug: "trend-neu", erstellungsdatum: "2024-03-15" }),
  makeTrend({ id: "t2", name: "Trend Alt", slug: "trend-alt", erstellungsdatum: "2023-01-10" }),
  makeTrend({ id: "t3", name: "Trend Mitte", slug: "trend-mitte", erstellungsdatum: "2024-01-01" }),
];

describe("NeusteEntwicklungen", () => {
  it("AC-6: renders trend names", () => {
    render(<NeusteEntwicklungen trends={mockTrends} />);

    for (const trend of mockTrends) {
      expect(screen.getByText(trend.name)).toBeInTheDocument();
    }
  });

  it("AC-6: renders formatted dates in DD.MM.YYYY format", () => {
    render(<NeusteEntwicklungen trends={mockTrends} />);

    expect(screen.getByText("15.03.2024")).toBeInTheDocument();
    expect(screen.getByText("10.01.2023")).toBeInTheDocument();
    expect(screen.getByText("01.01.2024")).toBeInTheDocument();
  });

  it("AC-7: each trend links to /trend/[slug]", () => {
    render(<NeusteEntwicklungen trends={mockTrends} />);

    for (const trend of mockTrends) {
      const link = screen.getByRole("link", { name: new RegExp(trend.name) });
      expect(link).toHaveAttribute("href", `/trend/${trend.slug}`);
    }
  });

  it("AC-5: renders trends in the order provided (caller pre-sorts)", () => {
    // Caller passes trends already sorted newest first; component preserves order
    const sorted = [mockTrends[0], mockTrends[2], mockTrends[1]]; // newest first
    render(<NeusteEntwicklungen trends={sorted} />);

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveTextContent("Trend Neu");
    expect(links[1]).toHaveTextContent("Trend Mitte");
    expect(links[2]).toHaveTextContent("Trend Alt");
  });

  it("renders an empty list when no trends are passed", () => {
    const { container } = render(<NeusteEntwicklungen trends={[]} />);
    const links = container.querySelectorAll("a");
    expect(links).toHaveLength(0);
  });
});
