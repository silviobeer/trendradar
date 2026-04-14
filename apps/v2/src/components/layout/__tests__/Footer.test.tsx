import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('renders with bg-primary class', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer?.className).toContain('bg-primary');
  });

  it('contains "ARTISET" text', () => {
    render(<Footer />);
    expect(screen.getByText(/ARTISET/)).toBeInTheDocument();
  });

  it('contains copyright year 2026', () => {
    render(<Footer />);
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  it('uses semantic footer element', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });

  it('copyright text has muted white styling', () => {
    const { container } = render(<Footer />);
    const inner = container.querySelector('footer > div');
    expect(inner?.className).toContain('text-white');
  });
});
