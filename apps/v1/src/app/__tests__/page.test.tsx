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
  it("AC-1: root div has h-screen class", () => {
    const { container } = render(<Home />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("h-screen");
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
