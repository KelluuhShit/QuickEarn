import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../mainscreens/HomeScreen';
import LearnScreen from '../mainscreens/LearnScreen';
import RewardScreen from '../mainscreens/RewardScreen';
import AccountScreen from '../mainscreens/AccountScreen';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Using Ionicons for example

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Assessment':
              iconName = 'document-text-outline';
              break;
            case 'Wallet':
              iconName = 'wallet';
              break;
            case 'Account':
              iconName = 'person';
              break;
            default:
              iconName = 'circle';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4D869C',
        tabBarInactiveTintColor: '#7AB2B2',
        tabBarStyle: {
          backgroundColor: '#EEF7FF',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Assessment" component={LearnScreen} />
      <Tab.Screen name="Wallet" component={RewardScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
