const getBaseUrl = () => {
  // PUBLIC_INTERFACE
  // Resolves the API base URL from environment with sensible fallbacks.
  const primary = process.env.REACT_APP_API_BASE;
  const secondary = process.env.REACT_APP_BACKEND_URL;
  return primary || secondary || '/api';
};

// PUBLIC_INTERFACE
export async function apiGet(path, params) {
  /**
   * Performs a GET request against the API base URL.
   */
  const base = getBaseUrl();
  const url = new URL(path, base.match(/^https?:/) ? base : window.location.origin + base);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
    });
  }
  const res = await fetch(url.toString(), { headers: { Accept: 'application/json' } });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export const __internal = { getBaseUrl };
