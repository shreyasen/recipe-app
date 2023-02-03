import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_NAMES } from '../../routes/RouteNames';
import recipe_one from '../../assets/recipe_one.jpg';
import recipe_two from '../../assets/recipe_two.jpg';
import recipe_three from '../../assets/recipe_three.jpg';
import recipe_four from '../../assets/recipe_four.jpg';
import recipe_five from '../../assets/recipe_five.jpg';
import recipe_six from '../../assets/recipe_six.jpg';
import recipe_seven from '../../assets/recipe_seven.jpg';
import recipe_eight from '../../assets/recipe_eight.jpg';
import recipe_nine from '../../assets/recipe_nine.jpg';
import './HomePage.scss';

export const HomePage: FC = () => {
  const navigate = useNavigate();
  const getStartedHandler = (): void => {
    navigate(ROUTE_NAMES.selectCategory);
  };
  return (
    <div className="home-page-container">
      <div className="home-page-header">
        <div className="left-panel">
          <h1 className="home-page-title">Simple and Tasty Recipes</h1>
          <p className="home-page-subtitle">
            Learn easily, make quickly, eat healthy, stay healthy
          </p>
          <button onClick={getStartedHandler} className="get-started-button">
            Get Started
          </button>
        </div>
        <div className="right-panel">
          <div className="row">
            <div className="column">
              <img src={recipe_one} alt="recipe" width={100} height={100} />
            </div>
            <div className="column">
              <img src={recipe_two} alt="recipe" width={120} height={120} />
              <img src={recipe_three} alt="recipe" width={120} height={120} />
            </div>
            <div className="column">
              <img src={recipe_four} alt="recipe" width={135} height={125} />
              <img src={recipe_five} alt="recipe" width={135} height={125} />
              <img src={recipe_six} alt="recipe" width={135} height={125} />
            </div>
            <div className="column">
              <img src={recipe_seven} alt="recipe" width={150} height={150} />
              <img src={recipe_eight} alt="recipe" width={150} height={150} />
              <img src={recipe_nine} alt="recipe" width={150} height={150} />
            </div>
          </div>
        </div>
      </div>
      <div className="popular-categories"></div>
    </div>
  );
};
