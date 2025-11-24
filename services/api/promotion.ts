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

export const createPromotion = async (data: any) => {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('description', data.description || '');
  formData.append('winners_quantity', String(data.winners_quantity));
  formData.append('start_date', data.start_date.toISOString());
  formData.append('end_date', data.end_date.toISOString());
  formData.append('created_by_user', String(data.created_by_user));

  if (data.banner instanceof File) {
    formData.append('banner', data.banner);
  }

  if (data.terms instanceof File) {
    formData.append('terms', data.terms);
  }

  // DEBUG (pode remover depois)
  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  const response = await axios.post('/promotion/created-promotion/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
