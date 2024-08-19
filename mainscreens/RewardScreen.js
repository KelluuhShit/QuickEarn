// mainscreens/RewardScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const RewardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reward Screen</Text>
      <Text style={styles.content}>
        Here you can check your rewards and track your progress. Earn rewards by completing tasks and surveys, and see your achievements here.
      </Text>
      <Button
        title="Claim Reward"
        onPress={() => {/* Logic to claim reward */}}
        color="#4D869C"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CDE8E5',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 20,
  },
});

export default RewardScreen;
