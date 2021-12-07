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
  it('Check if the filters buttons appears', () => {
    renderWithRouter(<App />);
    const lengthOfTypes = pokemons.reduce((types, { type }) => {
      if (!types.includes(type)) return [...types, type];
      return types;
    }, []);
    const filters = screen.getAllByTestId('pokemon-type-button');
    expect(filters).toHaveLength(lengthOfTypes.length);
    console.log(lengthOfTypes);
    filters.forEach((filter, index) => {
      expect(filter.textContent).toBe(lengthOfTypes[index]);
    });

    filters.forEach((type) => {
      userEvent.click(type);
      const pokemonsPerType = pokemons.filter((
        pokemon,
      ) => pokemon.type === type.textContent);
      pokemonsPerType.forEach((pokemon) => {
        expect(screen.getByText(pokemon.name)).toBeInTheDocument();
        userEvent.click(screen.getByText(/próximo pokémon/i));
        expect(screen.getByText(/all/i)).toBeInTheDocument();
      });
    });
  });
  it('check if the button all is in the document', () => {
    renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      userEvent.click(screen.getByText(/próximo pokémon/i));
    });

    const allTypesButton = screen.getByText(/all/i);
    userEvent.click(allTypesButton);
    userEvent.click(screen.getByText(/próximo pokémon/i));
    expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
  });
});
