import { ChangeEvent, FC, useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRecipe } from '../../apis/recipeApis';
import Input from '../../components/Input/Input';
import { ROUTE_NAMES } from '../../routes/RouteNames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUserDetails } from '../../features/userSlice';
import './AddRecipe.scss';

type Category = {
  title: string;
  mealTime: string;
  cookingTime: number;
  difficultyLevel: string;
  image: File | null;
};
type ObjectType = {
  count: number;
  value: string;
};

export const AddRecipePage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authDetails = useAppSelector((state) => state.authDetails);
  const userDetails = useAppSelector((state) => state.userDetails);

  const [category, setCategory] = useState<Category>({
    title: '',
    mealTime: 'breakfast',
    cookingTime: 10,
    difficultyLevel: 'EASY',
    image: null,
  });

  const [ingredients, setIngredients] = useState<ObjectType[]>([
    { count: 1, value: '' },
  ]);

  const [instructions, setInstructions] = useState<ObjectType[]>([
    { count: 1, value: '' },
  ]);

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const changeValue = (obj: ObjectType, e: ChangeEvent<HTMLInputElement>) => {
    obj.value = e.target.value;
  };

  const addIngredient = () => {
    if (ingredients[ingredients.length - 1].value) {
      const newInput = {
        count: ingredients.length + 1,
        value: '',
      };
      setIngredients([...ingredients, newInput]);
    }
  };

  const addInstruction = () => {
    if (instructions[instructions.length - 1].value) {
      const newInput = {
        count: instructions.length + 1,
        value: '',
      };
      setInstructions([...instructions, newInput]);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setCategory({ ...category, image: event.target.files[0] });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const ingArr = ingredients
      .filter((ing) => ing.value)
      .map((ing) => ing.value);

    const insArr = instructions
      .filter((ing) => ing.value)
      .map((ing) => ing.value);

    const formDataToSend = new FormData();
    formDataToSend.append('title', category.title);
    formDataToSend.append('mealTime', category.mealTime);
    formDataToSend.append('cookingTime', category.cookingTime.toString());
    formDataToSend.append('difficultyLevel', category.difficultyLevel);
    formDataToSend.append('ingredients', JSON.stringify(ingArr));
    formDataToSend.append('instructions', JSON.stringify(insArr));
    if (category.image) {
      formDataToSend.append('image', category.image);
    }
    addRecipe(formDataToSend);
  };

  if (userDetails.error) {
    navigate(ROUTE_NAMES.signin);
  }

  return (
    <div className="add-recipe__container">
      <div className="add-recipe__form-box">
        <h1 className="add-recipe__form-header">Add Your Recipe</h1>
        <form onSubmit={handleSubmit}>
          <div className="add-recipe__input-container">
            <label htmlFor="title">Title</label>
            <br />
            <input
              type={'text'}
              placeholder={'Name of the recipe'}
              name="title"
              id="title"
              value={category.title}
              onChange={changeHandler}
              className="add-recipe__input-text"
            />
          </div>

          <div className="add-recipe__input-container">
            <label htmlFor="mealTime">Meal Time</label>
            <br />
            <select
              name="mealTime"
              id="mealTime"
              onChange={changeHandler}
              value={category.mealTime}
              className="add-recipe__input-text"
            >
              <option value={'breakfast'}>Breakfast</option>
              <option value={'lunch'}>Lunch</option>
              <option value={'snacks'}>Snacks</option>
              <option value={'dinner'}>Dinner</option>
            </select>
          </div>

          <div className="add-recipe__input-container">
            <label htmlFor="cookingTime">Cooking Time</label>
            <br />
            <select
              name="cookingTime"
              id="cookingTime"
              onChange={changeHandler}
              value={category.cookingTime}
              className="add-recipe__input-text"
            >
              <option value={10}>5min-10min</option>
              <option value={20}>10min-20min</option>
              <option value={30}>20min-30min</option>
              <option value={45}>30min-45min</option>
            </select>
          </div>

          <div className="add-recipe__input-container">
            <label htmlFor="difficultyLevel">Difficulty Level</label>
            <br />
            <select
              name="difficultyLevel"
              id="difficultyLevel"
              onChange={changeHandler}
              value={category.difficultyLevel}
              className="add-recipe__input-text"
            >
              <option value={'EASY'}>Easy</option>
              <option value={'MEDIUM'}>Medium</option>
              <option value={'DIFFICULT'}>Difficult</option>
            </select>
          </div>

          <div className="add-recipe__input-container">
            <>
              <label>Ingredients</label>
              <br />
              {ingredients.map((ing) =>
                ing.count < ingredients.length ? (
                  <div key={ing.count}>
                    <span>{ing.count}.&nbsp;</span>
                    <span>{ing.value}</span>
                  </div>
                ) : (
                  <Input
                    onChange={(e) => changeValue(ing, e)}
                    key={ing.count}
                  />
                )
              )}
            </>

            <span>
              <i className="fa fa-circle-plus" onClick={addIngredient}></i>
            </span>
          </div>

          <div className="add-recipe__input-container">
            <>
              <label>Instructions</label>
              <br />
              {instructions.map((ins) =>
                ins.count < instructions.length ? (
                  <div key={ins.count}>
                    <span>{ins.count}.&nbsp;</span>
                    <span>{ins.value}</span>
                  </div>
                ) : (
                  <Input
                    onChange={(e) => changeValue(ins, e)}
                    key={ins.count}
                  />
                )
              )}
            </>

            <span>
              <i className="fa fa-circle-plus" onClick={addInstruction}></i>
            </span>
          </div>

          <div className="add-recipe__input-container">
            <input type="file" onChange={handleImageChange} />
            {/* <FileBase type="file" multiple={false} onDone={({ base64 }) => setCategory({ ...category, image: base64 })} /> */}
          </div>
          <div>
            <button className="add-recipe__button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};
