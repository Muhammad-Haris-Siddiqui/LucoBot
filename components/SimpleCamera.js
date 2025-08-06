import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import apiService from '../services/apiService';

export default function SimpleCamera({ onRobotResponse, isActive = true }) {
  const [hasPermission, setHasPermission] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock camera implementation for now
  useEffect(() => {
    // Simulate camera permission granted
    setHasPermission(true);
  }, []);

  // Process frame and send to backend
  const processFrame = async (imageData) => {
    if (!isActive || isProcessing) return;

    try {
      setIsProcessing(true);
      
      // For now, create a mock image data
      const mockImageData = {
        uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
        type: 'image/jpeg',
        name: 'frame.jpg',
      };

      const response = await apiService.processFrame(mockImageData);
      
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

  // Continuously capture frames
  useEffect(() => {
    if (!hasPermission || !isActive) return;

    const frameInterval = 1000 / 5; // 5 FPS
    const interval = setInterval(() => {
      processFrame();
    }, frameInterval);

    return () => clearInterval(interval);
  }, [hasPermission, isActive]);

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Camera permission required</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraMock}>
        <Text style={styles.cameraText}>📷 Camera Active</Text>
        <Text style={styles.cameraSubtext}>Mock camera for testing</Text>
      </View>
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
  },
  cameraSubtext: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 5,
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