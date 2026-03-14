import React, { createContext, useContext, useMemo, useState } from 'react';
import type {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
} from '../types/task.types';

type TasksContextValue = {
  tasks: Task[];
  getTaskById: (taskId: string) => Task | undefined;
  createTask: (input: CreateTaskInput) => void;
  updateTask: (input: UpdateTaskInput) => void;
  deleteTask: (taskId: string) => void;
  toggleTaskDone: (taskId: string) => void;
};

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Kupić mleko',
    notes: 'Wziąć też jajka',
    done: false,
    createdAt: 1710000000000,
  },
  {
    id: '2',
    title: 'Zrobić 15 min angielskiego',
    notes: 'Powtórzyć słówka',
    done: true,
    createdAt: 1710001000000,
  },
  {
    id: '3',
    title: 'Umyć auto',
    notes: '',
    done: false,
    createdAt: 1710002000000,
  },
];

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

function generateTaskId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  const value = useMemo<TasksContextValue>(() => {
    return {
      tasks,

      getTaskById: (taskId) => {
        return tasks.find((task) => task.id === taskId);
      },

      createTask: ({ title, notes }) => {
        const newTask: Task = {
          id: generateTaskId(),
          title: title.trim(),
          notes: notes.trim(),
          done: false,
          createdAt: Date.now(),
        };

        setTasks((prev) => [newTask, ...prev]);
      },

      updateTask: ({ id, title, notes }) => {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id
              ? {
                  ...task,
                  title: title.trim(),
                  notes: notes.trim(),
                }
              : task
          )
        );
      },

      deleteTask: (taskId) => {
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
      },

      toggleTaskDone: (taskId) => {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === taskId ? { ...task, done: !task.done } : task
          )
        );
      },
    };
  }, [tasks]);

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error('useTasks must be used within TasksProvider');
  }

  return context;
}