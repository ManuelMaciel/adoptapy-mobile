import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, ScrollView, StyleSheet, Text, Dimensions, Image, Alert } from 'react-native'
// Picker
import {Picker} from '@react-native-picker/picker';
// Multiple step library
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
// Numeric Input
import NumericInput from 'react-native-numeric-input'
// CheckBox
import CheckBox from '@react-native-community/checkbox';
// image picker
import * as ImagePicker from 'expo-image-picker';
// Expo Maps
import MapView, { Marker } from 'react-native-maps';
// Location
import * as Location from 'expo-location';
// config
import config from '../../utils/config';
// Validation
import validation from 'check-validation'

const width = Dimensions.get('window').width
const PetForm = () => {

  const [ adoptionForm, setAdoptionForm ] = useState({
    petName: '',
    petSpecie: 'perro',
    petSize: 'pequeño',
    petSex: 'macho',
    petBreed: '',
    month: 0,
    year: 0,
    petVaccines: false,
    petSterilized: false,
    petDescription: '',
    petPictures: null,
    petCity: 'Asunción',
    latitude: -25.2819,
    longitude: -57.635,
    marker: null,
    name: '',
    number: 0,
    whatsapp: false,
  });
  const [ error, setError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('')

  const handleChangeText = (name, value) => {
    setAdoptionForm({ ...adoptionForm, [name]: value})
  }

  const onNextStepFirst = () => {

    let rulesOneStep = {
      petName: {
        rules: "required",
        required: "El nombre del animalito es requerido"
      },
      petSpecie: {
        rules: "required",
        required: "La especie del animalito es requerido"
      },
      petSize: {
        rules: "required",
        required: "El tamaño del animalito es requerida"
      },
      petSex: {
        rules: "required",
        required: "El sexo del animalito es requerido"
      },
      petBreed : {
        rules: "required",
        required: "La raza del animalito es requerido"
      }
    }

    const check = validation(adoptionForm, rulesOneStep)

    if (check.result) {
      //success
      setError(false)
    } else {
      //fail
      setError(true)
      setErrorMessage(check.message)
      return;
    }
  }

  const onNextStepSecond = () => {

    let rulesSecondStep = {
      month: {
        rules: "number|min[0]|max[11]",
        number: "El numero es incorrecto",
        min: "El numero minimo debe ser mayor a 0 ",
        max: "El numero maximo debe ser menor a 11"
      },
      year: {
        rules: "number|min[0]|max[30]",
        number: "El numero es incorrecto",
        min: "El numero minimo debe ser mayor a 0 ",
        max: "El numero maximo debe ser menor a 11"
      },
      petDescription : {
        rules: "required|minLength[10]|maxLength[150]",
        required: "La descripcion es requerida",
        minLength: "La descripcion debe tener un minimo 10 caracteres",
        maxLength: "La descripcion debe tener un maximo de 150"
      },
      petPictures : {
        rules: "required",
        required: "Debe subir una imagen del animalito"
      }
    }

    const check = validation(adoptionForm, rulesSecondStep)

    if (check.result) {
      //success
      setError(false)
      if(adoptionForm.month === 0 && adoptionForm.year === 0){
        setError(true)
        setErrorMessage('No puedes dejar los dos campos de mes y año vacios')
        return;
      }
    } else {
      //fail
      setError(true)
      setErrorMessage(check.message)
      return;
    }
  }

  const onNextStepThird= () => {

    let rulesThirdStep = {
      name: {
        rules: "required", 
        required: "El nombre de contacto es necesario"
      },
      number: {
        rules: "required|number|length[10]",
        number: "El numero debe ser del siguiente formato, ej: 0972000000",
        length: "El numero debe ser del siguiente formato, ej: 0972000000",
        required: "El numero de contacto es necesario"
      },
      marker: {
        rules: "required", 
        required: "Por favor, seleccione su ubicacion en el mapa"
      }
    }

    const check = validation(adoptionForm, rulesThirdStep)

    if (check.result) {
      //success
      setError(false)
      console.log('sus datos fueron enviados')
      console.log(adoptionForm)
    } else {
      //fail
      setError(true)
      setErrorMessage(check.message)
      return;
    }
  }
  

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setAdoptionForm({ ...adoptionForm, 'petPictures': result.uri})
      // setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  }

  const getLocation = async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const positionLatLng = await Location.getCurrentPositionAsync();
      const positionDetails = await Location.reverseGeocodeAsync(positionLatLng.coords)
      setAdoptionForm({ ...adoptionForm, 'petCity': positionDetails[0].city, 'latitude': positionLatLng.coords.latitude, 'longitude': positionLatLng.coords.longitude, 'marker': true})
      console.log();
      console.log(`lat: ${adoptionForm.latitude}, long: ${adoptionForm.longitude}, marker: ${adoptionForm.marker}, city: ${adoptionForm.petCity}`)
  };

  return (
    <ScrollView style={styles.container}>
    <ProgressSteps>
      <ProgressStep label="Datos de la mascota" onNext={onNextStepFirst} errors={error}>
        <View style={styles.inputGroup}>
          <View>
            {/* Name */}
            <TextInput 
            placeholder='Nombre del animalito' 
            onChangeText={(value) => handleChangeText('petName', value)}
            />
          </View>
          <View>
            {/* Specie */}
            <Text>Tipo de animalito</Text>
            <Picker
              selectedValue={adoptionForm.petSpecie}
              onValueChange={(value) => handleChangeText('petSpecie', value)}
              mode='modal'
              style={{height:30, width: width - 55, marginHorizontal: 20,}}
            >
              <Picker.Item label="Perro" value="perro" />
              <Picker.Item label="Gato" value="gato" />
              <Picker.Item label="Otro" value="otro" />
            </Picker>
          </View>
          <View>
            {/* Size*/}
            <Text>Tamaño del animalito</Text>
            <Picker
              selectedValue={adoptionForm.petSize}
              onValueChange={(value) => handleChangeText('petSize', value)}
              mode='modal'
              style={{height:30, width: width - 55, marginHorizontal: 20,}}
            >
              <Picker.Item label="Pequeño" value="pequeño" />
              <Picker.Item label="Mediano" value="mediano" />
              <Picker.Item label="Grande" value="grande" />
            </Picker>
          </View>
          <View>
            {/* Sex*/}
            <Text>Sexo del animalito</Text>
            <Picker
              selectedValue={adoptionForm.petSex}
              onValueChange={(value) => handleChangeText('petSex', value)}
              mode='modal'
              style={{height:30, width: width - 55, marginHorizontal: 20,}}
            >
              <Picker.Item label="Macho" value="macho" />
              <Picker.Item label="Hembra" value="hembra" />
            </Picker>
          </View>
          <View>
            {/* Name */}
            <TextInput 
            placeholder='Raza del animalito' 
            onChangeText={(value) => handleChangeText('petBreed', value)}
            />
          </View>
        </View>
        {error ? <Text>{errorMessage}</Text> : null}
      </ProgressStep>
      <ProgressStep label="Más datos de la mascota" onNext={onNextStepSecond} errors={error}>
          <View style={{ alignItems: 'center' }}>
            <Text>This is the content within step 2!</Text>
            <View>
            {/* Month */}
            <NumericInput 
              value={adoptionForm.month} 
              onChange={value => handleChangeText('month', value)} 
              onLimitReached={(isMax,msg) => console.log(isMax,msg)}
              totalWidth={240} 
              totalHeight={50} 
              iconSize={25}
              step={1.5}
              valueType='real'
              rounded 
              textColor='#B0228C' 
              iconStyle={{ color: 'white' }} 
              rightButtonBackgroundColor='#EA3788' 
              leftButtonBackgroundColor='#E56B70'/>
              <NumericInput 
              value={adoptionForm.year} 
              onChange={value => handleChangeText('year', value)} 
              onLimitReached={(isMax,msg) => console.log(isMax,msg)}
              totalWidth={240} 
              totalHeight={50} 
              iconSize={25}
              step={1.5}
              valueType='real'
              rounded 
              textColor='#B0228C' 
              iconStyle={{ color: 'white' }} 
              rightButtonBackgroundColor='#EA3788' 
              leftButtonBackgroundColor='#E56B70'/>
              <CheckBox
                disabled={false}
                value={adoptionForm.petVaccines}
                onValueChange={(value) => handleChangeText('petVaccines', value)}
              />
              <CheckBox
                disabled={false}
                value={adoptionForm.petSterilized}
                onValueChange={(value) => handleChangeText('petSterilized', value)}
              />
              <TextInput 
                placeholder='Descripcion' 
                onChangeText={(value) => handleChangeText('petDescription', value)}
                multiline
                numberOfLines={4}
              />
              <Button onPress={showImagePicker} title="Select an image" />
              {
                adoptionForm.petPictures !== null && <Image
                  source={{ uri: adoptionForm.petPictures }}
                  style={{width: 100, height: 100}}
                />
              }
          </View>
          {error ? <Text>{errorMessage}</Text> : null}
          </View>
        </ProgressStep>
        <ProgressStep label="Datos de contacto" onSubmit={onNextStepThird} errors={error}>
          <View style={{ alignItems: 'center' }}>
              <Text>This is the content within step 3!</Text>
              <View style={{paddingVertical: 15, alignItems: 'center', justifyContent: 'center',}}>
              <Button onPress={getLocation} title="Te voy a buscar" />
                <MapView
                  style={{width, height: 200, borderRadius: 20}}
                  region={{
                  latitude: adoptionForm.latitude,
                  longitude: adoptionForm.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                  }}
                  // onPress={(e) => console.log(e.nativeEvent)}
                  onPress={(e) => setAdoptionForm({ ...adoptionForm, 'marker': true, 'latitude': e.nativeEvent.coordinate.latitude, 'longitude': e.nativeEvent.coordinate.longitude})}
                  // onRegionChange={(region) => setAdoptionForm({ ...adoptionForm, 'marker': true, 'latitude': region.latitude, 'longitude': region.longitude})}
                >
                  {adoptionForm.marker
                    ?
                      <MapView.Marker coordinate={{latitude: adoptionForm.latitude ,longitude: adoptionForm.longitude}} pinColor = {config.colorTitle2} />
                    :
                      null
                  }
                </MapView>
              </View>
          </View>
          <View>
            <TextInput 
              placeholder='Nombre de contacto' 
              onChangeText={(value) => handleChangeText('name', value)}
            />
            <TextInput 
              placeholder='Numero de telefono' 
              onChangeText={(value) => handleChangeText('number', value)}
            />
            <CheckBox
              disabled={false}
              value={adoptionForm.whatsapp}
              onValueChange={(value) => handleChangeText('whatsapp', value)}
            />
          </View>
          {error ? <Text>{errorMessage}</Text> : null}
        </ProgressStep>
      </ProgressSteps>
      
      {/* <View style={styles.inputGroup}> */}
        {/* Pet Name Input */}
        {/* <TextInput 
        placeholder='Nombre del animalito' 
        onChangeText={(value) => handleChangeText('petName', value)}
        />
      </View>
      <View styles={styles.inputGroup}>
        <Picker
          selectedValue={adoptionForm.petSpecie}
          onValueChange={(value) => handleChangeText('petSpecie', value)}
          mode='dropdown'
          style={{height:30, width: 300}}
        >
          <Picker.Item label="Perro" value="perro" />
          <Picker.Item label="Gato" value="gato" />
          <Picker.Item label="Otro" value="otro" />
        </Picker>
      </View> */}


      {/* <View style={styles.inputGroup}>
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
      </View> */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 35,
    paddingHorizontal: 15
  },
  inputGroup: {
    flex: 0.8,
    padding: 0,
    marginBottom: 15, 
    borderBottomColor: '#cccccc',
    alignItems: 'center'
  }
})

export default PetForm