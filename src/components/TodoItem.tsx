import React from 'react';
import { Pressable, Text, TextInput, View, StyleSheet } from 'react-native';
import { Task } from '../types/task';
import { colors } from '../theme/colors';
interface TodoItemProps {
  task: Task;
  editingTaskId: string | null;
  editingTaskText: string;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onChangeText: (text: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}

export default function TodoItem({
  task,
  editingTaskId,
  editingTaskText,
  onToggle,
  onDelete,
  onEdit,
  onChangeText,
  onSaveEdit,
  onCancelEdit,
}: TodoItemProps) {
  const isEditing = editingTaskId === task.id;
  return (
    <View
      style={[
        styles.container,
        isEditing && styles.containerEditing,
      ]}
    >
      {isEditing ? (
        <View style={styles.editRow}>
          <TextInput
            value={editingTaskText}
            onChangeText={onChangeText}
            onSubmitEditing={onSaveEdit}
            autoFocus
            style={styles.input}
          />

          <Pressable onPress={onSaveEdit}>
            <Text style={styles.save}>✅</Text>
          </Pressable>

          <Pressable onPress={onCancelEdit}>
            <Text style={styles.cancel}>❌</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.taskRow}>
          <Pressable
            onPress={() => onToggle(task)}
            style={[
              styles.checkbox,
              task.completed && styles.checkboxCompleted,
            ]}
          >
            {task.completed && (
              <Text style={styles.checkmark}>✓</Text>
            )}
          </Pressable>

          <Pressable onPress={() => onToggle(task)}>
            <Text
              style={[
                styles.title,
                task.completed && styles.titleCompleted,
              ]}
            >
              {task.title}
            </Text>
          </Pressable>
        </View>
      )}

      {!isEditing && (
        <View style={styles.actions}>
          <Pressable onPress={() => onEdit(task)}>
            <Text style={styles.icon}>✏️</Text>
          </Pressable>

          <Pressable onPress={() => onDelete(task.id)}>
            <Text style={styles.icon}>🗑️</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: colors.item.background,
  },

  containerEditing: {
    backgroundColor: colors.item.backgroundEditing,
  },

  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  input: {
    width: 190,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: colors.item.inputBackground,
    color: colors.text.primary,
  },

  save: {
    color: colors.accent.success,
    fontWeight: 'bold',
  },

  cancel: {
    color: colors.accent.danger,
    fontWeight: 'bold',
  },

  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxCompleted: {
    backgroundColor: colors.accent.completed,
    borderColor: colors.accent.completed,
  },

  checkmark: {
    color: colors.text.inverted,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 18,
    color: colors.text.primary,
  },

  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.text.muted,
  },

  actions: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 16,
  },

  icon: {
    color: colors.accent.main,
  },
});