import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const AdCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Define your images array
  const images = [
    require('../assets/car2.png'),
    require('../assets/car2.png'),
    require('../assets/carselim.png'),
  ];

  // Function to handle changing the current index
  const changeIndex = () => {
    console.log('Changing index');
    setCurrentIndex((prevIndex) => {
      console.log('Prev index:', prevIndex);
      return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
    });
  };

  // Set interval to change the index every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Interval fired');
      changeIndex();
    }, 4000);

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={item} style={styles.image} resizeMode="contain" resizeMethod="resize" />
        )}
        onScrollToIndexFailed={() => {}}
        initialScrollIndex={0}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Align the carousel at the bottom
    marginBottom: height * 0.05, // Adjust the marginBottom as needed
  },
  image: {
    width,
    height: '60%', // Adjust the height as needed
  },
});

export default AdCarousel;
