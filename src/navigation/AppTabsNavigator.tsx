import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TasksStackNavigator from './TasksStackNavigator';
import HelpScreen from '../features/help/screens/HelpScreen';
import ProfileScreen from '../features/profile/screens/ProfileScreen';

export type AppTabsParamList = {
  TasksTab: undefined;
  Help: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<AppTabsParamList>();

export default function AppTabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TasksTab"
        component={TasksStackNavigator}
        options={{
          title: 'Zadania',
          headerShown: false, // header zapewnia TasksStack
        }}
      />
      <Tab.Screen
        name="Help"
        component={HelpScreen}
        options={{ title: 'Help' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profil' }}
      />
    </Tab.Navigator>
  );
}
