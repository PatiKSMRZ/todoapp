import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../../auth/context/AuthProvider';
import { logout } from '../../auth/services/firebase/auth.service';
import { useTasks } from '../../tasks/hooks/useTasks';

export default function ProfileScreen() {
  const { user } = useAuth();

  const { tasks, isLoading } = useTasks();


  const [isLoggingOut, setIsLoggingOut] = useState(false);

   const userInitial = user?.email?.[0]?.toUpperCase() ?? '?';

   const stats = useMemo(() => {
    return {
      active: tasks.filter((task) => !task.done).length,
      completed: tasks.filter((task) => task.done).length,

      
      total: tasks.length,
    };
  }, [tasks]);
  

  const handleEditProfile = () => {
    Alert.alert(
      'Edycja profilu',
      'Ta funkcja pojawi się w kolejnej wersji aplikacji.'
    );
  };

  const handleLogout = () => {
    if (isLoggingOut) return;

    Alert.alert(
      'Wylogowanie',
      'Czy na pewno chcesz się wylogować?',
      [
        { text: 'Anuluj', style: 'cancel' },
        {
          text: 'Wyloguj',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoggingOut(true);
              await logout();
            } catch {
              Alert.alert(
                'Nie udało się wylogować',
                'Sprawdź połączenie z internetem i spróbuj ponownie.'
              );
            } finally {
              setIsLoggingOut(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>Profil</Text>
          <Text style={styles.subtitle}>Twoje konto i statystyki</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{userInitial}</Text>
          </View>
          <Text style={styles.cardLabel}>Email</Text>
          <Text style={styles.cardValue}>
            {user?.email ?? 'Brak danych'}
          </Text>
        </View>
              {isLoading ? (
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>Ładowanie statystyk...</Text>
          </View>
        ) : (
          <>
            <View style={styles.stats}>
              <View style={styles.statItem}>
              
                <Text style={styles.statValue}>{stats.active}</Text>
                <Text style={styles.statLabel}>Aktywne</Text>
              </View>

              <View style={styles.statItem}>
                
                <Text style={styles.statValue}>{stats.completed}</Text>
                <Text style={styles.statLabel}>Ukończone</Text>
              </View>
            </View>

            
            {stats.total === 0 && (
              <View style={styles.infoCard}>
                <Text style={styles.infoText}>
                  Nie masz jeszcze żadnych zadań.
                </Text>
              </View>
            )}
          </>
        )}

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={handleEditProfile}
            disabled={isLoggingOut}
            style={[
                styles.secondaryButton,
                isLoggingOut && styles.disabledButton,
              ]}
          >
            <Text style={styles.secondaryButtonText}>Edytuj profil</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            onPress={handleLogout}
            disabled={isLoggingOut}
            style={[
              styles.dangerButton,
              isLoggingOut && styles.disabledButton,
            ]}
          >
            <Text style={styles.dangerButtonText}>
              {isLoggingOut ? 'Wylogowywanie...' : 'Wyloguj się'}
            </Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.footerText}>TodoMotiv · wersja 1.0.0</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8FAFC',
  },

  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },

  card: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  cardLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },

  stats: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
    color: '#111827',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },

  actions: {
    gap: 12,
  },
  secondaryButton: {
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  dangerButton: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    backgroundColor: '#E53935',
  },
  dangerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  disabledButton: {
    opacity: 0.6,
  },

  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 'auto',
  },
    avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
   avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
   infoCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
   infoText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});