import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';

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
        <Text>{item.petData.petName}</Text>
      </View>
    )
  }

  return (
    <>
      {loading ? <Loading /> 
      :
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
      }
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    height: 250,
    backgroundColor: 'gray',
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15
  }
})

export default AdoptionList
