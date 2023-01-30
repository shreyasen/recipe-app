import type { FC } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { ROUTE_NAMES } from '../../routes/RouteNames';

export const Header: FC = () => {
  return (
    <header>
      <Link to={ROUTE_NAMES.root}>I'm Hungry</Link>
      <div>
        <button className="header-search-button">Search</button>
        <button className="header-add-recipe-button">Add your recipe</button>
      </div>
    </header>
  );
};
