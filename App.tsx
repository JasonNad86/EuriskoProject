import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/navigation/RootStack';
import {AuthProvider} from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
