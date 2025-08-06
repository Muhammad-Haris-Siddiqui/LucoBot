import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';

export default function SpeechToText({ onSpeechResult, isListening, onListeningChange }) {
  const [isAvailable, setIsAvailable] = useState(true); // Mock availability

  useEffect(() => {
    // Mock voice recognition availability
    setIsAvailable(true);
  }, []);

  const handlePress = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = async () => {
    try {
      onListeningChange?.(true);
      // Mock speech recognition - simulate after 2 seconds
      setTimeout(() => {
        const mockText = "Hello robot";
        onSpeechResult?.(mockText);
        onListeningChange?.(false);
      }, 2000);
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      Alert.alert('Error', 'Failed to start voice recognition.');
      onListeningChange?.(false);
    }
  };

  const stopListening = async () => {
    try {
      onListeningChange?.(false);
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };

  if (!isAvailable) {
    return (
      <TouchableOpacity
        style={[styles.button, styles.disabledButton]}
        disabled={true}
      >
        <Text style={styles.disabledText}>🎤</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isListening ? styles.listeningButton : styles.defaultButton
      ]}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>
        {isListening ? '🔴' : '🎤'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  defaultButton: {
    backgroundColor: '#ffb300',
  },
  listeningButton: {
    backgroundColor: '#ff4444',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontSize: 20,
  },
  disabledText: {
    fontSize: 20,
    color: '#666',
  },
}); 