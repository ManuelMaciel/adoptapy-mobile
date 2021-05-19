import React, { useRef } from 'react';
// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions, View } from 'react-native';
import Animated from 'react-native-reanimated';
// FontAwesome5 Icons
import { FontAwesome5 } from '@expo/vector-icons'; 
// config
import config from '../utils/config'
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
    <>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          // Floating Tab Bar...
          style: {
            backgroundColor: 'white',
            position: 'absolute',
            bottom: 40,
            marginHorizontal: 20,
            // Max Height...
            height: 60,
            borderRadius: 10,
            // Shadow...
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: {
              width: 10,
              height: 10
            },
            paddingHorizontal: 20,
          }
        }}
      >
        <Tab.Screen name='HomeScreen' component={MainScreenStack} options={{ 
          tabBarIcon: ({ focused }) => (
            <View
              style={{position: 'absolute'}}
            >
              <FontAwesome5 name='compass' size={30} color={focused ? config.colorTitle : config.colorNoFocused} />
            </View>
          )
        }}/>
        <Tab.Screen name='NewPostScreen' component={PostScreenStack} options={{ 
          tabBarIcon: ({ focused }) => (
            <View
              style={{position: 'absolute'}}
            >
              <FontAwesome5 name='plus' size={35} color={focused ? config.colorTitle : config.colorNoFocused}/>
            </View>
          )
        }}/>
        <Tab.Screen name='ShelterScreen' component={ShelterScreenStack} options={{ 
          tabBarIcon: ({ focused }) => (
            <View
              style={{position: 'absolute'}}
            >
              <FontAwesome5 name='dog' size={30} color={focused ? config.colorTitle : config.colorNoFocused} />
            </View>
          )
        }}/>
      </Tab.Navigator>
    </>
  )
}
// Stack Navigation With OnBoardingScreen
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