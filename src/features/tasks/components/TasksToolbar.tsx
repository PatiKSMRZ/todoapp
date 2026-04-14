import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type TasksToolbarProps = {
  filterLabel: string;
  sortLabel: string;
  onChangeFilter: () => void;
  onChangeSort: () => void;
};

export default function TasksToolbar({
  filterLabel,
  sortLabel,
  onChangeFilter,
  onChangeSort,
}: TasksToolbarProps) {
  return (
    <View style={styles.toolbar}>
      <Pressable onPress={onChangeFilter} style={styles.toolbarButton}>
        <Text style={styles.toolbarButtonText}>{filterLabel}</Text>
      </Pressable>

      <Pressable onPress={onChangeSort} style={styles.toolbarButton}>
        <Text style={styles.toolbarButtonText}>{sortLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  toolbarButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  toolbarButtonText: {
    textAlign: 'center',
  },
});