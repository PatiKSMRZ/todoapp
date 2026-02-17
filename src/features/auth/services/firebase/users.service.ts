// src/services/firebase/users.service.ts
import firestore from '@react-native-firebase/firestore';

export const createUserDoc = async (uid: string, email: string | null) => {
  await firestore().collection('users').doc(uid).set({
    uid,
    email,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
};