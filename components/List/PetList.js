import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity, Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons'; 
import config from '../../utils/config';

const width = Dimensions.get('screen').width/2-30

const PetList = ({ petCategoryIndex, navigation, type }) => {

  const [ data, setData ] = useState([])
  const [ loading, setLoading ] = useState(false);
  const [ page, setPage ] = useState(0);
  const [ endPage, setEndPage ] = useState();

  const getData = async () => {
    if(page === 0) setPage(1)
    const url = `https://adoptapy.herokuapp.com/api/${type}?specie=${(petCategoryIndex).toLowerCase()}&page=${page}`;
    const response = await axios.get(url)
    setData(data.concat(response.data.data.docs))
    setEndPage(response.data.data.totalPages)
    setLoading(false)
  };

  const handleLoadMore = () => {
    if(page === endPage){
      setLoading(false)
    } else {
      setPage(page + 1)
    }
  }

  useEffect(() => {
    setData([])
    setEndPage()
    setPage(0)
    console.log(`data: ${data}, endPage: ${endPage}, page: ${page}`)
    console.log(`pet category changed to ${petCategoryIndex}`)
    return () => {
    }
  }, [petCategoryIndex])

  useEffect(() => {
    setLoading(true)
    getData()
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
    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => navigation.navigate('PetAllDetails', {item: item, type: type})}>
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

export default PetList
