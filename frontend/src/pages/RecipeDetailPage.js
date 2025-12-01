import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RecipesContext, actions } from '../store/recipesStore';
import { getRecipe } from '../services/recipesApi';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import { minutesToLabel } from '../utils/formatters';

// PUBLIC_INTERFACE
export default function RecipeDetailPage() {
  /**
   * Detail page for a single recipe.
   */
  const { id } = useParams();
  const { state, dispatch } = useContext(RecipesContext);

  useEffect(() => {
    let active = true;
    dispatch(actions.loadDetail());
    getRecipe(id)
      .then((data) => { if (active) dispatch(actions.loadDetailSuccess(data)); })
      .catch((err) => { if (active) dispatch(actions.loadDetailError(err.message)); });
    return () => { active = false; };
  }, [id, dispatch]);

  if (state.detail.loading) return <Loader label="Loading recipe..." />;
  if (state.detail.error) return <ErrorState message={state.detail.error} />;
  if (!state.detail.item) return null;

  const r = state.detail.item;

  return (
    <article className="detail">
      <div className="detail-cover" role="img" aria-label={r.title} />
      <h2>{r.title}</h2>
      <div style={{ color: 'var(--muted)' }}>
        ⏱ {minutesToLabel(r.readyInMinutes || 30)} · 👨‍🍳 {r.servings || 2} servings
      </div>
      <section>
        <h3>Summary</h3>
        <p>{r.summary || 'A delicious recipe to try!'}</p>
      </section>
      <section>
        <h3>Instructions</h3>
        <ol>
          {(r.instructions || ['Prepare ingredients', 'Cook and serve']).map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>
    </article>
  );
}
