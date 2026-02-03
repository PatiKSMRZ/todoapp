import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function HelpScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Pomoc</Text>
        <Text style={styles.subtitle}>
          Wskazówki i narzędzia, które pomogą Ci realizować zadania.
        </Text>
      </View>

      {/* Cards */}
      <View style={styles.cards}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎯 Skup się na jednym zadaniu</Text>
          <Text style={styles.cardText}>
            Nie próbuj robić wszystkiego naraz. Jedno zadanie = większa szansa,
            że je ukończysz.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>⏱️ Zasada 5 minut</Text>
          <Text style={styles.cardText}>
            Umów się ze sobą na 5 minut pracy. Często to wystarczy, żeby wejść w rytm.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>✅ Odhaczanie działa</Text>
          <Text style={styles.cardText}>
            Każde ukończone zadanie wzmacnia motywację do kolejnych.
          </Text>
        </View>
      </View>

      {/* CTA */}
      <Pressable
        onPress={() => console.log('Open quiz')}
        style={styles.primaryButton}
      >
        <Text style={styles.primaryButtonText}>
          Szybki quiz motywacyjny
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
    justifyContent: 'space-between',
  },

  /* Header */
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },

  /* Cards */
  cards: {
    gap: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },

  /* Button */
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
});
