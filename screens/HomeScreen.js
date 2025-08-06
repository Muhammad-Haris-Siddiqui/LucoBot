import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import RoboFace from '../components/RoboFace';
import SimpleCamera from '../components/SimpleCamera';
import RobotInterface from '../components/RobotInterface';
import Orientation from 'react-native-orientation-locker';
import ImmersiveMode from 'react-native-immersive';
import apiService from '../services/apiService';

export default function HomeScreen({ navigation }) {
  const [robotResponse, setRobotResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    Orientation.lockToLandscape();
    ImmersiveMode.on(); // Enable immersive mode
    
    // Check robot connection on startup
    checkRobotConnection();
    
    return () => {
      ImmersiveMode.off(); // Disable immersive mode on unmount
    };
  }, []);

  // Check if robot backend is available
  const checkRobotConnection = async () => {
    try {
      setIsLoading(true);
      const response = await apiService.checkRobotStatus();
      setRobotResponse(response);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect to robot:', error);
      setIsConnected(false);
      Alert.alert(
        'Connection Error',
        'Unable to connect to the robot backend. Please check if the backend server is running.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle robot responses from camera frames
  const handleRobotResponse = (response) => {
    if (response && response.message) {
      setRobotResponse(response);
      
      // Update robot face expression based on state
      updateRobotExpression(response.state);
    }
  };

  // Handle user input submission
  const handleInputSubmit = async (inputText) => {
    try {
      setIsLoading(true);
      const response = await apiService.submitInput(inputText);
      setRobotResponse(response);
      updateRobotExpression(response.state);
    } catch (error) {
      console.error('Error submitting input:', error);
      Alert.alert('Error', 'Failed to send your response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update robot face expression based on robot state
  const updateRobotExpression = (state) => {
    // Map robot states to face expressions
    const stateToExpression = {
      'IDLE': 'idle',
      'CONFIRMING_IDENTITY': 'thinking',
      'ENROLL_NAME': 'listening',
      'WAITING_FOR_OFFICIAL': 'thinking',
      'SPEAKING': 'speaking',
      'LISTENING': 'listening',
      'SURPRISED': 'surprised',
      'HAPPY': 'happy',
    };

    // You can add logic here to update the robot face expression
    // For now, we'll use the default expression
  };

  // Get current robot expression based on state
  const getRobotExpression = () => {
    if (!robotResponse) return 'idle';
    
    const stateToExpression = {
      'IDLE': 'idle',
      'CONFIRMING_IDENTITY': 'thinking',
      'ENROLL_NAME': 'listening',
      'WAITING_FOR_OFFICIAL': 'thinking',
      'SPEAKING': 'speaking',
      'LISTENING': 'listening',
      'SURPRISED': 'surprised',
      'HAPPY': 'happy',
    };

    return stateToExpression[robotResponse.state] || 'idle';
  };

  return (
    <View style={styles.container}>
      {/* Test button */}
      <TouchableOpacity
        style={styles.testButton}
        onPress={() => navigation.navigate('Test')}
      >
        <Text style={styles.testButtonText}>🧪 Test</Text>
      </TouchableOpacity>

      {/* Camera component for continuous frame capture */}
      <SimpleCamera 
        onRobotResponse={handleRobotResponse}
        isActive={isConnected}
      />
      
      {/* Robot face with dynamic expression */}
      <View style={styles.faceContainer}>
        <RoboFace 
          expression={getRobotExpression()}
          isSpeaking={robotResponse?.action === 'display_message'}
        />
      </View>

      {/* Robot interface for user interactions */}
      <RobotInterface
        robotResponse={robotResponse}
        onInputSubmit={handleInputSubmit}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffb300',
  },
  faceContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  testButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  testButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 