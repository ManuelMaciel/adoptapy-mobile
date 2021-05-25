import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Dimensions, SafeAreaView } from "react-native";
// navigation
import { useNavigation } from '@react-navigation/native';
// config
import config from '../utils/config'
// Material Icons
import { MaterialIcons } from '@expo/vector-icons';

// Get the dimension width from the screen/window
const width = Dimensions.get('window').width - 70

const NewPosts = () => {

  const navigation = useNavigation();
  
  return (
    // <AdoptionCreateScreen navigation={navigation} />
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.header}>
        {/* Title */}
        <View>
          <MaterialIcons name='post-add' size={40} color={config.colorTitle} />
          <Text style={styles.title}>Crea una nueva publicacion</Text>
        </View>
      </View>
      <View style={styles.center}>
        {/* Adoption */}
        <TouchableOpacity style={[styles.button, { backgroundColor: config.colorTitle}]} onPress={() => navigation.navigate('CreatePost', {type: 'adoptions'})}>
          <Text style={{ color: 'white'}}>Quiero dar en adopción.</Text>
        </TouchableOpacity>
        {/* Lost */}
        <TouchableOpacity style={[styles.button, { backgroundColor: config.colorTitle3}]} onPress={() => navigation.navigate('CreatePost', {type: 'lost'})}>
          <Text style={{ color: 'white'}}>¡Ayuda! Perdí a mi mascota.</Text>
        </TouchableOpacity>
        {/* Found */}
        <TouchableOpacity style={[styles.button, { backgroundColor: config.colorTitle2}]} onPress={() => navigation.navigate('CreatePost', {type: 'found'})}>
          <Text style={{ color: 'white'}}>Encontré una mascota perdida</Text>
        </TouchableOpacity>
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
export default NewPosts;