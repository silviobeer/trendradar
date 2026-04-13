import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReflexionsFragen } from "../ReflexionsFragen";

describe("ReflexionsFragen", () => {
  it("renders a section heading 'Reflexionsfragen'", () => {
    render(<ReflexionsFragen fragen={["Frage 1", "Frage 2"]} />);
    expect(screen.getByText("Reflexionsfragen")).toBeInTheDocument();
  });

  it("renders questions as an ordered list", () => {
    render(<ReflexionsFragen fragen={["Frage 1", "Frage 2", "Frage 3"]} />);
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
  });

  it("renders each question text", () => {
    const fragen = ["Was sind die Chancen?", "Welche Risiken gibt es?"];
    render(<ReflexionsFragen fragen={fragen} />);
    expect(screen.getByText("Was sind die Chancen?")).toBeInTheDocument();
    expect(screen.getByText("Welche Risiken gibt es?")).toBeInTheDocument();
  });

  it("renders nothing when fragen is empty", () => {
    const { container } = render(<ReflexionsFragen fragen={[]} />);
    expect(container.innerHTML).toBe("");
  });
});
