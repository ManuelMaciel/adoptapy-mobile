import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableOpacity } from 'react-native-gesture-handler'

const HomeScreen = () => {

  const clearOnBoarding = async () => {
    try {
      await AsyncStorage.removeItem('@viewedOnBoarding');
    } catch (error) {
      console.log('Error @clearOnBoarding '+ error)
    }
  }
  return (
    <View style={styles.container}>
      <Text> HomeScreen </Text>
      <TouchableOpacity onPress={clearOnBoarding}>
        <Text>Clear onBoarding</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default HomeScreen
