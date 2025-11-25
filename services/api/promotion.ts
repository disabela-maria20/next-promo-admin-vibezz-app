import { Promotion } from '@/types/Promotion';
import { api, buildFormData } from '.';
import { PromoSchemaType } from '@/view/promocoes/promocoes.schema';

export async function listPromotion() {
  const response = await api.get('/promotion/list-promotion');
  return response.data;
}

export async function findPromotion(id: number) {
  const response = await api.get(`/promotion/find-promotion/${id}`);
  return response.data;
}

export async function createPromotion(payload: PromoSchemaType) {
  const formData = buildFormData(payload);
  const { data } = await api.post('/promotion/created-promotion/', formData);
  return data;
}
