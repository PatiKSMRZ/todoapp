import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import auth from '@react-native-firebase/auth';

import {
  fetchTasks,
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

  const loadTasks = useCallback(async () => {
    const user = auth().currentUser;

    try {
      setIsLoading(true);

      if (!user) {
        setTasks([]);
        return;
      }

      const tasksFromFirestore = await fetchTasks(user.uid);
      setTasks(tasksFromFirestore);
    } catch (error) {
      console.error('Błąd podczas pobierania tasków:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const getTaskById = useCallback(
    (taskId: string) => {
      return tasks.find((task) => task.id === taskId);
    },
    [tasks]
  );

  const createTask = useCallback(
    async (input: CreateTaskInput) => {
      const user = auth().currentUser;

      if (!user) {
        return;
      }

      try {
        setIsSaving(true);
        await createTaskInFirestore(user.uid, input);
        await loadTasks();
      } catch (error) {
        console.error('Błąd podczas tworzenia taska:', error);
        throw error;
      } finally {
        setIsSaving(false);
      }
    },
    [loadTasks]
  );

  const updateTask = useCallback(
    async (input: UpdateTaskInput) => {
      const user = auth().currentUser;

      if (!user) {
        return;
      }

      try {
        setIsSaving(true);
        await updateTaskInFirestore(user.uid, input);
        await loadTasks();
      } catch (error) {
        console.error('Błąd podczas edycji taska:', error);
        throw error;
      } finally {
        setIsSaving(false);
      }
    },
    [loadTasks]
  );

  const deleteTask = useCallback(
    async (taskId: string) => {
      const user = auth().currentUser;

      if (!user) {
        return;
      }

      try {
        setIsSaving(true);
        await deleteTaskFromFirestore(user.uid, taskId);
        await loadTasks();
      } catch (error) {
        console.error('Błąd podczas usuwania taska:', error);
        throw error;
      } finally {
        setIsSaving(false);
      }
    },
    [loadTasks]
  );

  const toggleTaskDone = useCallback(
    async (taskId: string) => {
      const user = auth().currentUser;

      if (!user) {
        return;
      }

      const task = tasks.find((item) => item.id === taskId);

      if (!task) {
        return;
      }

      try {
        setIsSaving(true);
        await toggleTaskDoneInFirestore(user.uid, task);
        await loadTasks();
      } catch (error) {
        console.error('Błąd podczas zmiany statusu taska:', error);
        throw error;
      } finally {
        setIsSaving(false);
      }
    },
    [loadTasks, tasks]
  );

  const value = useMemo<TasksContextValue>(() => {
    return {
      tasks,
      isLoading,
      isSaving,
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