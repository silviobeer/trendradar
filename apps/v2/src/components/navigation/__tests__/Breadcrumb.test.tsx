import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Breadcrumb from '../Breadcrumb';

describe('Breadcrumb', () => {
  const items = [
    { label: 'Startseite', href: '/' },
    { label: 'Trends', href: '/trends' },
    { label: 'Aktuelle Seite' },
  ];

  it('renders all item labels', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Startseite')).toBeInTheDocument();
    expect(screen.getByText('Trends')).toBeInTheDocument();
    expect(screen.getByText('Aktuelle Seite')).toBeInTheDocument();
  });

  it('items with href render as links with text-primary class', () => {
    const { container } = render(<Breadcrumb items={items} />);
    const links = container.querySelectorAll('a');
    expect(links).toHaveLength(2);
    links.forEach((link) => {
      expect(link.className).toContain('text-primary');
    });
  });

  it('last item without href renders as a span with text-text-medium class', () => {
    const { container } = render(<Breadcrumb items={items} />);
    const spans = container.querySelectorAll('span[aria-current="page"]');
    expect(spans).toHaveLength(1);
    expect(spans[0].className).toContain('text-text-medium');
    expect(spans[0].textContent).toBe('Aktuelle Seite');
  });

  it('renders separator ">" between items', () => {
    render(<Breadcrumb items={items} />);
    const separators = screen.getAllByText('>');
    expect(separators).toHaveLength(2);
  });

  it('first link points to "/"', () => {
    const { container } = render(<Breadcrumb items={items} />);
    const firstLink = container.querySelector('a');
    expect(firstLink?.getAttribute('href')).toBe('/');
  });

  it('wrapper has text-small and font-light classes', () => {
    const { container } = render(<Breadcrumb items={items} />);
    const nav = container.querySelector('nav');
    expect(nav?.className).toContain('text-small');
    expect(nav?.className).toContain('font-light');
  });
});
