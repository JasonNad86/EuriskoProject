import { user } from "../constants/constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadAuthState = async () => {
      const savedAuth = await AsyncStorage.getItem('auth');
      setIsAuthenticated(savedAuth === 'true');
    };
    loadAuthState();
  }, []);

  const login =  (email: string, password: string) => {
    return email === user.email && password === user.password; 
  };

  const verifyOtp = async (otp: string) => {
    if (otp === '0000') {
      await AsyncStorage.setItem('auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('auth');
      setIsAuthenticated(false);
    } catch (e) {
      console.error('Logout failed', e);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};