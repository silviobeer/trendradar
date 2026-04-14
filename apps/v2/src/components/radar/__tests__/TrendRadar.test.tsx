import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TrendRadar } from "../TrendRadar";
import { getAllTrends, handlungsfelder, branchen } from "@trendradar/shared";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// Mock BranchenFilterContext
vi.mock("@/contexts/BranchenFilterContext", () => ({
  useBranchenFilter: () => ({
    isTrendVisible: () => true,
  }),
}));

const trends = getAllTrends();

describe("TrendRadar", () => {
  it("renders an SVG with role=img and aria-label=Trendradar", () => {
    render(
      <TrendRadar
        trends={trends}
        handlungsfelder={handlungsfelder}
        branchen={branchen}
      />,
    );
    const svg = screen.getByRole("img", { name: "Trendradar" });
    expect(svg).toBeInTheDocument();
  });

  it("renders ring labels BEOBACHTEN, VORBEREITEN, HANDELN", () => {
    render(
      <TrendRadar
        trends={trends}
        handlungsfelder={handlungsfelder}
        branchen={branchen}
      />,
    );
    expect(screen.getByText("BEOBACHTEN")).toBeInTheDocument();
    expect(screen.getByText("VORBEREITEN")).toBeInTheDocument();
    expect(screen.getByText("HANDELN")).toBeInTheDocument();
  });

  it("renders zoom controls", () => {
    render(
      <TrendRadar
        trends={trends}
        handlungsfelder={handlungsfelder}
        branchen={branchen}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Herauszoomen" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Hineinzoomen" }),
    ).toBeInTheDocument();
  });
});
