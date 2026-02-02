import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TasksListScreen from '../features/tasks/screens/TasksListScreen';
import TaskFormScreen from '../features/tasks/screens/TaskFormScreen';

export type RootStackParamList = {
  TasksList: undefined;
  TaskForm: { taskId?: string } | undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
   <Stack.Navigator initialRouteName="TasksList">
      <Stack.Screen
        name="TasksList"
        component={TasksListScreen}
        options={{ title: 'Zadania' }}
      />
      <Stack.Screen
        name="TaskForm"
        component={TaskFormScreen}
        options={{ title: 'Dodaj / Edytuj' }}
      />
    </Stack.Navigator>
  );
}