import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

import AdoptionCreate from './screens/mascot/adoption/AdoptionCreateScreen';
import AdoptionList from './screens/mascot/adoption/AdoptionListScreen';
import AdoptionDetails from './screens/mascot/adoption/AdoptionDetailsScreen';

function MyStack() {
  return (
    <SafeAreaProvider>
      <Stack.Navigator>
        <Stack.Screen name='AdoptionCreate' component={AdoptionCreate} />
        <Stack.Screen name='AdoptionList' component={AdoptionList} />
        <Stack.Screen name='AdoptionDetails' component={AdoptionDetails} />
      </Stack.Navigator>
    </SafeAreaProvider>
  )
}

export default function screen() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}