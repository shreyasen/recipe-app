import { ChangeEvent, FC, useState } from 'react';

export const AddRecipePage: FC = () => {
  type Category = {
    title: string;
    mealTime: string;
    cookingTime: number;
    difficultyLevel: string;
  };

  const [category, setCategory] = useState<Category>({
    title: '',
    mealTime: 'breakfast',
    cookingTime: 10,
    difficultyLevel: 'EASY',
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-recipe-container">
      <h1>Add Your Recipe</h1>
      <form>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type={'text'}
            placeholder={'Name of the recipe'}
            name="title"
            id="title"
            value={category.title}
            onChange={changeHandler}
          />
        </div>

        <div>
          <label htmlFor="mealTime">Meal Time</label>
          <select
            name="mealTime"
            id="mealTime"
            onChange={changeHandler}
            value={category.mealTime}
          >
            <option value={'breakfast'}>Breakfast</option>
            <option value={'lunch'}>Lunch</option>
            <option value={'snacks'}>Snacks</option>
            <option value={'dinner'}>Dinner</option>
          </select>
        </div>

        <div>
          <label htmlFor="cookingTime">Cooking Time</label>
          <select
            name="cookingTime"
            id="cookingTime"
            onChange={changeHandler}
            value={category.cookingTime}
          >
            <option value={10}>5min-10min</option>
            <option value={20}>10min-20min</option>
            <option value={30}>20min-30min</option>
            <option value={45}>30min-45min</option>
          </select>
        </div>

        <div>
          <label htmlFor="difficultyLevel">Difficulty Level</label>
          <select
            name="difficultyLevel"
            id="difficultyLevel"
            onChange={changeHandler}
            value={category.difficultyLevel}
          >
            <option value={'EASY'}>Easy</option>
            <option value={'MEDIUM'}>Medium</option>
            <option value={'DIFFICULT'}>Difficult</option>
          </select>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};
