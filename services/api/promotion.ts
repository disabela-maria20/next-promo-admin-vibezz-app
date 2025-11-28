import axios from 'axios';
import { buildFormData } from '.';
import { PromoSchemaType } from '@/view/promocoes/promocoes.schema';

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

export async function createPromotion(payload: PromoSchemaType) {
  const formData = buildFormData(payload);
  const { data } = await axios.post('/promotion/created-promotion/', formData);
  return data;
}

export async function listFieldsPromotion() {
  const { data } = await axios.get('/promotion/list-fields-promotion/');
  return data;
}
