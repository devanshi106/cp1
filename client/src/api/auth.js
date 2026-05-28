import { api, tokenStore } from './client.js';

export async function register(payload) {
  const { data } = await api.post('/auth/register', payload);
  tokenStore.set(data);
  return data.user;
}

export async function login(payload) {
  const { data } = await api.post('/auth/login', payload);
  tokenStore.set(data);
  return data.user;
}

export async function fetchMe() {
  const { data } = await api.get('/auth/me');
  return data.user;
}

export async function logout() {
  try {
    await api.post('/auth/logout', { refreshToken: tokenStore.refresh });
  } finally {
    tokenStore.clear();
  }
}
