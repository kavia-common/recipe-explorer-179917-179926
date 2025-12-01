import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RecipesContext, actions } from '../store/recipesStore';
import { ROUTES } from '../utils/constants';

// PUBLIC_INTERFACE
export default function Header() {
  /**
   * Header with brand, search input, and theme toggle.
   * Search submits to /search with q param while retaining current filter params.
   */
  const { state, dispatch } = useContext(RecipesContext);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [q, setQ] = useState(params.get('q') || '');

  useEffect(() => {
    setQ(params.get('q') || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const onSubmit = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(location.search);
    if (q) next.set('q', q);
    else next.delete('q');
    next.delete('page'); // reset to first page
    navigate(`${ROUTES.search}?${next.toString()}`);
  };

  const themeLabel = useMemo(() => (state.theme === 'light' ? 'Dark' : 'Light'), [state.theme]);

  return (
    <header className="app-header">
      <div className="header-inner">
        <a className="brand" href={ROUTES.home} aria-label="Recipe Explorer Home">
          <div className="brand-logo" aria-hidden />
          <div className="brand-title">Recipe Explorer</div>
        </a>
        <form className="searchbar" role="search" onSubmit={onSubmit}>
          <input
            className="input"
            type="search"
            placeholder="Search recipes..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search recipes"
          />
          <button className="btn" type="submit">Search</button>
        </form>
        <button
          className="icon-btn"
          onClick={() => dispatch(actions.setTheme(state.theme === 'light' ? 'dark' : 'light'))}
          aria-label={`Switch to ${themeLabel} theme`}
          title={`Switch to ${themeLabel} theme`}
        >
          {state.theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  );
}
