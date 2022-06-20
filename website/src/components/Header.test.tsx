import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

test('checks if header has title as cosumo constructions', () => {
  render(<Header />);
  const linkElement = screen.getByText(/Cosumo Constructions/i);
  expect(linkElement).toBeInTheDocument();
});
