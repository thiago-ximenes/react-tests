import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helper/renderWithRouter';
// import App from '../App';
import { Pokemon } from '../components';
import pokemons from '../data';

describe('Check Pokemon.js', () => {
  it('Should render a card with defined information', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const pokemonName = screen.getByText(pokemons[0].name);
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = screen.getByText(pokemons[0].type);
    expect(pokemonType).toBeInTheDocument();

    const { value, measurementUnit } = pokemons[0].averageWeight;
    const pokemonWeight = screen.getByText(`Average weight: ${value} ${measurementUnit}`);
    expect(pokemonWeight).toBeInTheDocument();

    const pokemonImage = screen.getByAltText(`${pokemons[0].name} sprite`);
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', pokemons[0].image);
  });
  it('Test detail link', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);

    const moreDetailsLink = screen.getByText(/more details/i);
    expect(moreDetailsLink).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
    userEvent.click(moreDetailsLink);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[0].id}`);
    const favorited = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(favorited).toBeInTheDocument();
    expect(favorited).toHaveAttribute('src', '/star-icon.svg');
  });
});
