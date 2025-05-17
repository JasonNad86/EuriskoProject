// src/context/AuthContext.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { userLogin } from '../lib/api/user-login';
import { verifyOtp as apiVerifyOtp } from '../lib/api/verify-otp';

interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const isAuthenticated = !!accessToken;

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) setAccessToken(token);
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await userLogin({ email, password });
      if (res?.success) {
        await AsyncStorage.setItem('pendingEmail', email);
        return true;
      }
    } catch (e) {
      console.error('Login error:', e);
    }
    return false;
  };

  const verifyOtp = async (otp: string): Promise<boolean> => {
    try {
      const email = await AsyncStorage.getItem('pendingEmail');
      if (!email) return false;

      const res = await apiVerifyOtp({ email, otp });
      if (res?.success && res.data?.accessToken) {
        await AsyncStorage.setItem('accessToken', res.data.accessToken);
        await AsyncStorage.removeItem('pendingEmail');
        setAccessToken(res.data.accessToken);
        return true;
      }
    } catch (e) {
      console.error('OTP verify failed:', e);
    }
    return false;
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['accessToken', 'pendingEmail']);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, isAuthenticated, login, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
