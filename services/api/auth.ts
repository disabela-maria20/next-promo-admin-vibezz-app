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

export async function postLogin(data: { email: string; password: string }) {
  const response = await axios.post('/auth/login', {
    email: data.email,
    password: data.password,
  });
  return response.data;
}

export async function getListUsers() {
  const response = await axios.get('/auth/created-users');
  return response.data;
}
