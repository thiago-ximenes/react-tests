import { screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../helper/renderWithRouter';

describe('Check the component NotFound', () => {
  test('', () => {
    renderWithRouter(<NotFound />);

    const notFoundTitle = screen.getByRole(
      'heading', { name: 'Page requested not found Crying emoji', level: 2 },
    );
    expect(notFoundTitle).toBeInTheDocument();

    const imgNotFound = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(imgNotFound.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
