import axios from 'axios';
import Cookies from 'js-cookie';
import API_ENDPOINTS from '../constants/apiEndPoints';

const addRecipeHeader = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${Cookies.get('JWT-TOKEN')}`,
  },
};
const getHeader = {
  headers: { 'Content-type': 'application/json' },
};
const api = axios.create({
  baseURL: 'http://localhost:5000/recipe',
});

export const searchRecipe = (searchText: string) => {
  const endpoint = API_ENDPOINTS.searchRecipe.replace(
    '{searchText}',
    searchText
  );

  return api
    .get(endpoint, getHeader)
    .then((response) => response)
    .catch((error) => error);
};

export const addRecipe = (body: FormData) => {
  const endpoint = API_ENDPOINTS.addRecipe;

  return api
    .post(endpoint, body, addRecipeHeader)
    .then((response) => response)
    .catch((error) => error);
};

export const getPopularRecipes = () => {
  const endpoint = API_ENDPOINTS.popularRecipe;
  return api
    .get(endpoint)
    .then((response) => response)
    .catch((error) => {
      console.log(error.message);
      return error.response;
    });
};
