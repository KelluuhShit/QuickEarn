import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import imgOne from '../assets/welcomeImg/imgOne.png';
import imgTwo from '../assets/welcomeImg/imgTwo.png';
import imgEnd from '../assets/welcomeImg/imgEnd.png';

const images = [imgOne, imgTwo, imgEnd]; // Array of images
const imageDescriptions = [
  "Sign up now and start completing tasks to earn rewards!",
  "Explore more ways to earn rewards on our platform!",
  "Verify your account and instantly unlock your rewards!",
];

const WelcomeScreen = ({ navigation }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current; // Create animated value

  useEffect(() => {
    const intervalTime = 4000; // Time each image is displayed

    const startAnimation = () => {
      progressAnim.setValue(0); // Reset animation value
      Animated.timing(progressAnim, {
        toValue: 1, // Animate to 100% width
        duration: intervalTime,
        useNativeDriver: false, // Required for width animation
      }).start();
    };

    startAnimation();
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      startAnimation();
    }, intervalTime);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [currentImageIndex]);

  // Interpolate the animated value for progress width
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>QuickEarn Tasks App</Text>

      <Text style={styles.imageDescription}>
        {imageDescriptions[currentImageIndex]} {/* Display description */}
      </Text>

      <Image
        source={images[currentImageIndex]} // Use the current image
        style={styles.image}
      />

      <View style={styles.progressContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            { width: progressWidth } // Animated width
          ]}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDE8E5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 25,
    color: '#7AB2B2',
    marginBottom: 30,
    fontFamily: 'Rubik-Regular', // Apply Rubik Regular font
    fontWeight: 'bold',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  imageDescription: {
    fontSize: 16,
    color: '#7AB2B2',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Rubik-Regular', // Apply Rubik Regular font
  },
  progressContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#CDE8E5',
    borderRadius: 10,
    marginVertical: 20,
    overflow: 'hidden', // Ensures progress bar doesn't overflow container
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4D869C',
  },
  button: {
    backgroundColor: '#4D869C',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
  },
  buttonText: {
    color: '#EEF7FF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Rubik-Regular', // Apply Rubik Regular font
    textAlign: 'center',
  },
});

export default WelcomeScreen;
