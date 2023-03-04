import type { ChangeEventHandler } from 'react';
import { useState, useEffect } from 'react';
import categories from '../../data/categories.json';
import { Card } from '../../components/Card/Card';
import './SelectCategory.scss';
import { getPopularRecipes } from '../../apis/recipeApis';

export type Category = {
  id: string;
  title: string;
  mealTime: string;
  cookingTime: number;
  difficultyLevel: string;
};

type FilteredCategory = Category[];

type Filter = {
  mealTime: string;
  cookingTime: number;
  difficultyLevel: string;
};

export const SelectCategoryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Filter>({
    mealTime: 'breakfast',
    cookingTime: 10,
    difficultyLevel: 'EASY',
  });

  const [filteredCategory, setFilteredCategory] = useState<FilteredCategory>(
    []
  );

  const [popularRecipeList, setPopularRecipeList] = useState({
    list: [],
    status: '',
  });

  const filterHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedCategory({
      ...selectedCategory,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const continueHandler = () => {
    const filteredCategories = categories.filter(
      (c) =>
        c.mealTime === selectedCategory.mealTime &&
        c.difficultyLevel === selectedCategory.difficultyLevel &&
        c.cookingTime <= Number(selectedCategory.cookingTime)
    );
    setFilteredCategory(filteredCategories);
  };

  useEffect(() => {
    getPopularRecipes().then((res) => {
      console.log(res);
      setPopularRecipeList({
        ...popularRecipeList,
        list: res.data,
        status: res.status,
      });
    });
  }, []);
  console.log(popularRecipeList);
  return (
    <>
      <div className="select-category">
        <div className="select-category__container">
          <div className="select-category__header">
            <h1 className="select-category__title">Choose Your Category</h1>
            <div className="select-category__options">
              <div className="select-category__dropdown">
                <label htmlFor="mealTime">Meal Time</label>
                <select
                  name="mealTime"
                  id="mealTime"
                  onChange={filterHandler}
                  value={selectedCategory.mealTime}
                >
                  <option value={'breakfast'}>Breakfast</option>
                  <option value={'lunch'}>Lunch</option>
                  <option value={'snacks'}>Snacks</option>
                  <option value={'dinner'}>Dinner</option>
                </select>
              </div>

              <div className="select-category__dropdown">
                <label htmlFor="cookingTime">Cooking Time</label>
                <select
                  name="cookingTime"
                  id="cookingTime"
                  onChange={filterHandler}
                  value={selectedCategory.cookingTime}
                >
                  <option value={10}>5min-10min</option>
                  <option value={20}>10min-20min</option>
                  <option value={30}>20min-30min</option>
                  <option value={45}>30min-45min</option>
                </select>
              </div>

              <div className="select-category__dropdown">
                <label htmlFor="difficultyLevel">Difficulty Level</label>
                <select
                  name="difficultyLevel"
                  id="difficultyLevel"
                  onChange={filterHandler}
                  value={selectedCategory.difficultyLevel}
                >
                  <option value={'EASY'}>Easy</option>
                  <option value={'MEDIUM'}>Medium</option>
                  <option value={'DIFFICULT'}>Difficult</option>
                </select>
              </div>
            </div>
            <div>
              <button
                onClick={continueHandler}
                className="select-category__button"
              >
                Continue
              </button>
            </div>
            <div className="filtered-recipes__container">
              {filteredCategory.length ? (
                filteredCategory.map((category, i) => (
                  <Card category={category} index={i} />
                ))
              ) : (
                <h1>No recipes found!</h1>
              )}
            </div>
          </div>
        </div>

        {popularRecipeList.list?.length ? (
          <div className="select-category__popular">
            <div>
              <h2>Popular Recipes</h2>
              <div className="select-category__popular-list-container">
                {popularRecipeList.list.map(
                  (recipe: { _id: string; title: string; image: string }) => (
                    <div
                      key={recipe._id}
                      className="select-category__popular-list-item"
                    >
                      <div className="popular-list-item-wrapper">
                        <img
                          src={`data:image/jpeg;base64,${recipe.image}`}
                          alt={recipe.title}
                          loading="lazy"
                        />
                        <div>{recipe.title}</div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
