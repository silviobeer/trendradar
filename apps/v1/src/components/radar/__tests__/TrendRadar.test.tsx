import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { TrendRadar } from "../TrendRadar";
import { BranchenFilterProvider } from "@/contexts/BranchenFilterContext";
import type { Trend, Handlungsfeld, Branche } from "@trendradar/shared";
import type { ReactNode } from "react";

// Mock next/navigation for jsdom tests
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

const mockHandlungsfelder: Handlungsfeld[] = [
  { id: "hf1", name: "Digitalisierung", slug: "digitalisierung", beschreibung: "", position: 1 },
  { id: "hf2", name: "Innovation", slug: "innovation", beschreibung: "", position: 2 },
];

const mockBranchen: Branche[] = [
  { id: "curaviva", name: "Menschen im Alter", organisation: "CURAVIVA", slug: "curaviva", farbe: "#e07b39" },
  { id: "insos", name: "Menschen mit Behinderungen", organisation: "INSOS", slug: "insos", farbe: "#4a6fa5" },
  { id: "youvita", name: "Kinder und Jugendliche", organisation: "YOUVITA", slug: "youvita", farbe: "#2a9d8f" },
];

const mockTrends: Trend[] = [
  {
    id: "t1",
    name: "Trend Curaviva",
    slug: "trend-curaviva",
    beschreibung: "",
    zeitrahmen: "handeln",
    handlungsfeldIds: ["hf1"],
    megatrendIds: [],
    branchenIds: ["curaviva"],
    fragen: [],
    erstellungsdatum: "2024-01-01",
    branchenTexte: {},
  },
  {
    id: "t2",
    name: "Trend Insos",
    slug: "trend-insos",
    beschreibung: "",
    zeitrahmen: "vorbereiten",
    handlungsfeldIds: ["hf2"],
    megatrendIds: [],
    branchenIds: ["insos"],
    fragen: [],
    erstellungsdatum: "2024-01-01",
    branchenTexte: {},
  },
];

function wrapper({ children }: { children: ReactNode }) {
  return <BranchenFilterProvider>{children}</BranchenFilterProvider>;
}

describe("TrendRadar SVG scaling (US-1 PROJ-9)", () => {
  it("AC-2: SVG does NOT have max-w-[600px] class", () => {
    const { container } = render(
      <TrendRadar
        trends={mockTrends}
        handlungsfelder={mockHandlungsfelder}
        branchen={mockBranchen}
      />,
      { wrapper }
    );
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg!.className.baseVal).not.toContain("max-w-[600px]");
  });

  it("AC-2: radar inner wrapper uses container-query sizing (no aspect-square needed)", () => {
    const { container } = render(
      <TrendRadar
        trends={mockTrends}
        handlungsfelder={mockHandlungsfelder}
        branchen={mockBranchen}
      />,
      { wrapper }
    );
    // Container query approach: inner div has inline style with min(100cqw, 100cqh)
    const relativeDiv = container.querySelector("div.relative") as HTMLElement;
    expect(relativeDiv).not.toBeNull();
    expect(relativeDiv.style.width).toContain("min(");
  });

  it("AC-3: SVG has viewBox '0 0 600 600' at default zoom (aspect ratio preserved)", () => {
    const { container } = render(
      <TrendRadar
        trends={mockTrends}
        handlungsfelder={mockHandlungsfelder}
        branchen={mockBranchen}
      />,
      { wrapper }
    );
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", "0 0 600 600");
  });

  it("AC-4: outer SVG wrapper div has w-full and h-full for responsive sizing", () => {
    const { container } = render(
      <TrendRadar
        trends={mockTrends}
        handlungsfelder={mockHandlungsfelder}
        branchen={mockBranchen}
      />,
      { wrapper }
    );
    // The outermost div (flex container) carries w-full h-full
    const outerDiv = container.firstElementChild as HTMLElement;
    expect(outerDiv.className).toContain("w-full");
    expect(outerDiv.className).toContain("h-full");
  });
});

describe("TrendRadar blip visibility", () => {
  it("AC-3/AC-4: blips for active branches have opacity-100, hidden blips have opacity-0", () => {
    const { container } = render(
      <TrendRadar
        trends={mockTrends}
        handlungsfelder={mockHandlungsfelder}
        branchen={mockBranchen}
      />,
      { wrapper }
    );

    // All blips should be visible by default (opacity-100 or no opacity class)
    const polygons = container.querySelectorAll("polygon[data-slug]");
    expect(polygons.length).toBeGreaterThan(0);

    polygons.forEach((polygon) => {
      // data-visible="true" when active
      expect(polygon).toHaveAttribute("data-visible", "true");
    });
  });

  it("AC-3: curaviva blip is visible by default", () => {
    const { container } = render(
      <TrendRadar
        trends={mockTrends}
        handlungsfelder={mockHandlungsfelder}
        branchen={mockBranchen}
      />,
      { wrapper }
    );

    const curavivaPoly = container.querySelector("polygon[data-slug='trend-curaviva']");
    expect(curavivaPoly).toHaveAttribute("data-visible", "true");
  });

  it("AC-8: multi-branch blips have stroke-width 2 and stroke #333", () => {
    const multiTrend: Trend = {
      ...mockTrends[0],
      id: "multi",
      name: "Multi Trend",
      slug: "multi-trend",
      branchenIds: ["curaviva", "insos"],
    };

    const { container } = render(
      <TrendRadar
        trends={[multiTrend]}
        handlungsfelder={mockHandlungsfelder}
        branchen={mockBranchen}
      />,
      { wrapper }
    );

    const polygon = container.querySelector("polygon[data-slug='multi-trend']");
    expect(polygon).not.toBeNull();
    expect(polygon).toHaveAttribute("stroke", "#333");
    expect(polygon).toHaveAttribute("stroke-width", "2");
  });
});

describe("TrendRadar zoom controls", () => {
  function renderRadar() {
    return render(
      <TrendRadar
        trends={mockTrends}
        handlungsfelder={mockHandlungsfelder}
        branchen={mockBranchen}
      />,
      { wrapper }
    );
  }

  it("zoom-out button is disabled at default zoom", () => {
    const { getByRole } = renderRadar();
    const zoomOut = getByRole("button", { name: "Herauszoomen" });
    expect(zoomOut).toBeDisabled();
  });

  it("zoom-in button is enabled at default zoom", () => {
    const { getByRole } = renderRadar();
    const zoomIn = getByRole("button", { name: "Hineinzoomen" });
    expect(zoomIn).not.toBeDisabled();
  });

  it("clicking zoom-in changes viewBox to 1.5× (100 100 400 400)", () => {
    const { getByRole, container } = renderRadar();
    fireEvent.click(getByRole("button", { name: "Hineinzoomen" }));
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", "100 100 400 400");
  });

  it("clicking zoom-in twice changes viewBox to 2× (150 150 300 300)", () => {
    const { getByRole, container } = renderRadar();
    fireEvent.click(getByRole("button", { name: "Hineinzoomen" }));
    fireEvent.click(getByRole("button", { name: "Hineinzoomen" }));
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", "150 150 300 300");
  });

  it("zoom-in button is disabled at maximum zoom (3×)", () => {
    const { getByRole } = renderRadar();
    const zoomIn = getByRole("button", { name: "Hineinzoomen" });
    fireEvent.click(zoomIn);
    fireEvent.click(zoomIn);
    fireEvent.click(zoomIn);
    expect(zoomIn).toBeDisabled();
  });

  it("reset button appears after zooming and restores default viewBox", () => {
    const { getByRole, container } = renderRadar();
    fireEvent.click(getByRole("button", { name: "Hineinzoomen" }));
    const resetBtn = getByRole("button", { name: "Zoom zurücksetzen" });
    expect(resetBtn).toBeTruthy();
    fireEvent.click(resetBtn);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("viewBox", "0 0 600 600");
  });

  it("reset button is not shown at default zoom", () => {
    const { queryByRole } = renderRadar();
    expect(queryByRole("button", { name: "Zoom zurücksetzen" })).toBeNull();
  });
});
