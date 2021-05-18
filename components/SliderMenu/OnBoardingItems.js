import React from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native'
// config settings
import config from '../../utils/config';

const OnBoardingItems = ({item}) => {

  const { width } = useWindowDimensions();
  
  return (
    <View style={styles.container}>
      {/* Image Content */}
      <Image source={item.image} style={[styles.image, {width, resizeMode: 'contain'}]}/>
      {/* Text, Description Content */}
      <View style={{ flex: 0.3 }}>
        <Text style={[styles.title, {width}]}>{item.title}</Text>
        <Text style={[styles.description, {width}]}>{item.description}</Text>
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
    flex: 0.7,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '800',
    fontSize: 26,
    marginBottom: 10,
    textAlign: 'center',
    color: config.colorTitle,
    fontFamily: 'normal'
  },
  description: {
    fontWeight: '400',
    color: config.colorDescription,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 64,
    fontFamily: 'sans-serif-light'
  },
});

export default OnBoardingItems