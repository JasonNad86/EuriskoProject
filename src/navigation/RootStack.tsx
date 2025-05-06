import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={isAuthenticated ? 'Main' : 'Auth'}
        component={isAuthenticated ? MainStack : AuthStack}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
