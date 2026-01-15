import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

import { useTasks } from '../hooks/useTasks';
import TodoInput from '../components/TodoInput';
import TodoItem from '../components/TodoItem';
import { colors } from '../theme/colors';

export default function HomeScreen() {
  const [userId, setUserId] = useState<string | null>(null);

  // 👤 Obserwujemy zalogowanego użytkownika
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUserId(user ? user.uid : null);
    });
    return unsubscribe;
  }, []);

  // 🔹 Hook zarządzający wszystkimi zadaniami
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    editingTaskId,
    editingTaskText,
    startEditing,
    saveEditedTask,
    cancelEditing,
    setEditingTaskText,
  } = useTasks(userId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Co zamierzasz dzisiaj zrealizować?
      </Text>

      {/* Input zadania */}
      <TodoInput onSubmit={addTask} />

      {/* Lista zadań */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Brak zadań</Text>
        }
        renderItem={({ item }) => (
          <TodoItem
            task={item}
            editingTaskId={editingTaskId}
            editingTaskText={editingTaskText}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={startEditing}
            onChangeText={setEditingTaskText}
            onSaveEdit={saveEditedTask}
            onCancelEdit={cancelEditing}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16, // px-4
    paddingTop: 80,        // pt-20
    backgroundColor: colors.item.background,
  },

  title: {
    fontSize: 20,           // text-xl
    fontWeight: '700',      // font-bold
    marginBottom: 16,       // mb-4
    textAlign: 'center',
    color: colors.text.primary,
  },

  emptyText: {
    textAlign: 'center',
    color: colors.text.primary,
    marginTop: 20,
  },
});