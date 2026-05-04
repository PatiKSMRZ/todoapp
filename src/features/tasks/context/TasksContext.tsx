import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import auth from '@react-native-firebase/auth';

import {
  subscribeToTasks,
  createTaskInFirestore,
  updateTaskInFirestore,
  deleteTaskFromFirestore,
  toggleTaskDoneInFirestore,
} from '../services/firebase/tasks.service';

import type {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
} from '../types/task.types';

type TasksContextValue = {
  tasks: Task[];
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  getTaskById: (taskId: string) => Task | undefined;
  createTask: (input: CreateTaskInput) => Promise<void>;
  updateTask: (input: UpdateTaskInput) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  toggleTaskDone: (taskId: string) => Promise<void>;
};

export const TasksContext = createContext<TasksContextValue | undefined>(
  undefined
);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔥 REAL-TIME LISTENER
  useEffect(() => {
    const user = auth().currentUser;

    if (!user) {
      setTasks([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const unsubscribe = subscribeToTasks(
      user.uid,
      (tasksFromFirestore) => {
        setTasks(tasksFromFirestore);
        setIsLoading(false);
        setError(null);
      },
      () => {
        setError(
          'Nie udało się pobrać zadań. Sprawdź połączenie internetowe.'
        );
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const getTaskById = useCallback(
    (taskId: string) => {
      return tasks.find((task) => task.id === taskId);
    },
    [tasks]
  );

  const createTask = useCallback(async (input: CreateTaskInput) => {
    const user = auth().currentUser;

    if (!user) {
      setError('Musisz być zalogowany, żeby dodać zadanie');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      await createTaskInFirestore(user.uid, input);
    } catch (unknownError) {
      console.error('Błąd podczas tworzenia taska:', unknownError);
      setError('Nie udało się dodać zadania. Spróbuj ponownie.');
      throw unknownError;
    } finally {
      setIsSaving(false);
    }
  }, []);

  const updateTask = useCallback(async (input: UpdateTaskInput) => {
    const user = auth().currentUser;

    if (!user) {
      setError('Musisz być zalogowana, żeby edytować zadanie.');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      await updateTaskInFirestore(user.uid, input);
    } catch (unknownError) {
      console.error('Błąd podczas edycji taska:', unknownError);
      setError('Nie udało się zapisać zmian. Spróbuj ponownie.');
      throw unknownError;
    } finally {
      setIsSaving(false);
    }
  }, []);

  const deleteTask = useCallback(async (taskId: string) => {
    const user = auth().currentUser;

    if (!user) {
      setError('Musisz być zalogowana, żeby usunąć zadanie.');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      await deleteTaskFromFirestore(user.uid, taskId);
    } catch (unknownError) {
      console.error('Błąd podczas usuwania taska:', unknownError);
      setError('Nie udało się usunąć zadania. Spróbuj ponownie.');
      throw unknownError;
    } finally {
      setIsSaving(false);
    }
  }, []);

  const toggleTaskDone = useCallback(
    async (taskId: string) => {
      const user = auth().currentUser;

      if (!user) {
        setError(
          'Musisz być zalogowana, żeby zmienić status zadania.'
        );
        return;
      }

      const task = tasks.find((item) => item.id === taskId);

      if (!task) {
        setError('Nie znaleziono zadania.');
        return;
      }

      try {
        setIsSaving(true);
        setError(null);

        await toggleTaskDoneInFirestore(user.uid, task);
      } catch (unknownError) {
        console.error(
          'Błąd podczas zmiany statusu taska:',
          unknownError
        );
        setError(
          'Nie udało się zmienić statusu zadania. Spróbuj ponownie.'
        );
        throw unknownError;
      } finally {
        setIsSaving(false);
      }
    },
    [tasks]
  );

  const value = useMemo<TasksContextValue>(() => {
    return {
      tasks,
      isLoading,
      isSaving,
      error,
      getTaskById,
      createTask,
      updateTask,
      deleteTask,
      toggleTaskDone,
    };
  }, [
    tasks,
    isLoading,
    isSaving,
    error,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskDone,
  ]);

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
}