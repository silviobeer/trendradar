import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Tag from '../Tag';

describe('Tag', () => {
  it('variant="handlungsfeld" has bg-primary-10 and text-primary classes', () => {
    const { container } = render(<Tag variant="handlungsfeld">Klientel</Tag>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('bg-primary-10');
    expect(el.className).toContain('text-primary');
  });

  it('variant="megatrend" has bg-primary-20 and text-primary classes', () => {
    const { container } = render(<Tag variant="megatrend">Demografie</Tag>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('bg-primary-20');
    expect(el.className).toContain('text-primary');
  });

  it('renders children text', () => {
    render(<Tag variant="handlungsfeld">My Tag</Tag>);
    expect(screen.getByText('My Tag')).toBeInTheDocument();
  });

  it('without href renders as a span', () => {
    const { container } = render(<Tag variant="handlungsfeld">Span Tag</Tag>);
    expect(container.firstChild?.nodeName).toBe('SPAN');
  });

  it('with href renders as an anchor link', () => {
    const { container } = render(
      <Tag variant="handlungsfeld" href="/handlungsfeld/klientel">
        Klientel
      </Tag>
    );
    expect(container.firstChild?.nodeName).toBe('A');
    expect((container.firstChild as HTMLAnchorElement).href).toContain(
      '/handlungsfeld/klientel'
    );
  });

  it('has rounded-full and text-tag classes', () => {
    const { container } = render(<Tag variant="handlungsfeld">Test</Tag>);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain('rounded-full');
    expect(el.className).toContain('text-tag');
  });
});
