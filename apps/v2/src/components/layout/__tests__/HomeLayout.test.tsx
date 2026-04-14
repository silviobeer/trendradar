import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { HomeLayout } from "../HomeLayout";
import {
  getAllTrends,
  getNeusteTrends,
  handlungsfelder,
  branchen,
  megatrends,
} from "@trendradar/shared";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

// Mock BranchenFilterContext
vi.mock("@/contexts/BranchenFilterContext", () => ({
  useBranchenFilter: () => ({
    isTrendVisible: () => true,
    isBrancheActive: () => true,
    toggleBranche: vi.fn(),
  }),
}));

const trends = getAllTrends();
const neusteTrends = getNeusteTrends(10);

describe("HomeLayout", () => {
  it("renders the radar SVG", () => {
    render(
      <HomeLayout
        trends={trends}
        neusteTrends={neusteTrends}
        handlungsfelder={handlungsfelder}
        branchen={branchen}
        megatrends={megatrends}
      />,
    );
    expect(screen.getByRole("img", { name: "Trendradar" })).toBeInTheDocument();
  });

  it("renders the NeusteEntwicklungen section", () => {
    render(
      <HomeLayout
        trends={trends}
        neusteTrends={neusteTrends}
        handlungsfelder={handlungsfelder}
        branchen={branchen}
        megatrends={megatrends}
      />,
    );
    expect(screen.getAllByText(/neueste entwicklungen/i).length).toBeGreaterThan(0);
  });

  it("renders the MegatrendSidebar section", () => {
    render(
      <HomeLayout
        trends={trends}
        neusteTrends={neusteTrends}
        handlungsfelder={handlungsfelder}
        branchen={branchen}
        megatrends={megatrends}
      />,
    );
    expect(screen.getAllByText(/megatrends/i).length).toBeGreaterThan(0);
  });

  it("renders mobile toggle buttons for sidebars", () => {
    render(
      <HomeLayout
        trends={trends}
        neusteTrends={neusteTrends}
        handlungsfelder={handlungsfelder}
        branchen={branchen}
        megatrends={megatrends}
      />,
    );
    expect(
      screen.getByTestId("toggle-left-sidebar"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("toggle-right-sidebar"),
    ).toBeInTheDocument();
  });
});
