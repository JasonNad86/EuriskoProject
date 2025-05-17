import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import { RootStackParams } from '../types/NavigationStack';
import { useAuthStore } from '../store/AuthStore';

const Stack = createNativeStackNavigator<RootStackParams>();

const RootStack = () => {
  const { accessToken } = useAuthStore();
  const isUserLoggedIn = !! accessToken;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isUserLoggedIn ? (
        <Stack.Screen name="Main" component={MainStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};


export default RootStack;
