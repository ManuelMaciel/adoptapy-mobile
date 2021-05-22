import React from 'react'
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native'
// config
import config from '../../utils/config';
// Material icons
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
// Linking
import * as Linking from 'expo-linking';

const PetDetails = ({ route, navigation }) => {
  // Extract the prop from the adoption list 
  const { item  } = route.params;
  console.log(item)
  // function to send message in whatsapp 
  function whatsapp() {
    Linking.openURL(`whatsapp://send?text=Hola%2C%20te%20escribo%20por%20tu%20post%20en%20AdoptaPY%20sobre%20la%20adopción%20de%20${item.petData.petName}.&phone=595${item.petContact.number}`)
  }
  // function to open the call app 
  function call() {
    Linking.openURL(`tel:${item.petContact.number}`)
  }
  // function to capitalize the first letter
  function capitalize( val ) {
    return val.toLowerCase()
              .trim()
              .split(' ')
              .map( v => v[0].toUpperCase() + v.substr(1) )
              .join(' ');  
  }
  

  return (
    <ScrollView style={styles.screenDetails}>
      <View style={styles.header}>
        <MaterialCommunityIcons name='arrow-left-bold' size={32} color={config.colorTitle} onPress={() => navigation.goBack()} />
        <MaterialCommunityIcons name='heart-circle' size={32} color={config.colorIcon} />
      </View>
      <View style={styles.imageContainer}>
        {/* TODO: hacer que se un modal con carrousel */}
          <View style={styles.shadow}> 
            <Image style={styles.image} resizeMode='contain' source={{uri: item.petData.petPictures[0]}}></Image>
          </View>
      </View>
      <View style={styles.descriptionContainer}>
        <View style={{ flexDirection: 'row', marginBottom: 15, justifyContent: 'center' }}>
          {/* Sexo, Edad, Raza */}
          <View style={styles.descriptionData}>
            <View style={styles.minicard}>
              <Text style={styles.minicardTitle}>Sexo</Text>
              <Text style={styles.minicardSubTitle}>{capitalize(item.petData.petSex)}</Text>
            </View>
            <View style={styles.minicard}>
              <Text style={styles.minicardTitle}>Edad</Text>
              <Text style={styles.minicardSubTitle}>{item.petData.petAge.year == 0 ? <Text>{item.petData.petAge.month} Meses</Text> : <Text>{item.petData.petAge.year} Años</Text>}</Text>
            </View>
            <View style={styles.minicard}>
              <Text style={styles.minicardTitle}>Raza</Text>
              <Text style={styles.minicardSubTitle}>{capitalize(item.petData.petBreed)}</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 15, justifyContent: 'center' }}>
          {/* Vacunas y esterilizacion */}
          <View style={styles.descriptionData}>
            <View style={styles.minicard}>
              <Text style={styles.minicardTitle}>¿Tiene vacunas?</Text>
              <Text style={styles.minicardSubTitle}>
                {item.petData.petVaccines
                ?<MaterialCommunityIcons name="marker-check" size={24} color='#35AC5E' />
                :<MaterialCommunityIcons name="close-circle" size={24} color='#FF3860' />
                }  
              </Text>
            </View>
            <View style={styles.minicard}>
              <Text style={styles.minicardTitle}>¿Está esterilizado?</Text>
              <Text style={styles.minicardSubTitle}>
                {item.petData.petSterilized
                ?<MaterialCommunityIcons name="marker-check" size={24} color='#35AC5E' />
                :<MaterialCommunityIcons name="close-circle" size={24} color='#FF3860' />
                }
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'column', marginBottom: 15, justifyContent: 'flex-end' }} >
          {/* Description */}
          <Text style={styles.descriptionTitle}>Descripción</Text>
          <Text style={styles.descriptionContent}>{item.petData.petDescription}</Text>
        </View>
        <View>
          {/* Mapa y ciudad */}
        </View>
        <Text style={{ marginHorizontal: 10, fontSize: 20, color: config.colorTitle }}>¿Te interesa {capitalize(item.petData.petName)}?</Text>
        <View style={{ flexDirection: 'row', marginBottom: 50, justifyContent: 'space-between', marginTop: 10}}>
          {/* Contacto */}
          <View>
            <Text style={styles.contact}>Contacta con <Text style={{ color: config.colorDescription}}>{capitalize(item.petContact.name)}</Text></Text>
            <Text style={styles.contact}><MaterialCommunityIcons name="map-marker-radius-outline" size={18} color="#F50057" /> {capitalize(item.petData.petCity)}</Text>
          </View>
          {item.petContact.whatsapp 
          ?
          <TouchableOpacity onPress={() => whatsapp()}>
            <View style={styles.whatsapp}>
              <MaterialCommunityIcons name="whatsapp" size={28} color='white' />
            </View>
          </TouchableOpacity>
          :
          <TouchableOpacity onPress={() => call()}>
            <View style={styles.phone}>
              <MaterialCommunityIcons name="phone" size={28} color='white' />
            </View>
          </TouchableOpacity>
          }
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screenDetails: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 30, 
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  imageContainer: {
    flex: 0.45,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
  },
  image: {
    alignSelf: 'center',
    height: 350, 
    width: 300, 
    maxWidth: 300, 
    maxHeight: 350,
    borderRadius: 10,
  },
  descriptionContainer: {
    flex: 0.55,
    backgroundColor: '#F9F9F9',
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 30,
  },
  descriptionData: {
    flexDirection: 'row'
  },
  minicard: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
    // Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 1,
  },
  minicardTitle: {
    fontWeight: '500',
    fontSize: 15,
    color: 'black'
  },
  minicardSubTitle: {
    fontWeight: '500',
    fontSize: 15,
    color: config.colorDescription
  },
  descriptionTitle: {
    marginHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: config.colorTitle,
    paddingBottom: 5,
  },
  descriptionContent: {
    fontSize: 16,
    color: 'black',
    marginHorizontal: 10,
  },
  contact: {
    fontSize: 16,
    color: 'black',
    marginHorizontal: 10,
    marginBottom: 15
  },
  whatsapp: {
    backgroundColor: '#00BF77',
    marginRight: 30,
    padding: 15,
    borderRadius: 50
  },
  phone: {
    backgroundColor: '#536DFE',
    marginRight: 30,
    padding: 15,
    borderRadius: 50
  }
});

export default PetDetails
