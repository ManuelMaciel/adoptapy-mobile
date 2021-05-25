import React, { useState} from 'react';
import { View, TextInput, Button, ScrollView, StyleSheet, Text, Dimensions, Image, ActivityIndicator } from 'react-native'
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
// icons
import { SimpleLineIcons } from '@expo/vector-icons'; 
// Axios
// import axios from 'axios';
// Loader
import Loader from '../Loader/Loader';

// Get the dimension width from the screen/window
const width = Dimensions.get('window').width

const PetForm = ({ navigation }) => {
  // save the data from the inputs
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
    image: null,
    petCity: 'Asunción',
    latitude: -25.2819,
    longitude: -57.635,
    marker: null,
    name: '',
    number: 0,
    whatsapp: false,
    postType: 'adoption',
    type: 'image/jpeg',
    petPictures: null,
  });
  // reset the adoptionform state
  const resetState = () => {
    setAdoptionForm({
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
      image: null,
      petCity: 'Asunción',
      latitude: -25.2819,
      longitude: -57.635,
      marker: null,
      name: '',
      number: 0,
      whatsapp: false,
      postType: 'adoption',
      type: 'image/jpeg',
      petPictures: null,
    })
  }

  // error states
  const [ error, setError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  // Loading state
  const [ loading, setLoading ] = useState(false)
  // Function to change the input when is typing
  const handleChangeText = (name, value) => {
    setAdoptionForm({ ...adoptionForm, [name]: value});
  }
  // validate the first screen from the ProgressStep library
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
  // validate the second screen from the ProgressStep library
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
      image : {
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
  // validate the thrid screen from the ProgressStep library
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
      setLoading(true)
      sendData();
      // console.log(adoptionForm)
    } else {
      //fail
      setError(true)
      setErrorMessage(check.message)
      return;
    }
  }
  // This function is triggered when the "Subir Imagen" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // show alert 
    if (permissionResult.granted === false) {
      alert("Te has negado a que esta aplicación acceda a tus fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();
    // Explore the result
    console.log(result);
    if (!result.cancelled) {
      // Verify if the extension is an image, else show a error
      if(result.type === 'image') {
        setAdoptionForm({ ...adoptionForm, 'image': result.uri})
        // console.log(result); //result.uri is the route of the image
      } else{
        setError(true)
        setErrorMessage('Solo puedes subir archivos de imagen!')
      }
    }
  }
  // This function is triggered when the "Te voy a buscar" button pressed
  const getLocation = async () => {
    // Ask the user for the permission  to access the location
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (!granted){
        alert("Te has negado a que esta aplicación acceda a tu ubicacion.");
      return;
      }
      // obtains from the location the coordinates with latitude and longitude
      const positionLatLng = await Location.getCurrentPositionAsync();
      // passing the coordinates as argument, get the data of the city, country, zip, etc.
      const positionDetails = await Location.reverseGeocodeAsync(positionLatLng.coords)
      
      setAdoptionForm({ ...adoptionForm, 'petCity': positionDetails[0].city, 'latitude': positionLatLng.coords.latitude, 'longitude': positionLatLng.coords.longitude, 'marker': true})
      // console.log();
      // console.log(`lat: ${adoptionForm.latitude}, long: ${adoptionForm.longitude}, marker: ${adoptionForm.marker}, city: ${adoptionForm.petCity}`)
  };

  // this functions send the data 
  const sendData = async () => {
    
    const fileURL = adoptionForm.image;
    const cleanURL = fileURL.replace("file://", "");

    const data = new FormData();
    data.append('petPictures', { uri: fileURL, name:'petpicture.jpg', type: 'image/jpg'});
    data.append('petName', adoptionForm.petName);
    data.append('petSpecie', adoptionForm.petSpecie);
    data.append('month', adoptionForm.month);
    data.append('year', adoptionForm.year);
    data.append('petSize', adoptionForm.petSize);
    data.append('petSex', adoptionForm.petSex);
    data.append('petBreed', adoptionForm.petBreed);
    data.append('petDescription', adoptionForm.petDescription);
    data.append('petCity', adoptionForm.petCity);
    data.append('latitude', adoptionForm.latitude);
    data.append('longitude', adoptionForm.longitude);
    data.append('name', adoptionForm.name);
    data.append('number', adoptionForm.number);
    data.append('whatsapp', adoptionForm.whatsapp);
    data.append('petVaccines', adoptionForm.petVaccines);
    data.append('petSterilized', adoptionForm.petSterilized);
    data.append('postType', adoptionForm.postType);

    setAdoptionForm({ ...adoptionForm, 'petPictures': cleanURL})
    const url = `https://adoptapy.herokuapp.com/api/adoptions`;
    // const response = await axios({
    //   url,
    //   method: 'POST',
    //   data: adoptionForm,
    // }).then(function (response) {
    //   // handle success
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   // handle error
    //   console.log(error);
    // })
    // console.log('data enviada')
    // console.log(response)
    fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: data
  })
    .then(response => response.json())
    .then(response => {
      // console.log(adoptionForm)
      console.log("upload succes", response);
      alert("Upload success!");
      resetState()
      navigation.navigate('NewPosts')
      setLoading(false)
    })
    .catch(error => {
      console.log("upload error", error);
      alert("Upload failed!");
      setLoading(false)
    });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Component ProgressStep */}
        <ProgressSteps 
        activeStepIconBorderColor={config.colorTitle}
        activeLabelColor={config.colorTitle}
        activeStepNumColor={config.colorTitle}
        completedProgressBarColor={config.green}
        completedStepIconColor={config.green}
      >
        {/* Screen per step */}
        <ProgressStep 
          label='Datos de la mascota' 
          onNext={onNextStepFirst} 
          errors={error}
          nextBtnText='Siguiente'
          nextBtnStyle={styles.psBtn}
          nextBtnTextStyle={styles.psBtnText}
          scrollable={true}
        >
          <View style={styles.inputGroup}>
            <View>
              {/* Name */}
              <TextInput 
                style={styles.input}
                placeholder='Nombre del animalito'
                value={adoptionForm.petName}
                onChangeText={(value) => handleChangeText('petName', value)}
                keyboardType='default'
                keyboardAppearance='default'
                maxLength={30}
                placeholderTextColor='gray'
              />
            </View>
            <View>
              {/* Specie */}
              <Text style={styles.label}>Tipo de animalito</Text>
              <View style={ styles.pickerContainer }>
                <Picker
                  selectedValue={adoptionForm.petSpecie}
                  onValueChange={(value) => handleChangeText('petSpecie', value)}
                  mode='dialog'
                  style={styles.picker}
                >
                  <Picker.Item label="Perro" value="perro" />
                  <Picker.Item label="Gato" value="gato" />
                  <Picker.Item label="Otro" value="otro" />
                </Picker>
                <SimpleLineIcons name="arrow-down" size={19} color={config.colorTitle} style={{ position: 'absolute', alignSelf: 'flex-end', paddingHorizontal: 10}}  />
              </View>
            </View>
            <View>
              {/* Size*/}
              <Text style={styles.label}>Tamaño del animalito</Text>
              <View style={ styles.pickerContainer }> 
                <Picker
                  selectedValue={adoptionForm.petSize}
                  onValueChange={(value) => handleChangeText('petSize', value)}
                  mode='dialog'
                  style={styles.picker}
                >
                  <Picker.Item label="Pequeño" value="pequeño" />
                  <Picker.Item label="Mediano" value="mediano" />
                  <Picker.Item label="Grande" value="grande" />
                </Picker>
                <SimpleLineIcons name="arrow-down" size={19} color={config.colorTitle} style={{ position: 'absolute', alignSelf: 'flex-end', paddingHorizontal: 10}}  />
              </View>
            </View>
            <View>
              {/* Sex*/}
              <Text style={styles.label}>Sexo del animalito</Text>
              <View style={ styles.pickerContainer }>
                <Picker
                  selectedValue={adoptionForm.petSex}
                  onValueChange={(value) => handleChangeText('petSex', value)}
                  mode='dialog'
                  style={styles.picker}
                >
                  <Picker.Item label="Macho" value="macho" />
                  <Picker.Item label="Hembra" value="hembra" />
                </Picker>
                <SimpleLineIcons name="arrow-down" size={19} color={config.colorTitle} style={{ position: 'absolute', alignSelf: 'flex-end', paddingHorizontal: 10}}  />
              </View>
            </View>
            <View>
              {/* Breed */}
              <TextInput 
                style={styles.input}
                value={adoptionForm.petBreed}
                placeholder='Raza del animalito' 
                onChangeText={(value) => handleChangeText('petBreed', value)}
                keyboardType='default'
                keyboardAppearance='default'
                maxLength={30}
                placeholderTextColor='gray'
              />
            </View>
          </View>
          {error ? <Text style={styles.error}>{errorMessage}</Text> : null}
        </ProgressStep>
        {/* End of Screen Step 1 */}
        <ProgressStep
          label="Más datos de la mascota" 
          onNext={onNextStepSecond} 
          errors={error}
          nextBtnText='Siguiente'
          nextBtnStyle={styles.psBtn}
          nextBtnTextStyle={styles.psBtnText}
          previousBtnText='Atrás'
          previousBtnStyle={styles.psBtn}
          previousBtnTextStyle={styles.psBtnText}
          scrollable={true}
        >
          <View style={styles.inputGroup}>
          {/* Month */}
            <Text style={styles.label}>¿Cuantos meses tiene {adoptionForm.petName}?</Text>
            <View style={{ alignItems: 'center', paddingVertical: 5}}>
              <NumericInput 
                value={adoptionForm.month} 
                minValue={0}
                maxValue={11}
                step={1}
                borderColor={config.colorTitle}
                onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                totalWidth={140} 
                totalHeight={50} 
                iconSize={20}
                valueType='real'
                rounded={true}
                textColor={config.colorDescription} 
                iconStyle={{ color: 'white' }} 
                rightButtonBackgroundColor={config.colorTitle} 
                leftButtonBackgroundColor={config.colorTitle}
                onChange={value => handleChangeText('month', value)} 
              />
            </View>
            {/* Year */}
            <Text style={styles.label}>¿Cuantos años tiene {adoptionForm.petName}?</Text>
            <View style={{ alignItems: 'center', paddingVertical: 5}}>
              <NumericInput 
                value={adoptionForm.year} 
                minValue={0}
                maxValue={30}
                step={1}
                borderColor={config.colorTitle}
                totalWidth={140} 
                totalHeight={50} 
                iconSize={20}
                valueType='real'
                rounded={true}
                textColor={config.colorDescription} 
                iconStyle={{ color: 'white' }} 
                rightButtonBackgroundColor={config.colorTitle} 
                leftButtonBackgroundColor={config.colorTitle}
                onChange={value => handleChangeText('year', value)} 
                onLimitReached={(isMax,msg) => console.log(isMax,msg)}
              />
            </View>
            {/* Checkboxes */}
            <View style={{ flexDirection: 'column'}}>
              {/* Vaccines */}
              <View style={{ flexDirection: 'row', paddingVertical: 5, alignItems: 'center'}}>
                <Text style={ styles.label }>¿{adoptionForm.petName} está vacunado?</Text>
                <CheckBox
                  disabled={false}
                  value={adoptionForm.petVaccines}
                  onValueChange={(value) => handleChangeText('petVaccines', value)}
                  // tintColors={{ true: 'red, false: 'yellow' }}
                  tintColors={{ true: config.colorTitle, false: config.colorDescription }}
                />
              </View>
                {/* Sterilized */}
              <View style={{ flexDirection: 'row', paddingVertical: 5, alignItems: 'center',}}>
                <Text style={ styles.label }>¿{adoptionForm.petName} está esterilizado?</Text>
                <CheckBox
                  disabled={false}
                  value={adoptionForm.petSterilized}
                  onValueChange={(value) => handleChangeText('petSterilized', value)}
                  tintColors={{ true: config.colorTitle, false: config.colorDescription }}
                />
              </View>
            </View>
            <View>
              <TextInput 
                style={styles.inputLarge}
                placeholder='Descripcion' 
                value={adoptionForm.petDescription}
                keyboardType='default'
                keyboardAppearance='default'
                placeholderTextColor='gray'
                onChangeText={(value) => handleChangeText('petDescription', value)}
                multiline
                numberOfLines={4}
                maxLength={100}
              />
            </View>
            <View style={{ paddingVertical: 12}}>
              <Button onPress={showImagePicker} title={`Sube una imagen de ${adoptionForm.petName}`} color={config.colorTitle} />
                  {
                    adoptionForm.image !== null && <Image
                      source={{ uri: adoptionForm.image }}
                      style={{    
                      alignSelf: 'center',
                      height: 350, 
                      width: 300, 
                      maxWidth: 300, 
                      maxHeight: 350,
                      borderRadius: 10,
                      marginTop: 15
                    }}
                    resizeMode='contain'
                    />
                  }
            </View>
            {error ? <Text style={styles.error}>{errorMessage}</Text> : null}
          </View>  
        </ProgressStep>
        {/* End of Screen step 2 */}
        <ProgressStep 
          label="Datos de contacto" 
          onSubmit={onNextStepThird}
          nextBtnTextStyle={styles.psBtnText}
          nextBtnStyle={styles.psBtnSubmit}
          finishBtnText={'Subir'}
          previousBtnText='Atrás'
          previousBtnStyle={styles.psBtn}
          previousBtnTextStyle={styles.psBtnText}
          errors={error}
          scrollable={true}
        >
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Debes marcar tu posicion en el mapa</Text>
            <View style={{paddingVertical: 15, alignItems: 'center', justifyContent: 'center',}}>
                <MapView
                  style={{width: width - 55, height: 200, borderRadius: 30, paddingVertical: 15}}
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
            <Button onPress={getLocation} title="Te voy a buscar" color={config.colorTitle} />
            <View>
              <TextInput 
                style={styles.input}
                value={adoptionForm.name}
                keyboardType='default'
                keyboardAppearance='default'
                maxLength={30}
                placeholderTextColor='gray'
                placeholder='Nombre de contacto' 
                onChangeText={(value) => handleChangeText('name', value)}
              />
              <TextInput 
                style={styles.input}
                value={(adoptionForm.number).toString()}
                keyboardType='numeric'
                keyboardAppearance='default'
                maxLength={10}
                placeholderTextColor='gray'
                placeholder='Numero de telefono' 
                onChangeText={(value) => handleChangeText('number', value)}
              />
            </View>
            <View style={{ flexDirection: 'row', paddingVertical: 5, alignItems: 'center'}}>
              <Text style={ styles.label }>¿Este numero tiene Whatstapp?</Text>
              <CheckBox
                disabled={false}
                value={adoptionForm.whatsapp}
                onValueChange={(value) => handleChangeText('whatsapp', value)}
                // tintColors={{ true: 'red, false: 'yellow' }}
                tintColors={{ true: config.colorTitle, false: config.colorDescription }}
              />
            </View>
            {error ? <Text style={styles.error}>{errorMessage}</Text> : null}
          </View>
        </ProgressStep>
      </ProgressSteps>
      {/* set a loading indicator when the submit button is pressed */}
      <Loader loading={loading} />
    </ScrollView>
  )
}
// Style from form component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 50
  },
  psBtn: {
    borderWidth: 1,
    borderColor: config.colorTitle,
    backgroundColor: config.colorTitle,
    borderRadius: 10,
    padding: 10,
    width: 100, 
    height: 50,
  },
  psBtnSubmit: {
    borderWidth: 1,
    borderColor: config.green,
    backgroundColor: config.green,
    borderRadius: 10,
    padding: 10,
    width: 100, 
    height: 50,
  },
  psBtnText: {
    fontWeight: '600',
    // color: config.colorTitle,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  inputGroup: {
    paddingHorizontal: 20,
    marginTop: 10, 
    flexDirection: 'column',
    justifyContent: 'space-between'
  }, 
  input: {
    height: 40,
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: config.colorBackground,
    backgroundColor: config.colorBackground,
    color: 'black'
  },
  inputLarge: {
    height: 80,
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: config.colorBackground,
    backgroundColor: config.colorBackground,
    color: 'black'
  },
  label: {
    color: config.colorDescription,
  },
  pickerContainer: {
    backgroundColor: config.colorBackground,
    height: 40,
    justifyContent: 'center',
    marginVertical: 5,
    borderRadius: 10,
  },
  picker: { 
    height: 40,
    width: width - 55, 
    marginVertical: 10,
    color: config.colorDescription,
    backgroundColor: config.colorBackground,
    borderRadius: 10,
  },
  error: {
    width: width - 55,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EF4444',
    color: '#fff',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginVertical: 10
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center"
  },
  loadingHorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
})

export default PetForm