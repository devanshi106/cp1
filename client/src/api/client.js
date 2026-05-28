import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

// Token storage. Access token lives in memory + localStorage; refresh token in
// localStorage. (A production hardening step is httpOnly cookies; out of scope
// for the MVP.)
const store = {
  get access() {
    return localStorage.getItem('accessToken');
  },
  get refresh() {
    return localStorage.getItem('refreshToken');
  },
  set({ accessToken, refreshToken }) {
    if (accessToken) localStorage.setItem('accessToken', accessToken);
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
  },
  clear() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};

export const tokenStore = store;

export const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  const token = store.access;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On 401, try a one-shot refresh and replay the original request. Concurrent
// 401s share a single in-flight refresh.
let refreshing = null;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;

    if (status === 401 && !original?._retry && store.refresh && !original?.url?.includes('/auth/refresh')) {
      original._retry = true;
      try {
        refreshing =
          refreshing ??
          axios.post(`${BASE_URL}/auth/refresh`, { refreshToken: store.refresh });
        const { data } = await refreshing;
        refreshing = null;
        store.set(data);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch (e) {
        refreshing = null;
        store.clear();
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);
