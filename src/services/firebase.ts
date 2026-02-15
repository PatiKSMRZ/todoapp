// src/services/firebase.ts
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// RNFirebase nie wymaga initializeApp() w kodzie.
// Konfiguracja jest przez google-services.json (Android) / GoogleService-Info.plist (iOS).

export const firebaseAuth = auth();
export const db = firestore();
export { firestore };