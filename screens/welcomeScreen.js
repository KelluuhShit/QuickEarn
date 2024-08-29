import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import imgOne from '../assets/welcomeImg/imgOne.png';
import imgTwo from '../assets/welcomeImg/imgTwo.png';
import imgEnd from '../assets/welcomeImg/imgEnd.png';
import { Ionicons } from '@expo/vector-icons';

const images = [imgOne, imgTwo, imgEnd]; // Array of images
const imageDescriptions = [
  "Sign up now and start completing tasks to earn rewards!",
  "Explore more ways to earn rewards on our platform!",
  "Verify your account and instantly unlock your rewards!",
];

const WelcomeScreen = ({ navigation }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity: 1

  useEffect(() => {
    const intervalTime = 4000; // Time each image is displayed

    const intervalId = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500, // Fade out duration
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500, // Fade in duration
          useNativeDriver: true,
        })
      ]).start();

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 500); // Change image after fade out

    }, intervalTime);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [currentImageIndex]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Moodly Tasks App</Text>

      <Text style={styles.imageDescription}>
        {imageDescriptions[currentImageIndex]} {/* Display description */}
      </Text>

      <Animated.Image
        source={images[currentImageIndex]} // Use the current image
        style={[styles.image, { opacity: fadeAnim }]} // Apply animation
      />

      {/* Radio Buttons */}
      <View style={styles.radioButtonContainer}>
        {images.map((_, index) => (
          <Ionicons
            key={index}
            name={currentImageIndex === index ? "radio-button-on" : "radio-button-off"}
            size={22}
            color={currentImageIndex === index ? "#4D869C" : "#4D869C"}
            style={styles.radioButton}
          />
        ))}
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
    // fontFamily: 'Rubik-Regular', 
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
    // fontFamily: 'Rubik-Regular', 
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  radioButton: {
    marginHorizontal: 10, // Adjust spacing between radio buttons
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
    // fontFamily: 'Rubik-Regular', 
    textAlign: 'center',
  },
});

export default WelcomeScreen;
