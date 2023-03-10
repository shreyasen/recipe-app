import type { FC } from 'react';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTE_NAMES } from './RouteNames';
const LazyHome = lazy(() => import('../pages/Home'));
const LazySelectCategory = lazy(() => import('../pages/SelectCategory'));
const LazyRecipeDetail = lazy(() => import('../pages/RecipeDetail'));
const LazyAddRecipe = lazy(() => import('../pages/AddRecipe'));

const Router: FC = () => {
  return (
    <Routes>
      <Route
        path={ROUTE_NAMES.root}
        element={
          <Suspense fallback="loading">
            <LazyHome />
          </Suspense>
        }
      />
      <Route
        path={ROUTE_NAMES.selectCategory}
        element={
          <Suspense fallback="loading">
            <LazySelectCategory />
          </Suspense>
        }
      />
      <Route
        path={ROUTE_NAMES.recipeDetail + '/:id'}
        element={
          <Suspense fallback="loading">
            <LazyRecipeDetail />
          </Suspense>
        }
      />
      <Route
        path={ROUTE_NAMES.addRecipe}
        element={
          <Suspense fallback="loading">
            <LazyAddRecipe />
          </Suspense>
        }
      />
    </Routes>
  );
};
export default Router;
