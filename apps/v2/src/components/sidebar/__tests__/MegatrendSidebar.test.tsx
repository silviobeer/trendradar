import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MegatrendSidebar } from "../MegatrendSidebar";
import { megatrends } from "@trendradar/shared";

describe("MegatrendSidebar", () => {
  it("renders megatrend names as links", () => {
    render(<MegatrendSidebar megatrends={megatrends} />);
    for (const megatrend of megatrends) {
      const link = screen.getByRole("link", { name: megatrend.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/megatrend/${megatrend.slug}`);
    }
  });

  it("renders the section heading", () => {
    render(<MegatrendSidebar megatrends={megatrends} />);
    expect(screen.getByText(/megatrends/i)).toBeInTheDocument();
  });
});
