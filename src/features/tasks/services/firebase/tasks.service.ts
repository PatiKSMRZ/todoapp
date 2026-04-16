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
//&wskazuje miejsce w forestore gdzie są zapisane taski konkretnego uzytkownika 
const getUserTasksCollection = (uid: string) => {  //& f. przyjmuje uid (ID user)
  return firestore()  //& łączenie z firestore
    .collection('users')
    .doc(uid)
    .collection('tasks');
};

//& zamiana dokumnetów z firestore na obiekt Task
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
//&  pobiera taski usera z bazy, zamienia je na task[] i oddaje do aplikacji
export const fetchTasks = async (uid: string): Promise<Task[]> => {
  const snapshot = await getUserTasksCollection(uid)
    .orderBy('createdAt', 'desc')
    .get();

  return snapshot.docs.map(mapDocToTask);
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
//!plik jest po to żeby oddzielić kontakt z firebase od reszty aplikacji. 