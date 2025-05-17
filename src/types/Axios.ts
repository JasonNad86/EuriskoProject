import { InternalAxiosRequestConfig } from "axios";

export interface AuthAxiosRequestConfig extends InternalAxiosRequestConfig {
  isAuth?: boolean;
}