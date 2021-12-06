import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../helper/renderWithRouter';

describe('Check component About', () => {
  test('Check if the page contain informations about the podédex', () => {
    renderWithRouter(<About />);
    const aboutInformation = screen.getByText(
      /This application simulates a Pokédex, a digital encyclopedia containing all/i,
    );
    const aboutInformation2 = screen.getByText(
      /One can filter Pokémons by type, and see more details for each one of them/i,
    );
    const aboutHeading = screen.getByRole(
      'heading', { name: /About Pokédex/i, level: 2 },
    );
    // Descobri como capturar a image nessa pesquisa abaixo
    // src: https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src
    const aboutImage = screen.getByAltText(/Pokédex/i);

    expect(aboutInformation).toBeInTheDocument();
    expect(aboutInformation2).toBeInTheDocument();
    expect(aboutHeading).toBeInTheDocument();
    expect(aboutImage.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
