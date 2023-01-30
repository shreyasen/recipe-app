import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { HomePage } from './HomePage';
import { ROUTE_NAMES } from '../../routes/RouteNames';

describe('Home page', () => {
  test('renders correctly', () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveTextContent('Simple and Tasty Recipes');
    expect(title).toHaveClass('home-page-title');
    const button = screen.getByRole('button', { name: /Get Started/ });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('get-started-button');
    expect(window.location.pathname).toContain(ROUTE_NAMES.root);
  });

  test('shifted to choose category page on button click', () => {
    render(<HomePage />, { wrapper: BrowserRouter });
    const button = screen.getByRole('button', { name: /Get Started/ });
    userEvent.click(button);
    expect(window.location.pathname).toContain(ROUTE_NAMES.selectCategory);
  });
});
