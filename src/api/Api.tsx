import axios from "axios";

const Api = axios.create({
  baseURL: 'https://trackers-app-76d9dc18a2c1.herokuapp.com/api/v1/',
  withCredentials: true,
});

Api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
},
(error) => Promise.reject(error));

export default Api;