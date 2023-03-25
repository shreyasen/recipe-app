import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';
import { ROUTE_NAMES } from '../../routes/RouteNames';
import Cookies from 'js-cookie';

describe('Header component', () => {
  it('should render properly', () => {
    render(<Header />, { wrapper: BrowserRouter });
    expect(
      screen.getByRole('link', { name: /i'm hungry/i })
    ).toBeInTheDocument();
    const searchBtn = screen.getByRole('button', { name: /search/i });
    expect(searchBtn).toBeInTheDocument();
    const addRecipeBtn = screen.getByRole('button', {
      name: /add your recipe/i,
    });
    expect(addRecipeBtn).toBeInTheDocument();
    const searchInput = screen.queryByRole('textbox');
    expect(searchInput).not.toBeInTheDocument();
  });

  it('should open search input on Search button click', () => {
    render(<Header />, { wrapper: BrowserRouter });
    const searchBtn = screen.queryByRole('button', { name: /search/i });
    searchBtn && userEvent.click(searchBtn);
    const searchInput = screen.queryByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    expect(searchBtn).not.toBeInTheDocument();
  });

  it('should redirect to signin page on Add Recipe button click for the first time', () => {
    render(<Header />, { wrapper: BrowserRouter });
    const addRecipeBtn = screen.getByRole('button', {
      name: /add your recipe/i,
    });
    userEvent.click(addRecipeBtn);
    expect(window.location.pathname).toContain(ROUTE_NAMES.signin);
  });

  it('should redirect to add recipe page on Add Recipe button click after signin', () => {
    Cookies.set(
      'JWT-TOKEN',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQxNzQ3OGY0MmZlMGY5ZWQ3YmM4MmM4IiwiZW1haWwiOiJ0ZXN0N0BnbWFpbC5jb20iLCJpYXQiOjE2Nzk3Njc1MDYsImV4cCI6MTY3OTc3MTEwNn0.TNgW1iC3tKV2muaiJOXoj023TrxzlbMzUcaS1v7JDgo'
    );
    render(<Header />, { wrapper: BrowserRouter });
    const addRecipeBtn = screen.getByRole('button', {
      name: /add your recipe/i,
    });
    userEvent.click(addRecipeBtn);
    expect(window.location.pathname).toContain(ROUTE_NAMES.addRecipe);
  });
});
