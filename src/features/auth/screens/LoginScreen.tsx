import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../navigation/AuthStackNavigator';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login' >;

export default function LoginScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logowanie</Text>
      <Text style={styles.subtitle}>
        Zaloguj się, żeby zobaczyć swoje zadania.
      </Text>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="np. patrycja@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Hasło</Text>
          <TextInput
            placeholder="Twoje hasło"
            secureTextEntry
            style={styles.input}
          />
        </View>

        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>Zaloguj</Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Register')}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>
            Nie masz konta?{' '}
            <Text style={styles.linkTextStrong}>Zarejestruj się</Text>
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

