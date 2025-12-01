import React from 'react';

// PUBLIC_INTERFACE
export default function Loader({ label = 'Loading...' }) {
  return <div className="loader" role="status" aria-live="polite">{label}</div>;
}
