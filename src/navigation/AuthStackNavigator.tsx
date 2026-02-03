import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStartScreen from '../features/auth/screens/AuthStartScreen';
import LoginScreen from '../features/auth/screens/LoginScreen';
import RegisterScreen from '../features/auth/screens/RegisterScreen';

export type AuthStackParamList = {
  AuthStart: undefined;
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="AuthStart">
      <Stack.Screen
        name="AuthStart"
        component={AuthStartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Logowanie' }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: 'Rejestracja' }}
      />
    </Stack.Navigator>
  );
}
