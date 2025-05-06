import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/navigation/RootStack';
import {AuthProvider} from './src/context/AuthContext';
import {ThemeProvider} from './src/context/ThemeContext';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <NavigationContainer>
          <RootStack />
          <Toast />
        </NavigationContainer>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
