import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../page";

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

describe("Home page", () => {
  it("renders the HomeLayout with TrendRadar", () => {
    render(<Home />);
    expect(screen.getByRole("img", { name: "Trendradar" })).toBeInTheDocument();
  });

  it("renders the NeusteEntwicklungen section", () => {
    render(<Home />);
    expect(screen.getAllByText(/neueste entwicklungen/i).length).toBeGreaterThan(0);
  });

  it("renders the Megatrends section", () => {
    render(<Home />);
    expect(screen.getAllByText(/megatrends/i).length).toBeGreaterThan(0);
  });
});
