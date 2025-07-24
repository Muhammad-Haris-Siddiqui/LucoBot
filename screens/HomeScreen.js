import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import RoboFace from '../components/RoboFace';
import Orientation from 'react-native-orientation-locker';
import ImmersiveMode from 'react-native-immersive';

export default function HomeScreen() {
  useEffect(() => {
    Orientation.lockToLandscape();
    ImmersiveMode.on(); // Enable immersive mode
    return () => {
      ImmersiveMode.off(); // Disable immersive mode on unmount
    };
  }, []);

  return (
    <View style={styles.container}>
      <RoboFace expression="idle" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffb300',
  },
}); 