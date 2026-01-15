import React, { useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import { colors } from '../theme/colors';

interface TodoInputProps {
  onSubmit: (title: string) => void;
}

export default function TodoInput({ onSubmit }: TodoInputProps) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText('');
  };

  return (
    <View>
      <TextInput
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAdd}
        placeholder="Wpisz zadanie..."
        placeholderTextColor={colors.input.placeholder}
        style={styles.input}
      />

      <Pressable
        onPress={handleAdd}
        android_ripple={{ color: colors.button.ripple }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Dodaj zadanie</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 288, // ~ w-72
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
    backgroundColor: colors.input.background,
    color: colors.text.primary,
  },

  button: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
    backgroundColor: colors.button.primary,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Android shadow
    elevation: 5,
  },

  buttonText: {
    color: colors.button.text,
    fontWeight: '600',
    textAlign: 'center',
  },
});