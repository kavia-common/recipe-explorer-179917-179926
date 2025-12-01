import React from 'react';

// PUBLIC_INTERFACE
export default function ErrorState({ message = 'Something went wrong.' }) {
  return <div className="error-state" role="alert">⚠️ {message}</div>;
}
