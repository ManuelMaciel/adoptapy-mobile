import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
// My Componentes Import
import OnBoarding from './components/SliderMenu/OnBoarding'
import HomeScreen from './screens/HomeScreen';

const Loading = () => {
  return (
  <View>
    <ActivityIndicator size='large' color="#00ff00"/>
  </View>
  )
}


const App = () => {

  const checkOnBoarding = async () => {
    try {
      const value = await AsyncStorage.getItem('@viewedOnBoarding');
  
      if(value !== null) {
        setViewedOnBoarding(true);
      }
    } catch (error) {
      console.log('Error: @checkOnBoarding '+ error);
    } finally {
      setLoading(false)
    }
  }

  const [ loading, setLoading ] = useState(true);
  const [ viewedOnBoarding, setViewedOnBoarding ] = useState(false);

  useEffect(() => {
    checkOnBoarding();
  }, [])

  return (
    <View style={styles.container}>
      { loading ? <Loading /> : viewedOnBoarding ? <HomeScreen /> : <OnBoarding /> }
      <StatusBar style='auto'/>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App