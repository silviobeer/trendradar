import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import TrendDetailPage from '../[slug]/page';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(() => { throw new Error('NEXT_NOT_FOUND'); }),
}));

// Mock shared data
vi.mock('@trendradar/shared', () => ({
  getAllTrends: vi.fn(() => [mockTrend, mockTrendNoBranchenTexte]),
  getTrendBySlug: vi.fn((slug: string) => {
    if (slug === 'diversitaet') return mockTrend;
    if (slug === 'trend-no-branchen') return mockTrendNoBranchenTexte;
    return undefined;
  }),
  getHandlungsfelderByTrend: vi.fn((trend: { handlungsfeldIds: string[] }) => {
    if (trend.handlungsfeldIds.includes('klientel')) return mockHandlungsfelder;
    return [];
  }),
  getMegatrendsByTrend: vi.fn((trend: { megatrendIds: string[] }) => {
    if (trend.megatrendIds.includes('demografischer-wandel')) return mockMegatrends;
    return [];
  }),
  getBrancheById: vi.fn((id: string) => {
    return mockBranchen.find(b => b.id === id);
  }),
}));

const mockHandlungsfelder = [
  { id: 'klientel', name: 'Klientinnen und Klienten', slug: 'klientinnen-und-klienten' },
  { id: 'betrieb', name: 'Betrieb', slug: 'betrieb' },
];

const mockMegatrends = [
  { id: 'demografischer-wandel', name: 'Demografischer Wandel', slug: 'demografischer-wandel' },
  { id: 'wertewandel', name: 'Wertewandel', slug: 'wertewandel' },
];

const mockBranchen = [
  { id: 'curaviva', name: 'Menschen im Alter', organisation: 'CURAVIVA', slug: 'curaviva', farbe: '#207003' },
  { id: 'insos', name: 'Menschen mit Behinderungen', organisation: 'INSOS', slug: 'insos', farbe: '#B8032C' },
  { id: 'youvita', name: 'Kinder und Jugendliche', organisation: 'YOUVITA', slug: 'youvita', farbe: '#2D518C' },
];

const mockTrend = {
  id: 'diversitaet',
  name: 'Diversität',
  slug: 'diversitaet',
  beschreibung: 'Beschreibungstext über Diversität.',
  zeitrahmen: 'vorbereiten' as const,
  handlungsfeldIds: ['klientel', 'betrieb'],
  megatrendIds: ['demografischer-wandel', 'wertewandel'],
  branchenIds: ['curaviva', 'insos', 'youvita'],
  fragen: [
    'Wie können Sie Ihre interkulturelle Kompetenz erweitern?',
    'Wie können Sie individuelle Lebensgewohnheiten managen?',
  ],
  erstellungsdatum: '2026-01-25',
  branchenTexte: {
    curaviva: 'CURAVIVA spezifischer Text.',
    insos: 'INSOS spezifischer Text.',
    youvita: '',
  },
};

const mockTrendNoBranchenTexte = {
  id: 'langlebigkeit',
  name: 'Langlebigkeit',
  slug: 'trend-no-branchen',
  beschreibung: '',
  zeitrahmen: 'handeln' as const,
  handlungsfeldIds: [],
  megatrendIds: [],
  branchenIds: [],
  fragen: [],
  erstellungsdatum: '2026-01-25',
  branchenTexte: {},
};

async function renderPage(slug: string) {
  const Page = await TrendDetailPage({ params: Promise.resolve({ slug }) });
  render(Page as React.ReactElement);
}

describe('TrendDetailPage', () => {
  describe('AC-13: Breadcrumb', () => {
    it('renders breadcrumb with 3 levels: Startseite > Handlungsfeld > Trend Name', async () => {
      await renderPage('diversitaet');
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      // Breadcrumb nav contains Startseite link, Handlungsfeld link, and Trend name text
      expect(nav).toHaveTextContent('Startseite');
      expect(nav).toHaveTextContent('Klientinnen und Klienten');
      expect(nav).toHaveTextContent('Diversität');
    });

    it('Startseite breadcrumb links to /', async () => {
      await renderPage('diversitaet');
      const homeLink = screen.getByRole('link', { name: 'Startseite' });
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('Handlungsfeld breadcrumb links to /handlungsfeld/[slug]', async () => {
      await renderPage('diversitaet');
      // Multiple links may share the same label (breadcrumb + tag) — check inside nav
      const nav = screen.getByRole('navigation');
      const hfLink = nav.querySelector('a[href="/handlungsfeld/klientinnen-und-klienten"]');
      expect(hfLink).toBeInTheDocument();
      expect(hfLink).toHaveTextContent('Klientinnen und Klienten');
    });
  });

  describe('AC-14: Title with ZeitbereichBadge and Handlungsfeld Tags', () => {
    it('renders h1 with trend name', async () => {
      await renderPage('diversitaet');
      expect(screen.getByRole('heading', { level: 1, name: 'Diversität' })).toBeInTheDocument();
    });

    it('renders ZeitbereichBadge with zeitrahmen', async () => {
      await renderPage('diversitaet');
      // ZeitbereichBadge renders "Vorbereiten" for zeitrahmen "vorbereiten"
      expect(screen.getByText('Vorbereiten')).toBeInTheDocument();
    });

    it('renders Handlungsfeld tags as links', async () => {
      await renderPage('diversitaet');
      // Multiple links may share the label (breadcrumb + tag) — use getAllByRole
      const hfLinks = screen.getAllByRole('link', { name: 'Klientinnen und Klienten' });
      expect(hfLinks.length).toBeGreaterThanOrEqual(1);
      // At least one should be the tag (rounded-full class)
      const tagLink = hfLinks.find(l => l.className.includes('rounded-full'));
      expect(tagLink).toBeInTheDocument();
      expect(tagLink).toHaveAttribute('href', '/handlungsfeld/klientinnen-und-klienten');
    });
  });

  describe('AC-15: Beschreibung', () => {
    it('renders beschreibung text', async () => {
      await renderPage('diversitaet');
      expect(screen.getByText('Beschreibungstext über Diversität.')).toBeInTheDocument();
    });
  });

  describe('AC-16: Reflexionsfragen', () => {
    it('renders Reflexionsfragen section when fragen exist', async () => {
      await renderPage('diversitaet');
      expect(screen.getByRole('heading', { level: 2, name: 'Reflexionsfragen' })).toBeInTheDocument();
    });

    it('renders each Frage as a list item', async () => {
      await renderPage('diversitaet');
      expect(screen.getByText('Wie können Sie Ihre interkulturelle Kompetenz erweitern?')).toBeInTheDocument();
      expect(screen.getByText('Wie können Sie individuelle Lebensgewohnheiten managen?')).toBeInTheDocument();
    });

    it('hides Reflexionsfragen section when no fragen', async () => {
      await renderPage('trend-no-branchen');
      expect(screen.queryByRole('heading', { level: 2, name: 'Reflexionsfragen' })).not.toBeInTheDocument();
    });
  });

  describe('AC-17: Megatrend Tags', () => {
    it('renders Megatrend section heading', async () => {
      await renderPage('diversitaet');
      expect(screen.getByRole('heading', { level: 2, name: 'Megatrends' })).toBeInTheDocument();
    });

    it('renders Megatrend tags as links to /megatrend/[slug]', async () => {
      await renderPage('diversitaet');
      const demLink = screen.getByRole('link', { name: 'Demografischer Wandel' });
      expect(demLink).toHaveAttribute('href', '/megatrend/demografischer-wandel');
      const wertLink = screen.getByRole('link', { name: 'Wertewandel' });
      expect(wertLink).toHaveAttribute('href', '/megatrend/wertewandel');
    });
  });

  describe('AC-18 & AC-19: Branchenspezifische Karten', () => {
    it('renders Branchenspezifisch section when branchenTexte exist', async () => {
      await renderPage('diversitaet');
      expect(screen.getByRole('heading', { level: 2, name: 'Branchenspezifisch' })).toBeInTheDocument();
    });

    it('renders cards only for non-empty branchenTexte', async () => {
      await renderPage('diversitaet');
      // curaviva and insos have text, youvita is empty
      expect(screen.getByText('CURAVIVA spezifischer Text.')).toBeInTheDocument();
      expect(screen.getByText('INSOS spezifischer Text.')).toBeInTheDocument();
      expect(screen.queryByText('YOUVITA')).not.toBeInTheDocument();
    });

    it('renders card with organisation name as heading', async () => {
      await renderPage('diversitaet');
      expect(screen.getByRole('heading', { level: 3, name: 'CURAVIVA' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3, name: 'INSOS' })).toBeInTheDocument();
    });

    it('renders CURAVIVA before INSOS (correct order)', async () => {
      await renderPage('diversitaet');
      const headings = screen.getAllByRole('heading', { level: 3 });
      const names = headings.map(h => h.textContent);
      const curaviva = names.indexOf('CURAVIVA');
      const insos = names.indexOf('INSOS');
      expect(curaviva).toBeLessThan(insos);
    });

    it('does not render Branchenspezifisch section when all branchenTexte empty', async () => {
      await renderPage('trend-no-branchen');
      expect(screen.queryByRole('heading', { level: 2, name: 'Branchenspezifisch' })).not.toBeInTheDocument();
    });
  });

  describe('notFound', () => {
    it('calls notFound for unknown slug', async () => {
      await expect(renderPage('unknown-slug')).rejects.toThrow('NEXT_NOT_FOUND');
    });
  });
});
