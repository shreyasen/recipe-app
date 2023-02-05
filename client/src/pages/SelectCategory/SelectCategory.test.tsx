import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SelectCategoryPage } from './SelectCategoryPage';

describe('Select Category Page', () => {
  test('rendering properly', () => {
    render(<SelectCategoryPage />, { wrapper: BrowserRouter });
    const title = screen.getByRole('heading', {
      level: 1,
      name: /Choose Your Category/i,
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
        name: /continue/i,
      })
    ).toBeInTheDocument();
  });
});
