import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RecipesContext, actions } from '../store/recipesStore';
import { listRecipes } from '../services/recipesApi';
import RecipeGrid from '../components/RecipeGrid';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';

// PUBLIC_INTERFACE
export default function HomePage() {
  /**
   * Home page shows a general listing of recipes.
   */
  const { state, dispatch } = useContext(RecipesContext);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const page = parseInt(params.get('page') || '1', 10);
  const { category, diet } = state.filters;

  useEffect(() => {
    let active = true;
    dispatch(actions.loadList());
    listRecipes({ page, pageSize: state.filters.pageSize, category, diet })
      .then((data) => { if (active) dispatch(actions.loadListSuccess(data)); })
      .catch((err) => { if (active) dispatch(actions.loadListError(err.message)); });
    return () => { active = false; };
  }, [dispatch, page, state.filters.pageSize, category, diet]);

  const onPageChange = (next) => {
    const q = new URLSearchParams(location.search);
    q.set('page', String(Math.max(1, next)));
    navigate({ pathname: '/', search: q.toString() });
  };

  if (state.list.loading) return <Loader label="Loading recipes..." />;
  if (state.list.error) return <ErrorState message={state.list.error} />;

  return (
    <div className="content">
      <RecipeGrid items={state.list.items} />
      <div>
        <p style={{ color: 'var(--muted)' }}>
          Showing {state.list.items?.length || 0} of {state.list.total || state.list.items?.length || 0}
        </p>
      </div>
      {/* Paginator is shown on Search page primarily; optional here if total known */}
    </div>
  );
}
