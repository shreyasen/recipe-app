import type { ChangeEvent, FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.scss';
import { ROUTE_NAMES } from '../../routes/RouteNames';
import { searchRecipe } from '../../apis/recipeApis';

type ShowSearchBox = boolean;

export const Header: FC = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [showSearchbox, setShowSearchbox] = useState<ShowSearchBox>(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (showSearchbox) searchInputRef.current?.focus();
  }, [showSearchbox]);

  useEffect(() => {
    searchInput &&
      searchRecipe(searchInput).then((res) => setSearchResult(res.data));
  }, [searchInput]);

  const searchboxHandler = () => {
    setShowSearchbox(true);
  };

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const addRecipeHandler = () => {
    navigate(ROUTE_NAMES.addRecipe);
  };

  return (
    <header>
      <div className="header">
        <Link to={ROUTE_NAMES.root} className="header__logo">
          I'm Hungry
        </Link>
        <div>
          {showSearchbox ? (
            <>
              <input
                className="header__search-recipe"
                type={'text'}
                placeholder={'Search your recipe'}
                ref={searchInputRef}
                value={searchInput}
                onChange={searchHandler}
              />

              {searchResult?.length ? (
                <div className="header__search-results">
                  {searchResult.map(
                    (result: { title: string; _id: number }) => (
                      <div
                        key={result._id}
                        onClick={() => {
                          setSearchInput('');
                          setSearchResult([]);
                          navigate(result._id);
                          setShowSearchbox(false);
                        }}
                      >
                        {result.title}
                      </div>
                    )
                  )}
                </div>
              ) : null}
            </>
          ) : (
            <button
              className="header__search-button"
              onClick={searchboxHandler}
            >
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
      </div>
    </header>
  );
};
