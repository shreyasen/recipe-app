import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.scss';
import { ROUTE_NAMES } from '../../routes/RouteNames';

type ShowSearchBox = boolean;

export const Header: FC = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [showSearchbox, setShowSearchbox] = useState<ShowSearchBox>(false);

  useEffect(() => {
    if (showSearchbox) searchInputRef.current?.focus();
  }, [showSearchbox]);
  const searchboxHandler = () => {
    setShowSearchbox(true);
  };

  const addRecipeHandler = () => {
    navigate(ROUTE_NAMES.addRecipe);
  };

  return (
    <header className="header">
      <Link to={ROUTE_NAMES.root} className="header__logo">
        I'm Hungry
      </Link>
      <div>
        {showSearchbox ? (
          <input
            className="header__search-recipe"
            type={'text'}
            placeholder={'Search your recipe'}
            ref={searchInputRef}
          />
        ) : (
          <button className="header__search-button" onClick={searchboxHandler}>
            Search
          </button>
        )}

        <button
          className="header__add-recipe-button"
          onClick={addRecipeHandler}
        >
          Add your recipe
        </button>
      </div>
    </header>
  );
};
