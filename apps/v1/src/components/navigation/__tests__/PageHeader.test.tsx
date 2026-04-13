import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageHeader } from "../PageHeader";

vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("PageHeader", () => {
  it("renders breadcrumb, home button links to /, back button links to backHref", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Trends", href: "/trends" },
    ];

    render(<PageHeader breadcrumbItems={items} backHref="/trends" />);

    // Breadcrumb is rendered
    expect(screen.getByText("Trends")).toBeInTheDocument();

    // Home button links to "/" (find by aria-label, excluding breadcrumb links)
    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    const homeButton = homeLinks.find((el) => el.getAttribute("aria-label") === "Home");
    expect(homeButton).toHaveAttribute("href", "/");

    // Back button links to backHref
    const backLink = screen.getByRole("link", { name: "← Zurück" });
    expect(backLink).toHaveAttribute("href", "/trends");
  });

  it("does not render back button when backHref is not provided", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Trends", href: "/trends" },
    ];

    render(<PageHeader breadcrumbItems={items} />);

    expect(screen.queryByText("← Zurück")).not.toBeInTheDocument();
  });

  it("renders nothing when breadcrumbItems is empty", () => {
    const { container } = render(<PageHeader breadcrumbItems={[]} />);
    expect(container.innerHTML).toBe("");
  });
});
