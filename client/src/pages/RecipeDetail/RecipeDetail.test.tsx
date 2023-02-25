import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecipeDetailPage } from './RecipeDetailPage';

describe('Recipe detail page', () => {
  test('rendering properly', () => {
    render(<RecipeDetailPage />, { wrapper: BrowserRouter });
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
    const ingredientsHeading = screen.getByRole('heading', {
      name: /ingredients/i,
    });
    expect(ingredientsHeading).toBeInTheDocument();
    const instructionsHeading = screen.getByRole('heading', {
      name: /instructions/i,
    });
    expect(instructionsHeading).toBeInTheDocument();
  });
});
