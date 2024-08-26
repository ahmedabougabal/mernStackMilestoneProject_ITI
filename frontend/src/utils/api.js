import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5200', // Your local backend API URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;