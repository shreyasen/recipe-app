import { ChangeEvent, FC, useState, FormEvent } from 'react';
import { addRecipe } from '../../apis/recipeApis';
import Input from '../../components/Input/Input';

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

    console.log(formDataToSend.values());
    addRecipe(formDataToSend);
  };

  return (
    <div className="add-recipe-container">
      <h1>Add Your Recipe</h1>
      <form onSubmit={handleSubmit}>
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
          <>
            <label>Ingredients</label>
            {ingredients.map((ing) =>
              ing.count < ingredients.length ? (
                <div key={ing.count}>
                  <span>{ing.count}.&nbsp;</span>
                  <span>{ing.value}</span>
                </div>
              ) : (
                <Input onChange={(e) => changeValue(ing, e)} key={ing.count} />
              )
            )}
          </>

          <span>
            <button type="button" onClick={addIngredient}>
              +
            </button>
          </span>
        </div>

        <div>
          <>
            <label>Instructions</label>
            {instructions.map((ins) =>
              ins.count < instructions.length ? (
                <div key={ins.count}>
                  <span>{ins.count}.&nbsp;</span>
                  <span>{ins.value}</span>
                </div>
              ) : (
                <Input onChange={(e) => changeValue(ins, e)} key={ins.count} />
              )
            )}
          </>

          <span>
            <button type="button" onClick={addInstruction}>
              +
            </button>
          </span>
        </div>

        <div>
          <input type="file" onChange={handleImageChange} />
          {/* <FileBase type="file" multiple={false} onDone={({ base64 }) => setCategory({ ...category, image: base64 })} /> */}
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};
