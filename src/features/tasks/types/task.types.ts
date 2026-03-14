export type Task = {
  id: string;
  title: string;
  notes: string;
  done: boolean;
  createdAt: number;
};

export type TaskFilter = 'all' | 'active' | 'completed';

export type TaskSort = 'newest' | 'oldest' | 'alphabetical';

export type CreateTaskInput = {
  title: string;
  notes: string;
};

export type UpdateTaskInput = {
  id: string;
  title: string;
  notes: string;
};