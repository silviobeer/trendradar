import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import Home from "../page";

// Mock child components to isolate page layout tests
vi.mock("@/components/radar/TrendRadar", () => ({
  TrendRadar: () => <div data-testid="trend-radar" />,
}));
vi.mock("@/components/filter/BranchenFilter", () => ({
  BranchenFilter: () => <div data-testid="branchenfilter" />,
}));
vi.mock("@/components/sidebar/MegatrendSidebar", () => ({
  MegatrendSidebar: () => <div data-testid="megatrend-sidebar" />,
}));
vi.mock("@/components/sidebar/NeusteEntwicklungen", () => ({
  NeusteEntwicklungen: () => <div data-testid="neueste-entwicklungen" />,
}));

describe("Home page fullscreen layout (US-1 PROJ-9)", () => {
  it("AC-1: root div has h-dvh class", () => {
    const { container } = render(<Home />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("h-dvh");
  });

  it("AC-1: root div has overflow-hidden class", () => {
    const { container } = render(<Home />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("overflow-hidden");
  });

  it("AC-1: root div does NOT have min-h-screen", () => {
    const { container } = render(<Home />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).not.toContain("min-h-screen");
  });

  it("AC-4: NO element has max-w-[1440px]", () => {
    const { container } = render(<Home />);
    const all = container.querySelectorAll("*");
    for (const el of all) {
      expect(el.className).not.toContain("max-w-[1440px]");
    }
  });
});

describe("Home page sidebars (US-2 PROJ-9)", () => {
  it("AC-5/AC-6: left sidebar has max-w-[160px]", () => {
    const { container } = render(<Home />);
    const neueste = container.querySelector(
      '[data-testid="neueste-entwicklungen"]'
    )?.parentElement as HTMLElement;
    expect(neueste.className).toContain("max-w-[160px]");
  });

  it("AC-5/AC-6: right sidebar has max-w-[160px]", () => {
    const { container } = render(<Home />);
    const megatrend = container.querySelector(
      '[data-testid="megatrend-sidebar"]'
    )?.parentElement as HTMLElement;
    expect(megatrend.className).toContain("max-w-[160px]");
  });

  it("AC-7: left sidebar has no horizontal padding toward viewport edge (p-2 or px-2)", () => {
    const { container } = render(<Home />);
    const neueste = container.querySelector(
      '[data-testid="neueste-entwicklungen"]'
    )?.parentElement as HTMLElement;
    // Must have compact padding (p-2), not the old p-4
    expect(neueste.className).not.toContain("p-4");
  });

  it("AC-8: left sidebar has border-r (border only toward radar)", () => {
    const { container } = render(<Home />);
    const neueste = container.querySelector(
      '[data-testid="neueste-entwicklungen"]'
    )?.parentElement as HTMLElement;
    expect(neueste.className).toContain("border-r");
  });

  it("AC-8: right sidebar has border-l (border only toward radar)", () => {
    const { container } = render(<Home />);
    const megatrend = container.querySelector(
      '[data-testid="megatrend-sidebar"]'
    )?.parentElement as HTMLElement;
    expect(megatrend.className).toContain("border-l");
  });

  it("AC-9: left sidebar has overflow-y-auto", () => {
    const { container } = render(<Home />);
    const neueste = container.querySelector(
      '[data-testid="neueste-entwicklungen"]'
    )?.parentElement as HTMLElement;
    expect(neueste.className).toContain("overflow-y-auto");
  });

  it("AC-9: right sidebar has overflow-y-auto", () => {
    const { container } = render(<Home />);
    const megatrend = container.querySelector(
      '[data-testid="megatrend-sidebar"]'
    )?.parentElement as HTMLElement;
    expect(megatrend.className).toContain("overflow-y-auto");
  });
});

describe("Home page BranchenFilter (US-3 PROJ-9)", () => {
  it("AC-11: filter wrapper spans all 3 columns (col-span-3)", () => {
    const { container } = render(<Home />);
    const filter = container.querySelector(
      '[data-testid="branchenfilter"]'
    )?.parentElement as HTMLElement;
    expect(filter.className).toContain("col-span-3");
  });

  it("AC-13: filter wrapper has justify-center", () => {
    const { container } = render(<Home />);
    const filter = container.querySelector(
      '[data-testid="branchenfilter"]'
    )?.parentElement as HTMLElement;
    expect(filter.className).toContain("justify-center");
  });

  it("AC-14: filter wrapper has border-t", () => {
    const { container } = render(<Home />);
    const filter = container.querySelector(
      '[data-testid="branchenfilter"]'
    )?.parentElement as HTMLElement;
    expect(filter.className).toContain("border-t");
  });

  it("AC-12: filter wrapper has compact vertical padding (py-2)", () => {
    const { container } = render(<Home />);
    const filter = container.querySelector(
      '[data-testid="branchenfilter"]'
    )?.parentElement as HTMLElement;
    expect(filter.className).toContain("py-2");
  });
});

describe("Home page header (US-5 PROJ-9)", () => {
  it("AC-21: header contains ARTISET Trendradar text", () => {
    const { getByRole } = render(<Home />);
    const header = getByRole("banner");
    expect(header.textContent).toContain("ARTISET Trendradar");
  });

  it("AC-22: header has col-span-3", () => {
    const { getByRole } = render(<Home />);
    const header = getByRole("banner");
    expect(header.className).toContain("col-span-3");
  });

  it("AC-23: header has vertical padding consistent with ~60px height", () => {
    const { getByRole } = render(<Home />);
    const header = getByRole("banner");
    // py-4 = 1rem top + 1rem bottom = ~32px + content ~28px ≈ 60px
    expect(header.className).toContain("py-4");
  });
});
