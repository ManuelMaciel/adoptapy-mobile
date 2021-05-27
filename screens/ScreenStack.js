import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import config from '../utils/config';
import OnBoardingScreen from './OnBoardingScreen';
import HomeScreen from './HomeScreen';
import MainScreen from './MainScreen';
import PetDetails from '../components/PetDetails/PetDetails'
import PetAllDetails from '../components/PetDetails/PetAllDetails'
import NewPosts from './NewPost';
import AdoptionCreateScreen from './mascot/adoption/AdoptionCreateScreen'
import PetListScreen from './PetListScreen';
import Shelters from './Shelters';
import PetRescueDetails from '../components/PetDetails/PetRescueDetails'
import PetSearch from '../components/Search/PetSearch';
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
      <Stack.Screen name='Home' component={MainScreen} />
      <Stack.Screen name='PetDetails' component={PetDetails} />
    </Stack.Navigator>
  )
}
function PostScreenStack() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='NewPosts' component={NewPosts} />
      <Stack.Screen name='CreatePost' component={AdoptionCreateScreen} />
    </Stack.Navigator>
  )
}
function PetScreenStack() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='PetOptions' component={PetListScreen} />
      <Stack.Screen name='PetSearch' component={PetSearch} />
      <Stack.Screen name='PetAllDetails' component={PetAllDetails} />
    </Stack.Navigator>
  )
}
function ShelterScreenStack() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Shelters' component={Shelters} />
      <Stack.Screen name='PetRescueDetails' component={PetRescueDetails} />
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
            // bottom: 40,
            // marginHorizontal: 20,
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
              <MaterialCommunityIcons name="compass-outline" size={30} color={focused ? config.colorTitle : config.colorNoFocused} />
            </View>
          )
        }}/>
        <Tab.Screen name='NewPostScreen' component={PostScreenStack} options={{ 
          tabBarIcon: ({ focused }) => (
            <View
              style={{position: 'absolute'}}
            >
              <MaterialCommunityIcons name="heart-plus-outline" size={30} color={focused ? config.colorTitle : config.colorNoFocused} />
            </View>
          )
        }}/>
        <Tab.Screen name='PetOptionScreen' component={PetScreenStack} options={{ 
          tabBarIcon: ({ focused }) => (
            <View
              style={{position: 'absolute'}}
            >
              <MaterialCommunityIcons name="bone" size={30} color={focused ? config.colorTitle : config.colorNoFocused} />
            </View>
          )
        }}/>
        <Tab.Screen name='ShelterScreen' component={ShelterScreenStack} options={{ 
          tabBarIcon: ({ focused }) => (
            <View
              style={{position: 'absolute'}}
            >
              <MaterialCommunityIcons name="hand-heart" size={30} color={focused ? config.colorTitle2 : config.colorNoFocused} />
            </View>
          )
        }}/>
      </Tab.Navigator>
    </>
  )
}
// Stack Navigation With OnBoardingScreen
const AppStack = () => {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='TabStack' component={TabStack} /> 
      <Stack.Screen name='OnBoardingScreenStack' component={OnBoardingScreenStack} /> 
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