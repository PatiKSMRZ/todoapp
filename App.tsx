import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import { colors } from './src/theme/colors';

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.item.background }}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.item.background} />
        <HomeScreen />
      </SafeAreaView>
    </NavigationContainer>
  );
}