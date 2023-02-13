import axios from 'axios';

export const axiosUserInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const axiosExpertInstance = axios.create({
  baseURL: 'http://localhost:3001/expert/api',
});

export const axiosAdminInstance = axios.create({
  baseURL: 'http://localhost:3001/admin/api',
});
