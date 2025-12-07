const BASE = 'http://localhost:3030';

const getStoredToken = () => localStorage.getItem('token') || '';

export async function api(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const t = token ?? getStoredToken();
  if (t) headers.Authorization = `Bearer ${t}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let payload;
  try {
    payload = await res.json();
  } catch {
    payload = await res.text();
  }

  if (!res.ok) {
    const msg =
      payload && payload.error
        ? payload.error
        : typeof payload === 'string'
        ? payload
        : res.statusText;
    throw new Error(msg);
  }

  return payload;
}