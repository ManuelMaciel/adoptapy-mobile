import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import AdoptionCreateScreen from './mascot/adoption/AdoptionCreateScreen';
// navigation
import { useNavigation } from '@react-navigation/native';
// config
import config from '../utils/config'

// Get the dimension width from the screen/window
const width = Dimensions.get('window').width - 70

const NewPosts = () => {

  const navigation = useNavigation();
  
  return (
    // <AdoptionCreateScreen navigation={navigation} />
    <View style={styles.center}>
      {/* Adoption */}
      <TouchableOpacity style={[styles.button, { backgroundColor: config.colorTitle2}]} onPress={() => console.log('press')}>
        <Text style={{ color: 'white'}}>Quiero dar en adopción.</Text>
      </TouchableOpacity>
      {/* Lost */}
      <TouchableOpacity style={[styles.button, { backgroundColor: config.colorTitle3}]}>
        <Text style={{ color: 'white'}}>¡Ayuda! Perdí a mi mascota.</Text>
      </TouchableOpacity>
      {/* Found */}
      <TouchableOpacity style={[styles.button, { backgroundColor: config.colorTitle}]}>
        <Text style={{ color: 'white'}}>Encontré una mascota perdida</Text>
      </TouchableOpacity>
    </View>
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