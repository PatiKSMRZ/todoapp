import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { Task } from '../types/task.types';

type TaskListItemProps = {
  task: Task;
  isSaving: boolean;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleDone: (taskId: string) => void;
};

export default function TaskListItem({
  task,
  isSaving,
  onEdit,
  onDelete,
  onToggleDone,
}: TaskListItemProps) {
  return (
    <Pressable onPress={() => onEdit(task)}
     style={styles.taskItem}
     disabled={isSaving}>
      <View style={styles.taskLeft}>
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            onToggleDone(task.id);
          }}
          hitSlop={10}
          style={styles.checkbox}
          disabled={isSaving}
        >
          {task.done && <Text style={styles.checkmark}>✓</Text>}
        </Pressable>

        <View style={styles.taskTextWrapper}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.taskTitle, task.done && styles.taskTitleDone]}
          >
            {task.title}
          </Text>

          {!!task.notes && (
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.taskNotes}
            >
              {task.notes}
            </Text>
          )}
        </View>
      </View>

      <Pressable
        onPress={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
        hitSlop={10}
        style={styles.deleteButton}
        disabled={isSaving}
      >
        <Text style={styles.deleteButtonText}>Usuń</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  taskTextWrapper: {
    flex: 1,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 14,
  },
  taskTitle: {
    fontSize: 16,
    flexShrink: 1,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  taskNotes: {
    marginTop: 2,
    fontSize: 13,
    opacity: 0.7,
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  deleteButtonText: {
    fontSize: 14,
  },
});