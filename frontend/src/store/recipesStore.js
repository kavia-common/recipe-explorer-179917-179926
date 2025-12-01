import React, { createContext } from 'react';

// PUBLIC_INTERFACE
export const RecipesContext = createContext({
  state: {},
  dispatch: () => {},
});

/**
 * PUBLIC_INTERFACE
 * Initial state for recipes store, including theme, filters and reference data.
 */
export const initialState = {
  theme: 'light',
  categories: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Vegan', 'Vegetarian'],
  diets: ['Vegan', 'Vegetarian', 'Keto', 'Paleo', 'Gluten-Free'],
  filters: {
    category: '',
    diet: '',
    q: '',
    page: 1,
    pageSize: 9,
  },
  list: {
    items: [],
    total: 0,
    loading: false,
    error: null,
  },
  detail: {
    item: null,
    loading: false,
    error: null,
  },
};

// Actions
const types = {
  SET_THEME: 'SET_THEME',
  SET_FILTERS: 'SET_FILTERS',
  LOAD_LIST: 'LOAD_LIST',
  LOAD_LIST_SUCCESS: 'LOAD_LIST_SUCCESS',
  LOAD_LIST_ERROR: 'LOAD_LIST_ERROR',
  LOAD_DETAIL: 'LOAD_DETAIL',
  LOAD_DETAIL_SUCCESS: 'LOAD_DETAIL_SUCCESS',
  LOAD_DETAIL_ERROR: 'LOAD_DETAIL_ERROR',
};

// PUBLIC_INTERFACE
export const actions = {
  setTheme: (theme) => ({ type: types.SET_THEME, payload: theme }),
  setFilters: (patch) => ({ type: types.SET_FILTERS, payload: patch }),
  loadList: () => ({ type: types.LOAD_LIST }),
  loadListSuccess: (data) => ({ type: types.LOAD_LIST_SUCCESS, payload: data }),
  loadListError: (err) => ({ type: types.LOAD_LIST_ERROR, payload: err }),
  loadDetail: () => ({ type: types.LOAD_DETAIL }),
  loadDetailSuccess: (item) => ({ type: types.LOAD_DETAIL_SUCCESS, payload: item }),
  loadDetailError: (err) => ({ type: types.LOAD_DETAIL_ERROR, payload: err }),
};

// Reducer
export function recipesReducer(state, action) {
  switch (action.type) {
    case types.SET_THEME:
      return { ...state, theme: action.payload };
    case types.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case types.LOAD_LIST:
      return { ...state, list: { ...state.list, loading: true, error: null } };
    case types.LOAD_LIST_SUCCESS:
      return {
        ...state,
        list: {
          ...state.list,
          loading: false,
          items: action.payload.items,
          total: action.payload.total ?? action.payload.items?.length ?? 0,
          error: null,
        },
      };
    case types.LOAD_LIST_ERROR:
      return { ...state, list: { ...state.list, loading: false, error: action.payload } };
    case types.LOAD_DETAIL:
      return { ...state, detail: { ...state.detail, loading: true, error: null } };
    case types.LOAD_DETAIL_SUCCESS:
      return { ...state, detail: { ...state.detail, loading: false, item: action.payload } };
    case types.LOAD_DETAIL_ERROR:
      return { ...state, detail: { ...state.detail, loading: false, error: action.payload } };
    default:
      return state;
  }
}
