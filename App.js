import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthNavigator from './navigation/AuthNavigator';
import MainTabNavigator from './navigation/MainTabNavigator';
import * as Font from 'expo-font';
import Toast from 'react-native-toast-message';

const loadFonts = async () => {
  await Font.loadAsync({
    'rubik-regular': require('./assets/fonts/Rubik-Regular.ttf'),
    'rubik-bold': require('./assets/fonts/Rubik-Bold.ttf'),
    // Add more font weights if needed
  });
};

const App = () => {
  const { isAuthenticated } = useAuth();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabNavigator /> : <AuthNavigator />}
      <Toast />
    </NavigationContainer>
  );
};

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
