import React from 'react';
// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Main App Screens Stack
import OnBoardingScreen from './OnBoardingScreen'
import HomeScreen from './HomeScreen'
// New Post Screen
import NewPosts from './NewPost';
// Shelters Screen
import Shelters from './Shelters';

// Stack Navigator
const Stack = createStackNavigator();

function OnBoardingScreenStack() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='OnBoarding' component={OnBoardingScreen}/>
    </Stack.Navigator>
  )
}

function MainScreenStack() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Navigator>
  )
}

function PostScreenStack() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='NewPosts' component={NewPosts} />
    </Stack.Navigator>
  )
}

function ShelterScreenStack() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Shelters' component={Shelters} />
    </Stack.Navigator>
  )
}

// Tab Navigator
const Tab = createBottomTabNavigator();
function TabStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='HomeScreen' component={MainScreenStack} />
      <Tab.Screen name='NewPostScreen' component={PostScreenStack} />
      <Tab.Screen name='ShelterScreen' component={ShelterScreenStack} />
    </Tab.Navigator>
  )
}

function AppStack() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='OnBoardingScreenStack' component={OnBoardingScreenStack} />
      <Stack.Screen name='TabStack' component={TabStack} />
    </Stack.Navigator>
  )
}

export default function ScreenStack() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}