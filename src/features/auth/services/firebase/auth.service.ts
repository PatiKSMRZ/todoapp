// src/services/firebase/auth.service.ts
import auth from '@react-native-firebase/auth';

export const registerWithEmail = async (email: string, password: string) => {
  const cred = await auth().createUserWithEmailAndPassword(email, password);
  return cred;
};