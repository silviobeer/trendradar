import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContentLayout, SectionDivider } from '../ContentLayout';

describe('ContentLayout', () => {
  it('renders children', () => {
    render(
      <ContentLayout>
        <p>Test content</p>
      </ContentLayout>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('wraps children in a max-w-[780px] container', () => {
    const { container } = render(
      <ContentLayout>
        <p>Content</p>
      </ContentLayout>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper?.className).toContain('max-w-[780px]');
  });

  it('has mx-auto for horizontal centering', () => {
    const { container } = render(
      <ContentLayout>
        <p>Content</p>
      </ContentLayout>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper?.className).toContain('mx-auto');
  });

  it('has generous vertical padding py-12', () => {
    const { container } = render(
      <ContentLayout>
        <p>Content</p>
      </ContentLayout>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper?.className).toContain('py-12');
  });

  it('has horizontal padding px-6', () => {
    const { container } = render(
      <ContentLayout>
        <p>Content</p>
      </ContentLayout>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper?.className).toContain('px-6');
  });
});

describe('SectionDivider', () => {
  it('renders an hr element', () => {
    const { container } = render(<SectionDivider />);
    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('has border-t class', () => {
    const { container } = render(<SectionDivider />);
    const hr = container.querySelector('hr');
    expect(hr?.className).toContain('border-t');
  });

  it('has vertical margin my-10', () => {
    const { container } = render(<SectionDivider />);
    const hr = container.querySelector('hr');
    expect(hr?.className).toContain('my-10');
  });
});
