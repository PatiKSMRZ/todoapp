import React, {useState} from 'react';
import { View, Text, TextInput, Pressable, StyleSheet,Alert, ActivityIndicator } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);

   const handleRegister = async () => {
    const cleanEmail = email.trim();

    if (!cleanEmail || !password || !password2) {
      Alert.alert('Uzupełnij dane', 'Podaj email i hasło (2x).');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Za krótkie hasło', 'Hasło musi mieć minimum 6 znaków.');
      return;
    }

    if (password !== password2) {
      Alert.alert('Hasła nie pasują', 'Wpisz identyczne hasło w obu polach.');
      return;
    }

    setLoading(true);
    try {
      // 1) tworzy konto w Auth
      const cred = await auth().createUserWithEmailAndPassword(
  cleanEmail,
  password
);

      // 2) zapisuje usera w Firestore
     await firestore()
      .collection('users')
      .doc(cred.user.uid)
      .set({
        email: cred.user.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      // user jest zalogowany automatycznie (onAuthStateChanged przełączy UI)
      Alert.alert('Sukces', 'Konto zostało utworzone!');
    } catch (e: any) {
     if (e?.code === 'auth/email-already-in-use') {
        Alert.alert(
          'Ten email już istnieje',
          'Zaloguj się lub użyj innego adresu.',
        );
      } else if (e?.code === 'auth/invalid-email') {
        Alert.alert(
          'Niepoprawny email',
          'Sprawdź czy email jest wpisany poprawnie.',
        );
      } else if (e?.code === 'auth/weak-password') {
        Alert.alert('Słabe hasło', 'Użyj mocniejszego hasła (min. 6 znaków).');
      } else if (e?.code === 'auth/network-request-failed') {
        Alert.alert('Brak internetu', 'Sprawdź połączenie i spróbuj ponownie.');
      } else {
        Alert.alert(
          'Rejestracja nieudana',
          e?.message ?? 'Coś poszło nie tak. Spróbuj ponownie.',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rejestracja</Text>
      <Text style={styles.subtitle}>
        Załóż konto, żeby zapisywać zadania.
      </Text>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="np. patrycja@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Hasło</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Minimum 6 znaków"
            secureTextEntry
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Powtórz hasło</Text>
          <TextInput
            value={password2}
            onChangeText={setPassword2}
            placeholder="Powtórz hasło"
            secureTextEntry
            style={styles.input}
          />
        </View>

        <Pressable
          onPress={handleRegister}
          style={[styles.primaryButton, loading &&styles.primaryButtonDisabled]}
          disabled={loading}
        >

            {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.primaryButtonText}>Utwórz konto</Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => console.log('Go to Login')}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>
            Masz konto?{' '}
            <Text style={styles.linkTextStrong}>Zaloguj się</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 20,
  },
  form: {
    gap: 14,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  primaryButton: {
    marginTop: 6,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'black',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  primaryButtonDisabled: {
  opacity: 0.7,
},
  linkButton: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    opacity: 0.8,
  },
  linkTextStrong: {
    fontWeight: '700',
    opacity: 1,
  },
});
