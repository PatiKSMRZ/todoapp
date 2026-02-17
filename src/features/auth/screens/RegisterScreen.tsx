// src/screens/auth/RegisterScreen/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ActivityIndicator,StyleSheet } from 'react-native';
import { useRegister } from '../hooks/useRegister';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const { register, loading } = useRegister();

  const handleRegister = async () => {
    const result = await register(email, password, password2);
    if (result.ok) {
      Alert.alert('Sukces', 'Konto zostało utworzone!');
      return;
    }
    Alert.alert(result.error.title, result.error.message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rejestracja</Text>
      <Text style={styles.subtitle}>Załóż konto, żeby zapisywać zadania.</Text>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="np. patrycja@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
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
          style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.primaryButtonText}>Utwórz konto</Text>}
        </Pressable>

        <Pressable onPress={() => console.log('Go to Login')} style={styles.linkButton} disabled={loading}>
          <Text style={styles.linkText}>
            Masz konto? <Text style={styles.linkTextStrong}>Zaloguj się</Text>
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
