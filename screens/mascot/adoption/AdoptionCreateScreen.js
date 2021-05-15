import React, { useState} from 'react';
import { View, TextInput, Button, ScrollView, StyleSheet, Text } from 'react-native'


const AdoptionCreateScreen = () => {

  const [ adoptionForm, setAdoptionForm ] = useState({
    petName: '',
    petSpecie: '',
    petAge: '',
    petSize: '',
    petSex: '',
    petBreed: '',
    petDescription: '',
    petCity: '',
    latitude: '',
    longitude: '',
    name: '',
    number: '',
  });
  const [selectedLanguage, setSelectedLanguage] = useState();
  const handleChangeText = (name, value) => {
    setAdoptionForm({ ...adoptionForm, [name]: value})
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput 
        placeholder='Nombre de la mascota' 
        onChangeText={(value) => handleChangeText('petName', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
        placeholder='Tipo de mascota' 
        onChangeText={(value) => handleChangeText('petSpecie', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
        placeholder='Edad de la mascota' 
        onChangeText={(value) => handleChangeText('petAge', value)}
        />
      </View>
      <View style={styles.inputGroup}>
      <TextInput 
        placeholder='Tamanio de la mascota' 
        onChangeText={(value) => handleChangeText('petSize', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
        placeholder='Sexo' 
        onChangeText={(value) => handleChangeText('petSex', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
        placeholder='Raza de la mascota' 
        onChangeText={(value) => handleChangeText('petBreed', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
        placeholder='Descripcion' 
        onChangeText={(value) => handleChangeText('petDescription', value)}
        multiline
        numberOfLines={4}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
        placeholder='Ciudad' 
        onChangeText={(value) => handleChangeText('petCity', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
        placeholder='Latitude posicional' 
        onChangeText={(value) => handleChangeText('latitude', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
        placeholder='Longitud posicional' 
        onChangeText={(value) => handleChangeText('longitude', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
        placeholder='Nombre de contacto' 
        onChangeText={(value) => handleChangeText('name', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput 
        placeholder='Numero de contacto' 
        onChangeText={(value) => handleChangeText('number', value)}
        />
      </View>
      <View>
        <Button 
          title='Guardar Mascota' 
          onPress={() => console.log(adoptionForm)}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15, 
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  }
})

export default AdoptionCreateScreen