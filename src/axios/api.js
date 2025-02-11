import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../config/apiConfig';

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const isUserApi = config.url.includes('/user/');  // Check if the request is for user API

    const token = isUserApi ? Cookies.get('userAuthToken') : Cookies.get('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
