// navigation/AuthNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/welcomeScreen';
import SignInScreen from '../screens/signInScreen';
import SignUpScreen from '../screens/signupScreen';
import MainTabNavigator from './MainTabNavigator';

const AuthStack = createStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    <AuthStack.Screen name="Main" component={MainTabNavigator} />
  </AuthStack.Navigator>
);

export default AuthNavigator;
