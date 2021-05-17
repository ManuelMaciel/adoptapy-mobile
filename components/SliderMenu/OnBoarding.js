import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
// Slider components
import OnBoardingItems from './OnBoardingItems';
import Paginator from './Paginator';
import NextButton from './NextButton'
import slides from '../../slides';

const OnBoarding = () => {
  const [ currentIndex, setCurrentIndex ] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null)
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index)
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}> 
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={ ({ item }) => <OnBoardingItems item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={ (item) => item.id }
          onScroll={Animated.event([{ nativeEvent: {  contentOffset: {  x: scrollX  } } }], {
            useNativeDriver: false,

          })}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator 
        data={slides} 
        scrollX={scrollX}
      />
      <NextButton />
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnBoarding