//src/features/tasks/hooks/useTasks.ts



import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../auth/context/AuthProvider';
import {
  deleteTaskById,
  getTasks,
  toggleTaskDoneById,
} from '../services/firebase/task.service';
import { Task, TaskFilter, TaskSort } from '../types/task.types';

export const useTasks = () => {
  const { user } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<TaskFilter>('all');
  const [sortBy, setSortBy] = useState<TaskSort>('newest');

  const loadTasks = useCallback(async () => {
    if (!user?.uid) {
      setTasks([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await getTasks(user.uid);
      setTasks(data);
    } catch (e) {
      setError('Nie udało się pobrać zadań.');
    } finally {
      setLoading(false);
    }
  }, [user?.uid]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const deleteTask = async (taskId: string) => {
    try {
      setError(null);

      await deleteTaskById(taskId);
      await loadTasks();
    } catch (e) {
      setError('Nie udało się usunąć zadania.');
      throw e;
    }
  };

  const toggleTaskDone = async (taskId: string, done: boolean) => {
    try {
      setError(null);

      await toggleTaskDoneById(taskId, done);
      await loadTasks();
    } catch (e) {
      setError('Nie udało się zaktualizować zadania.');
      throw e;
    }
  };

  const cycleFilter = () => {
    setFilter((prev) => {
      if (prev === 'all') return 'active';
      if (prev === 'active') return 'completed';
      return 'all';
    });
  };

  const cycleSort = () => {
    setSortBy((prev) => {
      if (prev === 'newest') return 'oldest';
      if (prev === 'oldest') return 'alphabetical';
      return 'newest';
    });
  };

  const visibleTasks = useMemo(() => {
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
  }, [tasks, filter, sortBy]);

  const filterLabel = useMemo(() => {
    if (filter === 'all') return 'Filtr: Wszystkie';
    if (filter === 'active') return 'Filtr: Aktywne';
    return 'Filtr: Ukończone';
  }, [filter]);

  const sortLabel = useMemo(() => {
    if (sortBy === 'newest') return 'Sort: Najnowsze';
    if (sortBy === 'oldest') return 'Sort: Najstarsze';
    return 'Sort: A-Z';
  }, [sortBy]);

  const emptyMessage = useMemo(() => {
    if (filter === 'active') return 'Brak aktywnych zadań.';
    if (filter === 'completed') return 'Brak ukończonych zadań.';
    return 'Brak zadań — dodaj pierwsze!';
  }, [filter]);

  return {
    tasks,
    visibleTasks,
    loading,
    error,
    filter,
    sortBy,
    filterLabel,
    sortLabel,
    emptyMessage,
    loadTasks,
    deleteTask,
    toggleTaskDone,
    cycleFilter,
    cycleSort,
  };
};