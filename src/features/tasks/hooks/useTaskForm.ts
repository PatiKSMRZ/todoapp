import { useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { TasksStackParamList } from '../../../navigation/TasksStackNavigator';
import { useTasks } from './useTasks';

type TaskFormRouteProp = RouteProp<TasksStackParamList, 'TaskForm'>;
type TaskFormNavigationProp = NativeStackNavigationProp<
  TasksStackParamList,
  'TaskForm'
>;

export function useTaskForm() {
  const navigation = useNavigation<TaskFormNavigationProp>();
  const route = useRoute<TaskFormRouteProp>();
  const { getTaskById, createTask, updateTask, isSaving } = useTasks();

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

  const handleSave = async () => {
    const trimmedTitle = title.trim();
    const trimmedNotes = notes.trim();

    if (!trimmedTitle) {
      Alert.alert('Błąd', 'Tytuł nie może być pusty.');
      return;
    }
 try {
      if (isEditing) {
        if (!existingTask) {
          Alert.alert('Błąd', 'Nie znaleziono zadania do edycji.');
          return;
        }

        await updateTask({
          id: existingTask.id,
          title: trimmedTitle,
          notes: trimmedNotes,
        });
      } else {
        await createTask({
          title: trimmedTitle,
          notes: trimmedNotes,
        });
      }

      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Błąd', 'Nie udało się zapisać zadania. Spróbuj ponownie.');
    }
  };
  return {
    title,
    notes,
    setTitle,
    setNotes,
    isEditing,
    handleSave,
    isSaving,
  };
}