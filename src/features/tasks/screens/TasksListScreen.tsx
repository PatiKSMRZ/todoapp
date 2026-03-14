import React, { useMemo, useCallback } from 'react';
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
import { useTasks } from '../context/TasksContext.tsx';
import type { Task, TaskFilter, TaskSort } from '../types/task.types';

type TasksListNavigationProp = NativeStackNavigationProp<
  TasksStackParamList,
  'TasksList'
>;

function getFilterLabel(filter: TaskFilter): string {
  if (filter === 'all') return 'Filtr: Wszystkie';
  if (filter === 'active') return 'Filtr: Aktywne';
  return 'Filtr: Ukończone';
}

function getSortLabel(sort: TaskSort): string {
  if (sort === 'newest') return 'Sort: Najnowsze';
  if (sort === 'oldest') return 'Sort: Najstarsze';
  return 'Sort: A-Z';
}

function getEmptyMessage(filter: TaskFilter): string {
  if (filter === 'active') return 'Brak aktywnych zadań.';
  if (filter === 'completed') return 'Brak ukończonych zadań.';
  return 'Brak zadań — dodaj pierwsze!';
}

type TaskListItemProps = {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleDone: (taskId: string) => void;
};

function TaskListItem({
  task,
  onEdit,
  onDelete,
  onToggleDone,
}: TaskListItemProps) {
  return (
    <Pressable onPress={() => onEdit(task)} style={styles.taskItem}>
      <View style={styles.taskLeft}>
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            onToggleDone(task.id);
          }}
          hitSlop={10}
          style={styles.checkbox}
        >
          {task.done && <Text style={styles.checkmark}>✓</Text>}
        </Pressable>

        <View style={styles.taskTextWrapper}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.taskTitle, task.done && styles.taskTitleDone]}
          >
            {task.title}
          </Text>

          {!!task.notes && (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.taskNotes}
            >
              {task.notes}
            </Text>
          )}
        </View>
      </View>

      <Pressable
        onPress={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
        hitSlop={10}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>Usuń</Text>
      </Pressable>
    </Pressable>
  );
}

export default function TasksListScreen() {
  const navigation = useNavigation<TasksListNavigationProp>();
  const { tasks, deleteTask, toggleTaskDone } = useTasks();

  const [filter, setFilter] = React.useState<TaskFilter>('all');
  const [sortBy, setSortBy] = React.useState<TaskSort>('newest');

  const visibleTasks = useMemo(() => {
    let result = [...tasks];

    if (filter === 'active') {
      result = result.filter((task) => !task.done);
    }

    if (filter === 'completed') {
      result = result.filter((task) => task.done);
    }

    if (sortBy === 'newest') {
      result.sort((a, b) => b.createdAt - a.createdAt);
    }

    if (sortBy === 'oldest') {
      result.sort((a, b) => a.createdAt - b.createdAt);
    }

    if (sortBy === 'alphabetical') {
      result.sort((a, b) => a.title.localeCompare(b.title, 'pl'));
    }

    return result;
  }, [tasks, filter, sortBy]);

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      Alert.alert('Usunąć zadanie?', 'Tej operacji nie da się cofnąć.', [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Usuń',
          style: 'destructive',
          onPress: () => deleteTask(taskId),
        },
      ]);
    },
    [deleteTask]
  );

  const handleToggleTaskDone = useCallback(
    (taskId: string) => {
      toggleTaskDone(taskId);
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

  const handleChangeFilter = () => {
    setFilter((prev) => {
      if (prev === 'all') return 'active';
      if (prev === 'active') return 'completed';
      return 'all';
    });
  };

  const handleChangeSort = () => {
    setSortBy((prev) => {
      if (prev === 'newest') return 'oldest';
      if (prev === 'oldest') return 'alphabetical';
      return 'newest';
    });
  };

  const renderItem = useCallback(
    ({ item }: { item: Task }) => (
      <TaskListItem
        task={item}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onToggleDone={handleToggleTaskDone}
      />
    ),
    [handleDeleteTask, handleEditTask, handleToggleTaskDone]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Zadania</Text>

        <Pressable onPress={handleAddTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      <View style={styles.toolbar}>
        <Pressable onPress={handleChangeFilter} style={styles.toolbarButton}>
          <Text style={styles.toolbarButtonText}>{getFilterLabel(filter)}</Text>
        </Pressable>

        <Pressable onPress={handleChangeSort} style={styles.toolbarButton}>
          <Text style={styles.toolbarButtonText}>{getSortLabel(sortBy)}</Text>
        </Pressable>
      </View>

      <FlatList
        data={visibleTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>{getEmptyMessage(filter)}</Text>
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

  toolbar: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  toolbarButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  toolbarButtonText: {
    textAlign: 'center',
  },

  listContent: {
    paddingBottom: 24,
    flexGrow: 1,
  },

  taskItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  taskTextWrapper: {
    flex: 1,
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
    flexShrink: 1,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  taskNotes: {
    marginTop: 2,
    fontSize: 13,
    opacity: 0.7,
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  deleteButtonText: {
    fontSize: 14,
  },

  emptyState: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
});
