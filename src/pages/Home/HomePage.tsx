import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_NAMES } from '../../routes/RouteNames';
import './HomePage.scss';

export const HomePage: FC = () => {
  const navigate = useNavigate();
  const getStartedHandler = (): void => {
    navigate(ROUTE_NAMES.selectCategory);
  };
  return (
    <div className="home-page-container">
      <div className="home-page-header">
        <h1 className="home-page-title">Simple and Tasty Recipes</h1>
        <p className="home-page-subtitle">
          Learn easily, make quickly, eat healthy, stay healthy
        </p>
        <button onClick={getStartedHandler} className="get-started-button">
          Get Started
        </button>
      </div>
      <div className="popular-categories"></div>
    </div>
  );
};
