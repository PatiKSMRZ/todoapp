import type { Task, CreateTaskInput, UpdateTaskInput } from '../../types/task.types';


function generateTaskId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function buildNewTask(input: CreateTaskInput): Task {
  return {
    id: generateTaskId(),
    title: input.title.trim(),
    notes: input.notes.trim(),
    done: false,
    createdAt: Date.now(),
  };
}

export function buildUpdatedTask(task: Task, input: UpdateTaskInput): Task {
  return {
    ...task,
    title: input.title.trim(),
    notes: input.notes.trim(),
  };
}