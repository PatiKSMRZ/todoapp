import firestore, {
  type FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

import type {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
} from '../../types/task.types';

type FirestoreTaskData = {
  title: string;
  notes: string;
  done: boolean;
  createdAt: number;
  updatedAt: number;
};

const getUserTasksCollection = (uid: string) => {
  return firestore()
    .collection('users')
    .doc(uid)
    .collection('tasks');
};

const mapDocToTask = (
  doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>
): Task => {
  const data = doc.data() as FirestoreTaskData;

  return {
    id: doc.id,
    title: data.title,
    notes: data.notes,
    done: data.done,
    createdAt: data.createdAt,
  };
};

export const fetchTasks = async (uid: string): Promise<Task[]> => {
  const snapshot = await getUserTasksCollection(uid)
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map(mapDocToTask);
};

export const subscribeToTasks = (
  uid: string,
  onTasksChange: (tasks: Task[]) => void,
  onError?: (error: unknown) => void
) => {
  return getUserTasksCollection(uid)
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      (snapshot) => {
        const tasks = snapshot.docs.map(mapDocToTask);
        onTasksChange(tasks);
      },
      (error) => {
        console.error('Błąd listenera tasków:', error);
        onError?.(error);
      }
    );
};

export const createTaskInFirestore = async (
  uid: string,
  input: CreateTaskInput
): Promise<void> => {
  const now = Date.now();

  const newTask: FirestoreTaskData = {
    title: input.title.trim(),
    notes: input.notes?.trim() ?? '',
    done: false,
    createdAt: now,
    updatedAt: now,
  };

  await getUserTasksCollection(uid).add(newTask);
};

export const updateTaskInFirestore = async (
  uid: string,
  input: UpdateTaskInput
): Promise<void> => {
  const updatedTask = {
    title: input.title.trim(),
    notes: input.notes?.trim() ?? '',
    updatedAt: Date.now(),
  };

  await getUserTasksCollection(uid)
    .doc(input.id)
    .update(updatedTask);
};

export const deleteTaskFromFirestore = async (
  uid: string,
  taskId: string
): Promise<void> => {
  await getUserTasksCollection(uid)
    .doc(taskId)
    .delete();
};

export const toggleTaskDoneInFirestore = async (
  uid: string,
  task: Task
): Promise<void> => {
  await getUserTasksCollection(uid)
    .doc(task.id)
    .update({
      done: !task.done,
      updatedAt: Date.now(),
    });
};