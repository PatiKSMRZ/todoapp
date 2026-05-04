import { useEffect, useMemo, useState } from 'react';
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

    const [error, setError] = useState<string | null>(null);

    const [titleError, setTitleError] = useState<string | null>(null);

    const isSaveDisabled = isSaving || !title.trim();

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setNotes(existingTask.notes ?? '');

      setError(null);
      setTitleError(null);

      return;
    }

    setTitle('');
    setNotes('');

    setError(null);
    setTitleError(null);
  }, [existingTask]);

  const handleSave = async () => {
    const trimmedTitle = title.trim();
    const trimmedNotes = notes.trim();

    setError(null);
    setTitleError(null);

    if (!trimmedTitle) {
      setTitleError('Tytuł nie może być pusty.');
      return;
    }
 try {
      if (isEditing) {
        if (!existingTask) {
          setError('Nie znaleziono zadania do edycji.');
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
    } catch (unknownError) {
      console.error(unknownError);
      setError('Nie udało się zapisać zadania. Spróbuj ponownie.');

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
    error,
    titleError,
    isSaveDisabled
  };
}