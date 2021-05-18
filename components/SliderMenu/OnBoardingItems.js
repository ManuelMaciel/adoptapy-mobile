import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'

const OnBoardingItems = ({item}) => {

  const { width } = useWindowDimensions();
  console.log(item)

  return (
    <View style={styles.container}>
      {/* Image Content */}
      <Image source={item.image} style={[styles.image, {width, resizeMode: 'contain'}]}/>
      {/* Text, Description Content */}
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={[styles.description, {width, resizeMode: 'contain'}]}>{item.description}</Text>
      </View>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.6,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 26,
    marginBottom: 10,
    color: '#00B0BF',
    textAlign: 'center'
  },
  description: {
    fontWeight: '400',
    color: '#62656b',
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 64,
  },
});

export default OnBoardingItems