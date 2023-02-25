import axios from 'axios';
import API_ENDPOINTS from '../constants/apiEndPoints';

const api = axios.create({
  baseURL: 'http://localhost:5000/recipe',
  headers: {
    'Content-type': 'application/json',
  },
});

export const searchRecipe = (searchText: string) => {
  const endpoint = API_ENDPOINTS.searchRecipe.replace(
    '{searchText}',
    searchText
  );

  return api
    .get(endpoint)
    .then((response) => response)
    .catch((error) => error);
};
