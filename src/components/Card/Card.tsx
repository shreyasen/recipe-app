import { Link } from 'react-router-dom';
import { Category } from '../../pages/SelectCategory/SelectCategoryPage';

type CategoryProp = {
  category: Category;
  index: number;
};
export const Card = ({ category, index }: CategoryProp) => {
  return (
    <div className="category-card" key={index}>
      <h3>{category.title}</h3>
      <p>Suitable for: {category.mealTime}</p>
      <p>Cooking Time: {category.cookingTime}</p>
      <Link to={`/recipe/${category.id}`}>See more...</Link>
    </div>
  );
};
