// navigation/AuthNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/welcomeScreen';
import SignInScreen from '../screens/signInScreen';
import SignUpScreen from '../screens/signupScreen';
// import MainTabNavigator from './MainTabNavigator';

const AuthStack = createStackNavigator();

const AuthNavigator = ({ setIsSignedIn }) => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    <AuthStack.Screen name="SignIn">
      {props => <SignInScreen {...props} setIsSignedIn={setIsSignedIn} />}
    </AuthStack.Screen>
    <AuthStack.Screen name="SignUp">
      {props => <SignUpScreen {...props} setIsSignedIn={setIsSignedIn} />}
    </AuthStack.Screen>
  </AuthStack.Navigator>
);

export default AuthNavigator;
