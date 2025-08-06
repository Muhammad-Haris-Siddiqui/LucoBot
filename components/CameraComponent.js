import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import apiService from '../services/apiService';

export default function CameraComponent({ onRobotResponse, isActive = true }) {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const devices = useCameraDevices();
  const device = devices.front;

  // Request camera permissions
  const requestCameraPermission = async () => {
    try {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
      if (permission !== 'granted') {
        Alert.alert('Permission Denied', 'Camera permission is required for the robot to work.');
      }
    } catch (err) {
      console.warn(err);
      Alert.alert('Error', 'Failed to request camera permission.');
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  // Process frame and send to backend
  const processFrame = async (imageData) => {
    if (!isActive || isProcessing) return;

    try {
      setIsProcessing(true);
      const response = await apiService.processFrame(imageData);
      
      if (response && onRobotResponse) {
        onRobotResponse(response);
      }
    } catch (error) {
      console.error('Error processing frame:', error);
      // Don't show error for every frame failure, just log it
    } finally {
      setIsProcessing(false);
    }
  };

  // Take picture and process it
  const takePicture = async () => {
    if (cameraRef.current && hasPermission && isActive && device) {
      try {
        const photo = await cameraRef.current.takePhoto({
          qualityPrioritization: 'balanced',
          flash: 'off',
        });
        
        // Convert photo to the format expected by the API
        const imageData = {
          uri: `file://${photo.path}`,
          type: 'image/jpeg',
          name: 'frame.jpg',
        };
        
        await processFrame(imageData);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  // Continuously capture frames
  useEffect(() => {
    if (!hasPermission || !isActive) return;

    const frameInterval = 1000 / 5; // 5 FPS
    const interval = setInterval(() => {
      takePicture();
    }, frameInterval);

    return () => clearInterval(interval);
  }, [hasPermission, isActive]);

  if (!hasPermission || !device) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          {!hasPermission ? 'Camera permission required' : 'Camera not available'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={isActive}
        photo={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1, // Place behind other UI elements
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
}); 