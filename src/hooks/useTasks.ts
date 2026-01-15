import { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Task } from '../types/task';

export function useTasks(userId: string | null) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskText, setEditingTaskText] = useState<string>('');

  // 🔹 Pobieranie tasków z Firestore
  useEffect(() => {
    if (!userId) return;

    const unsubscribe = firestore()
      .collection('users')
      .doc(userId)
      .collection('tasks')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Task[];
        setTasks(data);
      });

    return unsubscribe;
  }, [userId]);

  // 🔹 Dodawanie nowego taska
  const addTask = async (title: string) => {
    if (!userId) return;
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('tasks')
      .add({
        title,
        completed: false,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  };

  // 🔹 Toggle completed
  const toggleTask = async (task: Task) => {
    if (!userId) return;
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('tasks')
      .doc(task.id)
      .update({ completed: !task.completed });
  };

  // 🔹 Usuwanie taska
  const deleteTask = async (id: string) => {
    if (!userId) return;
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('tasks')
      .doc(id)
      .delete();
  };

  // 🔹 Start edycji taska
  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTaskText(task.title);
  };

  // 🔹 Zapisanie edytowanego taska
  const saveEditedTask = async () => {
    if (!userId || !editingTaskId) return;
    await firestore()
      .collection('users')
      .doc(userId)
      .collection('tasks')
      .doc(editingTaskId)
      .update({ title: editingTaskText });
    setEditingTaskId(null);
    setEditingTaskText('');
  };

  // 🔹 Anulowanie edycji
  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditingTaskText('');
  };

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    editingTaskId,
    editingTaskText,
    startEditing,
    saveEditedTask,
    cancelEditing,
    setEditingTaskText,
  };
}