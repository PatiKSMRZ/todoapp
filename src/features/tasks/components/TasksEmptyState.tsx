import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type TasksEmptyStateProps = {
  message: string;
};

export default function TasksEmptyState({
  message,
}: TasksEmptyStateProps) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
});