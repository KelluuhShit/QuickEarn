import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const userComments = [
  "Moodly is a game-changer! I completed a few tasks and got my payment instantly. Highly recommend!",
  "I love how easy it is to earn and withdraw money on Moodly. It's been a great side hustle for me.",
  "Moodly helped me pay off some bills this month. The withdrawal process was smooth and fast!",
  "This app is amazing! I completed tasks in my spare time and was able to withdraw my earnings without any hassle.",
  "Moodly is legit! I’ve already withdrawn twice, and it’s helped me save up for my vacation."
];

const AccountScreen = ({ navigation }) => {
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity

  useEffect(() => {
    const intervalTime = 4000; // Time each comment is displayed

    const intervalId = setInterval(() => {
      // Fade out and in for comments
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ]).start();

      setTimeout(() => {
        setCurrentCommentIndex((prevIndex) => (prevIndex + 1) % userComments.length);
      }, 500); // Change comment after fade out

    }, intervalTime);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [currentCommentIndex]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[styles.commentText, { opacity: fadeAnim }]}
      >
        {userComments[currentCommentIndex]}
      </Animated.Text>

      <View style={styles.progressBarContainer}>
        {/* Progress Bars */}
        {userComments.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressBar,
              { backgroundColor: currentCommentIndex === index ? '#4D869C' : '#CDE8E5' }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDE8E5',
    padding: 20,
  },
  commentText: {
    fontSize: 18,
    color: '#4D869C',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  progressBar: {
    height: 10,
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});

export default AccountScreen;
