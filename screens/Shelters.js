import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import RescueList from '../components/List/RescueList';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import config from '../utils/config';

const Shelter = () => {
  const navigation = useNavigation()
  const [ petCategoryIndex, setPetCategoryIndex ] = useState('Perro')
  const categories = [
    {title: 'Perro', icon: 'dog'},
    {title: 'Gato', icon: 'cat'},
    {title: 'Otro', icon: 'rabbit'}
  ]
  const CategoryList = () => {
    return (
      <View style={styles.categories}>
        {categories.map((category, index) => (
          <View style={{ paddingRight: 10}} key={index}>
            <TouchableOpacity onPress={() => setPetCategoryIndex(category.title)} style={[styles.button, petCategoryIndex == category.title && styles.buttonSelected]}>
              <MaterialCommunityIcons name={category.icon} size={29} color={petCategoryIndex == category.title ? config.white : config.colorTitle2} />
              <Text style={[styles.buttonText, , petCategoryIndex == category.title && styles.buttonTextSelected]}>{category.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        {/* Title */}
        <View>
          <MaterialCommunityIcons name='charity' size={40} color={config.colorTitle2} />
          <Text style={styles.title}>Ayuda a mascotas</Text>
          <Text style={styles.subtitle}>rescatadas</Text>
        </View>
      </View>
      {/* Categories */}
      <CategoryList />
      {/* Rescue List */}
      <RescueList 
        petCategoryIndex={petCategoryIndex}
        navigation={navigation}
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: config.colorDescription,
    paddingTop: 20,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: config.colorTitle2,
  },
  categories: {
    marginTop: 30,
    flexDirection: 'row',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 10,
    // Shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
    alignItems: 'center'
  },
  buttonSelected: {
    backgroundColor: config.colorTitle2,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 10,
    // Shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
    alignItems: 'center'
  },
  // text
  buttonText: {
    fontSize: 13,
    color: config.colorDescription,
    textAlign: 'center',
  },
  buttonTextSelected: {
    fontSize: 13,
    color: config.white,
    textAlign: 'center',
  }
})

export default Shelter
