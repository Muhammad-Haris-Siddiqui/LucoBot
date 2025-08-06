import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';

export default function VoiceTest() {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    // Mock voice recognition availability
    setIsAvailable(true);
    console.log('Voice recognition available (mock)');
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
      setIsListening(true);
      // Mock speech recognition - simulate after 3 seconds
      setTimeout(() => {
        const mockText = "Hello this is a test";
        setRecognizedText(mockText);
        setIsListening(false);
      }, 3000);
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      Alert.alert('Error', 'Failed to start voice recognition.');
      setIsListening(false);
    }
  };

  const stopListening = async () => {
    try {
      setIsListening(false);
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Recognition Test</Text>
      
      <Text style={styles.status}>
        Voice Recognition Available: {isAvailable ? 'Yes (Mock)' : 'No'}
      </Text>
      
      <TouchableOpacity
        style={[
          styles.button,
          isListening ? styles.listeningButton : styles.defaultButton
        ]}
        onPress={handlePress}
        disabled={!isAvailable}
      >
        <Text style={styles.buttonText}>
          {isListening ? '🔴 Stop Listening' : '🎤 Start Listening'}
        </Text>
      </TouchableOpacity>
      
      {recognizedText ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>Recognized Text:</Text>
          <Text style={styles.resultText}>{recognizedText}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    padding: 20,
    borderRadius: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  defaultButton: {
    backgroundColor: '#ffb300',
  },
  listeningButton: {
    backgroundColor: '#ff4444',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  resultContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    minWidth: 300,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
  },
}); 