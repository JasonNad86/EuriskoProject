import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosError} from 'axios';
import { AuthAxiosRequestConfig } from '../types/Axios';

const axiosInstance = axios.create({
  baseURL: 'https://backend-practice.eurisko.me',
  timeout: 10000,
});

axiosInstance.interceptors.request.use(async (config: AuthAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      console.log('Error: Unauthorized — you may need to refresh the token.');
      // TODO: trigger refreshToken flow or redirect to login
    }
    return Promise.reject(error);
  },
);

export {axiosInstance};
