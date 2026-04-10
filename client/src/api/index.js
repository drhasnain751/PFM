import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

// Add token to requests
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);
export const getTransactions = () => API.get('/transactions');
export const createTransaction = (data) => API.post('/transactions', data);
export const updateProfile = (data) => API.patch('/auth/profile', data);
export const changePassword = (data) => API.post('/auth/change-password', data);
export const uploadTransactions = (formData) => API.post('/transactions/upload', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
