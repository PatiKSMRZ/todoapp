//src/features/tasks/services/firebase/tasks.service.ts

//Na razie zrobimy wersję przejściową, jeszcze bez Firestore, ale już w stylu serwisu.
//Dzięki temu później łatwo podmienisz implementację.



import { Task, CreateTaskInput, UpdateTaskInput } from '../../types/task.types';

let mockTasks: Task[] = [
  {
    id: '1',
    title: 'Kupić mleko',
    done: false,
    userId: 'demo-user',
    createdAt: 1710000000000,
    updatedAt: 1710000000000,
  },
  {
    id: '2',
    title: 'Zrobić 15 min angielskiego',
    done: true,
    userId: 'demo-user',
    createdAt: 1710001000000,
    updatedAt: 1710001000000,
  },
  {
    id: '3',
    title: 'Umyć auto',
    done: false,
    userId: 'demo-user',
    createdAt: 1710002000000,
    updatedAt: 1710002000000,
  },
];

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve as () => void, ms));

export const getTasks = async (userId: string): Promise<Task[]> => {
  await wait(200);

  return mockTasks.filter((task) => task.userId === userId);
};

export const deleteTaskById = async (taskId: string): Promise<void> => {
  await wait(150);

  mockTasks = mockTasks.filter((task) => task.id !== taskId);
};

export const toggleTaskDoneById = async (
  taskId: string,
  done: boolean
): Promise<void> => {
  await wait(150);

  mockTasks = mockTasks.map((task) =>
    task.id === taskId
      ? {
          ...task,
          done,
          updatedAt: Date.now(),
        }
      : task
  );
};

export const createTask = async ({
  title,
  userId,
}: CreateTaskInput): Promise<Task> => {
  await wait(150);

  const now = Date.now();

  const newTask: Task = {
    id: String(now),
    title: title.trim(),
    done: false,
    userId,
    createdAt: now,
    updatedAt: now,
  };

  mockTasks = [newTask, ...mockTasks];

  return newTask;
};

export const updateTaskById = async (
  taskId: string,
  data: UpdateTaskInput
): Promise<void> => {
  await wait(150);

  mockTasks = mockTasks.map((task) =>
    task.id === taskId
      ? {
          ...task,
          ...data,
          updatedAt: Date.now(),
        }
      : task
  );
};

export const getTaskById = async (taskId: string): Promise<Task | null> => {
  await wait(100);

  const task = mockTasks.find((item) => item.id === taskId);

  return task ?? null;
};