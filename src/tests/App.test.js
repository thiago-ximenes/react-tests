import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Check App component.', () => {
  it('Check if head of application contains a group of navigation links fixed.', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokemons).toBeInTheDocument();
  });
  it('Check if application redirect to home  URL "/" on click at "Home" link.',
    () => {
      // renderWithRouter(<App />);q

      const { history } = renderWithRouter(<App />);

      history.push('/');
      let pageTitle = screen.getByRole('heading', { name: /Encountered pokémons/i });
      expect(pageTitle).toBeInTheDocument();
      expect(history.location.pathname).toBe('/');

      history.push('/about');
      pageTitle = screen.getByRole('heading', { name: /About Pokédex/i });
      expect(pageTitle).toBeInTheDocument();
      expect(history.location.pathname).toBe('/about');

      history.push('/favorites');
      pageTitle = screen.getByRole('heading', { name: /Favorite pokémons/i });
      expect(pageTitle).toBeInTheDocument();
      expect(history.location.pathname).toBe('/favorites');

      history.push('/favoritess');
      pageTitle = screen.getByRole('heading', { name: /Page requested not found/i });
      expect(pageTitle).toBeInTheDocument();
    });
});
