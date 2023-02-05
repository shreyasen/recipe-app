import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import categories from '../../data/categories.json';
import './RecipeDetailPage.scss';

export const RecipeDetailPage: FC = () => {
  const { id } = useParams();
  type Recipe = {
    id: string;
    title: string;
    ingredients: string[];
    instructions: string[];
  };
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  useEffect(() => {
    categories.forEach((c) => {
      if (c.id === id) {
        setRecipe(c);
      }
    });
  }, [id]);
  return (
    <div className="recipe-detail-page-container">
      <div>
        <h1>{recipe?.title}</h1>
      </div>
      <div>
        <h2>Ingredients</h2>
        <ul>
          {recipe?.ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Instructions</h2>
        <ol>
          {recipe?.instructions.map((instruction, i) => (
            <li key={i}>{instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};
