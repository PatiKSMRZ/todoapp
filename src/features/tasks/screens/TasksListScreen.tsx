import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { TasksStackParamList } from '../../../navigation/TasksStackNavigator';
import type { Task } from '../types/task.types';

import TaskListItem from '../components/TaskListItem';
import TasksEmptyState from '../components/TasksEmptyState';
import TasksToolbar from '../components/TasksToolbar';

import {
  getFilterLabel,
  getSortLabel,
  getEmptyMessage,
} from '../utils/task.helpers';

import { useTasksList } from '../hooks/useTasksList';

type TasksListNavigationProp = NativeStackNavigationProp<
  TasksStackParamList,
  'TasksList'
>;

export default function TasksListScreen() {
  const navigation = useNavigation<TasksListNavigationProp>();

  const {
    visibleTasks,
    filter,
    sortBy,
    changeFilter,
    changeSort,
    deleteTask,
    toggleTaskDone,
    isSaving,
    isLoading,
    error,
  } = useTasksList();

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      Alert.alert('Usunąć zadanie?', 'Tej operacji nie da się cofnąć.', [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Usuń',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteTask(taskId);
            } catch (unknownError) {
              console.error(unknownError);
            }
          },
        },
      ]);
    },
    [deleteTask]
  );

  const handleToggleTaskDone = useCallback(
    async (taskId: string) => {
      try {
        await toggleTaskDone(taskId);
      } catch (unknownError) {
        console.error(unknownError);
      }
    },
    [toggleTaskDone]
  );

  const handleAddTask = useCallback(() => {
    navigation.navigate('TaskForm');
  }, [navigation]);

  const handleEditTask = useCallback(
    (task: Task) => {
      navigation.navigate('TaskForm', { taskId: task.id });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }: { item: Task }) => (
      <TaskListItem
        task={item}
        isSaving={isSaving}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onToggleDone={handleToggleTaskDone}
      />
    ),
    [handleDeleteTask, handleEditTask, handleToggleTaskDone, isSaving]
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text style={styles.loadingText}>Ładowanie zadań...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Zadania</Text>

        <Pressable
          onPress={handleAddTask}
          style={[styles.addButton, isSaving && styles.addButtonDisabled]}
          disabled={isSaving}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      <TasksToolbar
        filterLabel={getFilterLabel(filter)}
        sortLabel={getSortLabel(sortBy)}
        onChangeFilter={changeFilter}
        onChangeSort={changeSort}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <FlatList
        data={visibleTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <TasksEmptyState message={getEmptyMessage(filter)} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },

  loadingText: {
    fontSize: 14,
    opacity: 0.7,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },

  addButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonDisabled: {
    opacity: 0.5,
  },

  addButtonText: {
    fontSize: 22,
    fontWeight: '700',
  },

  errorText: {
    marginBottom: 12,
    fontSize: 14,
    color: 'red',
  },

  listContent: {
    paddingBottom: 24,
    flexGrow: 1,
  },
});