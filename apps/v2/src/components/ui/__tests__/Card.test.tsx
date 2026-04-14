import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('has bg-white and rounded-lg classes', () => {
    const { container } = render(<Card>Content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('bg-white');
    expect(el.className).toContain('rounded-lg');
  });

  it('without brandColor has no border-l-4 class', () => {
    const { container } = render(<Card>Content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).not.toContain('border-l-4');
  });

  it('with brandColor adds border-l-4 class and inline borderLeftColor style', () => {
    const { container } = render(<Card brandColor="#e07b39">Content</Card>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('border-l-4');
    expect(el.style.borderLeftColor).toBe('rgb(224, 123, 57)');
  });
});
