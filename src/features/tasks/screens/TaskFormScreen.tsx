import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useTaskForm } from '../hooks/useTaskForm';



export default function TaskFormScreen() {
    const {
    title,
    notes,
    setTitle,
    setNotes,
    isEditing,
    handleSave,
  } = useTaskForm();

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Tytuł</Text>
        <TextInput
          placeholder="Np. Zrobić zakupy"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Notatka (opcjonalnie)</Text>
        <TextInput
          placeholder="Dodatkowe informacje…"
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          value={notes}
          onChangeText={setNotes}
        />
      </View>

      <Pressable onPress={handleSave} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>
          {isEditing ? 'Zapisz zmiany' : 'Zapisz'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  saveButton: {
    marginTop: 'auto',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
});