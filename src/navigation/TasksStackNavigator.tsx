import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TasksProvider } from '../features/tasks/context/TasksContext';

import TasksListScreen from '../features/tasks/screens/TasksListScreen';
import TaskFormScreen from '../features/tasks/screens/TaskFormScreen';



const Stack = createNativeStackNavigator<TasksStackParamList>();
export type TasksStackParamList = {
  TasksList: undefined;
  TaskForm: { taskId?: string } | undefined;
};
export default function TasksStackNavigator() {
  return (
    <TasksProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="TasksList"
          component={TasksListScreen}
          options={{ title: 'Zadania' }}
        />

        <Stack.Screen
          name="TaskForm"
          component={TaskFormScreen}
          options={{ title: 'Dodaj / Edytuj zadanie' }}
        />
      </Stack.Navigator>
    </TasksProvider>
  );
}