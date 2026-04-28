// src/screens/auth/RegisterScreen/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, ActivityIndicator,StyleSheet } from 'react-native';
import { useRegister } from '../hooks/useRegister';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/AuthStackNavigator';

type Props = NativeStackScreenProps<AuthStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register, loading } = useRegister();

  const handleRegister = async () => {
    if (loading) return;
    const result = await register(email, password, confirmPassword);
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
            autoComplete="email"
            textContentType="emailAddress"
            returnKeyType="next"
            style={styles.input}
            editable={!loading}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Hasło</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Minimum 6 znaków"
            secureTextEntry
            autoComplete="password-new"
            textContentType="newPassword"
            returnKeyType="next"
            style={styles.input}
            editable={!loading}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Powtórz hasło</Text>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Powtórz hasło"
            secureTextEntry
            autoComplete="password-new"
            textContentType="newPassword"
            returnKeyType="done"
            style={styles.input}
            editable={!loading}
          />
        </View>

        <Pressable
          onPress={handleRegister}
          style={[styles.primaryButton, loading && styles.primaryButtonDisabled]}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.primaryButtonText}>Utwórz konto</Text>}
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Login')} style={styles.linkButton} disabled={loading}>
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
