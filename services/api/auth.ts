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

export async function deleteUser(userId: string) {
  const response = await axios.delete(`/auth/users/${userId}`);
  return response.data;
}

export async function editUser<T>(userId: string, data: T) {
  const response = await axios.put(`/auth/users/${userId}`, data);
  return response.data;
}
export async function createUser<T>(data: T) {
  const response = await axios.post('/auth/users', data);
  return response.data;
}
