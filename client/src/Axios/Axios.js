import axios from 'axios';

export const axiosUserInstance = axios.create({
  baseURL: '/api',
});

export const axiosExpertInstance = axios.create({
  baseURL: '/expert/api',
});

export const axiosAdminInstance = axios.create({
  baseURL: '/admin/api',
});
