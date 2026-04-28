import React, { createContext, useContext, useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { ensureUserDoc } from '../services/firebase/users.service';

type AuthContextValue = {
  user: FirebaseAuthTypes.User | null;
  initializing: boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

useEffect(() => {
  const unsubscribe = auth().onAuthStateChanged( (u) => {
    setUser(u);

    if (u) {
      // ✅ “naprawa” profilu jeśli kiedyś Firestore nie zapisał
      ensureUserDoc(u.uid, u.email).catch(error => {
        console.log('Failed to ensure user doc:', error);
      });
    }

    setInitializing(false);
  });

  return unsubscribe;
}, []);

  return (
    <AuthContext.Provider value={{ user, initializing }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
};