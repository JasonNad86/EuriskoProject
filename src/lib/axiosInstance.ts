import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosError} from 'axios';
import {useAuthStore} from '../store/AuthStore';
import {Alert} from 'react-native';

const axiosInstance = axios.create({
  baseURL: 'https://backend-practice.eurisko.me/api',
  timeout: 10000,
});

axiosInstance.interceptors.request.use(async config => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error?.response?.status === 401) {
      Alert.alert('Error: Unauthorized — you may need to refresh the token.');
      // TODO: trigger refreshToken flow or redirect to login
    } else if (error?.response?.status === 403) {
      Alert.alert('Please verify your email first');
    }
    return Promise.reject(error);
  },
);

export {axiosInstance};
