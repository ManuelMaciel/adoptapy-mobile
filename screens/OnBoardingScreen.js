import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
// My Componentes Import
import OnBoarding from '../components/SliderMenu/OnBoarding'
import HomeScreen from './HomeScreen';
// React Navigations
import { useNavigation } from '@react-navigation/native';

const Loading = () => {
  return (
  <View>
    <ActivityIndicator size='large' color="#00ff00"/>
  </View>
  )
}

const OnBoardingScreen = () => {

  const navigation = useNavigation();

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
    <> 
    <StatusBar style='dark' />
    <View style={styles.container}>
      { loading ? <Loading /> : viewedOnBoarding ? <HomeScreen /> : <OnBoarding navigation={navigation} /> }
    </View>
    </>
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

export default OnBoardingScreen