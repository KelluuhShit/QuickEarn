// mainscreens/LearnScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const LearnScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Learn Screen</Text>
      <Text style={styles.content}>
        Welcome to the Learn section! Here you will find resources and information to help you get started and improve your skills. 
        Explore the different topics and learn at your own pace.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDE8E5',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4D869C',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    color: '#7AB2B2',
    textAlign: 'center',
  },
});

export default LearnScreen;
