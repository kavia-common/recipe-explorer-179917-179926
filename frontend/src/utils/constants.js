export const DEFAULT_PAGE_SIZE = 9;
export const ROUTES = {
  home: '/',
  search: '/search',
  detail: (id = ':id') => `/recipes/${id}`,
};
