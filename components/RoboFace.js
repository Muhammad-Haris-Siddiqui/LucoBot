import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

const EYE_COLORS = {
  iris: '#1ca3ec',
  sclera: '#b3f0ff',
  pupil: '#111',
  highlight: '#fff',
};

const FACE_COLOR = '#ffb300';

const MOUTH_SHAPES = {
  idle: 'M 80 120 Q 120 140 160 120',
  happy: 'M 80 120 Q 120 170 160 120',
  surprised: 'M 120 120 Q 120 150 120 120',
  listening: 'M 90 120 Q 120 130 150 120',
  speaking: 'M 80 120 Q 120 150 160 120',
  thinking: 'M 90 120 Q 120 125 150 120',
};

const EYE_SIZES = {
  idle: 36,
  happy: 40,
  surprised: 44,
  listening: 36,
  speaking: 36,
  thinking: 36,
};

export default function RoboFace({ expression = 'idle', isSpeaking = false }) {
  // Eye blinking
  const [blink, setBlink] = useState(1);
  const blinkAnim = useRef(new Animated.Value(1)).current;

  // Mouth animation
  const mouthAnim = useRef(new Animated.Value(0)).current;
  const [mouthShape, setMouthShape] = useState(MOUTH_SHAPES[expression] || MOUTH_SHAPES.idle);

  // Eye size based on expression
  const eyeRadius = EYE_SIZES[expression] || EYE_SIZES.idle;

  // Blinking effect
  useEffect(() => {
    let isMounted = true;
    const blinkLoop = () => {
      if (!isMounted) return;
      Animated.sequence([
        Animated.timing(blinkAnim, { toValue: 0.1, duration: 120, useNativeDriver: false }),
        Animated.timing(blinkAnim, { toValue: 1, duration: 120, useNativeDriver: false }),
        Animated.delay(2000 + Math.random() * 2000),
      ]).start(() => blinkLoop());
    };
    blinkLoop();
    return () => { isMounted = false; };
  }, [blinkAnim]);

  // Speaking mouth animation
  useEffect(() => {
    let mouthInterval;
    if (expression === 'speaking' || isSpeaking) {
      mouthInterval = setInterval(() => {
        setMouthShape(prev => prev === MOUTH_SHAPES.speaking ? MOUTH_SHAPES.happy : MOUTH_SHAPES.speaking);
      }, 250);
    } else {
      setMouthShape(MOUTH_SHAPES[expression] || MOUTH_SHAPES.idle);
    }
    return () => clearInterval(mouthInterval);
  }, [expression, isSpeaking]);

  // Eye pulsing for surprised
  const eyeScale = expression === 'surprised' ? 1.2 : 1;

  return (
    <View style={styles.container}>
      <Svg width={320} height={200} viewBox="0 0 240 160">
        {/* Face background */}
        <Ellipse cx="120" cy="80" rx="120" ry="80" fill={FACE_COLOR} />
        {/* Eyes */}
        <Animated.View style={{ position: 'absolute', left: 38, top: 40, transform: [{ scaleY: blinkAnim }, { scale: eyeScale }] }}>
          <Svg width={eyeRadius * 2} height={eyeRadius * 2}>
            <Circle cx={eyeRadius} cy={eyeRadius} r={eyeRadius} fill={EYE_COLORS.sclera} />
            <Circle cx={eyeRadius} cy={eyeRadius} r={eyeRadius * 0.7} fill={EYE_COLORS.iris} />
            <Circle cx={eyeRadius} cy={eyeRadius} r={eyeRadius * 0.4} fill={EYE_COLORS.pupil} />
            <Circle cx={eyeRadius * 1.4} cy={eyeRadius * 0.7} r={eyeRadius * 0.18} fill={EYE_COLORS.highlight} />
            <Circle cx={eyeRadius * 0.7} cy={eyeRadius * 1.2} r={eyeRadius * 0.09} fill={EYE_COLORS.highlight} />
          </Svg>
        </Animated.View>
        <Animated.View style={{ position: 'absolute', left: 158, top: 40, transform: [{ scaleY: blinkAnim }, { scale: eyeScale }] }}>
          <Svg width={eyeRadius * 2} height={eyeRadius * 2}>
            <Circle cx={eyeRadius} cy={eyeRadius} r={eyeRadius} fill={EYE_COLORS.sclera} />
            <Circle cx={eyeRadius} cy={eyeRadius} r={eyeRadius * 0.7} fill={EYE_COLORS.iris} />
            <Circle cx={eyeRadius} cy={eyeRadius} r={eyeRadius * 0.4} fill={EYE_COLORS.pupil} />
            <Circle cx={eyeRadius * 1.4} cy={eyeRadius * 0.7} r={eyeRadius * 0.18} fill={EYE_COLORS.highlight} />
            <Circle cx={eyeRadius * 0.7} cy={eyeRadius * 1.2} r={eyeRadius * 0.09} fill={EYE_COLORS.highlight} />
          </Svg>
        </Animated.View>
        {/* Mouth */}
        <Path d={mouthShape} stroke="#222" strokeWidth={4} fill="none" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: FACE_COLOR,
    flex: 1,
  },
});
