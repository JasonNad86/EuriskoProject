import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import { useAuth } from '../context/AuthContext';
import { RootStackParams } from '../types/NavigationStack';

const Stack = createNativeStackNavigator<RootStackParams>();

const RootStack = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};


export default RootStack;
