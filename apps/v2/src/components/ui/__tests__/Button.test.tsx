import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button', () => {
  describe('variant="primary" (default)', () => {
    it('has bg-accent class', () => {
      const { container } = render(<Button>Click</Button>);
      expect(container.firstChild).toHaveClass('bg-accent');
    });

    it('has text-white class', () => {
      const { container } = render(<Button>Click</Button>);
      expect(container.firstChild).toHaveClass('text-white');
    });

    it('has hover:bg-accent-rollover class', () => {
      const { container } = render(<Button>Click</Button>);
      expect(container.firstChild).toHaveClass('hover:bg-accent-rollover');
    });
  });

  describe('variant="secondary"', () => {
    it('has bg-bg-warm-medium class', () => {
      const { container } = render(<Button variant="secondary">Click</Button>);
      expect(container.firstChild).toHaveClass('bg-bg-warm-medium');
    });

    it('has text-primary class', () => {
      const { container } = render(<Button variant="secondary">Click</Button>);
      expect(container.firstChild).toHaveClass('text-primary');
    });

    it('has hover:bg-button-medium class', () => {
      const { container } = render(<Button variant="secondary">Click</Button>);
      expect(container.firstChild).toHaveClass('hover:bg-button-medium');
    });
  });

  describe('variant="ghost"', () => {
    it('has bg-transparent class', () => {
      const { container } = render(<Button variant="ghost">Click</Button>);
      expect(container.firstChild).toHaveClass('bg-transparent');
    });

    it('has text-primary class', () => {
      const { container } = render(<Button variant="ghost">Click</Button>);
      expect(container.firstChild).toHaveClass('text-primary');
    });

    it('has border class', () => {
      const { container } = render(<Button variant="ghost">Click</Button>);
      expect(container.firstChild).toHaveClass('border');
    });

    it('has border-primary class', () => {
      const { container } = render(<Button variant="ghost">Click</Button>);
      expect(container.firstChild).toHaveClass('border-primary');
    });
  });

  it('renders children', () => {
    render(<Button>Submit</Button>);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('forwards onClick handler', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('renders as a button element', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('forwards disabled attribute', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
