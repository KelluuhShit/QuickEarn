import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthNavigator from './navigation/AuthNavigator';
import MainTabNavigator from './navigation/MainTabNavigator';
import { AssessmentProvider } from './context/AssessmentContext';
import * as Font from 'expo-font';
import Toast from 'react-native-toast-message';

// Function to load custom fonts
const loadFonts = async () => {
  await Font.loadAsync({
    'rubik-regular': require('./assets/fonts/Rubik-Regular.ttf'),
    'rubik-bold': require('./assets/fonts/Rubik-Bold.ttf'),
  });
};

const App = () => {
  const { isAuthenticated } = useAuth(); // Accessing auth state
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load fonts asynchronously on component mount
  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null; // Optionally, return a loading spinner or splash screen
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabNavigator /> : <AuthNavigator />} 
      <Toast />
    </NavigationContainer>
  );
};

// Wrapping the app with both AuthProvider and AssessmentProvider
export default function AppWrapper() {
  return (
    <AuthProvider>
      <AssessmentProvider>
        <App />
      </AssessmentProvider>
    </AuthProvider>
  );
}
