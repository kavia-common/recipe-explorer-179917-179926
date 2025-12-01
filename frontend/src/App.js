import React, { useEffect, useMemo, useReducer } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { RecipesContext, recipesReducer, initialState } from './store/recipesStore';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

// PUBLIC_INTERFACE
function App() {
  const [state, dispatch] = useReducer(recipesReducer, initialState);

  // theme sync to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  const store = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <RecipesContext.Provider value={store}>
      <BrowserRouter>
        <div className="app-root">
          <Header />
          <div className="app-body">
            <Sidebar />
            <main className="content" role="main" aria-label="Main content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/recipes/:id" element={<RecipeDetailPage />} />
                <Route path="*" element={
                  <div className="empty-state">
                    <h3>Page not found</h3>
                    <p>Return to <Link to="/">home</Link>.</p>
                  </div>
                } />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </RecipesContext.Provider>
  );
}

export default App;
