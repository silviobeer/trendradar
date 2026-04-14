import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BranchenFilter, BranchenTag } from "../BranchenFilter";
import { BranchenFilterProvider } from "@/contexts/BranchenFilterContext";

function renderWithProvider(ui: React.ReactElement) {
  return render(<BranchenFilterProvider>{ui}</BranchenFilterProvider>);
}

describe("BranchenFilter", () => {
  it("renders 3 toggle buttons for CURAVIVA, INSOS, YOUVITA", () => {
    renderWithProvider(<BranchenFilter />);
    expect(screen.getByText("CURAVIVA")).toBeInTheDocument();
    expect(screen.getByText("INSOS")).toBeInTheDocument();
    expect(screen.getByText("YOUVITA")).toBeInTheDocument();
  });

  it("active button has inline backgroundColor matching branche.farbe", () => {
    renderWithProvider(<BranchenFilter />);
    // All branches start active — CURAVIVA farbe is #207003, jsdom normalizes to rgb(32, 112, 3)
    const btn = screen.getByText("CURAVIVA").closest("button");
    expect(btn).toBeTruthy();
    expect(btn!.style.backgroundColor).toMatch(/rgb\(32,\s*112,\s*3\)/);
  });

  it("active button has text-white class", () => {
    renderWithProvider(<BranchenFilter />);
    const btn = screen.getByText("CURAVIVA").closest("button");
    expect(btn).toHaveClass("text-white");
  });

  it("inactive button has bg-bg-warm-medium class", () => {
    renderWithProvider(<BranchenFilter />);
    // Click CURAVIVA to deactivate it
    const btn = screen.getByText("CURAVIVA").closest("button")!;
    fireEvent.click(btn);
    expect(btn).toHaveClass("bg-bg-warm-medium");
  });

  it("inactive button has text-text-medium class", () => {
    renderWithProvider(<BranchenFilter />);
    const btn = screen.getByText("INSOS").closest("button")!;
    fireEvent.click(btn);
    expect(btn).toHaveClass("text-text-medium");
  });

  it("inactive button has no inline backgroundColor", () => {
    renderWithProvider(<BranchenFilter />);
    const btn = screen.getByText("INSOS").closest("button")!;
    fireEvent.click(btn);
    expect(btn.style.backgroundColor).toBe("");
  });

  it("clicking a button toggles it from active to inactive", () => {
    renderWithProvider(<BranchenFilter />);
    const btn = screen.getByText("YOUVITA").closest("button")!;
    // Initially active
    expect(btn).toHaveClass("text-white");
    fireEvent.click(btn);
    // Now inactive
    expect(btn).toHaveClass("bg-bg-warm-medium");
  });

  it("clicking an inactive button toggles it back to active", () => {
    renderWithProvider(<BranchenFilter />);
    const btn = screen.getByText("CURAVIVA").closest("button")!;
    fireEvent.click(btn); // deactivate
    expect(btn).toHaveClass("bg-bg-warm-medium");
    fireEvent.click(btn); // reactivate
    expect(btn).toHaveClass("text-white");
  });

  it("buttons have rounded-full class", () => {
    renderWithProvider(<BranchenFilter />);
    const btn = screen.getByText("CURAVIVA").closest("button");
    expect(btn).toHaveClass("rounded-full");
  });
});

describe("BranchenTag", () => {
  const branche = {
    id: "curaviva",
    name: "Menschen im Alter",
    organisation: "CURAVIVA",
    slug: "curaviva",
    farbe: "#207003",
  };

  it("renders the branche name", () => {
    render(<BranchenTag branche={branche} />);
    expect(screen.getByText("Menschen im Alter")).toBeInTheDocument();
  });

  it("has backgroundColor with 15% opacity (hex suffix 26)", () => {
    const { container } = render(<BranchenTag branche={branche} />);
    const el = container.firstChild as HTMLElement;
    // jsdom normalizes #20700326 to rgba(32, 112, 3, 0.15)
    const bg = el.style.backgroundColor;
    expect(bg).toMatch(/rgba\(32,\s*112,\s*3,\s*0\.15\)/);
  });

  it("has color set to branche.farbe", () => {
    const { container } = render(<BranchenTag branche={branche} />);
    const el = container.firstChild as HTMLElement;
    // jsdom normalizes #207003 to rgb(32, 112, 3)
    expect(el.style.color).toBe("rgb(32, 112, 3)");
  });

  it("has rounded-full class", () => {
    const { container } = render(<BranchenTag branche={branche} />);
    expect(container.firstChild).toHaveClass("rounded-full");
  });
});
