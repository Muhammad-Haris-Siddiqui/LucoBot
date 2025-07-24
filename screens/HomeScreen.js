import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import RoboFace from '../components/RoboFace';
import Orientation from 'react-native-orientation-locker';

export default function HomeScreen() {
  useEffect(() => {
    Orientation.lockToLandscape();
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
    backgroundColor: '#ffb300', // Orange background
  },
}); 