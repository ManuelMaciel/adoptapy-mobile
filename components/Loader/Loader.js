import React from 'react'
import { View, ActivityIndicator, Dimensions } from 'react-native';
import config from '../../utils/config'

const Loader = ({ loading }) => {
  return (
    loading 
    ?
      <View style={{
        backgroundColor: 'white',
        position: 'absolute',
        height: Dimensions.get('screen').height,
        width:  Dimensions.get('screen').width,
        justifyContent: 'center',
        alignItems: 'center'}} 
      >
        <ActivityIndicator size="large" color={config.colorTitle} />
      </View> 
    : 
      null
  );
}

export default Loader
