import type { FC } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.scss';
import { ROUTE_NAMES } from '../../routes/RouteNames';

export const Header: FC = () => {
  const navigate = useNavigate();
  const addRecipeHandler = () => {
    navigate(ROUTE_NAMES.addRecipe);
  };
  return (
    <header>
      <Link to={ROUTE_NAMES.root}>I'm Hungry</Link>
      <div>
        <button className="header-search-button">Search</button>
        <button className="header-add-recipe-button" onClick={addRecipeHandler}>
          Add your recipe
        </button>
      </div>
    </header>
  );
};
