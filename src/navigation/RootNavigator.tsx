import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

import { useAuth } from '../features/auth/context/AuthProvider';
import { TasksProvider } from '../features/tasks/context/TasksContext';
import AuthStackNavigator from './AuthStackNavigator';
import AppTabsNavigator from './AppTabsNavigator';

export default function RootNavigator() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text>Ładowanie aplikacji</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        <TasksProvider>
          <AppTabsNavigator />
        </TasksProvider>
      ) : (
        <AuthStackNavigator />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});