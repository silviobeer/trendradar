import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { NeusteEntwicklungen } from "../NeusteEntwicklungen";
import { getNeusteTrends } from "@trendradar/shared";

const trends = getNeusteTrends(5);

describe("NeusteEntwicklungen", () => {
  it("renders trend names as links", () => {
    render(<NeusteEntwicklungen trends={trends} />);
    for (const trend of trends) {
      const link = screen.getByRole("link", { name: new RegExp(trend.name) });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/trend/${trend.slug}`);
    }
  });

  it("renders the section heading", () => {
    render(<NeusteEntwicklungen trends={trends} />);
    expect(
      screen.getByText(/neueste entwicklungen/i),
    ).toBeInTheDocument();
  });

  it("renders dates for each trend", () => {
    render(<NeusteEntwicklungen trends={trends} />);
    // Dates formatted as DD.MM.YYYY
    const datePattern = /\d{2}\.\d{2}\.\d{4}/;
    const dateElements = screen
      .getAllByText(datePattern)
      .filter((el) => el.tagName !== "H2");
    expect(dateElements.length).toBe(trends.length);
  });
});
