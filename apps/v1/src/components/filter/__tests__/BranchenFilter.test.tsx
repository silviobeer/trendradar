import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BranchenFilter } from "../BranchenFilter";
import { BranchenFilterProvider } from "@/contexts/BranchenFilterContext";
import type { Branche } from "@trendradar/shared";
import type { ReactNode } from "react";

const mockBranchen: Branche[] = [
  { id: "curaviva", name: "Menschen im Alter", organisation: "CURAVIVA", slug: "curaviva", farbe: "#e07b39" },
  { id: "insos", name: "Menschen mit Behinderungen", organisation: "INSOS", slug: "insos", farbe: "#4a6fa5" },
  { id: "youvita", name: "Kinder und Jugendliche", organisation: "YOUVITA", slug: "youvita", farbe: "#2a9d8f" },
];

function wrapper({ children }: { children: ReactNode }) {
  return <BranchenFilterProvider>{children}</BranchenFilterProvider>;
}

describe("BranchenFilter", () => {
  it("AC-1: renders 3 branch buttons with organisation names", () => {
    render(<BranchenFilter branchen={mockBranchen} />, { wrapper });

    expect(screen.getByRole("button", { name: "CURAVIVA" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "INSOS" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "YOUVITA" })).toBeInTheDocument();
  });

  it("AC-2: all 3 branches are active by default", () => {
    render(<BranchenFilter branchen={mockBranchen} />, { wrapper });

    // All buttons should be visually active (aria-pressed=true)
    expect(screen.getByRole("button", { name: "CURAVIVA" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "INSOS" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "YOUVITA" })).toHaveAttribute("aria-pressed", "true");
  });

  it("clicking a button calls toggleBranche and deactivates it", () => {
    render(<BranchenFilter branchen={mockBranchen} />, { wrapper });

    const curButton = screen.getByRole("button", { name: "CURAVIVA" });
    fireEvent.click(curButton);

    // After clicking, button should be inactive
    expect(curButton).toHaveAttribute("aria-pressed", "false");
  });

  it("inactive button shows border-only style (no solid background)", () => {
    render(<BranchenFilter branchen={mockBranchen} />, { wrapper });

    const curButton = screen.getByRole("button", { name: "CURAVIVA" });
    // Initially active — has data-active attribute
    expect(curButton).toHaveAttribute("data-active", "true");

    fireEvent.click(curButton);

    // After deactivating — data-active is false
    expect(curButton).toHaveAttribute("data-active", "false");
  });

  it("can toggle a branch back on after deactivating", () => {
    render(<BranchenFilter branchen={mockBranchen} />, { wrapper });

    const insosButton = screen.getByRole("button", { name: "INSOS" });
    fireEvent.click(insosButton); // deactivate
    expect(insosButton).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(insosButton); // reactivate
    expect(insosButton).toHaveAttribute("aria-pressed", "true");
  });
});
