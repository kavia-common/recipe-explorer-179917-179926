import React from 'react';
import RecipeCard from './RecipeCard';

// PUBLIC_INTERFACE
export default function RecipeGrid({ items }) {
  /**
   * Grid of recipe cards.
   */
  if (!items || items.length === 0) {
    return <div className="empty-state">No recipes found.</div>;
  }
  return (
    <section className="grid" aria-label="Recipes grid">
      {items.map((r) => <RecipeCard key={r.id} recipe={r} />)}
    </section>
  );
}
