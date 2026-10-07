import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function InputForm({ intento, setIntento, onSubmit }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={4}
        value={intento}
        onChangeText={setIntento}
        placeholder="1234"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
      />
      <Button 
        title="Ingresar" 
        onPress={onSubmit}
        color="#4CAF50"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    width: '100%',
  },
  input: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginRight: 15,
    padding: 15,
    width: 120,
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: '#fff',
    borderRadius: 8,
    fontWeight: 'bold',
  },
});