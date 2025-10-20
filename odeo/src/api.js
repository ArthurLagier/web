const BASE = 'http://localhost:9090'; // <— au lieu de '/api'

export async function api(
  path,
  { method = 'GET', body, token } = {}
) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  // tente JSON puis repli en texte
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