// src/services/firebase/users.service.ts
import firestore from '@react-native-firebase/firestore';

export const createUserDoc = async (uid: string, email: string ) => {
  await firestore().collection('users').doc(uid).set({
    uid,
    email,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
};
// ✅ NOWE: naprawa brakującego dokumentu
export const ensureUserDoc = async (uid: string, email?: string | null) => {
  const ref = firestore().collection('users').doc(uid);
  const snap = await ref.get();

  if (!snap.exists) {
    await ref.set({
      uid,
      email: email ?? '',
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  }
};