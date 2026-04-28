import React, {  useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/AuthStackNavigator';
import { useLogin } from '../hooks/useLogin';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;



export default function LoginScreen({ navigation }: Props) {
  const { login, loading, error } = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const passwordRef = useRef<TextInput>(null);

    const canSubmit = !loading && email.trim().length > 0 && password.length > 0;

  const handleLogin = () => {
    Keyboard.dismiss();
    login(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logowanie</Text>
      <Text style={styles.subtitle}>Zaloguj się, żeby zobaczyć swoje zadania.</Text>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="np. patrycja@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            // UX + autofill
            textContentType="emailAddress"
            autoComplete="email"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Hasło</Text>
          <TextInput
            ref={passwordRef}
            placeholder="Twoje hasło"
            secureTextEntry
            editable={!loading}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            textContentType="password"
            autoComplete="password"
            returnKeyType="done"
            onSubmitEditing={() => {
                if (canSubmit) {
                  handleLogin();
                }
              }}
          />
        </View>

        {error ? (
          <Text style={styles.error} accessibilityRole="alert">
            {error}
          </Text>
        ) : null}

        <Pressable
          onPress={handleLogin}
          style={({ pressed }) => [
            styles.primaryButton,
            !canSubmit && styles.primaryButtonDisabled,
            pressed && canSubmit && { opacity: 0.8 },
          ]}
          disabled={!canSubmit}
          accessibilityLabel="Zaloguj"
          accessibilityRole="button"
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.primaryButtonText}>Zaloguj</Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Register')}
          style={styles.linkButton}
          disabled={loading}
          accessibilityLabel="Przejdź do rejestracji"
          accessibilityRole="button"
        >
          <Text style={styles.linkText}>
            Nie masz konta? <Text style={styles.linkTextStrong}>Zarejestruj się</Text>
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
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  linkButton: {
    paddingVertical: 10,
    alignItems: 'center',
    opacity: 0.95,
  },
  linkText: {
    fontSize: 14,
    opacity: 0.8,
  },
  linkTextStrong: {
    fontWeight: '700',
    opacity: 1,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
});