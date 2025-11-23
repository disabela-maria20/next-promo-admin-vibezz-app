import axios from 'axios';

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.common['token'] = process.env.API_TOKEN;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export async function listPromotion() {
  const response = await axios.get('/promotion/list-promotion');
  return response.data;
}

export async function findPromotion(id: number) {
  const response = await axios.get(`/promotion/find-promotion/${id}`);
  return response.data;
}
