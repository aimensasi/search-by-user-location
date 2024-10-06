import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:9000',
  withCredentials: true,
});

export const register = async (username: string, password: string) => {
  return api.post(`/auth/register`, { username, password });
};

export const login = async (username: string, password: string) => {
  return await api.post(`/auth/login`, { username, password });
};

export const logout = async () => {
  await api.delete(`/auth/logout`);
};
