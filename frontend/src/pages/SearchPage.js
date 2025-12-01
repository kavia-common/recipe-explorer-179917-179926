import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useLocation, useNavigate } from 'react-router-dom';
import { RecipesContext, actions } from '../store/recipesStore';
import { searchRecipes } from '../services/recipesApi';
import RecipeGrid from '../components/RecipeGrid';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import Paginator from '../components/Paginator';

// PUBLIC_INTERFACE
export default function SearchPage() {
  /**
   * Search page synchronizes q/category/diet/page with the URL.
   * Debounced query changes trigger API calls.
   */
  const { state, dispatch } = useContext(RecipesContext);
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);

  const [q, setQ] = useState(urlParams.get('q') || '');
  const [debouncedQ] = useDebounce(q, 350);

  const category = urlParams.get('category') || '';
  const diet = urlParams.get('diet') || '';
  const page = useMemo(() => parseInt(urlParams.get('page') || '1', 10), [location.search]);
  const pageSize = state.filters.pageSize;

  useEffect(() => {
    // Sync local input with URL q
    setQ(urlParams.get('q') || '');
    // Sync filters in store
    dispatch(actions.setFilters({ q: urlParams.get('q') || '', category, diet, page }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    let active = true;
    dispatch(actions.loadList());
    searchRecipes({ q: debouncedQ, page, pageSize, category, diet })
      .then((data) => { if (active) dispatch(actions.loadListSuccess(data)); })
      .catch((err) => { if (active) dispatch(actions.loadListError(err.message)); });
    return () => { active = false; };
  }, [debouncedQ, page, pageSize, category, diet, dispatch]);

  const onInputChange = (val) => {
    setQ(val);
    const next = new URLSearchParams(location.search);
    if (val) next.set('q', val); else next.delete('q');
    next.delete('page');
    navigate({ pathname: '/search', search: next.toString() }, { replace: false });
  };

  const onPageChange = (next) => {
    const sp = new URLSearchParams(location.search);
    sp.set('page', String(Math.max(1, next)));
    navigate({ pathname: '/search', search: sp.toString() });
  };

  if (state.list.loading) return <Loader label="Searching recipes..." />;
  if (state.list.error) return <ErrorState message={state.list.error} />;

  return (
    <div className="content">
      <div className="searchbar" role="search" aria-label="Inline search">
        <input
          className="input"
          type="search"
          placeholder="Type to filter search results..."
          value={q}
          onChange={(e) => onInputChange(e.target.value)}
        />
      </div>
      <RecipeGrid items={state.list.items} />
      <Paginator
        page={page}
        pageSize={pageSize}
        total={state.list.total}
        onPageChange={onPageChange}
      />
    </div>
  );
}
