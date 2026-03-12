//src/features/tasks/types/task.types.ts

export type Task = {
  id: string;
  title: string;
  done: boolean;
  userId: string;
  createdAt: number;
  updatedAt: number;
};

export type CreateTaskInput = {
  title: string;
  userId: string;
};

export type UpdateTaskInput = {
  title?: string;
  done?: boolean;
  updatedAt?: number;
};

export type TaskFilter = 'all' | 'active' | 'completed';
export type TaskSort = 'newest' | 'oldest' | 'alphabetical';