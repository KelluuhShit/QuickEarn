import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const Loader = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.verifyCont}>
      <Animated.View style={{ transform: [{ rotate: rotation }] }}>
        <Svg height="50" width="50" viewBox="0 0 100 100">
          <Circle
            cx="50"
            cy="50"
            r="45"
            stroke="#333"
            strokeWidth="10"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset="75"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  verifyCont: {
    justifyContent: 'center',
    alignItems: 'center',
    // Add any other styles you need
  },
});

export default Loader;
