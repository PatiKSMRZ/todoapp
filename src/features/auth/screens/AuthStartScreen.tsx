import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function AuthStartScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>TodoMotiv</Text>
        <Text style={styles.subtitle}>
          Zapisuj zadania, odhaczaj je i buduj nawyk kończenia.
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={() => console.log('Go to Login')}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>Zaloguj się</Text>
        </Pressable>

        <Pressable
          onPress={() => console.log('Go to Register')}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>Zarejestruj się</Text>
        </Pressable>
      </View>

      <Text style={styles.footerText}>
        Kontynuując akceptujesz warunki korzystania z aplikacji.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  hero: {
    paddingTop: 30,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    lineHeight: 22,
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
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
  secondaryButton: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  footerText: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
    marginBottom: 6,
  },
});
