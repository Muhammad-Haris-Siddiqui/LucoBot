import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CameraTest from '../components/CameraTest';
import VoiceTest from '../components/VoiceTest';

export default function TestScreen() {
  const [currentTest, setCurrentTest] = useState(null);

  const renderTest = () => {
    switch (currentTest) {
      case 'camera':
        return <CameraTest />;
      case 'voice':
        return <VoiceTest />;
      default:
        return (
          <View style={styles.menuContainer}>
            <Text style={styles.title}>LucoBot Test Screen</Text>
            <Text style={styles.subtitle}>Select a test to verify functionality:</Text>
            
            <TouchableOpacity
              style={styles.testButton}
              onPress={() => setCurrentTest('camera')}
            >
              <Text style={styles.testButtonText}>📷 Test Camera</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.testButton}
              onPress={() => setCurrentTest('voice')}
            >
              <Text style={styles.testButtonText}>🎤 Test Voice Recognition</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {currentTest && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentTest(null)}
        >
          <Text style={styles.backButtonText}>← Back to Menu</Text>
        </TouchableOpacity>
      )}
      
      {renderTest()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffb300',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
    color: '#666',
  },
  testButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    minWidth: 250,
    alignItems: 'center',
  },
  testButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 