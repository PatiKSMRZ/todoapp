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



  const loadTasks = useCallback(async () => {
    const user = auth().currentUser;

    if (!user) {
      setTasks([]);
      return;
    }

    const tasksFromFirestore = await fetchTasks(user.uid);
    setTasks(tasksFromFirestore);
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

  const createTask = useCallback(async (input: CreateTaskInput) => {
    const user = auth().currentUser;

    if (!user) {
      return;
    }

    await createTaskInFirestore(user.uid, input);
    await loadTasks();
  }, [loadTasks]);

  const updateTask = useCallback(async (input: UpdateTaskInput) => {
    const user = auth().currentUser;

    if (!user) {
      return;
    }

    await updateTaskInFirestore(user.uid, input);
    await loadTasks();
  }, [loadTasks]);

  const deleteTask = useCallback(async (taskId: string) => {
    const user = auth().currentUser;

    if (!user) {
      return;
    }

    await deleteTaskFromFirestore(user.uid, taskId);
    await loadTasks();
  }, [loadTasks]);

  const toggleTaskDone = useCallback(async (taskId: string) => {
    const user = auth().currentUser;

    if (!user) {
      return;
    }

    const task = tasks.find((item) => item.id === taskId);

    if (!task) {
      return;
    }

    await toggleTaskDoneInFirestore(user.uid, task);
    await loadTasks();
  }, [loadTasks, tasks]);

  const value = useMemo<TasksContextValue>(() => {
    return {
      tasks,
      getTaskById,
      createTask,
      updateTask,
      deleteTask,
      toggleTaskDone,
    };
  }, [tasks, getTaskById, createTask, updateTask, deleteTask, toggleTaskDone]);

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
}