import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import googleLogo from '../assets/welcomeImg/gLogo.png'

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading

  // Mock sign-in function
  const handleSignIn = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }

    // Mock validation
    if (email === 'test@example.com' && password === 'password123') {
      // On successful sign-in
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Invalid email or password.');
    }
  };

  // Mock Google sign-in function with loader and error
  const handleGoogleSignIn = () => {
    setIsLoading(true);
    
    // Simulate a delay (e.g., for actual Google sign-in)
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Error', 'Google sign-in failed. Please try again later.');
    }, 5000); // 5-second delay
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign In to Your Account</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>OR</Text>

      <TouchableOpacity 
    style={styles.googleButton} 
    onPress={handleGoogleSignIn} 
    disabled={isLoading} // Disable button while loading
  >
    {isLoading ? (
      <ActivityIndicator size="large" color="#4D869C" />
    ) : (
      <Image
        source={googleLogo}
        style={styles.googleLogo}
      />
    )}
    <Text style={styles.googleButtonText}>Sign in with Google</Text>
  </TouchableOpacity>

      

      <TouchableOpacity style={styles.signUpLink} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signUpText}>Don’t have an account? Sign Up</Text>
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
    fontFamily: 'Rubik-Regular', // Apply Rubik Regular font
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
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  googleLogo: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  googleButtonText: {
    color: '#4D869C',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Rubik-Regular', // Apply Rubik Regular font
  },
  signUpLink: {
    marginTop: 30,
  },
  signUpText: {
    color: '#4D869C',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Rubik-Regular', // Apply Rubik Regular font
  },
});

export default SignInScreen;
