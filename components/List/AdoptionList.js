import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
// Axios
import axios from 'axios';
// FontAwesome5 Icons
import { FontAwesome5 } from '@expo/vector-icons'; 
// config
import config from '../../utils/config';

const width = Dimensions.get('screen').width/2-30

const AdoptionList = ({ petCategoryIndex, navigation }) => {

  const [ data, setData ] = useState([])
  const [ loading, setLoading ] = useState(false);
  const [ page, setPage ] = useState(0);
  const [ endPage, setEndPage ] = useState();

  const getData = async () => {
    if(page === 0) setPage(1)
    const url = `https://adoptapy.herokuapp.com/api/adoptions?specie=${(petCategoryIndex).toLowerCase()}&page=${page}`;
    const response = await axios.get(url)
    setData(data.concat(response.data.data.docs))
    setEndPage(response.data.data.totalPages)
    // fetch(url).then((res) => res.json())
    //   .then((resJson) => {
    //     setData(resJson);
    //   })
    setLoading(false)
  };

  const handleLoadMore = () => {
    if(page === endPage){
      console.log(`page : ${page}`)
      console.log(`endPage: ${endPage}`)
      console.log(`-------`)
      setLoading(false)
    } else {
      setPage(page + 1)
      console.log(`page: ${page}`)
      console.log(`--------`)
    }
  }

  useEffect(() => {
    setData([])
    setEndPage()
    setPage(0)
    console.log(`data: ${data}, endPage: ${endPage}, page: ${page}`)
    console.log(`pet category changed to ${petCategoryIndex}`)
    return () => {
      console.log('clean')
    }
  }, [petCategoryIndex])

  useEffect(() => {
    setLoading(true)
    getData()
    console.log(`page changed ${page}`)
    console.log(`end page ${endPage}`)
    return () => {
    }
  }, [page])

  function capitalize( val ) {
    return val.toLowerCase()
              .trim()
              .split(' ')
              .map( v => v[0].toUpperCase() + v.substr(1) )
              .join(' ');  
  }

  const Card = ({ item }) => {
    // console.log(item)
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => navigation.navigate('PetDetails', {item: item})}>
          {/* Render the image */}
          <View>
            <Image style={[styles.image, { resizeMode: 'cover'}]} source={{ uri: item.petData.petPictures[0]}} />
          </View>
          {/* Icon */}
          <View style={{ width: 25, height: 25, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: config.colorBackground, position: 'absolute', marginTop: 5, marginLeft: 5}}>
            <FontAwesome5 style={{alignItems: 'flex-end'}} name={item.petData.petSex === 'macho' ? 'mars' : 'venus'} size={19} color={config.colorTitle} />
          </View>
          {/* Title and description */}
          <View>
            <Text style={{ fontWeight: 'bold', color: config.colorTitle, marginTop: 5, marginLeft: 5, fontSize: 15}}>{capitalize(item.petData.petName)}</Text>
            {/*  */}
            <View style={{ flexDirection: 'column', marginLeft: 5}}>
              <View style={{ flexDirection: 'row', paddingBottom: 3}}> 
                <Text style={{ color: 'black'}}>Raza: </Text>
                <Text style={{ color: config.colorDescription}}>{capitalize(item.petData.petBreed)}</Text>
              </View>
              <View style={{ flexDirection: 'row', paddingBottom: 3}}>
                <Text style={{ color: 'black'}}>Tamaño: </Text>
                <Text style={{ color: config.colorDescription}}>{capitalize(item.petData.petSize)}</Text>
              </View>
              <View style={{ flexDirection: 'row', paddingBottom: 3}}>
                <Text style={{ color: 'black'}}>Ciudad: </Text>
                <Text style={{ color: config.colorDescription}}>{capitalize(item.petData.petCity)}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const Loading = () => {
    return (
    loading ?
    <View style={{marginBottom: 50}}>
      <ActivityIndicator size='large' color={config.colorTitle}/>
    </View> : null
    )
  }

  return (
    <>
      {/* {loading ? <Loading /> 
      : */}
      <View >
        <FlatList 
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 350,
          }}
          data={Object.values(data)}
          numColumns={2}
          renderItem={Card}
          keyExtractor={( item ) => item._id.toString()}
          ListFooterComponent={Loading}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.01}
        />
      </View>
      {/* } */}
    </>
  )
}
// Styles
const styles = StyleSheet.create({
  card: {
    height: 280,
    backgroundColor: '#fff',
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    // Shadows
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    
    elevation: 1,
  },
  image: {
    width,
    height: 180,
    borderRadius: 10,
  }
})

export default AdoptionList
