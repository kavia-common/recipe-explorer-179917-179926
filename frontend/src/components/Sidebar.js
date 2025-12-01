import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RecipesContext, actions } from '../store/recipesStore';

// PUBLIC_INTERFACE
export default function Sidebar() {
  /**
   * Sidebar exposes category and diet filters synced with URL parameters.
   */
  const { state, dispatch } = useContext(RecipesContext);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [category, setCategory] = useState(params.get('category') || '');
  const [diet, setDiet] = useState(params.get('diet') || '');

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setCategory(p.get('category') || '');
    setDiet(p.get('diet') || '');
  }, [location.search]);

  useEffect(() => {
    dispatch(actions.setFilters({ category, diet }));
  }, [category, diet, dispatch]);

  const apply = () => {
    const next = new URLSearchParams(location.search);
    if (category) next.set('category', category); else next.delete('category');
    if (diet) next.set('diet', diet); else next.delete('diet');
    next.delete('page');
    navigate({ pathname: location.pathname, search: next.toString() });
  };

  const clear = () => {
    setCategory('');
    setDiet('');
    const next = new URLSearchParams(location.search);
    next.delete('category'); next.delete('diet'); next.delete('page');
    navigate({ pathname: location.pathname, search: next.toString() });
  };

  const cats = useMemo(() => state.categories || [], [state.categories]);
  const diets = useMemo(() => state.diets || [], [state.diets]);

  return (
    <aside className="sidebar" aria-label="Filters">
      <div className="filter-group">
        <h3>Category</h3>
        <select
          className="input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="">All</option>
          {cats.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="filter-group">
        <h3>Diet</h3>
        <select
          className="input"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
          aria-label="Filter by diet"
        >
          <option value="">All</option>
          {diets.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button className="btn" onClick={apply}>Apply</button>
        <button className="icon-btn" onClick={clear} type="button">Clear</button>
      </div>
    </aside>
  );
}
