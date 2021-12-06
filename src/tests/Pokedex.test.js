import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';
import pokemons from '../data';

describe('Check Pokedex', () => {
  it('Check heading text', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 });
    expect(title).toBeInTheDocument();
  });
  it('Check if pokemon change to the next at click on next', () => {
    renderWithRouter(<App />);
    const nextPokemonButton = screen.getByText(/próximo pokémon/i);
    expect(nextPokemonButton).toBeDefined();
    userEvent.click(nextPokemonButton);
    let pokemonName = screen.getByText(/Charmander/i);
    expect(pokemonName).toBeInTheDocument();
    userEvent.click(nextPokemonButton);
    pokemonName = screen.getByText(/Caterpie/i);
    expect(pokemonName).toBeInTheDocument();
  });
  it('Check next button result', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const nextPokemonButton = screen.getByText(/próximo pokémon/i);
    pokemons.forEach((pokemon, index) => {
      if (pokemons.length - 1 === index) {
        userEvent.click(nextPokemonButton);
        expect(pokemonName).toHaveTextContent(pokemons[0].name);
      } else {
        userEvent.click(nextPokemonButton);
        expect(pokemonName).toHaveTextContent(pokemons[index + 1].name);
      }
    });
  });
  it('Check if is showing a pokemon per time', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName.length).toBe(1);
  });
});
