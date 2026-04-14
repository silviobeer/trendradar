import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../page';

describe('HomePage', () => {
  it('renders the trend count from shared data', () => {
    render(<HomePage />);
    // getAllTrends() returns 33 trends per the shared package
    expect(screen.getByText(/\d+ Trends/)).toBeInTheDocument();
  });

  it('displays a non-zero number of trends', () => {
    render(<HomePage />);
    const el = screen.getByText(/\d+ Trends/);
    const count = parseInt(el.textContent ?? '0', 10);
    expect(count).toBeGreaterThan(0);
  });
});
