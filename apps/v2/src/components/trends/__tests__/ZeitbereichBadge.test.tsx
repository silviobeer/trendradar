import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ZeitbereichBadge } from '../ZeitbereichBadge';

describe('ZeitbereichBadge', () => {
  describe('zeitrahmen="handeln"', () => {
    it('renders text "Handeln"', () => {
      render(<ZeitbereichBadge zeitrahmen="handeln" />);
      expect(screen.getByText('Handeln')).toBeInTheDocument();
    });

    it('has bg-primary class', () => {
      const { container } = render(<ZeitbereichBadge zeitrahmen="handeln" />);
      expect(container.firstChild).toHaveClass('bg-primary');
    });

    it('has text-white class', () => {
      const { container } = render(<ZeitbereichBadge zeitrahmen="handeln" />);
      expect(container.firstChild).toHaveClass('text-white');
    });
  });

  describe('zeitrahmen="vorbereiten"', () => {
    it('renders text "Vorbereiten"', () => {
      render(<ZeitbereichBadge zeitrahmen="vorbereiten" />);
      expect(screen.getByText('Vorbereiten')).toBeInTheDocument();
    });

    it('has bg-primary-80 class', () => {
      const { container } = render(<ZeitbereichBadge zeitrahmen="vorbereiten" />);
      expect(container.firstChild).toHaveClass('bg-primary-80');
    });

    it('has text-white class', () => {
      const { container } = render(<ZeitbereichBadge zeitrahmen="vorbereiten" />);
      expect(container.firstChild).toHaveClass('text-white');
    });
  });

  describe('zeitrahmen="beobachten"', () => {
    it('renders text "Beobachten"', () => {
      render(<ZeitbereichBadge zeitrahmen="beobachten" />);
      expect(screen.getByText('Beobachten')).toBeInTheDocument();
    });

    it('has bg-primary-20 class', () => {
      const { container } = render(<ZeitbereichBadge zeitrahmen="beobachten" />);
      expect(container.firstChild).toHaveClass('bg-primary-20');
    });

    it('has text-primary class', () => {
      const { container } = render(<ZeitbereichBadge zeitrahmen="beobachten" />);
      expect(container.firstChild).toHaveClass('text-primary');
    });
  });

  it('renders as a span element', () => {
    const { container } = render(<ZeitbereichBadge zeitrahmen="handeln" />);
    expect(container.firstChild?.nodeName).toBe('SPAN');
  });

  it('has rounded-full class', () => {
    const { container } = render(<ZeitbereichBadge zeitrahmen="handeln" />);
    expect(container.firstChild).toHaveClass('rounded-full');
  });
});
