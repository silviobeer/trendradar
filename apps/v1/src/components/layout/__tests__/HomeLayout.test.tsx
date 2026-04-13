import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { HomeLayout } from "../HomeLayout";
import type { Trend, Handlungsfeld, Megatrend, Branche } from "@trendradar/shared";

// Mock child components
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

const mockProps = {
  trends: [] as Trend[],
  neusteTrends: [] as Trend[],
  handlungsfelder: [] as Handlungsfeld[],
  branchen: [] as Branche[],
  megatrends: [] as Megatrend[],
};

describe("HomeLayout US-4 PROJ-9 — responsive sidebar toggle", () => {
  it("AC-20: BranchenFilter is always rendered", () => {
    const { getByTestId } = render(<HomeLayout {...mockProps} />);
    expect(getByTestId("branchenfilter")).toBeTruthy();
  });

  it("AC-15/AC-16: left sidebar inline aside has hidden lg:block classes", () => {
    const { getByTestId } = render(<HomeLayout {...mockProps} />);
    const sidebar = getByTestId("neueste-entwicklungen").closest("aside[data-sidebar='left-inline']") as HTMLElement;
    expect(sidebar).not.toBeNull();
    expect(sidebar.className).toContain("hidden");
    expect(sidebar.className).toContain("lg:block");
  });

  it("AC-15/AC-16: right sidebar inline aside has hidden lg:block classes", () => {
    const { getByTestId } = render(<HomeLayout {...mockProps} />);
    const sidebar = getByTestId("megatrend-sidebar").closest("aside[data-sidebar='right-inline']") as HTMLElement;
    expect(sidebar).not.toBeNull();
    expect(sidebar.className).toContain("hidden");
    expect(sidebar.className).toContain("lg:block");
  });

  it("AC-17: left toggle button is rendered with lg:hidden", () => {
    const { getByTestId } = render(<HomeLayout {...mockProps} />);
    const btn = getByTestId("toggle-left-sidebar");
    expect(btn.className).toContain("lg:hidden");
  });

  it("AC-17: right toggle button is rendered with lg:hidden", () => {
    const { getByTestId } = render(<HomeLayout {...mockProps} />);
    const btn = getByTestId("toggle-right-sidebar");
    expect(btn.className).toContain("lg:hidden");
  });

  it("AC-18: left overlay sidebar is initially hidden", () => {
    const { queryByTestId } = render(<HomeLayout {...mockProps} />);
    expect(queryByTestId("overlay-left-sidebar")).toBeNull();
  });

  it("AC-18: right overlay sidebar is initially hidden", () => {
    const { queryByTestId } = render(<HomeLayout {...mockProps} />);
    expect(queryByTestId("overlay-right-sidebar")).toBeNull();
  });

  it("AC-18: clicking left toggle renders left overlay sidebar", () => {
    const { getByTestId } = render(<HomeLayout {...mockProps} />);
    fireEvent.click(getByTestId("toggle-left-sidebar"));
    expect(getByTestId("overlay-left-sidebar")).toBeTruthy();
  });

  it("AC-18: clicking right toggle renders right overlay sidebar", () => {
    const { getByTestId } = render(<HomeLayout {...mockProps} />);
    fireEvent.click(getByTestId("toggle-right-sidebar"));
    expect(getByTestId("overlay-right-sidebar")).toBeTruthy();
  });

  it("AC-19: left overlay sidebar has a close button that hides it", () => {
    const { getByTestId, queryByTestId } = render(<HomeLayout {...mockProps} />);
    fireEvent.click(getByTestId("toggle-left-sidebar"));
    const overlay = getByTestId("overlay-left-sidebar");
    const closeBtn = overlay.querySelector("button[data-action='close']") as HTMLElement;
    expect(closeBtn).not.toBeNull();
    fireEvent.click(closeBtn);
    expect(queryByTestId("overlay-left-sidebar")).toBeNull();
  });

  it("AC-19: right overlay sidebar has a close button that hides it", () => {
    const { getByTestId, queryByTestId } = render(<HomeLayout {...mockProps} />);
    fireEvent.click(getByTestId("toggle-right-sidebar"));
    const overlay = getByTestId("overlay-right-sidebar");
    const closeBtn = overlay.querySelector("button[data-action='close']") as HTMLElement;
    expect(closeBtn).not.toBeNull();
    fireEvent.click(closeBtn);
    expect(queryByTestId("overlay-right-sidebar")).toBeNull();
  });

  it("AC-19: clicking backdrop closes left overlay sidebar", () => {
    const { getByTestId, queryByTestId } = render(<HomeLayout {...mockProps} />);
    fireEvent.click(getByTestId("toggle-left-sidebar"));
    const backdrop = getByTestId("overlay-backdrop-left");
    fireEvent.click(backdrop);
    expect(queryByTestId("overlay-left-sidebar")).toBeNull();
  });

  it("AC-19: clicking backdrop closes right overlay sidebar", () => {
    const { getByTestId, queryByTestId } = render(<HomeLayout {...mockProps} />);
    fireEvent.click(getByTestId("toggle-right-sidebar"));
    const backdrop = getByTestId("overlay-backdrop-right");
    fireEvent.click(backdrop);
    expect(queryByTestId("overlay-right-sidebar")).toBeNull();
  });

  it("desktop grid uses lg:grid-cols-[min-content_1fr_min-content]", () => {
    const { container } = render(<HomeLayout {...mockProps} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("lg:grid-cols-[min-content_1fr_min-content]");
  });

  it("mobile grid uses grid-cols-[1fr]", () => {
    const { container } = render(<HomeLayout {...mockProps} />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.className).toContain("grid-cols-[1fr]");
  });
});
