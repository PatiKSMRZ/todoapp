import type { Task, TaskFilter, TaskSort } from '../types/task.types';

export function getFilterLabel(filter: TaskFilter): string {
  if (filter === 'all') return 'Filtr: Wszystkie';
  if (filter === 'active') return 'Filtr: Aktywne';
  return 'Filtr: Ukończone';
}

export function getSortLabel(sort: TaskSort): string {
  if (sort === 'newest') return 'Sort: Najnowsze';
  if (sort === 'oldest') return 'Sort: Najstarsze';
  return 'Sort: A-Z';
}

export function getEmptyMessage(filter: TaskFilter): string {
  if (filter === 'active') return 'Brak aktywnych zadań.';
  if (filter === 'completed') return 'Brak ukończonych zadań.';
  return 'Brak zadań — dodaj pierwsze!';
}

export function getVisibleTasks(
  tasks: Task[],
  filter: TaskFilter,
  sortBy: TaskSort
): Task[] {
  let result = [...tasks];

  if (filter === 'active') {
    result = result.filter((task) => !task.done);
  }

  if (filter === 'completed') {
    result = result.filter((task) => task.done);
  }

  if (sortBy === 'newest') {
    result.sort((a, b) => b.createdAt - a.createdAt);
  }

  if (sortBy === 'oldest') {
    result.sort((a, b) => a.createdAt - b.createdAt);
  }

  if (sortBy === 'alphabetical') {
    result.sort((a, b) => a.title.localeCompare(b.title, 'pl'));
  }

  return result;
}