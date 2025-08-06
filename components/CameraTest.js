import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function CameraTest() {
  const [hasPermission, setHasPermission] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Simulate camera permission granted
    setHasPermission(true);
  }, []);

  const requestCameraPermission = async () => {
    try {
      // Simulate permission request
      setHasPermission(true);
      Alert.alert('Success', 'Camera permission granted (mock)');
    } catch (error) {
      console.error('Camera permission error:', error);
      Alert.alert('Error', 'Failed to get camera permission');
    }
  };

  const toggleCamera = () => {
    setIsActive(!isActive);
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Camera Test</Text>
        <TouchableOpacity style={styles.button} onPress={requestCameraPermission}>
          <Text style={styles.buttonText}>Request Camera Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraMock}>
        <Text style={styles.cameraText}>
          {isActive ? '📷 Camera Active' : '📷 Camera Inactive'}
        </Text>
        <Text style={styles.cameraSubtext}>Mock camera for testing</Text>
        
        <TouchableOpacity style={styles.button} onPress={toggleCamera}>
          <Text style={styles.buttonText}>
            {isActive ? 'Stop Camera' : 'Start Camera'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraMock: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cameraSubtext: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 30,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  button: {
    backgroundColor: '#ffb300',
    padding: 15,
    borderRadius: 10,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
}); 