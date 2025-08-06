import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import apiService from '../services/apiService';
import SpeechToText from './SpeechToText';

export default function RobotInterface({ robotResponse, onInputSubmit, isLoading = false }) {
  const [textInput, setTextInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Reset text input when robot response changes
  useEffect(() => {
    if (robotResponse?.action === 'request_text_input') {
      setTextInput('');
    }
  }, [robotResponse]);

  // Handle text input submission
  const handleTextSubmit = () => {
    if (textInput.trim()) {
      onInputSubmit(textInput.trim());
      setTextInput('');
    }
  };

  // Handle button option selection
  const handleOptionSelect = (option) => {
    onInputSubmit(option);
  };

  // Handle speech input result
  const handleSpeechResult = (recognizedText) => {
    setTextInput(recognizedText);
    // Optionally auto-submit after speech recognition
    // onInputSubmit(recognizedText);
  };

  // Handle speech listening state change
  const handleListeningChange = (listening) => {
    setIsListening(listening);
  };

  // Render different UI based on robot action
  const renderActionUI = () => {
    if (!robotResponse) return null;

    switch (robotResponse.action) {
      case 'display_message':
        return (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{robotResponse.message}</Text>
          </View>
        );

      case 'request_text_input':
        return (
          <View style={styles.inputContainer}>
            <Text style={styles.messageText}>{robotResponse.message}</Text>
            <View style={styles.textInputRow}>
              <TextInput
                style={styles.textInput}
                value={textInput}
                onChangeText={setTextInput}
                placeholder={robotResponse.prompt || 'Type your response...'}
                placeholderTextColor="#666"
                onSubmitEditing={handleTextSubmit}
                autoFocus={true}
              />
              <SpeechToText
                onSpeechResult={handleSpeechResult}
                isListening={isListening}
                onListeningChange={handleListeningChange}
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleTextSubmit}
                disabled={!textInput.trim()}
              >
                <Text style={styles.submitButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'request_options_input':
        return (
          <View style={styles.optionsContainer}>
            <Text style={styles.messageText}>{robotResponse.message}</Text>
            <View style={styles.optionsGrid}>
              {robotResponse.options?.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionButton}
                  onPress={() => handleOptionSelect(option)}
                >
                  <Text style={styles.optionButtonText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      default:
        return (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>
              {robotResponse.message || 'Waiting for robot...'}
            </Text>
          </View>
        );
    }
  };

  // Render captured image if present
  const renderImage = () => {
    if (robotResponse?.image_base64) {
      return (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${robotResponse.image_base64}` }}
            style={styles.capturedImage}
            resizeMode="contain"
          />
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#ffb300" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}
      
      {renderImage()}
      {renderActionUI()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  messageContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  messageText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 24,
  },
  inputContainer: {
    paddingVertical: 20,
  },
  textInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 10,
  },
  speechButton: {
    backgroundColor: '#ffb300',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  speechButtonText: {
    fontSize: 20,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  optionsContainer: {
    paddingVertical: 20,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 15,
  },
  optionButton: {
    backgroundColor: '#ffb300',
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 12,
    margin: 5,
    minWidth: 80,
  },
  optionButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  capturedImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ffb300',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
}); 