import { apiGet } from './apiClient';

// PUBLIC_INTERFACE
export async function listRecipes({ page = 1, pageSize = 9, category = '', diet = '' } = {}) {
  return apiGet('/recipes', { page, pageSize, category, diet });
}

// PUBLIC_INTERFACE
export async function getRecipe(id) {
  return apiGet(`/recipes/${id}`);
}

// PUBLIC_INTERFACE
export async function searchRecipes({ q = '', page = 1, pageSize = 9, category = '', diet = '' } = {}) {
  return apiGet('/recipes/search', { q, page, pageSize, category, diet });
}

// PUBLIC_INTERFACE
export async function listCategories() {
  return apiGet('/reference/categories').catch(() => ({
    items: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Vegan', 'Vegetarian'],
  }));
}

// PUBLIC_INTERFACE
export async function listDiets() {
  return apiGet('/reference/diets').catch(() => ({
    items: ['Vegan', 'Vegetarian', 'Keto', 'Paleo', 'Gluten-Free'],
  }));
}
