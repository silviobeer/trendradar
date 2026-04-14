import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import HandlungsfeldPage from '../[slug]/page';
import { BranchenFilterProvider } from '@/contexts/BranchenFilterContext';

// Mock next/navigation — notFound throws a special error
vi.mock('next/navigation', () => ({
  notFound: () => { throw new Error('NEXT_NOT_FOUND'); },
  redirect: vi.fn(),
}));

const REAL_SLUG = 'mitarbeitende';
const REAL_NAME = 'Mitarbeitende';

async function renderPage(slug: string) {
  const params = Promise.resolve({ slug });
  let jsx: React.ReactNode;
  await act(async () => {
    jsx = await HandlungsfeldPage({ params });
  });
  return render(
    <BranchenFilterProvider>{jsx!}</BranchenFilterProvider>
  );
}

describe('HandlungsfeldPage', () => {
  it('renders breadcrumb with Startseite link', async () => {
    await renderPage(REAL_SLUG);
    const link = screen.getByRole('link', { name: 'Startseite' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders breadcrumb with handlungsfeld name as current page', async () => {
    await renderPage(REAL_SLUG);
    const current = screen.getByText(REAL_NAME, { selector: '[aria-current="page"]' });
    expect(current).toBeInTheDocument();
  });

  it('renders h1 with handlungsfeld name', async () => {
    await renderPage(REAL_SLUG);
    const heading = screen.getByRole('heading', { level: 1, name: REAL_NAME });
    expect(heading).toBeInTheDocument();
  });

  it('renders description text', async () => {
    await renderPage(REAL_SLUG);
    const desc = screen.getByText(/Mitarbeitenden/);
    expect(desc).toBeInTheDocument();
  });

  it('renders BranchenFilter buttons', async () => {
    await renderPage(REAL_SLUG);
    const curaviva = screen.getByRole('button', { name: 'CURAVIVA' });
    expect(curaviva).toBeInTheDocument();
  });

  it('renders "Trends anzeigen" CTA button', async () => {
    await renderPage(REAL_SLUG);
    const btn = screen.getByRole('button', { name: 'Trends anzeigen' });
    expect(btn).toBeInTheDocument();
  });

  it('renders trend list with at least one trend link', async () => {
    await renderPage(REAL_SLUG);
    const links = screen.getAllByRole('link');
    const trendLinks = links.filter(
      (l) => l.getAttribute('href')?.startsWith('/trend/')
    );
    expect(trendLinks.length).toBeGreaterThan(0);
  });

  it('calls notFound for unknown slug', async () => {
    await expect(
      renderPage('nicht-existent')
    ).rejects.toThrow('NEXT_NOT_FOUND');
  });
});
