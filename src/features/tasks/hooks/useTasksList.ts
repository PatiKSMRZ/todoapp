import { useMemo, useState } from 'react';
import { useTasks } from './useTasks';
import type { TaskFilter, TaskSort } from '../types/task.types';
import { getVisibleTasks } from '../utils/task.helpers';

export function useTasksList() {
  const { tasks, deleteTask, toggleTaskDone } = useTasks();

  const [filter, setFilter] = useState<TaskFilter>('all');
  const [sortBy, setSortBy] = useState<TaskSort>('newest');

  const visibleTasks = useMemo(() => {
    return getVisibleTasks(tasks, filter, sortBy);
  }, [tasks, filter, sortBy]);

  const changeFilter = () => {
    setFilter((prev) => {
      if (prev === 'all') return 'active';
      if (prev === 'active') return 'completed';
      return 'all';
    });
  };

  const changeSort = () => {
    setSortBy((prev) => {
      if (prev === 'newest') return 'oldest';
      if (prev === 'oldest') return 'alphabetical';
      return 'newest';
    });
  };

  return {
    visibleTasks,
    filter,
    sortBy,
    changeFilter,
    changeSort,
    deleteTask,
    toggleTaskDone,
  };
}