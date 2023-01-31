import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AddRecipePage } from './AddRecipePage';

describe('Add Recipe Page', () => {
  test('rendering properly', () => {
    render(<AddRecipePage />, { wrapper: BrowserRouter });
    const title = screen.getByRole('heading', {
      level: 1,
      name: /Add Your Recipe/i,
    });
    expect(title).toBeInTheDocument();
    expect(screen.getByText(/meal time/i)).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', {
        name: /meal time/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByText(/cooking time/i)).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', {
        name: /cooking time/i,
      })
    ).toBeInTheDocument();

    expect(screen.getByText(/difficulty level/i)).toBeInTheDocument();
    expect(
      screen.getByRole('combobox', {
        name: /difficulty level/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', {
        name: /Submit/i,
      })
    ).toBeInTheDocument();
  });
});
