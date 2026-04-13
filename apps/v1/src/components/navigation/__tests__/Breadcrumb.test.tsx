import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Breadcrumb } from "../Breadcrumb";

// Mock next/link to render a plain anchor
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Breadcrumb", () => {
  it("renders 2 links and 1 plain text for 3 items", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Trends", href: "/trends" },
      { label: "Current Trend", href: "/trends/current" },
    ];

    render(<Breadcrumb items={items} />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent("Home");
    expect(links[1]).toHaveTextContent("Trends");

    const currentPage = screen.getByText("Current Trend");
    expect(currentPage.tagName).not.toBe("A");
    expect(currentPage).toHaveAttribute("aria-current", "page");
  });

  it("renders nothing for empty array", () => {
    const { container } = render(<Breadcrumb items={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("links have correct href attributes", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Trends", href: "/trends" },
      { label: "Detail", href: "/trends/detail" },
    ];

    render(<Breadcrumb items={items} />);

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[1]).toHaveAttribute("href", "/trends");
  });
});
