import React, { useMemo, useState } from 'react';
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
  createdAt: number;
};

type FilterType = 'all' | 'active' | 'completed';
type SortType = 'newest' | 'oldest' | 'alphabetical';

const MOCK_TASKS: UiTask[] = [
  {
    id: '1',
    title: 'Kupić mleko',
    done: false,
    createdAt: 1710000000000,
  },
  {
    id: '2',
    title: 'Zrobić 15 min angielskiego',
    done: true,
    createdAt: 1710001000000,
  },
  {
    id: '3',
    title: 'Umyć auto',
    done: false,
    createdAt: 1710002000000,
  },
];

export default function TasksListScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<TasksStackParamList>>();

  const [tasks, setTasks] = useState<UiTask[]>(MOCK_TASKS);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('newest');

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

  const handleDeleteTask = (taskId: string) => {
    Alert.alert('Usunąć zadanie?', 'Tej operacji nie da się cofnąć.', [
      { text: 'Anuluj', style: 'cancel' },
      {
        text: 'Usuń',
        style: 'destructive',
        onPress: () => {
          setTasks((prev) => prev.filter((task) => task.id !== taskId));
        },
      },
    ]);
  };

  const handleToggleTaskDone = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleAddTask = () => {
    navigation.navigate('TaskForm');
  };

  const handleEditTask = (taskId: string) => {
    navigation.navigate('TaskForm', { taskId });
  };

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

  const getFilterLabel = () => {
    if (filter === 'all') return 'Filtr: Wszystkie';
    if (filter === 'active') return 'Filtr: Aktywne';
    return 'Filtr: Ukończone';
  };

  const getSortLabel = () => {
    if (sortBy === 'newest') return 'Sort: Najnowsze';
    if (sortBy === 'oldest') return 'Sort: Najstarsze';
    return 'Sort: A-Z';
  };

  const getEmptyMessage = () => {
    if (filter === 'active') return 'Brak aktywnych zadań.';
    if (filter === 'completed') return 'Brak ukończonych zadań.';
    return 'Brak zadań — dodaj pierwsze!';
  };

  const renderItem = ({ item }: { item: UiTask }) => {
    return (
      <Pressable
        onPress={() => handleEditTask(item.id)}
        style={styles.taskItem}
      >
        <View style={styles.taskLeft}>
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              handleToggleTaskDone(item.id);
            }}
            hitSlop={10}
            style={styles.checkbox}
          >
            {item.done && <Text style={styles.checkmark}>✓</Text>}
          </Pressable>

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.taskTitle, item.done && styles.taskTitleDone]}
          >
            {item.title}
          </Text>
        </View>

        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            handleDeleteTask(item.id);
          }}
          hitSlop={10}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteButtonText}>Usuń</Text>
        </Pressable>
      </Pressable>
    );
  };

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
          <Text style={styles.toolbarButtonText}>{getFilterLabel()}</Text>
        </Pressable>

        <Pressable onPress={handleChangeSort} style={styles.toolbarButton}>
          <Text style={styles.toolbarButtonText}>{getSortLabel()}</Text>
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
            <Text style={styles.emptyText}>{getEmptyMessage()}</Text>
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