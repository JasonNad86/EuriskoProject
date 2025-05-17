import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/navigation/RootStack';
import {AuthProvider} from './src/context/AuthContext';
import {ThemeProvider} from './src/context/ThemeContext';
import Toast from 'react-native-toast-message';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/lib/queryClient';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <RootStack />
          <Toast />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
