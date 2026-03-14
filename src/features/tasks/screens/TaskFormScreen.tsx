import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { TasksStackParamList } from '../../../navigation/TasksStackNavigator';
import { useTasks } from '../context/TasksContext.tsx';

type TaskFormRouteProp = RouteProp<TasksStackParamList, 'TaskForm'>;
type TaskFormNavigationProp = NativeStackNavigationProp<
  TasksStackParamList,
  'TaskForm'
>;

export default function TaskFormScreen() {
  const navigation = useNavigation<TaskFormNavigationProp>();
  const route = useRoute<TaskFormRouteProp>();
  const { getTaskById, createTask, updateTask } = useTasks();

  const taskId = route.params?.taskId;
  const isEditing = Boolean(taskId);

  const existingTask = useMemo(() => {
    if (!taskId) return undefined;
    return getTaskById(taskId);
  }, [getTaskById, taskId]);

  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setNotes(existingTask.notes);
      return;
    }

    setTitle('');
    setNotes('');
  }, [existingTask]);

  const handleSave = () => {
    const trimmedTitle = title.trim();
    const trimmedNotes = notes.trim();

    if (!trimmedTitle) {
      Alert.alert('Błąd', 'Tytuł nie może być pusty.');
      return;
    }

    if (isEditing) {
      if (!existingTask) {
        Alert.alert('Błąd', 'Nie znaleziono zadania do edycji.');
        return;
      }

      updateTask({
        id: existingTask.id,
        title: trimmedTitle,
        notes: trimmedNotes,
      });
    } else {
      createTask({
        title: trimmedTitle,
        notes: trimmedNotes,
      });
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Tytuł</Text>
        <TextInput
          placeholder="Np. Zrobić zakupy"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Notatka (opcjonalnie)</Text>
        <TextInput
          placeholder="Dodatkowe informacje…"
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
        />
      </View>

      <Pressable onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>
          {isEditing ? 'Zapisz zmiany' : 'Zapisz'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  saveButton: {
    marginTop: 'auto',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});