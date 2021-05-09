import React from 'react';
import { View, TextInput, Button, ScrollView, StyleSheet } from 'react-native'

const AdoptionListScreen = () => {
  return (
    <ScrollView>
      <View>
        <TextInput placeholder='Nombre de la mascota' />
      </View>
      <View>
        <TextInput placeholder='Raza de la mascota' />
      </View>
      <View>
        <TextInput placeholder='Edad de la mascota' />
      </View>
      <View>
        <Button title='Guardar Mascota' />
      </View>
    </ScrollView>
  )
}

export default AdoptionListScreen
