import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Check Favorite Pokemons', () => {
  it('Check if a msg render as there is not a favorite pokemon yet', () => {
    renderWithRouter(<FavoritePokemons />);

    const noPokemonMsg = screen.getByText('No favorite pokemon found');
    expect(noPokemonMsg).toBeInTheDocument();
  });
  it('', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');
    const moreDetailsBtn = screen.getByText('More details');
    userEvent.click(moreDetailsBtn);
    const favoriteButton = screen.getByText('Pokémon favoritado?');
    userEvent.click(favoriteButton);
    const favoriteLink = screen.getByText('Favorite Pokémons');
    userEvent.click(favoriteLink);
    const favoritesPokemons = screen.getAllByText('More details');
    expect(favoritesPokemons).toHaveLength(1);
  });
});
