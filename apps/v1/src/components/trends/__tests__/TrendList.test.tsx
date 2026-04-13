import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import type { ReactNode } from "react";
import type { Trend } from "@trendradar/shared";
import { BranchenFilterProvider } from "@/contexts/BranchenFilterContext";
import { TrendList } from "../TrendList";

// Mock next/link to a simple anchor for tests
vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockTrends: Trend[] = [
  {
    id: "t1",
    name: "Trend Alpha",
    slug: "trend-alpha",
    beschreibung: "Beschreibung Alpha",
    zeitrahmen: "handeln",
    handlungsfeldIds: ["klientel"],
    megatrendIds: [],
    branchenIds: ["curaviva"],
    fragen: [],
    erstellungsdatum: "2024-01-01",
    branchenTexte: {},
  },
  {
    id: "t2",
    name: "Trend Beta",
    slug: "trend-beta",
    beschreibung: "Beschreibung Beta",
    zeitrahmen: "vorbereiten",
    handlungsfeldIds: ["klientel"],
    megatrendIds: [],
    branchenIds: ["insos"],
    fragen: [],
    erstellungsdatum: "2024-01-02",
    branchenTexte: {},
  },
  {
    id: "t3",
    name: "Trend Gamma",
    slug: "trend-gamma",
    beschreibung: "Beschreibung Gamma",
    zeitrahmen: "beobachten",
    handlungsfeldIds: ["klientel"],
    megatrendIds: [],
    branchenIds: ["youvita"],
    fragen: [],
    erstellungsdatum: "2024-01-03",
    branchenTexte: {},
  },
];

function wrapper({ children }: { children: ReactNode }) {
  return <BranchenFilterProvider>{children}</BranchenFilterProvider>;
}

describe("TrendList", () => {
  it("AC-4: toggle button is visible with correct initial text", () => {
    render(
      <TrendList handlungsfeldName="Klientinnen und Klienten" trends={mockTrends} />,
      { wrapper }
    );

    expect(
      screen.getByRole("button", {
        name: "Trends zu Klientinnen und Klienten anzeigen",
      })
    ).toBeInTheDocument();
  });

  it("AC-5: list is initially collapsed (no trends shown)", () => {
    render(
      <TrendList handlungsfeldName="Klientinnen und Klienten" trends={mockTrends} />,
      { wrapper }
    );

    expect(screen.queryByText("Trend Alpha")).not.toBeInTheDocument();
    expect(screen.queryByText("Trend Beta")).not.toBeInTheDocument();
  });

  it("AC-5: clicking toggle expands the list", () => {
    render(
      <TrendList handlungsfeldName="Klientinnen und Klienten" trends={mockTrends} />,
      { wrapper }
    );

    const toggleBtn = screen.getByRole("button", {
      name: "Trends zu Klientinnen und Klienten anzeigen",
    });
    fireEvent.click(toggleBtn);

    expect(screen.getByText("Trend Alpha")).toBeInTheDocument();
    expect(screen.getByText("Trend Beta")).toBeInTheDocument();
    expect(screen.getByText("Trend Gamma")).toBeInTheDocument();
  });

  it("AC-5: button text changes to 'verbergen' when expanded", () => {
    render(
      <TrendList handlungsfeldName="Klientinnen und Klienten" trends={mockTrends} />,
      { wrapper }
    );

    const toggleBtn = screen.getByRole("button", {
      name: "Trends zu Klientinnen und Klienten anzeigen",
    });
    fireEvent.click(toggleBtn);

    expect(
      screen.getByRole("button", {
        name: "Trends zu Klientinnen und Klienten verbergen",
      })
    ).toBeInTheDocument();
  });

  it("AC-5: clicking again collapses the list", () => {
    render(
      <TrendList handlungsfeldName="Klientinnen und Klienten" trends={mockTrends} />,
      { wrapper }
    );

    const toggleBtn = screen.getByRole("button", {
      name: "Trends zu Klientinnen und Klienten anzeigen",
    });
    fireEvent.click(toggleBtn);
    fireEvent.click(
      screen.getByRole("button", {
        name: "Trends zu Klientinnen und Klienten verbergen",
      })
    );

    expect(screen.queryByText("Trend Alpha")).not.toBeInTheDocument();
  });

  it("AC-6: each trend shows its name when expanded", () => {
    render(
      <TrendList handlungsfeldName="Klientinnen und Klienten" trends={mockTrends} />,
      { wrapper }
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: "Trends zu Klientinnen und Klienten anzeigen",
      })
    );

    expect(screen.getByText("Trend Alpha")).toBeInTheDocument();
    expect(screen.getByText("Trend Beta")).toBeInTheDocument();
    expect(screen.getByText("Trend Gamma")).toBeInTheDocument();
  });

  it("AC-6: each trend shows Zeitbereich badge (handeln, vorbereiten, beobachten)", () => {
    render(
      <TrendList handlungsfeldName="Klientinnen und Klienten" trends={mockTrends} />,
      { wrapper }
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: "Trends zu Klientinnen und Klienten anzeigen",
      })
    );

    expect(screen.getByText("Handeln")).toBeInTheDocument();
    expect(screen.getByText("Vorbereiten")).toBeInTheDocument();
    expect(screen.getByText("Beobachten")).toBeInTheDocument();
  });

  it("AC-7: trend name is a link to /trend/[slug]", () => {
    render(
      <TrendList handlungsfeldName="Klientinnen und Klienten" trends={mockTrends} />,
      { wrapper }
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: "Trends zu Klientinnen und Klienten anzeigen",
      })
    );

    const alphaLink = screen.getByRole("link", { name: "Trend Alpha" });
    expect(alphaLink).toHaveAttribute("href", "/trend/trend-alpha");

    const betaLink = screen.getByRole("link", { name: "Trend Beta" });
    expect(betaLink).toHaveAttribute("href", "/trend/trend-beta");
  });

  it("Zeitbereich badge uses correct color classes for 'handeln'", () => {
    render(
      <TrendList handlungsfeldName="Klientinnen und Klienten" trends={[mockTrends[0]]} />,
      { wrapper }
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: "Trends zu Klientinnen und Klienten anzeigen",
      })
    );

    const badge = screen.getByText("Handeln");
    expect(badge.className).toMatch(/bg-red-100/);
    expect(badge.className).toMatch(/text-red-800/);
  });

  it("Zeitbereich badge uses correct color classes for 'vorbereiten'", () => {
    render(
      <TrendList handlungsfeldName="Klientinnen und Klienten" trends={[mockTrends[1]]} />,
      { wrapper }
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: "Trends zu Klientinnen und Klienten anzeigen",
      })
    );

    const badge = screen.getByText("Vorbereiten");
    expect(badge.className).toMatch(/bg-yellow-100/);
    expect(badge.className).toMatch(/text-yellow-800/);
  });

  it("Zeitbereich badge uses correct color classes for 'beobachten'", () => {
    render(
      <TrendList handlungsfeldName="Klientinnen und Klienten" trends={[mockTrends[2]]} />,
      { wrapper }
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: "Trends zu Klientinnen und Klienten anzeigen",
      })
    );

    const badge = screen.getByText("Beobachten");
    expect(badge.className).toMatch(/bg-blue-100/);
    expect(badge.className).toMatch(/text-blue-800/);
  });
});
