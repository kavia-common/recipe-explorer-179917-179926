import React from 'react';

// PUBLIC_INTERFACE
export default function Paginator({ page, pageSize, total, onPageChange }) {
  /**
   * Simple paginator with previous/next.
   */
  const totalPages = Math.max(1, Math.ceil((total || 0) / (pageSize || 9)));
  return (
    <div className="paginator">
      <button className="page-btn" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
        ← Prev
      </button>
      <span style={{ color: 'var(--muted)' }}>
        Page {page} / {totalPages}
      </span>
      <button className="page-btn" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
        Next →
      </button>
    </div>
  );
}
