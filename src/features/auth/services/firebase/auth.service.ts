// auth.service.ts
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

export const registerWithEmail = async (
  email: string,
  password: string
): Promise<FirebaseAuthTypes.UserCredential> => {
  
  return auth().createUserWithEmailAndPassword(email.trim(), password);
};

export const loginWithEmail = async (
  email: string,
  password: string
): Promise<FirebaseAuthTypes.UserCredential> => {
  return auth().signInWithEmailAndPassword(email.trim(), password);
};

export const logout = async (): Promise<void> => {
  return auth().signOut();
};

export const resetPassword = async (email: string): Promise<void> => {
  return auth().sendPasswordResetEmail(email.trim());
};

// opcjonalnie (czasem się przydaje)
export const getCurrentUser = (): FirebaseAuthTypes.User | null => {
  return auth().currentUser;
};