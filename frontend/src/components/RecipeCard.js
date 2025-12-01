import React from 'react';
import { Link } from 'react-router-dom';
import { minutesToLabel } from '../utils/formatters';
import { ROUTES } from '../utils/constants';

// PUBLIC_INTERFACE
export default function RecipeCard({ recipe }) {
  /**
   * Card representing a recipe in the grid.
   */
  return (
    <article className="card">
      <div className="card-media" role="img" aria-label={recipe.title} />
      <div className="card-body">
        <h4 className="card-title">
          <Link to={ROUTES.detail(recipe.id)}>{recipe.title}</Link>
        </h4>
        <div className="card-meta">
          <span>⏱ {minutesToLabel(recipe.readyInMinutes || 30)}</span>
          <span>👨‍🍳 {recipe.servings || 2} servings</span>
        </div>
      </div>
    </article>
  );
}
