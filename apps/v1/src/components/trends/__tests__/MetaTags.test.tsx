import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MetaTags } from "../MetaTags";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("MetaTags", () => {
  const items = [
    { label: "Digitalisierung", href: "/handlungsfeld/digitalisierung" },
    { label: "Nachhaltigkeit", href: "/handlungsfeld/nachhaltigkeit" },
  ];

  it("renders all tag labels as links", () => {
    render(<MetaTags items={items} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent("Digitalisierung");
    expect(links[1]).toHaveTextContent("Nachhaltigkeit");
  });

  it("each pill links to the correct href", () => {
    render(<MetaTags items={items} />);
    expect(
      screen.getByRole("link", { name: "Digitalisierung" })
    ).toHaveAttribute("href", "/handlungsfeld/digitalisierung");
    expect(
      screen.getByRole("link", { name: "Nachhaltigkeit" })
    ).toHaveAttribute("href", "/handlungsfeld/nachhaltigkeit");
  });

  it("renders nothing when items is empty", () => {
    const { container } = render(<MetaTags items={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("applies optional colorClass to each pill", () => {
    render(<MetaTags items={[items[0]]} colorClass="bg-blue-100 text-blue-800" />);
    const link = screen.getByRole("link", { name: "Digitalisierung" });
    expect(link.className).toContain("bg-blue-100");
    expect(link.className).toContain("text-blue-800");
  });
});
