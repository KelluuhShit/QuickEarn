import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import createImg from '../assets/logInImg/create.png'

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setIsAuthenticated } = useAuth();

  const handleSignUp = () => {
    if (email === '' || password === '' || confirmPassword === '') {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // Mock sign-up process
    if (email === 'test@example.com' && password.length >= 6) {
      setIsAuthenticated(true); // Set authenticated state to true
    } else {
      Alert.alert('Error', 'Sign-up failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={createImg}
        style={styles.createImg}
      />
      <Text style={styles.header}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#7AB2B2"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#7AB2B2"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#7AB2B2"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity style={styles.signInLink} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.signInText}>Already have an account? Sign In</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7AB2B2',
    marginBottom: 40,
    fontFamily: 'Rubik-Regular', // Apply Rubik Regular font
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#EEF7FF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#4D869C',
  },
  button: {
    width: '100%',
    backgroundColor: '#4D869C',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#EEF7FF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Rubik-Regular', // Apply Rubik Regular font
  },
  orText: {
    fontSize: 16,
    color: '#7AB2B2',
    marginBottom: 20,
    fontFamily: 'Rubik-Regular', // Apply Rubik Regular font
  },
  signInLink: {
    marginTop: 30,
    
  },
  signInText: {
    color: '#4D869C',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Rubik-Regular', // Apply Rubik Regular font
  },
  createImg:{
    width: 200,
    height: 200,
  }
});

export default SignUpScreen;
