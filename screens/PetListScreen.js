import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import config from '../utils/config'
import { MaterialIcons } from '@expo/vector-icons';
// Get the dimension width from the screen/window
const width = Dimensions.get('window').width - 70
const PetListScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        {/* Title */}
        <View>
          <MaterialIcons name='search' size={40} color={config.colorTitle} />
          <Text style={styles.title}>Navega en las busquedas</Text>
        </View>
      </View>
      <View style={styles.center}>
        {/* Adoption */}
        <TouchableOpacity style={[styles.button, { backgroundColor: config.colorTitle}]} onPress={() => navigation.navigate('PetSearch', {type: 'adoptions', title: 'en adopción'})}>
          <Text style={{ color: 'white'}}>Mascotas en adopcion.</Text>
        </TouchableOpacity>
        {/* Lost */}
        <TouchableOpacity style={[styles.button, { backgroundColor: config.colorTitle3}]} onPress={() => navigation.navigate('PetSearch', {type: 'lost', title: 'perdidas'})}>
          <Text style={{ color: 'white'}}>Mascotas perdidas</Text>
        </TouchableOpacity>
        {/* Found */}
        <TouchableOpacity style={[styles.button, { backgroundColor: config.colorTitle2}]} onPress={() => navigation.navigate('PetSearch', {type: 'found', title: 'encontradas'})}>
          <Text style={{ color: 'white'}}>Mascotas encontradas</Text>
        </TouchableOpacity>
        {/* Rescue */}
        {/* <TouchableOpacity style={[styles.button, { backgroundColor: config.colorTitle2}]} onPress={() => navigation.navigate('CreatePost', {type: 'found'})}>
          <Text style={{ color: 'white'}}>Mascotas rescatadas</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginHorizontal: 10,
    backgroundColor: 'white'
  },  
  header: {
    marginTop: 55,
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
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    width,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10
  }
});
export default PetListScreen;