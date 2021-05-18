import React from 'react';
// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
// Screens 
import OnBoardingScreen from './screens/OnBoardingScreen'
import HomeScreen from './screens/HomeScreen'

const Stack = createStackNavigator();

// import AdoptionCreate from './screens/mascot/adoption/AdoptionCreateScreen';
// import AdoptionList from './screens/mascot/adoption/AdoptionListScreen';
// import AdoptionDetails from './screens/mascot/adoption/AdoptionDetailsScreen';

function AppStack() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='onBoarding' component={OnBoardingScreen}/>
      <Stack.Screen name="Home" component={HomeScreen} />
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