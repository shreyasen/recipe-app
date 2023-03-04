import { ChangeEvent, FC, useState, FormEvent } from 'react';
import { addRecipe } from '../../apis/recipeApis';
// import FileBase from 'react-file-base64';

export type Category = {
  title: string;
  mealTime: string;
  cookingTime: number;
  difficultyLevel: string;
  ingredients: string[];
  instructions: string[];
  image: File | null;
};
export const AddRecipePage: FC = () => {
  const [category, setCategory] = useState<Category>({
    title: '',
    mealTime: 'breakfast',
    cookingTime: 10,
    difficultyLevel: 'EASY',
    ingredients: [],
    instructions: [],
    image: null,
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setCategory({ ...category, image: event.target.files[0] });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', category.title);
    formDataToSend.append('mealTime', category.mealTime);
    formDataToSend.append('cookingTime', category.cookingTime.toString());
    formDataToSend.append('difficultyLevel', category.difficultyLevel);
    formDataToSend.append('ingredients', JSON.stringify(category.ingredients));
    formDataToSend.append(
      'instructions',
      JSON.stringify(category.instructions)
    );
    console.log(category.image);
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
