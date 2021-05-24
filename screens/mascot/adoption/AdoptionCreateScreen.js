import React, { useState} from 'react';
import { View, TextInput, Button, ScrollView, StyleSheet, Text } from 'react-native'
import PetForm from '../../../components/Form/PetForm';

const AdoptionCreateScreen = () => {
  return (
    <PetForm />
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