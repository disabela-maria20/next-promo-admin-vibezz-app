import { api } from '.';

export async function postLogin(data: { email: string; password: string }) {
  const response = await api.post('/auth/login', {
    email: data.email,
    password: data.password,
  });
  return response.data;
}

export async function getListUsers() {
  const response = await api.get('/auth/created-users');
  return response.data;
}

export async function deleteUser(userId: string) {
  const response = await api.delete(`/auth/users/${userId}`);
  return response.data;
}

export async function editUser<T>(userId: string, data: T) {
  const response = await api.put(`/auth/users/${userId}`, data);
  return response.data;
}

export async function createUser<T>(data: T) {
  const response = await api.post('/auth/register', data);
  return response.data;
}

export async function listPermissions() {
  const response = await api.get('/auth/permissions');
  return response.data;
}
