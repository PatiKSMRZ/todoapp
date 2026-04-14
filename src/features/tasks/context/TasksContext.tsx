import React, { createContext, useMemo, useState } from 'react';
import { buildNewTask, buildUpdatedTask } from '../services/firebase/task.service';
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

export const TasksContext = createContext<TasksContextValue | undefined>(undefined);



export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  const value = useMemo<TasksContextValue>(() => {
    return {
      tasks,

      getTaskById: (taskId) => {
        return tasks.find((task) => task.id === taskId);
      },

          createTask: (input) => {
          const newTask = buildNewTask(input);
          setTasks((prev) => [newTask, ...prev]);
        },

              updateTask: (input) => {
              setTasks((prev) =>
              prev.map((task) =>
                task.id === input.id ? buildUpdatedTask(task, input) : task
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

