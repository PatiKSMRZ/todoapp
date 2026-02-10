import React from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { TasksStackParamList } from '../../../navigation/TasksStackNavigator';

type UiTask = {
  id: string;
  title: string;
  done: boolean;
};

const MOCK_TASKS: UiTask[] = [
  { id: '1', title: 'Kupić mleko', done: false },
  { id: '2', title: 'Zrobić 15 min angielskiego', done: true },
  { id: '3', title: 'Umyć auto', done: false },
];

export default function TasksListScreen() {

 const navigation =
    useNavigation<NativeStackNavigationProp<TasksStackParamList>>();

  const [tasks, setTasks] = useState<UiTask[]>(MOCK_TASKS);
  

  const deleteTask = (taskId: string) => {
    Alert.alert('Usunąć zadanie?', 'Tej operacji nie da się cofnąć.', [
      { text: 'Anuluj', style: 'cancel' },
      {
        text: 'Usuń',
        style: 'destructive',
        onPress: () =>  setTasks((prev: UiTask[]) => prev.filter((t) => t.id !== taskId)),
      },
    ]);
  };

  const renderItem = ({ item }: { item: UiTask }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('TaskForm' ,{ taskId: item.id})}
        style={styles.taskItem}
      >
        <View style={styles.taskLeft}>
          <View style={styles.checkbox}>
            {item.done && <Text style={styles.checkmark}>✓</Text>}
          </View>

          <Text
            style={[
              styles.taskTitle,
              item.done && styles.taskTitleDone,
            ]}
          >
            {item.title}
          </Text>
        </View>

        <Pressable
        onPress={(e) => {
          e.stopPropagation();
          deleteTask(item.id);
        }}
          hitSlop={10}
          style={styles.deleteButton}
        >
          <Text>Usuń</Text>
        </Pressable>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Zadania</Text>

        <Pressable
          onPress={() => navigation.navigate('TaskForm')}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      {/* Toolbar */}
      <View style={styles.toolbar}>
        <Pressable
          onPress={() => {}}
          style={styles.toolbarButton}
        >
          <Text>Filtr: Wszystkie</Text>
        </Pressable>

        <Pressable
          onPress={() => {}}
          style={styles.toolbarButton}
        >
          <Text>Sort: Najnowsze</Text>
        </Pressable>
      </View>

      {/* List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Brak zadań — dodaj pierwsze!
            </Text>
          </View>
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

  /* Header */
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
  addButtonText: {
    fontSize: 22,
    fontWeight: '700',
  },

  /* Toolbar */
  toolbar: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  toolbarButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
  },

  /* Task item */
  taskItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 14,
  },
  taskTitle: {
    fontSize: 16,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
  },

  /* Empty state */
  emptyState: {
    paddingTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.7,
  },
});
