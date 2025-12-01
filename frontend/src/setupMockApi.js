const mockRecipes = Array.from({ length: 27 }).map((_, i) => ({
  id: `${i + 1}`,
  title: `Sample Recipe ${i + 1}`,
  readyInMinutes: 20 + (i % 5) * 10,
  servings: 2 + (i % 3),
  summary: 'A tasty mock recipe.',
  instructions: ['Gather ingredients', 'Cook thoroughly', 'Enjoy!'],
}));

function paginate(items, page, pageSize) {
  const start = (page - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), total: items.length };
}

export function installMockApi() {
  if (typeof window === 'undefined' || window.__MOCK_API_INSTALLED__) return;
  window.__MOCK_API_INSTALLED__ = true;

  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input, init = {}) => {
    const url = typeof input === 'string' ? input : input.url;
    if (url.includes('/api/')) {
      const u = new URL(url, window.location.origin);
      const path = u.pathname.replace(/^.*\/api/, '');
      const page = parseInt(u.searchParams.get('page') || '1', 10);
      const pageSize = parseInt(u.searchParams.get('pageSize') || '9', 10);
      const q = (u.searchParams.get('q') || '').toLowerCase();

      if (path === '/recipes') {
        return new Response(JSON.stringify(paginate(mockRecipes, page, pageSize)), { headers: { 'Content-Type': 'application/json' } });
      }
      if (path === '/recipes/search') {
        const filtered = q ? mockRecipes.filter(r => r.title.toLowerCase().includes(q)) : mockRecipes;
        return new Response(JSON.stringify(paginate(filtered, page, pageSize)), { headers: { 'Content-Type': 'application/json' } });
      }
      if (path.startsWith('/recipes/')) {
        const id = path.split('/').pop();
        const item = mockRecipes.find(r => r.id === id);
        if (item) {
          return new Response(JSON.stringify(item), { headers: { 'Content-Type': 'application/json' } });
        }
        return new Response('Not found', { status: 404 });
      }
      if (path === '/reference/categories') {
        return new Response(JSON.stringify({ items: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Vegan', 'Vegetarian'] }), { headers: { 'Content-Type': 'application/json' } });
      }
      if (path === '/reference/diets') {
        return new Response(JSON.stringify({ items: ['Vegan', 'Vegetarian', 'Keto', 'Paleo', 'Gluten-Free'] }), { headers: { 'Content-Type': 'application/json' } });
      }
    }
    return originalFetch(input, init);
  };
}
