import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
// Axios
import axios from 'axios';
// config
import config from '../../utils/config';
// FontAwesome5 Icons
import { FontAwesome5 } from '@expo/vector-icons'; 

const Loading = () => {
  return (
  <View>
    <ActivityIndicator size='large' color="#00ff00"/>
  </View>
  )
}
const width = Dimensions.get('screen').width/2-30


const AdoptionList = () => {

  const [ data, setData ] = useState([])
  const [ loading, setLoading ] = useState(false);
  const [ page, setPage ] = useState(1);

  const getData = async () => {
    const url = `https://adoptapy.herokuapp.com/api/adoptions?page=1`;
    const response = await axios.get(url)
    setData(response.data.data.docs)
    // fetch(url).then((res) => res.json())
    //   .then((resJson) => {
    //     setData(resJson);
    //   })
  }

  useEffect(() => {
    getData()
    return () => {
    }
  }, [])

  const Card = ({ item }) => {
    console.log(item)
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => alert('Hola humano')}>
          <FontAwesome5 style={{alignItems: 'flex-start'}} name='dog' size={15} color={config.colorTitle} />
          <Text>{item.petData.petName}</Text>
          <Text>{item.petData.petSex}</Text>
          <Text>{item.petData.petSize}</Text>
          <Text>{item.petData.petCity}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <>
      {loading ? <Loading /> 
      :
      <View >
        <FlatList 
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 50,
          }}
          data={Object.values(data)}
          numColumns={2}
          renderItem={Card}
          keyExtractor={( item ) => item._id.toString()}
        />
      </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    height: 250,
    backgroundColor: config.colorBackground,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  }
})

export default AdoptionList
