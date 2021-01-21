import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 3000,
  widthCredentials: true
});

api.interceptors.request.use((request) => {
  return request;
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default api;
