// mainscreens/AccountScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const AccountScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account Screen</Text>
      <Text style={styles.content}>
        Manage your account settings and profile here. Update your information and adjust your preferences to suit your needs.
      </Text>
      <Button
        title="Edit Profile"
        onPress={() => {/* Logic to edit profile */}}
        color="#4D869C"
      />
      <Button
        title="Log Out"
        onPress={() => {/* Logic to log out */}}
        color="#4D869C"
        style={styles.logoutButton}
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
  logoutButton: {
    marginTop: 20,
  },
});

export default AccountScreen;
