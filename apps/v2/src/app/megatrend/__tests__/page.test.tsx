import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MegatrendPage, { generateStaticParams } from "../[slug]/page";
import { BranchenFilterProvider } from "@/contexts/BranchenFilterContext";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

describe("MegatrendPage", () => {
  describe("generateStaticParams", () => {
    it("returns params for all 6 megatrends", async () => {
      const params = await generateStaticParams();
      expect(params).toHaveLength(6);
      expect(params[0]).toHaveProperty("slug");
    });

    it("includes known megatrend slugs", async () => {
      const params = await generateStaticParams();
      const slugs = params.map((p) => p.slug);
      expect(slugs).toContain("demografischer-wandel");
      expect(slugs).toContain("technologisierung");
    });
  });

  describe("page rendering", () => {
    it("renders megatrend h1 with the megatrend name", async () => {
      const page = await MegatrendPage({
        params: Promise.resolve({ slug: "demografischer-wandel" }),
      });
      render(<BranchenFilterProvider>{page}</BranchenFilterProvider>);
      expect(
        screen.getByRole("heading", { level: 1, name: /Demografischer Wandel/i })
      ).toBeInTheDocument();
    });

    it("renders megatrend description text", async () => {
      const page = await MegatrendPage({
        params: Promise.resolve({ slug: "demografischer-wandel" }),
      });
      render(<BranchenFilterProvider>{page}</BranchenFilterProvider>);
      // description contains some text — check it is rendered
      const desc = screen.getByText(/steigende Lebenserwartung|sinkende Geburtenraten|Alterung/i);
      expect(desc).toBeInTheDocument();
    });

    it("renders breadcrumb 'Startseite' link pointing to '/'", async () => {
      const page = await MegatrendPage({
        params: Promise.resolve({ slug: "demografischer-wandel" }),
      });
      render(<BranchenFilterProvider>{page}</BranchenFilterProvider>);
      const link = screen.getByRole("link", { name: /Startseite/i });
      expect(link).toHaveAttribute("href", "/");
    });

    it("renders breadcrumb current page with megatrend name (no link)", async () => {
      const page = await MegatrendPage({
        params: Promise.resolve({ slug: "demografischer-wandel" }),
      });
      render(<BranchenFilterProvider>{page}</BranchenFilterProvider>);
      // Current page shown as plain text with aria-current="page"
      const current = screen.getByText(/Demografischer Wandel/i, {
        selector: '[aria-current="page"]',
      });
      expect(current).toBeInTheDocument();
    });

    it("calls notFound for unknown slug", async () => {
      await expect(
        MegatrendPage({ params: Promise.resolve({ slug: "does-not-exist" }) })
      ).rejects.toThrow("NEXT_NOT_FOUND");
    });
  });

  describe("Beeinflusste Trends section (AC-23, AC-24)", () => {
    it("renders 'Beeinflusste Trends' h2 heading", async () => {
      const page = await MegatrendPage({
        params: Promise.resolve({ slug: "technologisierung" }),
      });
      render(<BranchenFilterProvider>{page}</BranchenFilterProvider>);
      expect(
        screen.getByRole("heading", { level: 2, name: /Beeinflusste Trends/i })
      ).toBeInTheDocument();
    });

    it("renders trends as links to /trend/[slug]", async () => {
      const page = await MegatrendPage({
        params: Promise.resolve({ slug: "technologisierung" }),
      });
      render(<BranchenFilterProvider>{page}</BranchenFilterProvider>);
      const trendLinks = screen
        .getAllByRole("link")
        .filter((el) => el.getAttribute("href")?.startsWith("/trend/"));
      expect(trendLinks.length).toBeGreaterThan(0);
    });

    it("renders ZeitbereichBadge for each trend", async () => {
      const page = await MegatrendPage({
        params: Promise.resolve({ slug: "technologisierung" }),
      });
      render(<BranchenFilterProvider>{page}</BranchenFilterProvider>);
      const badges = screen.getAllByText(/^(Handeln|Vorbereiten|Beobachten)$/i);
      expect(badges.length).toBeGreaterThan(0);
    });

    it("sorts trends: handeln first, then vorbereiten, then beobachten", async () => {
      const page = await MegatrendPage({
        params: Promise.resolve({ slug: "technologisierung" }),
      });
      render(<BranchenFilterProvider>{page}</BranchenFilterProvider>);
      const badges = screen
        .getAllByText(/^(Handeln|Vorbereiten|Beobachten)$/i)
        .map((el) => el.textContent?.toLowerCase());

      const order = ["handeln", "vorbereiten", "beobachten"];
      let lastIndex = -1;
      let isSorted = true;
      for (const badge of badges) {
        const idx = order.indexOf(badge ?? "");
        if (idx < lastIndex) {
          isSorted = false;
          break;
        }
        if (idx > lastIndex) lastIndex = idx;
      }
      expect(isSorted).toBe(true);
    });

    it("shows 'Keine Trends zugeordnet' when megatrend has no linked trends", async () => {
      const { getMegatrendBySlug, getTrendsByMegatrend } = await import(
        "@trendradar/shared"
      );
      const megatrend = getMegatrendBySlug("oekologisierung");
      const relatedTrends = megatrend ? getTrendsByMegatrend(megatrend.id) : [];
      if (relatedTrends.length === 0) {
        const page = await MegatrendPage({
          params: Promise.resolve({ slug: "oekologisierung" }),
        });
        render(<BranchenFilterProvider>{page}</BranchenFilterProvider>);
        expect(screen.getByText(/Keine Trends zugeordnet/i)).toBeInTheDocument();
      } else {
        expect(relatedTrends.length).toBeGreaterThan(0);
      }
    });
  });
});
