import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

describe('Header', () => {
  it('renders with bg-primary class', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('header');
    expect(header?.className).toContain('bg-primary');
  });

  it('contains "ARTISET Trendradar" title text', () => {
    render(<Header />);
    expect(screen.getByText('ARTISET Trendradar')).toBeInTheDocument();
  });

  it('title links to "/"', () => {
    const { container } = render(<Header />);
    const titleLink = container.querySelector('a[href="/"]');
    expect(titleLink).toBeInTheDocument();
    expect(titleLink?.textContent).toBe('ARTISET Trendradar');
  });

  it('contains Startseite navigation link', () => {
    render(<Header />);
    expect(screen.getByText('Startseite')).toBeInTheDocument();
  });

  it('title has font-serif class', () => {
    const { container } = render(<Header />);
    const titleLink = container.querySelector('a[href="/"]');
    expect(titleLink?.className).toContain('font-serif');
  });

  it('title has text-white class', () => {
    const { container } = render(<Header />);
    const titleLink = container.querySelector('a[href="/"]');
    expect(titleLink?.className).toContain('text-white');
  });

  it('uses semantic header element', () => {
    const { container } = render(<Header />);
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  it('contains nav element for navigation', () => {
    const { container } = render(<Header />);
    expect(container.querySelector('nav')).toBeInTheDocument();
  });
});
