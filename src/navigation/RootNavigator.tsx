import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useAuth } from '../features/auth/context/AuthProvider';
import AuthStackNavigator from './AuthStackNavigator';
import AppTabsNavigator from './AppTabsNavigator';


export default function RootNavigator() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={styles.x}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <AppTabsNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  x: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})