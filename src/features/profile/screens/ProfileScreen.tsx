import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profil</Text>
        <Text style={styles.subtitle}>Twoje konto i statystyki</Text>
      </View>

      {/* User info */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Email</Text>
        <Text style={styles.cardValue}>uzytkownik@email.com</Text>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Aktywne</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>34</Text>
          <Text style={styles.statLabel}>Ukończone</Text>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <Pressable
          onPress={() => console.log('Edit profile')}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>Edytuj profil</Text>
        </Pressable>

        <Pressable
          onPress={() => console.log('Logout')}
          style={styles.dangerButton}
        >
          <Text style={styles.dangerButtonText}>Wyloguj się</Text>
        </Pressable>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>
        TodoMotiv · wersja 1.0.0
      </Text>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
  },

  /* Card */
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  cardLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '600',
  },

  /* Stats */
  stats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },

  /* Actions */
  actions: {
    gap: 12,
  },
  secondaryButton: {
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  dangerButton: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#E53935',
  },
  dangerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },

  /* Footer */
  footerText: {
    fontSize: 12,
    opacity: 0.5,
    textAlign: 'center',
    marginTop: 20,
  },
});
