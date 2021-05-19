import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler';
// Components List
import AdoptionList from '../components/List/AdoptionList';
import FoundList from '../components/List/FoundList';
import LostList from '../components/List/LostList';
// Material Icons
import { MaterialIcons } from '@expo/vector-icons';
// import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
// config
import config from '../utils/config';

const MainScreen = () => {
  
  const [ petCategoryIndex, setPetCategoryIndex ] = useState(0)

  const categories = [
    {title: 'Perro', icon: 'dog'},
    {title: 'Gato', icon: 'cat'},
    {title: 'Otro', icon: 'alien'}
  ]

  const CategoryList = () => {
    return (
      <View style={styles.categories}>
        {categories.map((category, index) => (
          <View style={{ paddingRight: 10}} key={index}>
            <TouchableOpacity onPress={() => setPetCategoryIndex(index)} style={[styles.button, petCategoryIndex == index && styles.buttonSelected]}>
              <MaterialCommunityIcons name={category.icon} size={29} color={petCategoryIndex == index ? config.white : config.colorTitle} />
              <Text style={[styles.buttonText, , petCategoryIndex == index && styles.buttonTextSelected]}>{category.title}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    )
  }
  console.log(petCategoryIndex)
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        {/* Title */}
        <View>
          <MaterialIcons name='pets' size={40} color={config.colorTitle} />
          <Text style={styles.title}>Adopta un nuevo</Text>
          <Text style={styles.subtitle}>mejor amigo</Text>
        </View>
      </View>
      {/* Categories */}
      <CategoryList />
      {/* List of animals */}
      {/* <FlatList 
        numColumns={2}
      /> */}
      {petCategoryIndex == 0 ? <AdoptionList /> : petCategoryIndex == 1 ? <FoundList /> : petCategoryIndex == 2 ? <LostList /> : null }
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
    color: config.colorTitle,
  },
  categories: {
    marginTop: 30,
    flexDirection: 'row',
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
    backgroundColor: config.colorTitle,
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

export default MainScreen
