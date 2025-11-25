import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    token: process.env.API_TOKEN,
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const buildFormData = (payload: Record<string, any>): FormData => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    if (value instanceof Date) {
      formData.append(key, value.toISOString());
      return;
    }

    formData.append(key, String(value));
  });

  return formData;
};
